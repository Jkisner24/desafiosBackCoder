const { Router } = require('express');
const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = require('../config/config')

class RouterClass {
    constructor() {
        this.router = Router()
        this.init()
    }
    redirectToLogin(req, res, next) {
        res.redirect('/api/views/session/login');
      }
    
    getRouter = () => {
        return this.router
    }

    handlePolicies = policies => (req, res, next) => {
        if (policies[0] === 'PUBLIC') return next()
    
        const authHeader = req.headers.cookie ?? req.headers.authorization ?? null
    
        if (!authHeader) return res.send({ status: 'error', error: 'Unauthorized' })
    
        let token;
    
        if (authHeader.toLowerCase().includes('bearer')) {
            token = authHeader.split(' ')[1]
        } else {
            token = authHeader.split('=')[1]
        }
        
    
        try {
            const { user } = jwt.verify(token, JWT_SECRET_KEY)
            if (!policies.includes(user.role.toUpperCase())) return res.status(403).send({ status: 'error', payload: 'No permission' });
            req.user = user
            console.log(req.user);
            next();
        } catch (error) {
            return res.status(403).send({ status: 'error', payload: 'Invalid token' });
        }
        }
    
    generateCustomResponse = async (_req, res, next) => {
        try {
            res.sendSuccess = payload => res.send({ status: 'success', payload })
            res.sendServerError = error => res.send({ status: 'error', error })
            res.sendUserError = error => res.send({ status: 'error', error })
            next()
        } catch (error) {
            if (error) {
                return res.send(error.message)
            }
        }
    }

    init() { }

    applyCallbacks = (callbacksArray) => {
        return callbacksArray.map(cbIndividual => async (...params) => {
            try {
                await cbIndividual.apply(this, params)
            } catch (error) {
                params[1].status(500).send({
                    status: 'error',
                    error
                })
            }
        })
    }

    get = async (path, policies, ...callbacks) => {
        try {
            this.router.get(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
        } catch (error) {
            if (error) return error.message
        }
    }
    post = async (path, policies, ...callbacks) => {
        try {
            this.router.post(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
        } catch (error) {
            if (error) return error.message
        }
    }
    put = async (path, policies, ...callbacks) => {
        try {
            this.router.put(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
        } catch (error) {
            if (error) return error.message
        }
    }
    delete = async (path, policies, ...callbacks) => {
        try {
            this.router.delete(path, this.handlePolicies(policies), this.generateCustomResponse, this.applyCallbacks(callbacks))
        } catch (error) {
            return error.message
        }
    }
}

module.exports = {
    RouterClass
}
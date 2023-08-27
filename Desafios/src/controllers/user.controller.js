const { generateToken } = require("../config/jwt")
const { userService, cartService } = require("../services")
const { createHash } = require("../utils/bcryptHash")

class UserController {
    get = async (req, res) => {
        try {
            const searchUser = await userService.get()
            res.status(200).sendSuccess(searchUser)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }
    getById = async (req, res) => {
        try {
            const { uid } = req.params
            const user = await userService.getById({_id: uid})
            console.log(user)
            if(!user) return res.send({status:"error", message: "User not available"})

            res.status(200).sendSuccess(user)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }

    post = async (req, res, next) => {
            try {
                const { first_name, last_name, email, password, date_of_birth } = req.body
    
                if (!first_name || !last_name || !email || !password || !date_of_birth)
                return res.status(401).sendServerError('Empty Values')
    
                const userExists = await userService.getById({email})
                if (userExists) return res.status(401).sendServerError('User already exists')
    
                const {_id} = await cartService.newCart()
    
                const createdUser = await userService.addUser({
                    first_name,
                    last_name,
                    email,
                    cartId: _id,
                    date_of_birth,
                    password: await createHash(password),
                    role: email == "adminCoder@coder.com" ? "ADMIN" : "user" 
                })
                const token = generateToken(createdUser)
                res.status(200).sendSuccess( `User register successfully', ${token}`)

            } catch (error) {
            next(error)
        }
    }

    put = async (req, res) => {
        try {
            const { uid, body } = req.params

            const {cartId, role, email, userId} = await userService.updateUser(uid, body)

            const token = generateToken({ user: { cartId, role, email, userId } })

            res.status(200).cookie('coderCookieToken', token, {
                httpOnly: true,
                maxAge: 60 * 60 * 100
            }).sendSuccess('User updated')
            
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }

    delete = async (req, res) => {
        try {
            const { uid } = req.params
            const userDeleted = await cartService.deleteCartById(uid)

            res.status(200).sendSuccess('User deleted successfully', userDeleted)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }
}

module.exports = UserController;
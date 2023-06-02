const { createHash, isValidPassword } = require('../../utils/bcryptHash')
const {userModel } = require('./model/user.model')

class UserManager{

    getUsers = async ()=>{
        try {
            let users = await userModel.find({}).lean()
            if(!users) {
                throw new Error('Users not found')
            }
            return users
        } catch (error) {
            return new Error(error)
        }

    }
    getUserById = async(uid) => {
        // try {
        //     let user = await userModel.findOne(uid)
        //     if(!user) {
        //         throw new Error('User not found')
        //     }
        //     return user
        try{
            return await userModel.findById(uid)
        } catch (error) {
            return new Error(error)
        }
    }
    addUser = async (data) => {
        try {
            const findUser = await userModel.findOne({email: data.email})
            if (findUser) {
                throw new Error('User not available')
            }
            return await userModel.create(data)
            
        } catch (error) {
            console.error(error.message)
        }
    }
    addUserGithub = async (data) => {
        try {
            const { name, email } = data
            console.log(data)

            const findUser = await userModel.findOne({ email })
            console.log(findUser)
            const newUser = {
                first_name: name,
                last_name: name,
                email,
                password: createHash.toString((isValidPassword))
            }
            if (findUser) {
                return newUser
            }
            await userModel.create(newUser)
            return newUser

        } catch (error) {
            console.error(error.message)
        }
    }
    loginUser = async (data) => {
        try {
            const { email, password } = data

            const findUser = await userModel.findOne({ email })
            console.log(findUser)
            if (!findUser) {
                throw new Error('Email not found in DB')
            }
            if (findUser.password !== password) {
                throw new Error('Password is wrong')
            }
            return findUser
        } catch (error) {
            throw new Error(error.message);
        }
    }
    updateUser = async (uid, changes) => {
        try {
            const userUpdated = await userModel.updateOne({ _id: uid }, { $set: changes })
            return userUpdated
        } catch (error) {
            return new Error(error)
        }
    }
    deleteUser = async(uid)=>{
        try {
            const result = await userModel.deleteOne({_id: uid})
            return result
        } catch (error) {
            return new Error(error)
        }
    }
}


module.exports = new UserManager
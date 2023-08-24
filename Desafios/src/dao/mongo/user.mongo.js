const { userModel } = require('./model/user.model')
 

class UserManager {

    get = async ()=>{
        try {
            let users = await userModel.find({}).lean()
            if(!users) {
                throw new Error('Users not found')
            }
            return users
        } catch (error) {
            throw error
        }

    }
    getById = async(userData) => {
        try{
            return await userModel.findOne({...userData}).lean()
        } catch (error) {
            return `ERROR: ${error}`
        }
    }
    addUser = async (newUser) => {
        try {
            return await userModel.create(newUser)          
        } catch (error) {
            if (error) {
                throw error
            }
        }
    }
    update = async (uid, body) => {
        try {
            return await userModel.findOneAndUpdate({ _id: uid }, { $set: body }, { returnDocument: "after" })
        } catch (error) {
            throw error
        }
    }
    delete = async(uid)=>{
        try {
            const result = await userModel.findOneAndDelete({_id: uid})
            return result
        } catch (error) {
            return new Error(error)
        }
    }
}


module.exports = UserManager
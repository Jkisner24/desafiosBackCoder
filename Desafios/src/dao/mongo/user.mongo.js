const { generateToken } = require('../../config/jwt')
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
        try{
            return await userModel.findById(uid)
        } catch (error) {
            return new Error(error)
        }
    }
    addUser = async (data) => {
        try {
            const { first_name, last_name, email, password, date_of_birth } = data
            if (!first_name || !last_name || !email || !password || !date_of_birth) throw new Error('Error to register the fields.')

            const findUser = await userModel.findOne({email: data.email})
            if (findUser) throw new Error('User not available')
            
            const newUser = {
                first_name,
                last_name,
                email,
                password: createHash(password),
                date_of_birth: new Date(date_of_birth)
            }
            if (email === 'adminCoder@coder.com') {
                newUser.role = 'admin'
            }
            return await userModel.create(newUser)          

        } catch (error) {
            return new Error(error)
        }
    }
    addUserGithub = async (data) => {
        try {
            const { email } = data
            console.log(data)

            const findUser = await userModel.findOne({ email })
            console.log(findUser)
            const newUser = {
                first_name: findUser.first_name,
                last_name: findUser.last_name,
                email: findUser.email,
                password: "-"
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
          const { email, password } = data;
          const findUser = await userModel.findOne({ email });
          console.log(findUser);
          if (!findUser) {
            throw new Error('Email not found in DB');
          }
          const passwordMatch = isValidPassword(password, findUser);
          if (!passwordMatch) {
            throw new Error('Password is wrong');
          }
          return generateToken(findUser);
            
        } catch (error) {
            console.log(error);
        }
      };     
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
const UserDto = require('../dto/UsersDto')

class UserRepository{
    constructor(dao){
        this.dao = dao
    }
    get = async() =>{
        try {
            return await this.dao.get()
        } catch (error) {
            throw error
        }
    }
    getById = async(data) =>{
        try {
            const userFind = await this.dao.getById(data)
            if (!userFind) return null
            const { password, ...user } = new UserDto(userFind)
            return { password, user }

        } catch (error) {
            throw error
        }
    }
    addUser = async(userData) =>{
        try {
            const newUser = await this.dao.addUser(userData)
            const { password, ...user } = new UserDto(newUser)
            return user
        } catch (error) {
            throw error
        }
    }
    updateUser = async(uid, body) =>{
        try {
            const updatedUser = await this.dao.update(uid, body)
            const { password, ...user } = new UserDto(updatedUser)
            return user
        } catch (error) {
            throw error
        }
    }
    deleteUser = async(uid) =>{
        try {
            return await this.dao.delete(uid)
        } catch (error) {
            throw error
        }
    }
}

module.exports = UserRepository
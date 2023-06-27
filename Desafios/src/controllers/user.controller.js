const { userService, cartService } = require("../services")

class UserController {
    get = async (req, res) => {
        try {
            const searchUser = await userService.getUsers()

            res.status(200).sendSuccess(searchUser)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }

    getById = async (req, res) => {
        try {
            const { uid } = req.params

            const user = await userService.findUser(uid)

            res.status(200).sendSuccess(user)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }

    post = async (req, res) => {
        try {
            const createdUser = await userService.addUser(newUser)

            res.status(200).sendSuccess('user register successfully', createdUser)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }

    put = async (req, res) => {
        try {
            const { uid, changes } = req.params

            const newUser = await userService.updateUser(uid, changes)

            res.status(200).sendSuccess('User updated', newUser)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }

    delete = async (req, res) => {
        try {
            const { uid } = req.params
            const userDeleted = await cartService.deleteCart(uid)

            res.status(200).sendSuccess('User deleted successfully', userDeleted)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }
}

module.exports = UserController;
const { userGenerator } = require("../../utils/productMockGenerator")

class UserMockController {
    getUsers = (req, res) => {
        try {
            let { first_name, last_name, email, password, date_of_birth} = userGenerator()
            res.send({ first_name, last_name, email, password, date_of_birth})
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }
}

module.exports = UserMockController
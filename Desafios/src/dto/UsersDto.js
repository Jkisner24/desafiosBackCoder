class UserDto {
    constructor(user) {
        this.userId = user._id.toString()
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.cartId = user.cartId.toString()
        this.role = user.role
        this.date_of_birth = user.date_of_birth
        this.password = user.password
        this.email = user.email
    }
}

module.exports = UserDto
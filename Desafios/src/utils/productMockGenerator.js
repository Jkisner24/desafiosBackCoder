const { faker } = require('@faker-js/faker')

const productGenerator = () => {

    const stock = faker.number.int({ max: 20 })

    return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 50, max: 100 }),
        thumbnails: [faker.image.url(), faker.image.url()],
        code: faker.string.nanoid({ min: 10, max: 15 }),
        stock,
        status: stock === 0,
        category: faker.commerce.department()
    }
}

const userGenerator = _ => {
    let user = {
        _id: faker.database.mongodbObjectId(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 10 }),
        date_of_birth: faker.date.birthdate()
    }

    return user
}

module.exports = {
    productGenerator,
    userGenerator
}
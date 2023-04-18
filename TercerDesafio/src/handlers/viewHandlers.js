const getViews = async (req, res) =>{

let food = [
    {   name: 'hambuguesa',
        price: 150
    },
    {   name: 'pizza',
        price: 100
    },
    {   name: 'panchito',
        price: 25   
    },
    {   name: 'lomo',
        price: 500
    }

]

let users = [
    {
        name: 'Jose',
        apellido: 'Suarez',
        role: 'admin'
    },
    {
        name: 'Carlos',
        apellido: 'Sosa',
        role: 'admin'
    },
    {
        name: 'Manuel',
        apellido: 'Perez',
        role: 'user'
    },
    {
        name: 'Maria',
        apellido: 'Gomez',
        role: 'user'
    }

]

    let user = users[Math.floor(Math.random() * users.length)]
    let testUser = {
        user,
        isAdmin: user.role === 'admin',
        food,
        style: 'index.css'
    }
    res.render('index', testUser)
}

module.exports = {getViews}
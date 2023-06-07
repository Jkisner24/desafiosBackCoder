const bcrypt = require('bcrypt')

// crear el hash 

exports.createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

// generar la funcion para comparar clave hasheada y contraseña del form

exports.isValidPassword = (password, user) => bcrypt.compareSync(password, user.password)


const bcrypt = require('bcrypt')

// crear el hash 

exports.createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

// generar la funcion para comparar clave hasheada y contraseña del form

 exports.isValidPassword = (pass, user) => bcrypt.compareSync(pass, user.password)


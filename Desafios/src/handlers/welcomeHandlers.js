const getBienvenida = async (req, res) =>{
    res.status(200).send(`Welcome to project`)
}

module.exports = {getBienvenida}

function auth(req, res, next) {
    if(req.session?.user?.first_name === 'Juli' || !req.session?.user?.admin === 'admin'){
        return res.status(401).send('Error de autenticación')
    }
    next()
}

module.exports = {
    auth
}

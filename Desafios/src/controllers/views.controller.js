const { cartModel } = require('../dao/mongo/model/cart.model');
const { productService, cartService} = require('../services')

class ViewsControllers {
    products = async (req, res) => {
      try {
        const { first_name, last_name, role } = req.user || {};
  
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        let sort = req.query.sort;
  
        if (!page) page = 1;
        if (!limit) limit = 4;
        if (!sort) sort = "asc";
  
        const result = await productService.paginate({}, {
          page,
          limit,
          sort,
          lean: true,
        });
  
        result.showLogin = false;
        result.first_name = first_name;
        result.last_name = last_name;
        result.role = role;
  
        result.prevLink = result.hasPrevPage ? `http://localhost:8080/api/views/products?page=${result.prevPage}` : '';
        result.nextLink = result.hasNextPage ? `http://localhost:8080/api/views/products?page=${result.nextPage}` : '';
        result.isValid = !(page <= 0 || page > result.totalPages);
        console.log(result);
  
        res.status(200).render('products', result);
    
      
    } catch (error) {
        console.error(error)
        return res.status(500).send(error)
    }
}
    login = async (req, res) => {
        try {
            const renderLoginView = {
                title: "Iniciar sesion",
                script: "login.js"
            }
            res.status(200).render('login', renderLoginView)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
}
    register = async (req, res) => {
        try {
            const renderRegisterView = {
                title: "Register",
                script: "register.js"
            }
            res.status(200).render("register", renderRegisterView)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
}
    profile = async (req, res) =>{
        try {
            const { first_name, last_name, role } = req.user || {};
            const renderProfileObj = {
                Title: 'Profile',
                script: 'sessions.js',
            }
            renderProfileObj.first_name = first_name;
            renderProfileObj.last_name = last_name;
            renderProfileObj.role = role;
    
            console.log(renderProfileObj)
            res.status(200).render('profile', renderProfileObj)

        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
}
    logout = async (req, res) => {
        try {
            const { first_name, last_name } = req.user || {}
            const renderProfileObj = {
            title: 'Perfil',
            script: 'sessions.js',
            first_name,
            last_name
            }
            res.status(200).render('logout', renderProfileObj)
        } catch (error) {
            res.status(500).sendServerError(error.message) 
        }
}
    userCart = async (req, res) =>{
        try {

            const { cidd } = req.params

            const cart = await cartModel.findById({_id:cidd})
            console.log(cart)
            const cartRender = {
                cart: cart,
            }
            res.status(200).render('carts', cartRender)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
}
}

module.exports = ViewsControllers


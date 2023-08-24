const { productService, cartService} = require('../services')

class ViewsControllers {
    products = async (req, res) => {
        try {
            const {page = 1} = req.query
            const { sort="asc" } = req.query
            console.log(req.query.page)
                
            let products = await productService.getProducts(page, sort)
            const{docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = products
            
            console.log(products)
              if(page > totalPages || page < 1) throw({status: "Error", message: "Page not found"})
    
              if(!products) throw({status: "Error", message: "Documents not found"})
          
              const user = req?.user?.user ?? null
              //console.log(user)

            res.status(200).render("products", {
                logged: user ? false : true,
                products: docs,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                totalPages,
                sort,
                page,
                role: user?.role ?? 'Invitado',
                addProducts: user?.role == 'ADMIN',
                first_name: user?.first_name,
                last_name: user?.last_name,
                cartId: user?.cartId,
                })      
                
    } catch (error) {
        console.error(error)
        return res.status(500).send(error)
    }
}
    login = async (req, res) => {
        try {
            const loginView = {
                title: "Iniciar sesion",
                script: "login.js"
            }
            res.status(200).render('login', loginView)
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
            const { first_name, last_name, role } = req.user.user || {};
            console.log(req.user)
            const renderProfileObj = {
                Title: 'Profile',
                script: 'sessions.js',
                first_name: first_name
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
            const { first_name, last_name } = req.user.user || {}
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

            let { cidd } = req.params
            const cart = await cartService.getById(cidd)
            if (!cart) {
                return res.status(404).send({ message: `Cart with ID ${cidd} not found` });
              }
          
            //console.log(cart)
            const cartRender = {
                title: "Cart",
                id: cart._id,
                products : cart.products
            }
            res.status(200).render('carts', cartRender)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
}
}

module.exports = ViewsControllers


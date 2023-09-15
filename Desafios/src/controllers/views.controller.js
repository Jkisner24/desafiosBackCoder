const { productService, cartService, userService} = require('../services')

class ViewsControllers {
    products = async (req, res) => {
        try {
            const {page = 1} = req.query
            const { sort="asc" } = req.query
            //console.log(req.query.page)
                
            let products = await productService.getProducts(page, sort)
            const{docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = products
            
            console.log(products)
            if(page > totalPages || page < 1) throw({status: "Error", message: "Page not found"})
    
            if(!products) throw({status: "Error", message: "Documents not found"})
          
            const user = req?.user?.user ?? null
            console.log(user)

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
        res.status(500).sendServerError(error.message)
    }
}
    productsById = async(req, res) =>{
        try {
            const {pid} = req.params
            const product = await productService.getById(pid)
            const user = req?.user?.user ?? null
            console.log(user)
            const productView = {
                logged: user ? false : true,
                product,
                role: user?.role ?? 'Invitado',
                addProducts: user?.role == 'ADMIN',
                first_name: user?.first_name,
                last_name: user?.last_name,
                cartId: user?.cartId,
                script: "viewProduct.js"
            }
            res.status(200).render('productViews', productView)
        } catch (error) {
            res.status(500).sendServerError(error.message)

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
                script: "register.js",
            }
            res.status(200).render("register", renderRegisterView)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }
    restorePassword = async (req, res) =>{
        try {
            const restorePasswordView = {
                Title: 'Restore',
                script: 'restore.js',
            }    
            console.log(restorePasswordView)
            res.status(200).render('restore', restorePasswordView)

        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
}
    newPassword = async (req, res) =>{
            //console.log(req)
        try {
            const linkRestoreView = {
                Title: 'Link restore',
                script: 'linkRestore.js',
            }
            console.log(linkRestoreView)
            res.status(200).render('newPassword', linkRestoreView)
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
            const { products } = await cartService.getById(cidd)
            //console.log(products)
            const { first_name, last_name, role, cartId, email} = req.user.user || {};
            //console.log({first_name, last_name, role, cartId, email})
            const total = products.map(item => item.product.price * item.quantity).reduce((acc, curr) => acc + curr, 0)
            //console.log(total)

            const cartRender = {
                emptyCart: products.length < 1 ? true : false,
                products,
                total: total,
                cartId,
                title: "Cart",
            }
            cartRender.first_name = first_name
            cartRender.last_name = last_name
            cartRender.role = role
            cartRender.cartId = cartId
            cartRender.email = email
            
            res.status(200).render('carts', cartRender)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
}
    chat = async(req, res) =>{
        try {
            const chatView = {
                title: "Chat",
                script: "chat.js",
            }
            res.status(200).render('chat', chatView)
        } catch (error) {
            res.status(500).sendServerError(error.message)

        }
    }
}

module.exports = ViewsControllers


const fs = require('fs');

let productos = []

class ProductManager{
    constructor(path){
        this.products = productos
        this.path = path
    }
    appendProduct = async () =>{
       const toJson = JSON.stringify(this.products, null, 3);
       await fs.promises.writeFile(this.path, toJson)
    }

    async addProduct(newProduct){
        //validations
        if(!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.code || !newProduct.stock|| !newProduct.status|| !newProduct.category ) 
            throw new Error (`All fields are required`)

        let product = this.products.find(prod => prod.code === newProduct.code)
        if(product) 
            throw new Error (`The product with code ${product.code} has already been entered`)

        if(this.products.length === 0){
            newProduct.id = 1
            this.products.push(newProduct)
            return "Prod ok"
        }else{
            this.products = [...this.products, {...newProduct, id: this.products[this.products.length - 1].id + 1 }]
            this.appendProduct()
            return "Prod oka"
        }
    }
    
    getProducts = async () => { 
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const parseData = JSON.parse(data)
            return parseData
        }
        catch(error){
            console.log(error)
        }

    } 
    getProductById = async (id) => {
        try{
            const getFileProducts = await fs.promises.readFile(this.path, 'utf-8');
            const readToObject = JSON.parse(getFileProducts)
            const product = readToObject.find(prod => prod.id === id)
            return product
        }catch(error){
            console.log(error);
        }
    }

    updateProduct = async (id, newObject) => {
        try{
            const getFileProducts = await fs.promises.readFile(this.path, 'utf-8');
            const readToObject = JSON.parse(getFileProducts)
            const product = readToObject.find(prod => prod.id === id)
            if(!product) return `Object not found`

            let saveId = id
            Object.assign(product, newObject)
            product.id = saveId

            const objectToString = JSON.stringify(readToObject, null, 3)
            await fs.promises.writeFile(this.path, objectToString, "utf-8")

            return `Change in product with ID: ${id}`

        }catch(error){
            console.log(error);
        }
    }
     deleteProduct = async (id) => {
        try {
            const fetchJson = await fs.promises.readFile(this.path, "utf-8")
            const jsonToObject = JSON.parse(fetchJson)
            const indexProduct = jsonToObject.findIndex((product) => product.id === id)
            if (indexProduct !== -1) {
                jsonToObject.splice(indexProduct, 1)
                let objectToJSON = JSON.stringify(jsonToObject, null, 3)
                await fs.promises.writeFile(this.path, objectToJSON)
                return `Delete product with ID ${id}`
            }
            return "Product not find"
        } catch (error) {
            console.log(error)
        }
    } 


}

module.exports = ProductManager;
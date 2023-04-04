/* const fs = require('fs');

let productos = []
class ProductManager{
    constructor(){
        this.products = productos
        this.path = 'products.json'
    }
    appendProduct = async () =>{
       const toJson = JSON.stringify(this.products, null, 3);
       await fs.promises.writeFile(this.path, toJson)
    }

    async addProduct(newProduct){
        //validations
        if(!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail || !newProduct.code || !newProduct.stock) 
            return `All fields are required`

        let product = this.products.find(prod => prod.code === newProduct.code)
        if(product) 
            return `The product with code ${product.code} has already been entered`

        if(this.products.length === 0){
            this.products.push({id: 1, ...newProduct})
            this.appendProduct()
            return "Prod ok"

        }
        if(this.products.length !== 0){
            this.products.push({ id: this.products[this.products.length - 1].id + 1, ...newProduct })
            this.appendProduct()
            return "Prod oka"
        }
    }
    
    getProducts = async () => { 
        try{
            const getFileProducts = await fs.promises.readFile(this.path, 'utf-8')
            return (getFileProducts)

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
            if(!product) return `Object not found`
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
// test update
let testProduct = {
    id: 9,
    title: "Product test",
    description: "This is a description",
    price: 656,
    thumbnail: "This is a link",
    code: 99,
    stock: 5
}

const product = new ProductManager()


console.log(product.addProduct({
    title: "Product 1",
    description: "This is a description",
    price: 123,
    thumbnail: "This is a link",
    code: 01,
    stock: 9
}))
console.log(await product.addProduct({
    title: "Product 2",
    description: "This is a description",
    price: 321,
    thumbnail: "This is a link",
    code: 02,
    stock: 10
}))

console.log(await product.addProduct({
    title: "Product 3",
    description: "This is a description",
    price: 589,
    thumbnail: "This is a link",
    code: 05,
    stock: 10
}))


//Test 
console.log(await product.getProducts()) 
console.log(await product.getProductById(1))
console.log(await product.updateProduct(1, testProduct))
console.log(await product.deleteProduct(1)) */
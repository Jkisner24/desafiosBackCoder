/* let productos = []
class ProductManager{
    constructor() {
        this.products = productos
    }
    addProduct(newProduct){
        //validations
        if(!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail || !newProduct.code || !newProduct.stock) return `All fields are required`
        let product = this.products.find(prod => prod.code === newProduct.code)
        if(product) return `The product with code ${product.code} has already been entered`

        if(this.products.length === 0){
            return this.products.push({id: 1, ...newProduct})
        }
        return[...this.products, {id: this.products[this.products.length-1].id + 1, ...newProduct}]
    }

    getProducts = () => this.products
    
    getProductById = (id) => {
        let product = this.products.find(prod => prod.id === id)
        if(!product) return `Object not found`
        return product
    }
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
console.log(product.addProduct({
    title: "Product 2",
    description: "This is a description",
    price: 321,
    thumbnail: "This is a link",
    code: 03,
    stock: 10
}))


console.log(product.getProducts())
console.log(product.getProductById(1))
 */
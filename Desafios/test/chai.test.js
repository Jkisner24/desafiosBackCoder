const mongoose = require("mongoose")
const ProductDao = require("../src/dao/mongo/product.mongo")
const chai = require("chai")
const expect = chai.expect

require("dotenv").config()

mongoose.connect(process.env.MONGO_URL)


describe("Testing ProductManagerMongo with chai", () => {
    let dao;

    before(async function () {
        dao = new ProductDao();
    })

    beforeEach(async function () {
        this.timeout(10000);
    })

    it("Should retrieve all products correctly", async function () {
        this.timeout(15000); 
        const result = await dao.get()
        expect(result).to.be.an("object")
        expect(result.docs).to.be.an("array")
        expect(result.totalDocs).to.be.a("number")
    })

    it("Should retrieve a product by ID", async function () {
        const pid = "64ee462c42233de2d1f156b7"
        const product = await dao.getById(pid)
        expect(product).to.be.an("object")
    })

    it("Should retrieve a product by code", async function () {
        const pCode = "abc" 
        const product = await dao.getProductByCode(pCode)
        expect(product).to.be.an("object")
    })

    it("Should create a new product", async function () {
        const newProduct = {
            title: "product from chai", 
            description: "description from chai",
            price: 120, 
            code: "abcchai", 
            stock: 100, 
            category: "category from chai",
            thumbnail: "https://res.cloudinary.com/practicaldev/image/fetch/s--MBjOQMia--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/y42w3fod3e7lda0sueg0.png"
          }
        const createdProduct = await dao.create(newProduct)
        expect(createdProduct).to.be.an("object")
    })

    it("Should update an existing product", async function () {
        const pid = "64fb682e1a1c17a5d168c3e6";
        const changes = {
            price: 200, 
        }
        const updatedProduct = await dao.update(pid, changes)
        expect(updatedProduct).to.be.an("object")
        
    })

    it("Should delete an existing product", async function () {
        const pid = "64fb682e1a1c17a5d168c3e6"; 
        const deletionResult = await dao.delete(pid);
        expect(deletionResult).to.be.an("object");
    })
})

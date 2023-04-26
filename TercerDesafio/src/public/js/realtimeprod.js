const socket = io() 


let form = document.querySelector('#formProduct')

form.addEventListener("submit", evt =>{
    evt.preventDefault()
    let title = form.elements.title.value
    let description = form.elements.description.value
    let price = form.elements.price.value
    let thumbnail = form.elements.thumbnail.value
    let code = form.elements.code.value
    let status = form.elements.status.value
    let category = form.elements.category.value

    if(title !== ''){
        socket.emit('addProduct', {
            title,
            description,
            price, 
            thumbnail,
            code,
            stock,
            status,
            category
        })
    }
    form.reset()

})

socket.on('productos', datosProd => {

    let productos=''
    let div = document.getElementById('listProducts')

    datosProd.forEach(product => {
        productos += `<li> title: ${product.title}</li>
                      <li> description: ${product.description}</li>
                      <li> price: ${product.price}</li>
                      <li> thumbnail: ${product.thumbnail}</li>
                      <li> code: ${product.code}</li>
                      <li> stock: ${product.stock}</li>
                      <li> status: ${product.status}</li>
                      <li> category: ${product.category}</li>`
                    });

    div.innerHTML = productos
})

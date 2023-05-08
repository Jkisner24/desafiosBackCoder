const socket = io() 

let form = document.querySelector('#formProduct')

form.addEventListener("submit", evt =>{
    evt.preventDefault()
    const [title, description, price, thumbnail, code, stock, status, category] = form

    socket.emit('addProduct', {
        'title': title.value,
        'description': description.value,
        'price': price.value,
        'thumbnail': thumbnail.value,
        'code': code.value,
        'stock': stock.value,
        'status': status.value === 'on' ? status.value = true : status.value = false,
        'category': category.value
    })    
    
    form.reset()
  
})

socket.on('productosDB', data => {
    console.log(data)
    let products = document.querySelector('#productLive')
    let renderProductos=''
    
    data.forEach(product => {
        renderProductos += `<li> title: ${product.title}</li>
                      <li> description: ${product.description}</li>
                      <li> price: ${product.price}</li>
                      <li> thumbnail: ${product.thumbnail}</li>
                      <li> code: ${product.code}</li>
                      <li> stock: ${product.stock}</li>
                      <li> status: ${product.status}</li>
                      <li> category: ${product.category}</li>`
                    });

    products.innerHTML = renderProductos
})


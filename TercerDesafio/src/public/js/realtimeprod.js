const socket = io() 

socket.on('productos', data => {

    let productos=''
    let div = document.getElementById('listProducts')

    data.forEach(product => {
        productos += `<li> title: ${product.title}</li>
                      <li> description: ${product.description}</li>
                      <li> price: ${product.price}</li>
                      <li> thumbnail: ${product.thumbnail}</li>
                      <li> code: ${product.code}</li>
                      <li> stock: ${product.stock}</li>
                      <li> category: ${product.category}</li>`
    });

    div.innerHTML = productos
})

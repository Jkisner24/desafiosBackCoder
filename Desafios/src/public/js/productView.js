const addProduct = document.querySelector('#addButton')
const cantidad = document.querySelector('#quantity')
const productID = document.querySelector('#productID')

addProduct.addEventListener('click', (e) => {
  e.preventDefault()
  const idCart = addProduct.value//el del carrito
  const quantity = cantidad.value//cantidad a agregar
  const idProduct = productID.innerText.split(" ")[1]//id del producto

  fetch(`/api/carts/${idCart}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify([{ product: idProduct, quantity }], null)
  })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err))
})
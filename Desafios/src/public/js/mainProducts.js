const addButtons = document.querySelectorAll('#addButton')
const cantidadInputs = document.querySelectorAll('#quantity')
const productIDElements = document.querySelectorAll('#productId')

addButtons.forEach((addButton, index) => {
  addButton.addEventListener('click', (e) => {
    e.preventDefault()

    const idCart = addButton.value
    const quantity = cantidadInputs[index].value;
    const idProduct = productIDElements[index].innerText.split(" ")[1]

    const url = `/api/views/carts/${idCart}/product/${idProduct}`

    const data = JSON.stringify({ quantity });

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
  })
})

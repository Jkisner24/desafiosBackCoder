const buyBtn = document.querySelector('#buy')

  buyBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const cartId = buyBtn.value
    console.log(cartId)
    fetch(`/api/views/carts/${cartId}/purchase`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Products were purchased successfully",
          confirmButtonText: "OK"
        }).then(result => {
          if (result.isConfirmed || result.isDismissed || result.isDenied) {
            window.location.reload()
          }
        })
      })
      .catch(err => {
        console.log(err)
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Something went wrong"
        })
      })
  })


const newPassForm = document.querySelector('#newPassword')
const passBtn = document.querySelector('#passwordButton')

passBtn.addEventListener('click', (e) => {
    e.preventDefault()

    const passwordInput = document.querySelector('#password')
    const password = passwordInput.value; 


        fetch(`https://desafiosbackcoder.onrender.com/api/views/session/new-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: password })
        })
            .then(res => res.json())
            .then(info =>{
                if (info.success) {
                Swal.fire({
                    title: 'Success',
                    text: 'Password changed successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                }})
            .catch(err => console.log(err))

        newPassForm.reset()
    })
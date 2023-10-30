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
            body: JSON.stringify({ password: password.value })
        })
            .then(res => res.json())
            .then(info => console.log(info))
            .catch(err => console.log(err))

        newPassForm.reset()
    })
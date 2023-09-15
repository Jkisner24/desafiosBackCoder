let registerForm = document.querySelector('#registerForm');
let regButton = document.querySelector('#registerbutton');

regButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const [first_name, last_name, email, date_of_birth, password] = registerForm;

    const newUser = {
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        date_of_birth: date_of_birth.value,
        password: password.value
    };
    console.log(newUser)

        fetch('/api/views/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
        .then(res => {
            if (res.status === 200) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User created succesfully',
                    showConfirmButton: false,
                    timer: 5000
                 })
                return res.json()                  
            }
            throw new Error("Cannot registered")
        })
        .then(_ => {
            return window.location.href = '/api/views/session/login'
        })
        .catch(err => alert(err.message))        
});







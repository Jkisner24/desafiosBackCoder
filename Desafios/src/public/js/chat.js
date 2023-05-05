const socket = io();

const input = document.getElementById('text');
const log = document.getElementById('messages');

let user;
let chatbox = document.getElementById("chatbox");

//Sweat alert for user
swal.fire({
    title: "Identificate",
    input: "text",
    text: "Enter Name",
    inputValidator: (value) => {
        return !value && "The name is required";
    },
    allowOutsideClick: false
}).then (result => {
    user = result.value;
    socket.emit("authenticated", user);
});

//send message with "enter"
chatbox.addEventListener('keyup', evt => {
    if(evt.key === "Enter"){
        if (chatbox.value.trim().length > 0) {
            socket.emit("message", {
                user, message: chatbox.value
            })
        }
        chatbox.value = "";
    }
});

//listen in client
socket.on("messageLogs", data => {
    let log = document.getElementById("messageLogs");
    let messages = "";
    data.forEach(({user, message}) => {
        messages += `<li>${user} says: ${message}</li>`
    });
    log.innerHTML = messages;
});

// listen new user connected from servidor
socket.on("newUserConnected", user => {
    if (!user) {
        return;
    };

    swal.fire({
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 4000,
        title: `${user} is connect`,
        icon: "success"
    });
});

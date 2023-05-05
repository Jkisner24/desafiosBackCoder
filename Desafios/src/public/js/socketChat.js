const {messageModel} = require('../../dao/mongo/model/message.model')

let messages = []

const socketChat = (io) =>{
    io.on('connection', socket=>{
        console.log("new client")
        console.log(socket.id)
    
        socket.on("message", async (data)=>{
        messages.push(data)
        io.emit('messageLogs', messages)

        const newMessage = {
            user: data.user,
            message: data.message
        };
        try {
            const result = await messageModel.create(newMessage);
            console.log(result)
        } catch (error) {
            console.log(error)
        }

    });

    socket.on("authenticated", data => {
        socket.broadcast.emit("newUserConnected", data);
    });

    });
};

module.exports = {
    socketChat
}
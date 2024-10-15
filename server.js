const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const port = 4000;
const routes = require('./routes/routes');
dotenv.config();
const app = express();
app.use(cors());

// Create HTTP server and socket.io
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*"
    }
});


let users = {};

io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);
  
    // Store user when they provide their username
    socket.on('register', (username) => {
        users[username] = socket.id; // Associate username with socket ID
        console.log(users);
    });
  
    
    socket.on('privateMessage', ({ toUser, message }) => {
        const recipientSocketId = users[toUser];
        if (recipientSocketId) {
            io.to(recipientSocketId).emit('privateMessage', {
                from: socket.id, 
                message: message
            });
            console.log(`Message from ${socket.id} to ${recipientSocketId}: ${message}`);
        } else {
            console.log('Recipient not connected');
        }
    });

    socket.on('sendAlert', (data) => {
        console.log('Alert received:', data);
       
        socket.broadcast.emit('sendAlert', { message: data.message, name: data.sender }); 
      });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        for (let username in users) {
            if (users[username] === socket.id) {
                delete users[username];
                break;
            }
        }
    });
});

app.use(express.json());
app.use('/api', routes);

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("DB connected");
}).catch((e) => {
    console.log("Error in DB connection:", e);
});

server.listen(port, () => {
    console.log(`Server listening to port ${port}`);
});

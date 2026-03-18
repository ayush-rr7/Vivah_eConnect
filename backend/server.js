import http from 'http'
import app from './src/app.js'
import initSocket from './src/sockets/socket.js';
import { Server } from "socket.io";
const server = http.createServer(app);


initSocket(server);

const PORT= 3002;
server.listen(PORT,() =>{
console.log(`server is running at http://localhost:${PORT}`);
})
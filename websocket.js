const socketIO = require("socket.io");
const server = require("http").createServer();
server.listen(8000);

module.exports = socketIO(server);

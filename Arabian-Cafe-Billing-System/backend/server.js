require("dotenv").config();

const http = require("http");

const app = require("./src/app");

const connectDatabase = require("./src/config/database");

const PORT = process.env.PORT || 5000;

// Connect MongoDB
connectDatabase();

// Create HTTP Server
const server = http.createServer(app);

// Start Server
server.listen(PORT, () => {
    console.log("==================================");
    console.log(`🚀 Server Running on Port ${PORT}`);
    console.log(`🌍 Environment : ${process.env.NODE_ENV}`);
    console.log("==================================");
});

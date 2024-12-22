


const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Adjust origin as needed
  },
});

connectDB();
app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);
app.use(express.static(path.resolve("./public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/videos", require("./routes/videoRoutes"));
app.use(express.static("./frontend/build")); 

// Serve static assets if in production

  // Serve index.html on all routes (except API routes)
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,  "frontend", "build", "index.html")); // Corrected path
  });


// Default route to send the index.html in development
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// Socket.I O Connection
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Share the io instance with controllers
app.set("io", io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

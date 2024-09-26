const WebSocket = require("ws");

// Create a new WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

// Handle new connections
wss.on("connection", (ws) => {
  console.log("New client connected");

  // Send a message to the client when the connection is established
  ws.send("Welcome to WebSocket server");

  // Handle messages received from the client
  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);

    // Respond to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Server received: ${message}`);
      }
    });
  });

  // Handle connection close
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is running on ws://localhost:8080");

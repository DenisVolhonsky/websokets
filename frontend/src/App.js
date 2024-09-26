import React, { useEffect, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Устанавливаем соединение с WebSocket сервером
    const socket = new WebSocket("ws://localhost:8080");
    setWs(socket);
    

    // Обрабатываем получение сообщений с сервера
    socket.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    // Закрытие WebSocket соединения
    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws && input) {
      // Отправляем сообщение на сервер
      ws.send(input);
      setInput("");
    }
  };t 

  console.log(messages)
  console.log(ws)

  return (
    <div style={{ padding: "20px" }}>
      <h1>WebSocket Client</h1>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
      <div>
        <h2>Messages:</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

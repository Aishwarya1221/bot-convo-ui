import React, { useState } from 'react';
import './chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "How can I help you?", sender: "bot" }
  ]);
  const [input, setInput] = useState('');

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    setMessages([...messages, newMessage]);
    setInput('');

    // Simulate bot reply
    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        { text: "I'm here to assist you!", sender: "bot" }
      ]);
    }, 500);
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button className="chatbot-toggle-button" onClick={toggleChatbot}>
          💬
        </button>
      )}

      {isOpen && (
        <div className="chatbot-popup">
          <div className="chatbot-header">
            <h3>Chatbot</h3>
            <button className="chatbot-close-button" onClick={toggleChatbot}>✖️</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chatbot-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

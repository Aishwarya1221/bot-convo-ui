import { useState } from "react";
import { Card, CardContent, CardHeader, Typography, TextField, Button, List, ListItem, ListItemText } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function AICopilot() {
  const [messages, setMessages] = useState([
    { sender: "AI", text: "Hello! How can I assist you with your incident?" },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "You", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Simulated AI response (Replace with real AI backend integration)
    setTimeout(() => {
      const aiResponse = { sender: "AI", text: "Processing your request..." };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);

    setInput("");
  };

  return (
    <Card style={{ width: "400px", height: "450px", display: "flex", flexDirection: "column" }}>
      <CardHeader title="AI Copilot" style={{ backgroundColor: "#b71c1c", color: "#FFD700", textAlign: "center" }} />
      
      {/* Chat History (Scrollable) */}
      <CardContent style={{ flex: 1, overflowY: "auto", maxHeight: "330px" }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index} style={{ textAlign: msg.sender === "You" ? "right" : "left" }}>
              <ListItemText primary={<strong>{msg.sender}</strong>} secondary={msg.text} />
            </ListItem>
          ))}
        </List>
      </CardContent>

      {/* Input Box & Send Button */}
      <div style={{ display: "flex", padding: "10px", borderTop: "1px solid #ddd", backgroundColor: "#fff" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ask AI about this incident..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button 
          variant="contained" 
          style={{ backgroundColor: "#b71c1c", color: "#fff", marginLeft: "10px" }} 
          onClick={handleSendMessage}
        >
          <SendIcon />
        </Button>
      </div>
    </Card>
  );
}

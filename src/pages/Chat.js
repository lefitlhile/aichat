import React, { useState, useEffect } from 'react';

function Chat() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  // Fetch chat history on component mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/chat/history', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setChatHistory(data);
      } else {
        alert('Error fetching chat history');
      }
    };

    fetchChatHistory();
  }, []);

  const sendMessage = async () => {
    const token = localStorage.getItem('token');
    
    // Send message to backend, which will forward the request to Gemini API
    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ user_message: message }),
    });

    if (response.ok) {
      const data = await response.json();
      setChatHistory([...chatHistory, { user_message: data.user_message, ai_response: data.ai_response }]);
      setMessage('');
    } else {
      alert('Error sending message');
    }
  };

  return (
    <div>
      <h2>AI Chat</h2>
      <div>
        {chatHistory.map((chat, index) => (
          <div key={index}>
            <div>User: {chat.user_message}</div>
            <div>AI: {chat.ai_response}</div>
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = ({ receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');  // Get token from localStorage

  useEffect(() => {
    if (!receiverId || !token) {
      console.error('Receiver ID or token is missing!');
      return;  // Don't fetch messages if receiverId or token is missing
    }

    // Fetch messages when the component is mounted
    axios
      .get(`/chat/conversations/${receiverId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => setMessages(response.data))
      .catch((error) => console.error('Error fetching messages:', error));
  }, [receiverId, token]);

  const sendMessage = async () => {
    if (message.trim()) {
      try {
        await axios.post(
          '/chat/send',
          { receiver: receiverId, message },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessages([...messages, { sender: 'You', message }]); // Optimistically add the message
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'You' ? 'message-sent' : 'message-received'}>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <div className="input-container">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;

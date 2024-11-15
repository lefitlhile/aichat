import React, { useState, useEffect } from 'react';
import './ChatContent.css';
import Sidebar from '../components/Sidebar'; // Assuming you have a Sidebar component
import { TiThumbsUp, TiThumbsDown } from 'react-icons/ti'; // Importing thumbs up and thumbs down icons
import loginIcon from '../components/img/headman.webp';

const Chat = () => {
  const [history, setHistory] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Simulate a chat history (replace this with your actual chat history logic)
  useEffect(() => {
    // Sample static history data (You can fetch this from your server)
    const initialHistory = [
      { type: 'user', text: 'How can I use this feature?' },
      { type: 'ai', text: 'You can use this feature by following these steps...' },
    ];
    setHistory(initialHistory);
  }, []);

  const handleSelectHistory = (index) => {
    setSelectedIndex(index);
    // You could navigate or perform other actions when an item is clicked
  };

  return (
    <div className="chat-page">
      {/* Sidebar stays fixed on the left */}
      <Sidebar />

      {/* Main content will be centered */}
      <div className="chat-container">
        <div className="chat-box"> {/* Container box around chat content */}
          <div className="chat-header">
            <h3>List out Some UX testing methods</h3>
            <span>Johnson Doe</span>
          </div>

          <div className="chat-body">
            {/* Conditional rendering based on chat history */}
            {history.length === 0 ? (
              <div className="no-history">
                <p className="no-questions">No Questions added</p>
                <p>Type your questions below and get fast answers</p>
              </div>
            ) : (
              history.map((entry, index) => (
                <div
                  key={index}
                  className={`chat-entry ${entry.type} ${selectedIndex === index ? 'selected' : ''}`}
                  onClick={() => handleSelectHistory(index)}
                >
                  <div className="chat-avatar">
                    {entry.type === 'user' ? (
                      <div className="user-avatar">User</div>  // Add user avatar here
                    ) : (
                      <div className="ai-avatar">AI</div>    // Add AI avatar here
                    )}
                  </div>
                  <p className={entry.type === 'user' ? 'user-question' : 'ai-response'}>
                    {entry.text}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="chat-footer">
            <button className="correct-button">
              <TiThumbsUp className="icon" />
              Correct answer
            </button>
            <button className="wrong-button">
              <TiThumbsDown className="icon" />
              Wrong answer
            </button>
          </div>
        </div>
      </div>

      {/* Johnson Doe with icon in top right corner */}
      <div className="user-info">
        <img src={loginIcon} alt="User Icon" className="user-icon" />
        <span className="user-name">Johnson Doe</span>
      </div>
    </div>
  );
};

export default Chat;

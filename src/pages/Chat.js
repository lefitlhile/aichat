import React, { useState, useEffect } from 'react';
import './ChatContent.css';
import Sidebar from '../components/Sidebar'; 
import { TiThumbsUp, TiThumbsDown } from 'react-icons/ti'; 

import { useLocation } from 'react-router-dom'; 

const Chat = () => {
  const [history, setHistory] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [searchText, setSearchText] = useState(''); // New state for search input
  const location = useLocation();
  const { response } = location.state || {}; 

  useEffect(() => {
    setHistory([]); 
  }, []);

  const handleSelectHistory = (index) => {
    setSelectedIndex(index);
  };

  const cleanMarkdown = (text) => {
    return text.replace(/[*_]+/g, '');
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value); // Update the search text
  };

  return (
    <div className="chat-page">
      <Sidebar />

      {/* Main content will be centered */}
      <div className="chat-container">
        <div className="chat-box">
          <div className="chat-header">
            <h3>Search History</h3> 
          </div>

          <div className="chat-body">
            {history.length === 0 && !response ? (
              <div className="no-history">
                <p className="no-questions">No Questions added</p>
                <p>Type your questions below and get fast answers</p>
              </div>
            ) : (
              <>
                {/* Displaying the passed AI response if available */}
                {response && (
                  <div className="chat-entry ai">
                    <div className="chat-avatar">
                      <div className="ai-avatar">AI</div>
                    </div>
                    <p className="ai-response">{cleanMarkdown(response)}</p> 
                  </div>
                )}

                {history.map((entry, index) => (
                  <div
                    key={index}
                    className={`chat-entry ${entry.type} ${selectedIndex === index ? 'selected' : ''}`}
                    onClick={() => handleSelectHistory(index)}
                  >
                    <div className="chat-avatar">
                      {entry.type === 'user' ? (
                        <div className="user-avatar">User</div>  
                      ) : (
                        <div className="ai-avatar">AI</div>    
                      )}
                    </div>
                    <p className={entry.type === 'user' ? 'user-question' : 'ai-response'}>
                      {cleanMarkdown(entry.text)} 
                    </p>
                  </div>
                ))}
              </>
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

      {/* New Search Input Section */}
      <div className="search-section">
        <h3>Chat suggestion</h3>
        <input
          type="text"
          className="search-input"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Type your question..."
        />
      </div>

      </div>

  );
};

export default Chat;

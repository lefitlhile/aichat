import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa';
import { GoArrowSwitch } from "react-icons/go";
import { TbCurrencyDollar } from "react-icons/tb";
import { IoChatbubbleOutline } from "react-icons/io5";
import { RiSettingsLine, RiGroupLine } from "react-icons/ri";
import { CiShare2 } from "react-icons/ci";
import logo from '../components/img/electric_bolt_42dp_EA33F7.png';
import chatboxImage from '../components/img/chat-box.png';
import userIcon from '../components/img/user.png';
import loginIcon from '../components/img/headman.webp';
import './Home.css';
import './Sidebar.css';
import './Chat.js';

function Home() {
  const [question, setQuestion] = useState('');
  const [history, setHistory] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = () => {
    if (question.trim()) {
      setHistory([...history, { type: 'user', text: question }]);
      setQuestion('');

      // Optionally, simulate AI response here
      setHistory((prevHistory) => [
        ...prevHistory,
        { type: 'ai', text: 'This is a simulated AI response.' }
      ]);
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const handleSelectHistory = (index) => {
    setSelectedIndex(index);
    navigate('/Chat'); // Navigate to the chat page on selecting history
  };

  return (
    <div className="home-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="Superpage Logo" className="logo-img" />
          <span className="logo-text">Superpage</span>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/"><IoChatbubbleOutline /> <span>AI Chat</span></Link></li>
          <li><Link to="/members"><RiGroupLine /> <span>Members</span></Link></li>
          <li><Link to="/integrations"><GoArrowSwitch /> <span>Integrations</span></Link></li>
          <li><Link to="/pricing-plans"><TbCurrencyDollar /> <span>Pricing Plans</span></Link></li>
          <li><Link to="/refer-friends"><CiShare2 /> <span>Refer Friends</span></Link></li>
          <li><Link to="/settings"><RiSettingsLine /> <span>Settings</span></Link></li>
        </ul>
        <div className="sidebar-footer">
          <p>© 2024 Superpage. All rights reserved.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="home-screen">
        <div className="input-container">
          <input
            type="text"
            placeholder="Type your question here and press Enter"
            value={question}
            onChange={handleChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
          />
          <span className="icon-container" onClick={handleSubmit}>
            <FaPaperPlane className="send-icon" />
          </span>
        </div>
        <h3 className="left-align">Get answers in seconds</h3>
        <p className="left-align">Create and complete tasks using boards</p>

        <div className="search-history-box">
          {history.length > 0 && (
            <button className="clear-button" onClick={clearHistory}>Clear Chats History</button>
          )}

          <h4 className="history-header">Search History</h4>

          {history.length === 0 && !question.trim() && (
            <div className="chatbox-image-container">
              <img src={chatboxImage} alt="Chatbox" className="chatbox-img" />
            </div>
          )}

          {history.length === 0 ? (
            <div className='home-screen'>
              <p className="no-questions">No Questions added</p>
              <p>Type your questions to below input and get fast answers</p>
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
                    <img src={userIcon} alt="User" className="user-avatar" />
                  ) : (
                    <div className="ai-avatar">AI</div>
                  )}
                </div>
                <p className={entry.type === 'user' ? 'user-question' : 'ai-response'}>
                  {entry.text}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Login Icon */}
      <div className="login-icon-container">
        <Link to="/Login">
          <img src={loginIcon} alt="Login" className="login-icon" />
        </Link>
      </div>
    </div>
  );
}

export default Home;

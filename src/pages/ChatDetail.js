import React from 'react';
import './ChatContent.css';

const ChatContent = () => {
  return (
    <div className="chat-content">
      <div className="chat-header">
        <h3>List out Some UX testing methods</h3>
        <span>Johnson Doe</span>
      </div>
      <div className="chat-body">
        <p>Here are some common UX testing methods for SaaS applications:</p>
        <ol>
          <li>Usability testing...</li>
          <li>A/B testing...</li>
          <li>Surveys...</li>
          <li>Session recordings...</li>
          <li>Heatmaps...</li>
          <li>Interviews...</li>
        </ol>
      </div>
      <div className="chat-footer">
        <button>Correct answer</button>
        <button>Wrong answer</button>
      </div>
    </div>
  );
};

export default ChatContent;


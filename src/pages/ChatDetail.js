import React from 'react';
import { useParams } from 'react-router-dom';

function ChatDetail() {
  const { id } = useParams(); // Get the chat ID from the URL
  return (
    <div>
      <h1>Chat Detail - {id}</h1>
      {/* You can use the `id` to fetch and display the specific chat from the history */}
      <p>Details of the chat will go here...</p>
    </div>
  );
}

export default ChatDetail;

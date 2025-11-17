import React from 'react';
import { Card } from 'react-bootstrap';
import AnalysisResult from './AnalysisResult';
import './ChatMessage.css';

function ChatMessage({ message }) {
  const isUser = message.type === 'user';

  return (
    <div className={`message-wrapper ${isUser ? 'user-message' : 'bot-message'}`}>
      <Card className={`message-card ${isUser ? 'bg-primary text-white' : ''}`}>
        <Card.Body className="p-3">
          {isUser ? (
            <p className="mb-0">{message.content}</p>
          ) : (
            <AnalysisResult data={message.content} />
          )}
        </Card.Body>
      </Card>
      <small className="text-muted timestamp">
        {message.timestamp.toLocaleTimeString()}
      </small>
    </div>
  );
}

export default ChatMessage;

import React, { useState, useRef, useEffect } from 'react';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import ChatMessage from './ChatMessage';
import API_BASE_URL from '../config';
import './ChatInterface.css';

const SAMPLE_QUERIES = [
  "Give me analysis of Wakad",
  "Compare Ambegaon Budruk and Aundh demand trends",
  "Show price growth for Akurdi over the last 3 years"
];

function ChatInterface({ fileId }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userMessage = {
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/analyze/`, {
        query: inputValue,
        file_id: fileId
      });

      const botMessage = {
        type: 'bot',
        content: response.data,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        type: 'bot',
        content: {
          summary: error.response?.data?.error || 'An error occurred. Please try again.',
          chart_data: [],
          table_data: []
        },
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSampleQuery = (query) => {
    setInputValue(query);
  };

  return (
    <Card className="chat-card shadow-lg">
      <Card.Body className="p-0">
        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="welcome-message text-center p-4">
              <h4>👋 Welcome!</h4>
              <p className="text-muted mb-3">Try asking about real estate data:</p>
              <div className="sample-queries">
                {SAMPLE_QUERIES.map((query, idx) => (
                  <Button
                    key={idx}
                    variant="outline-primary"
                    size="sm"
                    className="m-1"
                    onClick={() => handleSampleQuery(query)}
                  >
                    {query}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {messages.map((message, idx) => (
            <ChatMessage key={idx} message={message} />
          ))}
          
          {loading && (
            <div className="text-center p-3">
              <Spinner animation="border" variant="primary" size="sm" />
              <span className="ms-2">Analyzing...</span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-container p-3 border-top">
          <Form onSubmit={handleSubmit}>
            <div className="d-flex gap-2">
              <Form.Control
                type="text"
                placeholder="Ask about real estate data..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={loading}
              />
              <Button type="submit" disabled={loading || !inputValue.trim()}>
                Send
              </Button>
            </div>
          </Form>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ChatInterface;

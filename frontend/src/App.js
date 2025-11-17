import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ChatInterface from './components/ChatInterface';
import FileUpload from './components/FileUpload';
import './App.css';

function App() {
  const [fileId, setFileId] = useState(null);

  return (
    <div className="App">
      <Container fluid className="py-4">
        <Row className="justify-content-center">
          <Col lg={10} xl={8}>
            <div className="app-header text-center mb-4">
              <h1 className="text-white mb-2">🏠 Real Estate Analysis Chatbot</h1>
              <p className="text-white-50">Ask questions about real estate data and get instant insights</p>
            </div>
            
            <FileUpload onFileUploaded={setFileId} />
            
            <ChatInterface fileId={fileId} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

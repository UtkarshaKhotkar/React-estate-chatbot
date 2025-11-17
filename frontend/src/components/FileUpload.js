import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import './FileUpload.css';

function FileUpload({ onFileUploaded }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setMessage(null);

    try {
      const response = await axios.post('/api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage({ type: 'success', text: 'File uploaded successfully!' });
      onFileUploaded(response.data.id);
      setFile(null);
    } catch (error) {
      setMessage({ 
        type: 'danger', 
        text: error.response?.data?.error || 'Upload failed. Please try again.' 
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="file-upload-card mb-3 shadow">
      <Card.Body>
        <h6 className="mb-3">📁 Upload Excel File (Optional)</h6>
        <Form onSubmit={handleUpload}>
          <div className="d-flex gap-2 align-items-center">
            <Form.Control
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              disabled={uploading}
              size="sm"
            />
            <Button 
              type="submit" 
              disabled={!file || uploading}
              size="sm"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </Form>
        {message && (
          <Alert variant={message.type} className="mt-2 mb-0 py-2">
            {message.text}
          </Alert>
        )}
        <small className="text-muted d-block mt-2">
          Upload your own data or use the default sample dataset
        </small>
      </Card.Body>
    </Card>
  );
}

export default FileUpload;

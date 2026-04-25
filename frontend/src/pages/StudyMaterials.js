import React, { useState } from 'react';

  return (
    <div className="study-materials-container">
      <style>{`
        .study-materials-container {
          padding: 2rem;
          font-family: 'Inter', Arial, sans-serif;
          color: #333;
          max-width: 1200px;
          margin: 0 auto;
        }

        .header-section {
          margin-bottom: 2rem;
          text-align: center;
        }

        .header-section h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .header-section p {
          color: #6c757d;
          font-size: 1rem;
        }

        .card {
          background-color: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .upload-section input[type="file"] {
          display: none;
        }

        .upload-label {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          border: 2px dashed #007bff;
          color: #007bff;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }

        .upload-label:hover {
          background-color: #e9f0ff;
        }

        .upload-button-action {
          background-color: #007bff;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }

        .upload-button-action:hover:not(:disabled) {
          background-color: #0056b3;
        }

        .upload-button-action:disabled {
          background-color: #c0c0c0;
          cursor: not-allowed;
        }

        .error-message {
          color: #dc3545;
          margin-top: 1rem;
        }

        .materials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .material-card {
          background-color: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.2s;
        }

        .material-card:hover {
          transform: translateY(-3px);
        }

        .card-header h4 {
          margin: 0;
          font-size: 1.1rem;
        }

        .card-header p {
          margin: 0.25rem 0 0;
          font-size: 0.85rem;
          color: #6c757d;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .action-button {
          flex: 1;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-button.tts {
          background-color: #007bff;
          color: white;
        }

        .action-button.tts:hover {
          background-color: #0056b3;
        }

        .action-button.stop {
          background-color: #dc3545;
          color: white;
        }

        .action-button.stop:hover {
          background-color: #a71d2a;
        }

        .action-button.view {
          background-color: #6c757d;
          color: white;
        }

        .action-button.view:hover {
          background-color: #495057;
        }

        .action-button.download {
          background-color: #28a745;
          color: white;
        }

        .action-button.download:hover {
          background-color: #1e7e34;
        }
      `}</style>

      <div className="header-section">
        <h1>Study Materials</h1>
        <p>Access your course materials with text-to-speech and other accessibility features.</p>
      </div>

      <div className="card upload-section">
        <h2>Upload New Material</h2>
        <p>Teachers and students can upload materials for automatic accessibility enhancement.</p>
        <label className="upload-label" htmlFor="file-upload">
          {selectedFile ? selectedFile.name : "Choose a file"}
        </label>
        <input
          type="file"
          id="file-upload"
          onChange={handleFileChange}
          accept=".pdf,.docx,.csv"
        />
        <button
          onClick={handleProcessFile}
          disabled={isLoading}
          className="upload-button-action"
        >
          {isLoading ? 'Processing...' : 'Process File'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="materials-grid">
        {materials.length === 0 ? (
          <p>No materials uploaded yet.</p>
        ) : (
          materials.map((material, index) => (
            <div key={index} className="material-card">
              <div className="card-header">
                <h4>{material.filename}</h4>
                <p>{material.text.slice(0, 50)}{material.text.length > 50 ? '...' : ''}</p>
              </div>
              <div className="card-actions">
                <button className="action-button tts" onClick={() => handleTextToSpeech(material.text)}>
                  Text-to-Speech
                </button>
                <button className="action-button stop" onClick={handleStopSpeech}>
                  Stop
                </button>
                <a
                  href={`http://127.0.0.1:5000${material.download_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-button view"
                >
                  View
                </a>
                <a
                  href={`http://127.0.0.1:5000${material.download_url}`}
                  download={material.filename}
                  className="action-button download"
                >
                  Download
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StudyMaterials;

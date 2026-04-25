import React, { useState, useEffect, useRef } from 'react';
import { Mic, StopCircle } from 'lucide-react';



  return (
    <div className="live-communication-container">
      <h1>Live Audio Transcription</h1>
      <p className="page-subtitle">Choose a language and start speaking.</p>

      {/* Language Selector */}
      <div className="lang-selector">
        <label htmlFor="lang">Language: </label>
        <select
          id="lang"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en-US">English</option>
          <option value="ta-IN">Tamil</option>
        </select>
      </div>

      <div className="transcript-panel">
        {transcript.map((line, idx) => (
          <p key={idx} className="transcript-line">{line}</p>
        ))}
        {currentLine && <p className="transcript-line current">{currentLine}</p>}
      </div>

      <button
        className={`mic-btn ${isListening ? 'listening' : ''}`}
        onClick={handleToggleListening}
      >
        {isListening ? <StopCircle size={24} /> : <Mic size={24} />}
        <span>{isListening ? 'Stop' : 'Start'} Listening</span>
      </button>

      {/* Internal CSS */}
      <style jsx>{`
        .live-communication-container {
          padding: 2rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f9fafb;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .page-subtitle {
          color: #6b7280;
          margin-bottom: 1rem;
        }

        .lang-selector {
          margin-bottom: 1rem;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .lang-selector select {
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          border: 1px solid #d1d5db;
        }

        .transcript-panel {
          background-color: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 600px;
          height: 400px;
          overflow-y: auto;
          margin-bottom: 2rem;
        }

        .transcript-line {
          margin: 0.25rem 0;
          font-size: 1rem;
          color: #4b5563;
        }

        .transcript-line.current {
          color: #1d4ed8;
          font-style: italic;
        }

        .mic-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          border: none;
          border-radius: 8px;
          background-color: #3b82f6;
          color: white;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .mic-btn:hover {
          background-color: #2563eb;
        }

        .mic-btn.listening {
          background-color: #d9534f;
        }
      `}</style>
    </div>
  );


export default LiveCommunication;

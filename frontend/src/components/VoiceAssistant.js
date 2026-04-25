import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic } from 'lucide-react';


  return (
    <>
      <button
        className={`voice-assistant-btn ${isListening ? 'listening' : ''}`}
        onClick={handleToggleListening}
        aria-label="Activate voice assistant"
      >
        <Mic size={24} />
      </button>

      <style jsx>{`
        .voice-assistant-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: #0d6efd;
          color: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          z-index: 1000;
          transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
        }

        .voice-assistant-btn:hover {
          transform: scale(1.1);
        }

        .voice-assistant-btn.listening {
          background-color: #d9534f; /* Red to indicate recording */
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.7);
          }
          70% {
            box-shadow: 0 0 0 20px rgba(13, 110, 253, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(13, 110, 253, 0);
          }
        }
      `}</style>
    </>
  );
};

export default VoiceAssistant;

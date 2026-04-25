import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



  return (
    <div>
      <style>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f2f5;
          font-family: Arial, sans-serif;
        }

        .login-form {
          background-color: #ffffff;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        .login-form h2 {
          color: #1c1e21;
          margin-bottom: 10px;
        }

        .login-form p {
          color: #606770;
          margin-bottom: 20px;
        }

        .input-group {
          margin-bottom: 15px;
          text-align: left;
        }

        .input-group label {
          display: block;
          margin-bottom: 5px;
          color: #606770;
          font-weight: bold;
        }

        .input-group input {
          width: 100%;
          padding: 12px;
          border: 1px solid #dddfe2;
          border-radius: 6px;
          font-size: 16px;
        }

        button {
          width: 100%;
          padding: 12px;
          background-color: #1877f2;
          border: none;
          border-radius: 6px;
          color: #ffffff;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 10px;
        }

        button:hover {
          background-color: #166fe5;
        }

        .error-message {
          color: #fa383e;
          margin-top: 15px;
          font-weight: bold;
        }
      `}</style>

      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>ACCESSI-CAMPUS</h2>
          <p>Welcome! Please log in.</p>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );


export default Login;

import React from 'react'
import { useState, useEffect } from 'react';
import './api-key-input-box.css';

const APIKeyInputBox = ({setKey, setAllow}) => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    setAllow(false)
  }, [apiKey])

  const handleApiKeySubmit = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setAllow(true);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="iconContainer">
          <div className="icon">
            {/* Aquí puedes agregar un ícono SVG */}
          </div>
        </div>
        <h2 className="title">
          SeriesChat con Gemini
        </h2>
        <p className="subtitle">
          Ingresa tu API Key de Google Gemini para comenzar <br /> (El modelo que se utiliza es gemini-3.1-flash-lite)
        </p>
        <form onSubmit={handleApiKeySubmit} className="form">
          <div className="inputGroup">
            <label className="label">
              API Key de Gemini
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                setKey(e.target.value);
              }}
              placeholder="AIza..."
              className="input"
              required
            />
          </div>
          <button
            type="submit"
            className="submitButton"
          >
            Comenzar a preguntar
          </button>
        </form>
        <p className="footer">
          Para utilizar la app del lab consigue la API Key en {' '}
          <a
            href="https://ai.google.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Google AI Studio
          </a>
        </p>
      </div>
    </div>
  )
};

export default APIKeyInputBox;
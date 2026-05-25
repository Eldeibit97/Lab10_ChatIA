import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { apiIAQuestionsFetch } from '../api/apiIAQuestionsFetch'
import './responsebox.css';
import './requestbox.css';

const QuestionsBox = ({ series, apiKey, index }) => {
  const [questions, setQuestions] = useState([{ content: {} }]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const questionsEndRef = useRef(null);

  const scroll = () => {
    questionsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scroll();
  }, [questions]);

  const handleResponses = async (e) => {
    e.preventDefault();
    if (!question.trim() || loading) return;
    setLoading(true);
    try {
      const response = await apiIAQuestionsFetch(series, question, apiKey);
      setQuestions((prev) => [...prev, response]);
      setLoading(false);
    } catch (error) {
      setQuestions((prev) => [...prev, error.content])
      setLoading(false)
    }
    setQuestion('');
  }

  const renderQuestionResponses = (question, index) => {
    if (Object.keys(question.content).length === 0) {
      return;
    }
    if (typeof question.content === 'string') {
      return (
        <div key={index} className="responseContainer">
          <div className="textResponse">
            {question.content}
          </div>
        </div>
      );
    }

    if (question.content.error) {
      return (
        <div key={index} className="responseContainer">
          <div className="errorResponse">
            {question.content.error}
          </div>
        </div>
      );
    }
    const response = question.content;
    return (
      <div key={index}>
        <div className='answerContainer'>
          <p className='question'>Pregunta: {response.preguntaUsuario}</p>
          <p className='answerText'>Respuesta: {response.respuesta}</p>
        </div>
      </div>
    );

  }

  return (
    <div key={index}>
      <h2 className='requestHeaderTitle' style={{ margin: ".5rem", fontSize: "28px", fontWeight: "bold" }} >Preguntas sobre: {series}</h2>
      <div>
        {questions.map((question, index) => renderQuestionResponses(question, index))}
      </div>
      <div>
        <h2 className='requestHeaderTitle' style={{marginTop: "1rem"}}>¿Que preguntas tienes sobre la serie?</h2>
        <form onSubmit={handleResponses} >
          <div ref={questionsEndRef} className='requestInputContainer' style={{ padding: ".5rem 1.5rem" }}>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Haz una pregunta... (Solo respondera a preguntas especificas de la serie)"
              className='requestInput'
              disabled={loading}
            />
            <button
              type="submit"
              className='requestSubmitButton'
              disabled={loading || !question.trim()}
            >
              Preguntar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default QuestionsBox
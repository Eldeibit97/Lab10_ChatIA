import React from 'react'
import RequestBox from './RequestBox'
import ResponseBox from './ResponseBox'
import APIKeyInputBox from './APIKeyInputBox'
import { useState, useEffect, useRef } from 'react'
import './paginachat.css'

const PaginaChat = () => {
  const [messages, setMessages] = useState([{}]);
  const [responses, setResponses] = useState([{content: {}}]);
  const [apiKey, setApiKey] = useState('');
  const [allowReqs, setAllowReqs] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [responses]);

  return (
    <div className="container">
      <div className="header">
        <h2 className="headerTitle">
          <strong>¡Hola y bienvenido!</strong> Soy una pequeña herramienta asesora de series que utiliza Gemini. 
          Pregúntame sobre cualquier serie de TV y te daré información detallada, incluyendo calificación, 
          reseña, temporadas y algunos actores del reparto principal. Además, si gustas, puedes hacerme 
          preguntas más directas sobre las series después de preguntarme.
        </h2>
      </div>
      
      {!allowReqs && (
        <APIKeyInputBox setKey={setApiKey} setAllow={setAllowReqs} />
      )}
      
      {allowReqs && (
        <>
          <div className="chatContainer">
            <div className="messagesContainer">
              {responses.map((response, idx) => (
                <ResponseBox response={response} key={idx} index={idx} apiKey={apiKey}/>
              ))}
              <div ref={messagesEndRef} className="scrollAnchor"></div>
            </div>
          </div>
          
          <RequestBox 
            setMessages={setMessages} 
            setResponses={setResponses} 
            apiKey={apiKey} 
            allowReqs={allowReqs} 
          />
        </>
      )}
    </div>
  )
}

export default PaginaChat
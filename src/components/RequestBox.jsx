import React from 'react'
import { useState } from 'react'
import { apiIAInfoFetch } from '../api/apiIAInfoFetch'
import './requestbox.css'

const RequestBox = ({setMessages, setResponses, apiKey, allowReqs}) => {
  const [request, setRequest] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if (!request.trim() || loading) return;

    const userMessage = { role: 'user', content: request };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    try{
      const seriesData = await apiIAInfoFetch(request, apiKey);
      setResponses((prev) => [...prev, seriesData]);
      setLoading(false);
    }catch(error){
      setResponses((prev) => [...prev, error.content])
      setLoading(false)
    }
    setRequest('');
  }

  return (
    <>
      <div className='requestContainer'>
        <h2 className='requestHeaderTitle'>Sobre cual serie te interesa saber?</h2>
        <form onSubmit={handleSubmit} className="requestForm">
          <div className="requestInputContainer">
            <input
              type="text"
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              placeholder="Pregunta sobre cualquier serie... (ej: Breaking Bad, Stranger Things)"
              className="requestInput"
              disabled={(loading || !allowReqs)}
            />
            <button
              type="submit"
              disabled={loading || !request.trim() || !allowReqs}
              className="requestSubmitButton"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default RequestBox
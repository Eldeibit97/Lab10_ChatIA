import React from 'react'
import QuestionsBox from './QuestionsBox';
import './responsebox.css'

const ResponseBox = ({ response, index, apiKey }) => {
  if(Object.keys(response.content).length === 0){
    return <div key={index}></div>;
  }

  if (typeof response.content === 'string') {
    return (
      <div key={index} className="responseContainer">
        <div className="textResponse">
          {response.content}
        </div>
      </div>
    );
  }

  if (response.content.error) {
    return (
      <div key={index} className="responseContainer">
        <div className="errorResponse">
          {response.content.error}
        </div>
      </div>
    );
  }

  const series = response.content;
  return (
    <div key={index} className="responseContainer">
      <div className="seriesCard">
        <div className="seriesLayout">
          <div className="leftColumn">
            <div className="seriesHeade">
              <h2 className="seriesTitle">
                {series.nombre}
              </h2>
            </div>
            <div className="detailsSection">
              <h3 className="detailsSectionTitle">
                Calificación y temporadas
              </h3>
              <div className="InfoContainer">
                <span className="ratingScore">
                  {series.puntaje}
                </span>
                <span> - </span>
                <span className="seasonsText">
                  {series.temporadas} {series.temporadas === 1 ? 'temporada' : 'temporadas'}
                </span>
              </div>
            </div>
            <div className="summarySection">
              <h3 className="summarySectionTitle">
                Resumen
              </h3>
              <p className="summaryText">
                {series.resena}
              </p>
            </div>
            
          </div>
          <div className="rightColumn">
            <div className="castHeader">
              <div className="castTitle">Reparto</div>
            </div>
            <div className="castGrid">
              {series.personajes.map((personaje, idx) => {
                const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(personaje.actor)}&size=200&background=3B82F6&color=fff&bold=true`;
                
                return (
                  <div key={idx} className="castCard">
                    <div className="castCardContent">
                      {/* Imagen del actor */}
                      <div className="actorImageContainer">
                        <img
                          src={personaje.urlImg || fallbackUrl}
                          alt={personaje.actor}
                          className="actorImage"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = fallbackUrl;
                          }}
                        />
                      </div>
                      
                      {/* Info del personaje */}
                      <div className="characterInfo">
                        <p className="characterName">
                          {personaje.nombre}
                        </p>
                        <p className="actorName">
                          {personaje.actor}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className='questionsContainer'>
        <QuestionsBox series={series.nombre} apiKey={apiKey} key={index} index={index} ></QuestionsBox>
      </div>
    </div>
  );
}

export default ResponseBox;
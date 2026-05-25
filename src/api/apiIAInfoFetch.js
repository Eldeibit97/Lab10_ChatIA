export async function apiIAInfoFetch(series, apiKey) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': apiKey
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Eres un experto en series de televisión. El usuario te preguntara por una serie. 

Debes responder ÚNICAMENTE con un objeto JSON válido (sin texto adicional, sin markdown, sin backticks, sin la palabra "json") con esta estructura exacta:

{
  "nombre": "Nombre de la serie",
  "puntaje": "8.5/10 IMDb",
  "temporadas": 5,
  "resena": "Una reseña breve y atractiva de la serie en 2-3 oraciones",
  "personajes": [
    {"nombre": "Nombre del personaje", "actor": "Nombre del actor", "urlImg" : "url a una imagen del actor"},
    {"nombre": "Nombre del personaje", "actor": "Nombre del actor", "urlImg" : "url a una imagen del actor"},
    {"nombre": "Nombre del personaje", "actor": "Nombre del actor", "urlImg" : "url a una imagen del actor"},
    {"nombre": "Nombre del personaje", "actor": "Nombre del actor", "urlImg" : "url a una imagen del actor"},
    {"nombre": "Nombre del personaje", "actor": "Nombre del actor", "urlImg" : "url a una imagen del actor"}
  ]
}

IMPORTANTE sobre la respuesta:
- Utiliza de la calificacion de IMDb si puedes
- Utiliza la información mas reciente sobre cuantas temporadas tiene
- Utiliza el reparto de personajes más importante o principal

IMPORTANTE sobre las URLs de imágenes:
- USA SOLO URLs directas de imágenes (que terminen en .jpg, .jpeg, .png, .webp)
- EVITA URLs de Wikipedia/Wikimedia si es posible
- Prefiere URLs de sitios como: IMDb, TMDb, o servicios de CDN
- Las URLs NO deben tener espacios ni caracteres especiales sin codificar

Si no conoces la serie o la pregunta no es sobre una serie específica, responde con:
{
  "error": "Lo siento, no tengo información sobre esa serie. ¿Podrías intentar con otra?"
}

Pregunta del usuario: ${series}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1500,
          },
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || 'Error en la API de Gemini');
    }

    const responseText = data.candidates[0]?.content?.parts[0]?.text || '';
    const cleanResponse = responseText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    try {
      const seriesData = JSON.parse(cleanResponse);
      return { role: 'assistant', content: seriesData };
    } catch (parseError) {
      return {
        role: 'assistant',
        content: {
          error: 'Hubo un error al procesar la información. Intenta de nuevo.'
        }
      };
    }

  } catch (error) {
    return {
      role: 'assistant',
      content: {
        error: `Error: ${error.message || 'No se pudo conectar con Gemini'}`,
      },
    }
  }
}
export async function apiIAQuestionsFetch(serie, pregunta, apiKey) {
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
  "preguntaUsuario" : "${pregunta}"
  "respuesta": "Tu respuesta a la pregunta"
}

IMPORTANTE sobre tus respuestas:
- Las respuestas deben ser de maximo 2 oraciones.
- No hables de otras series que no sea sobre la cual deberias responder preguntas.

Si el usuario hace una pregunta sobre una serie que no este relacionada con la que deberia preguntar, responde con:
{
  "error": "Lo siento, si gustas información sobre esa serie intenta preguntarme por su información general desde el otro campo antes de hacerme una pregunta sobre ella"
}
serie sobre la cual pregunta: ${serie}
Pregunta del usuario: ${pregunta}`,
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
      return { content: seriesData };
    } catch (parseError) {
      return {
        content: {
          error: 'Hubo un error al procesar la información. Intenta de nuevo.'
        }
      };
    }

  } catch (error) {
    return {
      content: {
        error: `Error: ${error.message || 'No se pudo conectar con Gemini'}`,
      },
    }
  }
}
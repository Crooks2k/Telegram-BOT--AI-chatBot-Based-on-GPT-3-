import axios from "axios"

export const validarAPIKey = async (APIKEY) => {
  try {
    const response = await axios.post("https://api.openai.com/v1/chat/completions",
      {
        "model": "gpt-3.5-turbo",
        "messages":
        [
          {
            "role": "user",
            "content": "Hola chat gpt, necesito que hagas una presentación super corta de que eres y a la ultimo digas (puedes usar el comando /promt <mensaje> para comenzar a hacer consultas)"
          }
        ]
      },
      {
        "headers": {
          "Authorization": `Bearer ${APIKEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const sendPromptToGPT = async (prompt) => {
  try {
    const response = await axios.post("https://api.openai.com/v1/chat/completions",
      {
        "model": "gpt-3.5-turbo",
        "messages":
        [
          {
            "role": "user",
            "content": prompt
          }
        ]
      },
      {
        "headers": {
          "Authorization": `Bearer ${APIKEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    if(response.status !== 200){
      return false
    } return response.data.choices[0].message.content

  } catch (error) {
    console.error(error);
    return false;
  }
}

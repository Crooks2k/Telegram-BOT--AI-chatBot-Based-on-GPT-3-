import axios from "axios"

export const validarAPIKey = async (APIKEY) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci/completions',
      {
        prompt: 'hola chat gpt'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${APIKEY}`,
        },
      }
    );
    return response.data.choices && response.data.choices[0] && response.data.choices[0].text ? true : false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

import dotenv from "dotenv"
import { Telegraf } from "telegraf"
import { validarAPIKey, sendPromptToGPT } from "../apis/apis.js";

dotenv.config()
const bot = new Telegraf(process.env.HTTP_ACCES_TG_TOKEN_BOT)

//initial commands
bot.start((ctx)=>{
  ctx.reply(`Bot iniciado correctamente.
Usa el comando /apikey para conectar tu apikey y comenzar a usar la integración de GPT-3 en telegram, si tienes alguna duda de como usarlo usa el comando /help`)
})
bot.help((ctx)=>{
  ctx.reply(`Bienvenido a | bot Crooks2k => IA-chatBot [Based on GPT-3]

Descripción: Este bot permite la integración de la IA CHAT-GPT-3 por medio de telegram.

Instrucciones de uso: Para usarlo debes conectar tu apikey la cual obtienes de la pagina de openAI:
https://platform.openai.com/account/api-keys

para ello debes seguir los pasos:
- crear una cuenta nueva en openAI (este paso es importante ya que la api de openai tiene un limite de consultas.)
- ir a personal > view API keys > Create new secrete key.
Una vez lista tu api key puedes usar el comando /apikey <YourApiKeyHere> | con este comando conectaras chatgpt con bot Crooks2k => IA-chatBot [Based on GPT-3]

Primeras consultas: Para comenzar a preguntar cosas a la IA puedes usar el comando /prompt <Your Message Here> | Luego de unos segundos el bot te respondera (puede tardar dependiendo del tipo de pregunta)`)
})
bot.settings((ctx)=>{
  ctx.reply("Bot iniciado correctamente, usa el comando /apikey <YourApiKeyHere> | para conectar tu apikey y comenzar a usar la integración de GPT-3")
})

//set userapikey
let APIKEY
bot.command('apikey', async (ctx) => {
  APIKEY = ctx.message.text.split(' ')[1];
  if(!APIKEY){
    ctx.reply("digita un apikey valido (recuerda que debe existir un espacio entre el comando /apikey y el valor de tu apikey")
    return;
  }
  const isValid = await validarAPIKey(APIKEY);
  if(isValid){
    // store the API key in the session
    ctx.reply(`[GPT-3.5]: ${isValid}`)
    return;
  }else{
    ctx.reply("digita un apikey valido")
  }
})

//send prompt
bot.command('prompt', async (ctx) => {
  const prompt = ctx.message.text.split(' ')[1];
  if(!prompt){
    ctx.reply("digita un prompt valido (recuerda que debe existir un espacio entre el comando /prompt y tu consulta")
    return;
  }
  if (!APIKEY) {
    ctx.reply("Por favor ingresa un API key primero usando el comando /apikey")
    return;
  }
  const response = await sendPromptToGPT(APIKEY, prompt);
  if(response){
    ctx.reply(`[GPT-3.5]: ${response}`)
  }else(
    ctx.reply("hubo un error al procesar tu respuesta, intenta mas tarde")
  )
})

export {bot}

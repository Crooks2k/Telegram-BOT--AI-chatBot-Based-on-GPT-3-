import dotenv from "dotenv"
import { Telegraf, session } from "telegraf"
import { validarAPIKey, sendPromptToGPT } from "../apis/apis.js";

dotenv.config()
const bot = new Telegraf(process.env.HTTP_ACCES_TG_TOKEN_BOT)
// Agregar middleware de sesión
bot.use(session());

bot.use((ctx, next) => {
  if (!ctx.session) {
    ctx.session = {};
  }
  return next();
});

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
bot.command('apikey', async (ctx) => {
  const APIKEY = ctx.message.text.split(' ')[1];
  if (!APIKEY) {
    ctx.reply("Digita un API key válido (recuerda que debe existir un espacio entre el comando /apikey y el valor de tu API key)")
    return;
  }
  const isValid = await validarAPIKey(APIKEY);
  if (isValid) {
    ctx.session.apiKey = APIKEY; // asignar el valor del API key al contexto de la sesión
    ctx.reply(`${isValid}`)
  } else {
    ctx.reply("Digita un API key válido")
  }
});

bot.command('prompt', async (ctx) => {
  const message = ctx.message.text.trim(); // Elimina espacios en blanco al principio y al final del mensaje
  const promptIndex = message.indexOf('/prompt ');
  if (promptIndex === -1) {
    ctx.reply("Digita un prompt válido (recuerda que debe existir un espacio entre el comando /prompt y tu consulta)")
    return;
  }
  const prompt = message.substring(promptIndex + 8).trim(); // +8 para eliminar los primeros 8 caracteres de "/prompt "
  const KEY = ctx.session.apiKey;
  if (!prompt) {
    ctx.reply("Digita un prompt válido (recuerda que debe existir un espacio entre el comando /prompt y tu consulta)")
    return;
  }
  if (!KEY) {
    ctx.reply("Por favor ingresa un API key primero usando el comando /apikey")
    return;
  }
  const response = await sendPromptToGPT(KEY, prompt);
  if (response) {
    ctx.reply(`Skynet {Ai-ChatBot]: ${response}`)
  } else {
    ctx.reply("Hubo un error al procesar tu respuesta, intenta más tarde")
  }
});

export {bot}

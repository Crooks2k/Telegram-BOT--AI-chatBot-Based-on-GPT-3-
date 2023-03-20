import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import {bot} from "./src/commands/commands.js"

dotenv.config();
const app = express();
app.use(express.json());

app.listen(process.env.PORT, ()=>{
  console.log("-------------------------------------------")
  console.log(`Server on port ${process.env.PORT}:`.green, `http://localhost:${process.env.PORT}/`.white)
  console.log("-------------------------------------------")
})

//inicializar el bot de tg
bot.launch()

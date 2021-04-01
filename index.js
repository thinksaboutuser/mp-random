const { Telegraf } = require("telegraf");
const express = require('express')
const expressApp = express()


const port = process.env.PORT || 3000
expressApp.get('/', (req, res) => {
  res.send('Hello World!')
})
expressApp.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

const API_TOKEN = '1534072513:AAEHyl-D1TGMHgbhxzeUUYjyiIC_rZKS_WE';

// Создать бота с полученным ключом
const bot = new Telegraf(API_TOKEN);

// Обработчик начала диалога с ботом
bot.start((ctx) =>
  ctx.reply(
    `Приветствую, ${
       ctx.from.first_name ? ctx.from.first_name : "хороший человек"
    }! Набери /random и увидишь, случайное видео.`
  )
);

// Обработчик команды /help
bot.help((ctx) => ctx.reply("Справка в процессе"));

// Обработчик команды /whoami
bot.command("whoami", (ctx) => {
  const { id, username, first_name, last_name } = ctx.from;
  return ctx.replyWithMarkdown(`Кто ты в телеграмме:
*id* : ${id}
*username* : ${username}
*Имя* : ${first_name}
*Фамилия* : ${last_name}
*chatId* : ${ctx.chat.id}`);
});


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


bot.command("test", (ctx) => {
  return ctx.reply("I am tesing here");
});


bot.command("random", (ctx) => {
  return ctx.reply("https://t.me/memasikpidorasik/" + getRandomInt(8000) );
});



// Обработчик простого текста
// bot.on("text", (ctx) => {
//   return ctx.reply(ctx.message.text);
// });

// Запуск бота
bot.launch();
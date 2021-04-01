const { Telegraf } = require("telegraf");

// Создать бота с полученным ключом
const bot = new Telegraf("1735318646:AAG-7bhOBccntiBfgscpPhf_Hxh0WSWD_ic");

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
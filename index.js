const { Telegraf } = require("telegraf");
const express = require('express')
const expressApp = express()





var firebase = require('firebase')

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY || '',
  authDomain: "mp-random.firebaseapp.com",
  projectId: "mp-random",
  storageBucket: "mp-random.appspot.com",
  messagingSenderId: "748550940684",
  appId: "1:748550940684:web:f32c6caa536e47cb5fa629",
  measurementId: "G-CL9B439HMT",
  databaseURL: "https://mp-random-default-rtdb.europe-west1.firebasedatabase.app/",
  storageBucket: "bucket.appspot.com"
};



firebase.initializeApp(firebaseConfig)

let database = firebase.database()




const port = process.env.PORT || 3000
expressApp.get('/', (req, res) => {
  res.send('Hello World!')
})
expressApp.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

const API_TOKEN = process.env.API_TOKEN || '';

console.log('API_TOKEN' + API_TOKEN);



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



  database.ref("users/"+ctx.from.username).set({
    username: ctx.from.username,
    first_name: ctx.from.first_name,
    last_name: ctx.from.last_name
  }, function(error) {
    if (error) {
      // The write failed...
      console.log("Failed with error: " + error)
    } else {
      // The write was successful...
      console.log("success")
    }
  })


  return ctx.reply("https://t.me/memasikpidorasik/" + getRandomInt(8000) );
});



// Обработчик простого текста
// bot.on("text", (ctx) => {
//   return ctx.reply(ctx.message.text);
// });

// Запуск бота
bot.launch();
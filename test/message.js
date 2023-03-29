// a basic usage

const Discord = require('discord.js');
const bot = new Discord.Client();

const { Client } = require('../index'); // Setting our client here
bot.cli = new Client(bot);

bot.on('ready', () => {
    bot.cli.setGame('I\'m online !');
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    if (msg.content === 'ping') {
        bot.cli.message.create({
            to: msg.channel.id,
            content: 'Pong!'
        });
    }
});

bot.login('token');

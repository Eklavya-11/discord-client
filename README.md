# discord-client
Custom client for discord.js

<h2>About</h2>

<p>
  <strong>Discord.CLIENT</strong> was created to simplify the wide use of <strong>Discord.js</strong> for beginners.
  
  The first version was created by <strong>Eklavya11</strong> at <strong>15/09/2019</strong>.
</p>

<h2>Installation</h2>

<p>
  <strong>Discord.js@11.x & above </strong> and <strong>Node.js@8.x & above</strong> is necessary to use <strong>Discord.CLIENT</strong>, to install:
  <ul>
   <li>Node.js (Linux):

```
sudo apt-get install nodejs
```

   </li>
   <li>Node.js (Windows):
  <p>You can download Node.js here: <a href="https://nodejs.org/en/download/">nodejs.org</a></p>
   </li>
    <li> Discord.js:
      
```
npm install --save discord.js
(And make sure to have the this repo downloaded)
```
   </li>
  </ul>
</p>

<h2>Example usage</h2>

```js
const Discord = require('discord.js');
const bot = new Discord.Client();

const { Client } = require('discord-client'); // or use src
bot.cli = new Client(bot);

bot.on('ready', () => {
    bot.cli.setGame('I\'m online !');
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    if (msg.content === 'info') {
        bot.cli.utils.findMember(msg, msg.author.id).then((res) => { // You can find a member with username instead of ID
            let embed = new Discord.RichEmbed()
            .setTitle(res.user.tag)
            .setThumbnail(res.user.displayAvatarURL)
            .addField('Name', res.user.username)
            .addField('Tag', res.user.discriminator)
            .addField('Bot', res.user.bot ? 'Yes' : 'No');
            bot.cli.message.create({
                to: msg.channel.id,
                attachEmbed: embed
            });
        });
    }
});

bot.login('token');
```

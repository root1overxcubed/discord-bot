// const { clientId, guildId, token, publicKey } = require('./config.json');
require('dotenv').config()
const APPLICATION_ID = process.env.APPLICATION_ID 
const TOKEN = process.env.TOKEN 
const PUBLIC_KEY = process.env.PUBLIC_KEY || 'not set'
const GUILD_ID = process.env.GUILD_ID 

// Discord.js bot
const {Intents, MessageEmbed} = require('discord.js');
const {CumBot} = require('./cumbot.js');
const {reply} = require('./commands.js');
const commands = require('./help');

const express = require('express');
const app = express();

const bot = new CumBot({
	intents: [Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_INVITES,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
				Intents.FLAGS.DIRECT_MESSAGES,
				Intents.FLAGS.DIRECT_MESSAGE_REACTIONS]
});
						
bot.on('ready', () => {
	console.log(`Logged in as ${bot.user.tag}.`);
    bot.user.setActivity('.cum', {type: 'LISTENING'});
});

bot.on('messageCreate', async message => {
	if (reply(message)) return;

	const channel_id = message.channel.id;
  
	if (message.content.startsWith('.cum')) {
		let args = message.content.split(' ');

		if (args[0] != '.cum') return;

		if (args.length == 1) {
			bot.cum(channel_id);
			return;
		}

		let command = args[1].toLowerCase();
		switch (command) {
			case 'count':
				bot.count(channel_id);
				break;
			case 'last':
				bot.last(channel_id);
				break;
			case 'next':
				bot.next(channel_id);
				break;

			case 'help':
				let embed =  new MessageEmbed()
					.setTitle('HELP MENU')
					.setColor('GREEN')
					.setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
					.setThumbnail(bot.user.displayAvatarURL());
				embed
					.setDescription(Object.keys(commands).map(command => `\`${command.padEnd(Object.keys(commands).reduce((a, b) => b.length > a.length ? b : a, '').length)}\` :: ${commands[command].description}`).join('\n'));
				message.channel.send({embeds: [embed]});
				break;
		}
	}
	
	bot.maybeRecord(message);
});

bot.login(TOKEN);

app.get('/', async (req,res) =>{
  return res.send('Follow documentation ')
})

app.listen(8999, () => {

})
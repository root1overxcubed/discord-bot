const replies = new Map();
replies.set('.modabuse','Because it\'s funny!');
replies.set('.cumabuse','Because it\'s cummy!');
replies.set('.whyareyoucumming',{files: [`./images/commands/whyareyoucumming.png` ]});
replies.set('.come','I\'m comming!');

async function replyWithInvite(message) {
	let invite = await message.channel.
		createInvite({
						maxAge: 10 * 60 * 1000,
						maxUses: 1
					},
					`Requested with command by ${message.author.tag}`
		).catch(console.log);

  message.reply(invite ? `${invite}` : 
                "There has been an error during the creation of the invite.");
}

function reply(message) {
	let command = message.content.toLowerCase();
	if (replies.has(command)) {
		message.channel.send(replies.get(command));
		return true;
	}
	else if (command == '.mindbreak' ||
				command == '.brainrot') {
		replyWithInvite(message);
		return true;
	}
	return false;
}

module.exports = {
    reply: reply
}
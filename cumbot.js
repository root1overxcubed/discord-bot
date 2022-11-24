const {Client, MessageAttachment, MessageOptions} = require('discord.js');
const pg = require('pg');
const fs = require('fs');
const path = require('path');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function query(query_text) {/*
	const client = await new pg.Client({
						connectionString: process.env.DATABASE_URL,
						ssl: {
							rejectUnauthorized: false
						}
					});
	client.connect();
	const result = await client.query(query_text);
	return result;*/
	return;
}

class CumBot extends Client{

	constructor(super_arg){
		super(super_arg);
	}

	async noCumMessage(channel) {
		channel.send(`No one's came in this channel :(.`);
	}

	getTextChannel(channel_id){
		return this.channels.cache.get(channel_id);
	}

	async getLastCumTime(channel_id){/*
		try {
			const result = await query(
				`SELECT last_cum_id 
				FROM cum 
				WHERE channel_id = ${channel_id}`);
			if (result.rows.length == 0) {
				noCumMessage(message.channel);
				return 0;
			}
			let message = this.getTextChannel(channel_id).messages.cache.get(
							result.rows.at(0).last_cum_id
						);
			return Math.trunc(message.createdAt.getTime()/1000);
		} catch (err) {
			console.error(err);
			return 0;
		}*/
		return;
	}

	async maybeRecord(message) {
		if (!message.content.toLowerCase().includes('cum')) {
			return;
		}
		try {/*
			const count = (message.content.toLowerCase().match(/cum/g) || []).length;
			const result = await query(`
				INSERT INTO cum(channel_id, channel_name, cum_count, last_cum_id)
				VALUES (${message.channel.id}, '${message.channel.name}', ${count}, ${message.id})
				ON CONFLICT (channel_id) DO UPDATE
					SET cum_count = (SELECT cum_count 
										FROM cum 
										WHERE channel_id=${message.channel.id})+${count},
						last_cum_id = ${message.id}
			`)*/
		} catch (err) {
			console.error(err);
		}
	}
  
	cum(channel_id) {
		let message = `I'm cumming!`;
		let image_folder = 'SR';
		let gatcha_pull = getRandomInt(100);
		if (gatcha_pull < 85) {
			image_folder = 'R';
		} 
		else if (gatcha_pull > 94) {
			message = 'いくいく！';
			image_folder = 'SSR';
		}
		let message_options = {content: message};
		if (image_folder != 'R') {
			let images = fs.readdirSync(`images/${image_folder}`);
			let image = images[getRandomInt(images.length)];
			let attachment = new MessageAttachment(`./images/${image_folder}/${image}`);
			message_options.files = [attachment]
		}
		this.getTextChannel(channel_id).send(message_options);
	}

	async count(channel_id) {
		try {
			/*const result = await query(
				`SELECT cum_count FROM cum WHERE channel_id = ${channel_id}`);
			if (result.rows.length == 0) {
				noCumMessage(this.getTextChannel(channel_id));
				return;
			}
			this.getTextChannel(channel_id).send(
				`Came ${result.rows.at(0).cum_count} times in this channel.`);*/
			this.getTextChannel(channel_id).send(`Waiting for Cyclic DB to exit preview, remind my creator if want this reimplmented.`);
		} catch (err) {
			console.error(err);
		}
	}

	async last(channel_id) {/*
		let time = await this.getLastCumTime(channel_id);
		if (time == 0) return;
		this.getTextChannel(channel_id).send(`Last came on <t:${time}>`);*/
		this.getTextChannel(channel_id).send(`Waiting for Cyclic DB to exit preview, remind my creator if want this reimplmented.`);
	}

	next(channel_id) {
		let minutes = getRandomInt(60);
		this.getTextChannel(channel_id).send(`Next cum in ${minutes} minutes.`);
	}
  
}

module.exports = {
    CumBot: CumBot
}
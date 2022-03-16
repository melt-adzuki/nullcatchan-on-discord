import { Message, Client } from 'discord.js'
import dotenv from 'dotenv'
import commands from './commands'

dotenv.config()

const client = new Client({
	intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'],
})

client.once('ready', () => {
	console.log('Ready!')
})

client.on('messageCreate', async (message: Message) => {
	if (message.author.bot) return

	const command = commands.find(command => message.content.startsWith(command.withPrefix))
	command?.execute(message)
})

client.login(process.env.TOKEN)

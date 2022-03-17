import { Message, Client } from 'discord.js'
import dotenv from 'dotenv'
import commands from './commands'

dotenv.config()

const PREFIX = 'n! '

const client = new Client({
	intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'],
})

client.once('ready', () => {
	console.log('Ready!')
})

client.on('messageCreate', async (message: Message) => {
	if (message.author.bot) return
	else if (!client.user) return
	else if (!(message.content.startsWith(PREFIX) || message.mentions.has(client.user.id))) return

	const context = message.content
		.replaceAll(PREFIX, '')
		.replaceAll(`<@!${client.user.id}>`, '')
		.trim()

	const command = commands.find(command => {
		if (Array.isArray(command.content)) return command.content.some(content => context === content)

		else if (command.content instanceof RegExp) {
			const match = command.content.exec(context)
			if (!match) return false

			command.match = match
			return true
		}
	})

	command?.execute(message, command.match)
})

client.login(process.env.TOKEN)

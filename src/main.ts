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

	const context = message.content.trim().replaceAll('n!', '')

	const command = commands.find(command => {
		if (typeof command.content === 'string') return context.startsWith(command.content)

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

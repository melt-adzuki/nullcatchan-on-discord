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

	const command = commands.find(command => {
		if (typeof command.content === 'string') return message.content.startsWith(command.content)

		else if (command.content instanceof RegExp) {
			const result = message.content.match(command.content)
			if (!result) return false

			command.regExp = result
			return true
		}
	})

	command?.execute(message, command.regExp)
})

client.login(process.env.TOKEN)

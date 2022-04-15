import { Message, Client } from 'discord.js'
import dotenv from 'dotenv'
import commands from './commands'
import Modules from './modules'
import Module from './utils/module'

dotenv.config()

const PREFIX = 'n! '

const client = new Client({
	intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'],
})

let modules: Module[] | null

client.once('ready', () => {
	console.log('Ready!')

	modules = Modules.map(Module => {
		const module = new Module(client)
		module.install()

		return module
	})

	Object.freeze(modules)
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
		if (Array.isArray(command.keyword)) return command.keyword.some(keyword => context === keyword)

		else if (command.keyword instanceof RegExp) {
			const match = context.match(command.keyword)
			if (!match) return false

			command.match = match
			return true
		}
	})

	command?.execute(message, command.match)
	modules?.forEach(module => module.mentionHook(message))
})

client.login(process.env.TOKEN)

import { Message } from 'discord.js'

export default class Command {
	public withPrefix: string
	public execute: (message: Message) => void

	constructor(command: string, func: (message: Message) => void) {
		this.withPrefix = 'n!' + command
		this.execute = func
	}
}

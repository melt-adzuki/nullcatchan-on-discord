import { Message } from 'discord.js'

export default class Command {
	public content: string | RegExp
	public execute: (message: Message, regExpResult?: RegExpMatchArray) => void
	public regExp?: RegExpMatchArray

	constructor(command: string | RegExp, func: (message: Message, regExpResult?: RegExpMatchArray) => void) {
		this.content = 'n!' + command
		this.execute = func
	}
}

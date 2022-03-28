import { Message } from 'discord.js'

export default class Command<T extends string[] | RegExp> {
	public content: string[] | RegExp
	public execute: (message: Message, match: T extends RegExp ? RegExpMatchArray : never) => void
	public match!: RegExpMatchArray

	constructor(command: T, func: (message: Message, match: T extends RegExp ? RegExpMatchArray : never) => void) {
		this.content = command
		this.execute = func
	}
}

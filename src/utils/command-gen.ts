import { Message } from 'discord.js'

export default class Command<T extends string[] | RegExp> {
	public keyword: string[] | RegExp
	public execute: T extends RegExp ? (message: Message, match: RegExpMatchArray) => void : (message: Message) => void
	public match!: RegExpMatchArray

	constructor(command: T, func: (T extends RegExp ? (message: Message, match: RegExpMatchArray) => void : (message: Message) => void)) {
		this.keyword = command
		this.execute = func
	}
}

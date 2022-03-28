import { Client, Message } from 'discord.js'

export default abstract class Module {
    protected client: Client

    constructor(client: Client) {
        this.client = client
    }

    public readonly abstract name: string

    public abstract install(): void

    public abstract mentionHook(message: Message): boolean

    protected log(message: string) {
        console.log(`[${this.name}]: ${message}`)
    }
}

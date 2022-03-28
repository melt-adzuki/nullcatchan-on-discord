import { Client, Message, TextChannel } from 'discord.js'
import Module from '../utils/module'
import fetch from 'node-fetch'
import { z } from 'zod'

export default class GitHubStatus extends Module {
    constructor(client: Client) {
        super(client)
    }

    name = 'GitHub Status'

    private readonly schema = z.object({
        status: z.object({
            description: z.string(),
            indicator: z.enum(["none", "minor", "major", "critical", "maintenance"]),
        }),
    })

    private readonly indicatorString: Record<z.infer<typeof this.schema>["status"]["indicator"], string> = {
        "none": "今はGitHubなんともないみたい！！",
        "minor": "GitHubにちょっとしたエラーが起きてるかも",
        "major": "GitHubにエラーが起きてるみたい",
        "critical": "GitHubに重大なエラーが起きてるみたい",
        "maintenance": "GitHubがメンテナンス中みたい",
    }

    private indicator: z.infer<typeof this.schema>["status"]["indicator"] = "none"
    private description: z.infer<typeof this.schema>["status"]["description"] = ""

    install() {
        setInterval(this.updateStatus, 10 * 60 * 1000)
        setInterval(this.postStatus, 60 * 60 * 1000)

        this.updateStatus()
        this.postStatus()
    }

    private async updateStatus() {
        try {
            const response = await fetch("https://www.githubstatus.com/api/v2/status.json")
            const data = await response.json()

            const result = this.schema.safeParse(data)

            if (result.success) {
                this.indicator = result.data.status.indicator
                this.description = result.data.status.description
            } else {
                this.log("Validation failed.")
                console.warn(result.error)
            }
        } catch (error) {
            this.log("Failed to fetch status from GitHub.")
            console.warn(error)
        }
    }

    private postStatus() {
        switch (this.indicator) {
            case "minor":
            case "major":
            case "critical": {
                const channel = this.client.channels.cache.get('953451211158323290')

                if (!channel) return
                if (!channel.isText) return

                const textChannel = channel as TextChannel
                textChannel.send(`${this.indicatorString[this.indicator]}\nせつめい: ${this.description}\nhttps://www.githubstatus.com/`)

                this.log("Report posted.")
                break
            }

            default:
                break
        }
    }

    mentionHook(message: Message) {
        if (message.content.toLowerCase().includes("github")) {
            message.channel.send(`${this.indicatorString[this.indicator]}\nせつめい: ${this.description}\nhttps://www.githubstatus.com`)
            return true
        } else {
            return false
        }
    }
}
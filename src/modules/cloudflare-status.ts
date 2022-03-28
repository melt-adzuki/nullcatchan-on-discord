import { Client, Message } from 'discord.js'
import Module from '../utils/module'
import fetch from 'node-fetch'
import { z } from 'zod'

export default class CloudflareStatus extends Module {
	constructor(client: Client) {
		super(client)
	}

	name = 'Cloudflare Status'

	private readonly schema = z.object({
		status: z.object({
			description: z.string(),
			indicator: z.enum(['none', 'minor', 'major', 'critical']),
		}),
	})

	private indicator: z.infer<typeof this.schema>['status']['indicator'] = 'none'
	private description: z.infer<typeof this.schema>['status']['description'] = ''

	install() {
		setInterval(this.updateStatus, 10 * 60 * 1000)
		this.updateStatus()
	}

	async updateStatus() {
		try {
			const response = await fetch('https://www.cloudflarestatus.com/api/v2/status.json')
			const data = await response.json()

			const result = this.schema.safeParse(data)

			if (result.success) {
				this.indicator = result.data.status.indicator
				this.description = result.data.status.description
			} else {
				this.log('Validation failed.')
				console.warn(result.error)
			}
		} catch (error) {
			this.log('Failed to fetch status from Cloudflare.')
			console.warn(error)
		}
	}

	mentionHook(msg: Message) {
		if (msg.content.toLowerCase().includes('cloudflare')) {
			msg.channel.send(`いまのCloudflareのステータスだよ！\n\nじょうきょう: ${this.indicator}\nせつめい: ${this.description}\nhttps://www.cloudflarestatus.com`)
			return true
		} else {
			return false
		}
	}
}

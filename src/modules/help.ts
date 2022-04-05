import { Client, Message} from 'discord.js'
import Module from '../utils/module'

export default class Help extends Module {
	constructor(client: Client) {
		super(client)
	}

	name = 'Help'

	install() {
		return
	}


	mentionHook(message: Message) {
		if (message.content.toLowerCase().includes('help')) {
			message.channel.send(
				'n! commands でぼくとお話しできるよ！\n' +
				'主なコマンドはこれだよ！\n\n' +

				'> `n! タイマー n(秒、分、時間)`  でタイマーがセットできるよ！\n' +
				'> `n! github`  でGitHubの状態がわかるよ！\n' +
				'> `n! cloudflare`  でCloudflareの状態がわかるよ！')
			return true
		} else {
			return false
		}
	}
}
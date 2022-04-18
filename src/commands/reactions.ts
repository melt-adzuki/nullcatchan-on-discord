import Command from '../utils/command-gen'
import { Message } from 'discord.js'

const reactionList: [string[] | RegExp, string][] = [
	[
		['ping'],
		'<:bibibi_nullcatchan:964103062102867980>'
	],
	[
		['help'],
		'n! index でぼくとお話しできるよ！\n' +
		'主なコマンドはこれだよ！\n' +
		'\n' +
		'> `n! タイマー n(秒、分、時間)`  でタイマーがセットできるよ！\n' +
		'> `n! github`  でGitHubの状態がわかるよ！\n' +
		'> `n! cloudflare`  でCloudflareの状態がわかるよ！'
	],
	[
		['うっせぇ', 'うっせえ', 'うるせぇ', 'うるせえ', 'うるさい'],
		'ごめんね...'
	],
	[
		/う[るっ][せさ][いえぇ][!！]*[死し]ね[!！]*/,
		'お前が死ね！！！'
	],
]

const reactions = reactionList.map(reaction => {
	return new Command(reaction[0], async (message: Message) => {
		await message.channel.send(reaction[1])
	})
})

export default reactions

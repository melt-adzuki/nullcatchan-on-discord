import Command from './utils/command-gen'

const commands: readonly Command<string[] | RegExp>[] = [

	new Command(['ping'], async message => {
		await message.channel.send('Pong!')
	}),

	new Command(/(\d*)分タイマー/gm, async (message, match) => {
		const minutes = Number(match[1])

		console.log('A timer set: waiting for %d minutes.', minutes)
		await message.channel.send(`わかった！${minutes}分後にお知らせするね！`)

		setTimeout(async () => {
			await message.channel.send('時間が経ったよ！！')
		}, 1000 * 60 * minutes)
	}),

	new Command(['うっせぇ', 'うっせえ', 'うるせぇ', 'うるせえ', 'うるさい'], async message => {
		await message.channel.send('ごめんね...')
	}),

	new Command(/う[る|っ][せ|さ][い|え|ぇ][!|！]*[死|し]ね[!|！]*/gm, async message => {
		await message.channel.send('お前が死ね！！！')
	}),

]

export default commands

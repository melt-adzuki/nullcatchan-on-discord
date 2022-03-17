import Command from './utils/command-gen'

const commands: readonly Command[] = [

	new Command('ping', async message => {
		await message.channel.send('Pong!')
	}),

	new Command(/(\d*)分タイマー/gm, async (message, regExp) => {
		await message.channel.send('OK!')

		const minutes = Number(regExp![0])

		setTimeout(() => {
			message.channel.send('時間が経ったよ！！')
		}, minutes)
	}),

]

export default commands

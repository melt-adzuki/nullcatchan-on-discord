import Command from '../utils/command-gen'

const timer = new Command(/(([\d.]+)(時間))?(([\d.]+)(分))?(([\d.]+)(秒))?タイマー/, async (message, match) => {
	const hours = 1000 * 60 * 60 * Number(match[2]) || 0
	const minutes = 1000 * 60 * Number(match[5]) || 0
	const seconds = 1000 * Number(match[8]) || 0

	const time = hours + minutes + seconds

	console.log('A timer set: waiting for %d milliseconds.', time)
	await message.channel.send('わかった！時間が経ったらお知らせするね！')

	setTimeout(async () => {
		console.log('Timer expired: %d milliseconds passed.', time)

		const author = message.author
		await message.channel.send(`${author} 時間が経ったよ！！`)
	}, time)
})

export default timer

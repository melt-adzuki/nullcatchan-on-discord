import Command from './utils/command-gen'

const commands: readonly Command[] = [

	new Command('ping', async message => {
		await message.channel.send('Pong!')
	}),
	
]

export default commands

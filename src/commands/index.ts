import Command from '../utils/command-gen'
import reactions from './reactions'
import timer from './timer'

const commands: readonly Command<string[] | RegExp>[] = [
	...reactions,
	timer,
]

export default commands

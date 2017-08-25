const spawn = require('child_process').spawn
const { ipcMain } = require('electron');

module.exports = {
	init() {
		ipcMain.on('docker-start', (event, arg) => {
			startDocker(event, arg)
		})
	},
}

let on = false  // TODO remove me

function startDocker(event, arg) {
	on = !on

	return run('sleep 1')
		.then(result => {
			const success = result.code === 0
			if (!success) {
				console.log(result.code, result)
			}
			event.sender.send('docker-start.done', { on, success })
		})
		.catch(error => {
			console.error(error);
			event.sender.send('docker-start.error', {
				message: error.message,
				stack: error.stack,
			})
		})
}

function run(command) {
	console.log('$', command);
	return new Promise((resolve, reject) => {
		const outputs = []

		const [entry, ...commandArgs] = command.split(' ')
		const cmd = spawn(entry, commandArgs)

		cmd.stdout.on('data', data => {
			outputs.push({
				text: data.toString(),
				type: 'stdout',
			})
		})

		cmd.stderr.on('data', data => {
			outputs.push({
				text: data.toString(),
				type: 'stderr',
			})
		})

		cmd.on('error', error => {
			reject(error)
		})

		cmd.on('close', code => {
			resolve({ code, outputs })
		})
	})
}

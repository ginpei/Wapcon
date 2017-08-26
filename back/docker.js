const spawn = require('child_process').spawn
const { ipcMain } = require('electron');

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
			event.sender.send('docker-start.error', error)
		})
}

function run(command, callback = function(){}) {
	console.log('$', command);
	return new Promise((resolve, reject) => {
		const outputs = []

		const [entry, ...commandArgs] = command.split(' ')
		const cmd = spawn(entry, commandArgs)

		cmd.stdout.on('data', data => {
			const output = {
				text: data.toString(),
				type: 'stdout',
			}
			outputs.push(output)
			callback(output)
		})

		cmd.stderr.on('data', data => {
			const text = data.toString()
			// console.log('ERR', text);
			const output = {
				text: text,
				type: 'stderr',
			}
			outputs.push(output)
			callback(output)
		})

		cmd.on('error', error => {
			// error object cannot be passed to the renderer thread
			reject({
				message: error.message,
				original: error,  // will be empty object `{}`
				stack: error.stack,
			})
		})

		cmd.on('close', code => {
			resolve({ code, outputs })
		})
	})
}

function startDb(event, arg) {
	const command = 'docker run --env-file ./.env --name wapcon_mysql mysql:5.7'
	const rxMessage = / \[Note\] mysqld: ready for connections\.\n/

	run(command, (output) => {
		if (output.type === 'stderr' && rxMessage.test(output.text)) {
			event.sender.send('db-start.done')
		}
	})
		.catch(error => {
			event.sender.send('db-start.error', error)
		})
}

function stopDb(event, arg) {
	run('docker stop wapcon_mysql')
		.then(_ => run('docker rm wapcon_mysql'))
		.then(result => event.sender.send('db-start.done', result))
		.catch(error => event.sender.send('db-start.error', error))
}

module.exports = {
	init() {
		ipcMain.on('docker-start', startDocker)
		ipcMain.on('db-start', startDb)
		ipcMain.on('db-stop', stopDb)
	},

	startDb,
	stopDb,
}

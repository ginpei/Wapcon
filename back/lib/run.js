const spawn = require('child_process').spawn

function noop(){}

/**
 * @param {string} command
 * @param {function} [callback] Callback for each output group.
 * @returns {Promise}
 */
module.exports = function command(command, callback = noop) {
	console.log('$', command)

	return new Promise((resolve, reject) => {
		const result = [
			{
				text: command,
				type: 'command',
			},
		]

		const [entry, ...commandArgs] = command.split(' ')
		const cmd = spawn(entry, commandArgs)

		cmd.stdout.on('data', data => {
			const output = {
				text: data.toString(),
				type: 'stdout',
			}
			result.push(output)
			callback(output)
		})

		cmd.stderr.on('data', data => {
			const text = data.toString()
			// console.log('ERR', text);
			const output = {
				text: text,
				type: 'stderr',
			}
			result.push(output)
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
			resolve({ code, result })
		})
	})
}

const spawn = require('child_process').spawn

const bridge = require('./lib/bridge.js')
const run = require('./lib/run.js')

function checkMachinStatus(event, arg) {
	return run('docker container ls --format {{.Names}} --filter name=wapcon-')
		.then(({ code, result }) => {
			const status = {}

			if (result.length > 0) {
				const firstOutput = result.find(v => v.type === 'stdout')
				if (firstOutput) {
					const lines = firstOutput.text.split('\n')
					status.db = lines.some(v => v === 'wapcon-db')
					status.php = lines.some(v => v === 'wapcon-php')
					status.www = lines.some(v => v === 'wapcon-www')
				}
			}

			status.running = Boolean(status.db && status.php && status.www)
			return status
		})
}

function startMachine(event, arg) {
	const results = {}
	return startDb()
		.then(result => {
			results.db = result
			return startPhp()
		})
		.then(result => {
			results.php = result
			return startWww()
		})
		.then(result => {
			results.www = result
			return results
		})
		.catch(error => {
			results.error = error
			return results
		})
}

function stopMachine(event, arg) {
	console.log('stopMachine')
	return Promise.all([
		stopDb(),
		stopPhp(),
		stopWww(),
	])
}

function startDb() {
	const command = [
		'docker run',
		'-d',
		'--rm',
		'--name wapcon-db',
		'--env-file ./machine-env',
		'ginpei/wapcon-db',
	].join(' ')
	return run(command)
}

function stopDb() {
	const command = 'docker stop wapcon-db'
	return run(command)
}

function startPhp() {
	const command = [
		'docker run',
		'-d',
		'--rm',
		'--name wapcon-php',
		'--link wapcon-db:db',
		'--env-file ./machine-env',
		'-p 9000:9000',
		'-v C:/Users/ginpei/projects/tmp:/var/www/html',
		'ginpei/wapcon-php',
	].join(' ')
	return run(command)
}

function stopPhp() {
	const command = 'docker stop wapcon-php'
	return run(command)
}

function startWww() {
	const command = [
		'docker run',
		'-d',
		'--rm',
		'--name wapcon-www',
		'--link wapcon-php:php',
		'-p 80:80',
		'-v C:/Users/ginpei/projects/tmp:/var/www/html',
		'ginpei/wapcon-www',
	].join(' ')
	return run(command)
}

function stopWww() {
	const command = 'docker stop wapcon-www'
	return run(command)
}

module.exports = {
	init() {
		bridge('checkMachinStatus', checkMachinStatus)
		bridge('startMachine', startMachine)
		bridge('stopMachine', stopMachine)
	},
}

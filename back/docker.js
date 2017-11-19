const fs = require('fs')
const path = require('path')
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
					status.wp = lines.some(v => v === 'wapcon-wp')
				}
			}

			status.running = Boolean(status.db && status.wp)
			return status
		})
}

function startMachine(event, preferences) {
	const arg = createArgFromPreferences(preferences)
	removeOldThemeDirectories(arg.wordpressPath)
	const results = {}
	return startDb(arg)
		.then(result => {
			results.db = result
			return startWordPress(arg)
		})
		.then(result => {
			results.wp = result
			return results
		})
		.catch(error => {
			results.error = error
			return results
		})
}

function createArgFromPreferences(preferences) {
	const arg = {
		databasePath: path.resolve(preferences.databasePath),
		wordpressPath: path.resolve(preferences.wordpressPath),
	}

	arg.themeVolumeOptions = preferences.themeList.reduce((array, theme, index) => {
		const hostPath = path.resolve(theme.path)  // TODO validate
		const containerPath = `/var/www/html/wp-content/themes/wapcon-${index}`  // TODO check what if change current theme's order
		array.push('-v')
		array.push(`${hostPath}:${containerPath}`)
		return array
	}, [])

	return arg
}

function removeOldThemeDirectories(wordpressPath) {
	const themeDirectory = `${wordpressPath}/wp-content/themes`
	fs.readdirSync(themeDirectory).forEach((fname) =>{
		if (fname.startsWith('wapcon-')) {
			fs.rmdirSync(`${themeDirectory}/${fname}`)
		}
	})
}

function stopMachine(event, arg) {
	console.log('stopMachine')
	return Promise.all([
		stopDb(),
		stopWordPress(),
	])
}

function startDb({ databasePath }) {
	// TODO wait until DB is actually ready
	const command = [
		'docker run',
		'-d',
		'--rm',
		'--name wapcon-db',
		'--env-file ./machine-env',
		`-v ${databasePath}:/var/lib/mysql`,
		'mysql',
	].join(' ')
	return run(command)
}

function stopDb() {
	const command = 'docker stop wapcon-db'
	return run(command)
}

function startWordPress({ wordpressPath, themeVolumeOptions }) {
	const command = [
		'docker',
		'run',
		'-d',
		'--rm',
		'--name', 'wapcon-wp',
		'--link', 'wapcon-db:db',
		'--env-file', './machine-env',
		'-p', '80:80',
		'-v', `${wordpressPath}:/var/www/html`,
		...themeVolumeOptions,
		'wordpress',
	]
	return run(command)
}

function stopWordPress() {
	const command = 'docker stop wapcon-wp'
	return run(command)
}

module.exports = {
	init() {
		bridge('checkMachinStatus', checkMachinStatus)
		bridge('startMachine', startMachine)
		bridge('stopMachine', stopMachine)
	},

	functions: {
		createArgFromPreferences,
		removeOldThemeDirectories,
	},
}

const path = require('path')

const bridge = require('./lib/bridge.js')
const commandRunner = require('./lib/commandRunner.js')

module.exports = {
	init() {
		bridge('openDirectory', (event, { dirPath }) => {
			// TODO support another environment
			return commandRunner.run(`explorer ${path.resolve(dirPath)}`)
		})
	},
}

const path = require('path')

const bridge = require('./lib/bridge.js')
const run = require('./lib/run.js')

module.exports = {
	init() {
		bridge('openDirectory', (event, { dirPath }) => {
			// TODO support another environment
			return run(`explorer ${path.resolve(dirPath)}`)
		})
	},
}

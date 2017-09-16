const bridge = require('./bridge.js')

module.exports = {
	showOpenDialog(options) {
		return bridge('showOpenDialog', options)
	},
}

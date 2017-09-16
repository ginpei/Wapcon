const dialog = require('electron').dialog

const bridge = require('./lib/bridge.js')

module.exports = {
	init() {
		bridge('showOpenDialog', (event, options) => {
			return new Promise((resolve, reject) => {
				const result = dialog.showOpenDialog(options)
				resolve(result)
			})
		})
	},
}

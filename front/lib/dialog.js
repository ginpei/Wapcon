const bridge = require('./bridge.js')

module.exports = {
	defaultAskOptions: {
		buttons: ['OK', 'Cancel'],
	},

	ask(message, originalOptions) {
		return new Promise((resolve, reject) => {
			const options = Object.assign({}, this.defaultAskOptions, originalOptions, { message })
			this.showMessageBox(options)
				.then(buttonIndex => {
					resolve(buttonIndex === 0)
				})
		})
	},

	showOpenDialog(options) {
		return bridge('showOpenDialog', options)
	},

	showMessageBox(options) {
		return bridge('showMessageBox', options)
	},
}

const bridge = require('./bridge.js')

const electron = window.electron

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
		const browserWindowId = this.getBrowserWindowId()
		return bridge('showOpenDialog', { browserWindowId, options })
	},

	showMessageBox(options) {
		const browserWindowId = this.getBrowserWindowId()
		return bridge('showMessageBox', { browserWindowId, options })
	},

	getBrowserWindowId() {
		return electron.remote.getCurrentWindow().id
	},
}

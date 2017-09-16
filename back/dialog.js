const { BrowserWindow, dialog } = require('electron')

const bridge = require('./lib/bridge.js')

module.exports = {
	init() {
		bridge('showOpenDialog', (event, { browserWindowId, options }) => {
			const browserWindow = BrowserWindow.fromId(browserWindowId)
			return new Promise((resolve, reject) => {
				const result = dialog.showOpenDialog(browserWindow, options)
				resolve(result)
			})
		})

		bridge('showMessageBox', (event, { browserWindowId, options }) => {
			const browserWindow = BrowserWindow.fromId(browserWindowId)
			return new Promise((resolve, reject) => {
				const result = dialog.showMessageBox(browserWindow, options)
				resolve(result)
			})
		})
	},
}

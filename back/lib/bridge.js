const { ipcMain } = require('electron');

/**
 * Wait for a message.
 */
module.exports = function(channel, callback) {
	ipcMain.on(channel, (event, { bridge$id, arg }) => {
		const result = callback(event, arg)
		if (result instanceof Promise) {
			result
				.then(result => {
					event.sender.send(channel, { bridge$id, result })
				})
				.catch(error => {
					console.error(error)
					const errorish = {  // error object cannot be passed to renderer process
						message: error.message,
						stack: error.stack,
					}
					event.sender.send(channel, { bridge$id, error: errorish })
				})
		}
		else {
			event.sender.send(channel, { bridge$id, result })
		}
	})
}

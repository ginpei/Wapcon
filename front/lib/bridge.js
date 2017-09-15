const { ipcRenderer } = window.electron;

let idCount = 0

/**
 * Send message to main and wait its return.
 * @param {string} channel
 * @param {object} arg
 * @returns {Promise}
 */
module.exports = function(channel, arg) {
	return new Promise((resolve, reject) => {
		const bridge$id = ++idCount

		const listener = (event, envelope) => {
			if (envelope.bridge$id === bridge$id) {
				ipcRenderer.removeListener(channel, listener)
				if (envelope.error) {
					reject(envelope.error)
				}
				else {
					resolve(envelope.result)
				}
			}
		}

		ipcRenderer.on(channel, listener)
		ipcRenderer.send(channel, { bridge$id, arg })
	})
}

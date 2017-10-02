const { ipcRenderer } = typeof window === 'object' ? window.electron : {}

let idCount = 0

const functions = {
	/**
	 * Send message to main and wait its return.
	 * @param {string} channel
	 * @param {object} arg
	 * @returns {Promise}
	 */
	run(channel, arg) {
		return new Promise((resolve, reject) => {
			const bridge$id = functions.getNewId()
			const listener = functions.createListener({ channel, bridge$id, resolve, reject })
			functions.ipcRenderer.on(channel, listener)
			functions.ipcRenderer.send(channel, { bridge$id, arg })
		})
	},

	/**
	 * Returns a non-conflicting ID.
	 * @returns {number}
	 */
	getNewId() {
		return ++idCount
	},

	/**
	 * Returns `true` if this invocation is for the envelope.
	 * @param {string} options.channel
	 * @param {number} options.id
	 * @param {function} options.resolve
	 * @param {function} options.reject
	 * @returns {function}
	 */
	createListener({ channel, bridge$id, resolve, reject }) {	
		const listener = function(event, envelope) {
			if (envelope.bridge$id === bridge$id) {
				functions.ipcRenderer.removeListener(channel, listener)
				if (envelope.error) {
					reject(envelope.error)
				}
				else {
					resolve(envelope.result)
				}
			}
		}

		return listener
	},

	// map for tests
	ipcRenderer: ['on', 'send', 'removeListener'].reduce((obj, name) => {
		obj[name] = (...arg) => ipcRenderer[name].apply(ipcRenderer, arg)
		return obj
	}, {})
}

// export

/**
 * @param {string} channel
 * @param {obj} arg
 * @returns {Promise}
 */
module.exports = function(channel, arg) {
	return functions.run(channel, arg)
}
module.exports.functions = functions

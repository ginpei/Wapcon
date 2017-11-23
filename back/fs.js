const fs = require('fs')

const bridge = require('./lib/bridge.js')

module.exports = {
	init() {
		bridge('fs.exists', (event, { path }) => {
			return new Promise((resolve, reject) => {
				fs.exists(path, (existing) => {
					resolve({ path, existing })
				})
			})
		})
	},
}

const fs = require('fs')

const bridge = require('./lib/bridge.js')

const path = './preferences.json'
const options = { encoding: 'utf8' }

/**
 * Get data from file.
 * @returns {Promise}
 * @example
 * preference.load()
 *   .then(data => {
 *     console.log(data)
 *   })
 */
function load() {
	return new Promise((resolve, reject) => {
		fs.readFile(path, options, (err, json) => {
			if (err) {
				reject(err)
				return
			}

			const data = JSON.parse(json)
			resolve(data)
		})
	})
}

/**
 * Save data to file.
 * @param {object} data
 * @returns {Promise}
 * @example
 * const data = {
 *   database: { path: '~/wapcon/db/' },
 *   wordpress: { path: '~/wapcon/wp/' },
 * }
 * preference.save(data)
 *   .then(_ => console.log('Done'))
 */
function save(data) {
	return new Promise((resolve, reject) => {
		const json = JSON.stringify(data, null, 2)

		fs.writeFile(path, json, options, (err) => {
			if (err) {
				reject(err)
				return
			}

			resolve()
		})
	})
}

module.exports = {
	init() {
		bridge('loadPreferences', (event, arg) => load())
		bridge('savePreferences', (event, { data }) => save(data))
	},
}

const bridge = require('../lib/bridge.js')

module.exports = {
	namespaced: true,

	state: {
		numWorking: 0,
		running: false,
		errors: [],
	},

	getters: {
		working(state) {
			return state.numWorking > 0
		},

		failed(state) {
			return state.errors.length > 0
		},
	},

	mutations: {
		START_WORKING(state) {
			state.numWorking += 1
		},

		FINISH_WORKING(state) {
			state.numWorking -= 1
		},

		SET_RUNNING(state, { running }) {
			state.running = running
		},

		ADD_ERRORS(state, { errors }) {
			errors.forEach(v => state.errors.push(v))
		},

		CLEAR_ERRORS(state) {
			state.errors = []
		},
	},

	actions: {
		updateStatus({ dispatch, commit }) {
			commit('START_WORKING')
			bridge('checkMachinStatus')
				.then(status => {
					commit('FINISH_WORKING')
					commit('SET_RUNNING', { running: status.running })

					// some are running, others are not running
					if (!status.running && (status.db || status.wp)) {
						dispatch('stop')
					}
				})
		},

		start({ rootGetters, commit, dispatch }) {
			commit('START_WORKING')
			commit('SET_RUNNING', { running: true })

			const options = {
				db: 'latest',
				wp: 'latest',
			}
			bridge('checkImageAvailability', options)
				.then(imagesStatus => {
					if (!imagesStatus.ok) {
						throw new Error('Images are not ready')
					}

					return bridge('startMachine', rootGetters['preferences/bootOptions'])
				})
				.then(status => {
					const errors = []
					;['db', 'wp'].forEach(type => {
						const row = status[type]
						if (row.code !== 0) {
							const errorResult = row.result[row.result.length - 1]
							errors.push({ type, text: errorResult.text })
						}
					})
					commit('ADD_ERRORS', { errors })
					errors.forEach(error => console.error(`[${error.type}]`, error.text))

					commit('FINISH_WORKING')
					dispatch('updateStatus')
				})
				.catch(error => {
					const errorLog = {
						type: 'host',
						text: error.message,
					}
					commit('ADD_ERRORS', { errors: [errorLog] })
					console.error(error)

					commit('FINISH_WORKING')
					dispatch('updateStatus')
				})
		},

		stop({ commit, dispatch }) {
			commit('START_WORKING')
			commit('SET_RUNNING', { running: false })
			bridge('stopMachine')
				.then(status => {
					commit('FINISH_WORKING')
					dispatch('updateStatus')
				})
		},

		clearErrors({ commit }) {
			commit('CLEAR_ERRORS')
		},
	},
}

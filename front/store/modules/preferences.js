const bridge = require('../../lib/bridge.js')

const defaultData = {
	database: {
		path: '',
	},
	theme: {
		list: [],
	},
	wordpress: {
		path: '',
	},
}

module.exports = {
	namespaced: true,

	state: {
		databasePath: '',
		numWorking: 0,
		themeList: [],
		wordpressPath: '',
	},

	getters: {
		working(state) {
			return state.numWorking > 0;
		},

		/**
		 * Return whole data to save.
		 */
		data(state) {
			return {
				database: {
					path: state.databasePath,
				},
				theme: {
					list: state.themeList,
				},
				wordpress: {
					path: state.wordpressPath,
				},
			}
		},
	},

	mutations: {
		START_WORKING(state) {
			state.numWorking += 1;
		},

		FINISH_WORKING(state) {
			state.numWorking -= 1;
		},

		SET_DATA(state, { data }) {
			if (!data) {
				data = defaultData
			}

			state.databasePath = data.database.path
			state.themeList = data.theme.list
			state.wordpressPath = data.wordpress.path
		},
	},

	actions: {
		load({ commit }) {
			console.log('# loadPreferences')
			commit('START_WORKING');
			bridge('loadPreferences')
				.then(data => {
					console.log(data)
					commit('FINISH_WORKING');
					commit('SET_DATA', { data });
				})
				.catch(error => {
					console.error(error)
				})
		},

		save({ getters, commit }) {
			commit('START_WORKING');

			bridge('savePreferences', { data: getters['data'] })
				.then(data => {
					commit('FINISH_WORKING');
				})
				.catch(error => {
					console.error(error)
				})
		},
	},
}

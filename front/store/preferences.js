const path = require('path')

const bridge = require('../lib/bridge.js')

module.exports = {
	namespaced: true,

	state: {
		databasePath: '',
		numWorking: 0,
		machines: [],
		themeList: [],
		wordpressPath: '',
	},

	getters: {
		working(state) {
			return state.numWorking > 0
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

		activeThemes(state) {
			return state.themeList.filter(theme => theme.active)
		},

		inactiveThemes(state) {
			return state.themeList.filter(theme => !theme.active)
		},

		/**
		 * Return data to boot machines.
		 */
		bootOptions(state, getters) {
			return {
				wordpressPath: state.wordpressPath,
				databasePath: state.databasePath,
				themeList: getters.activeThemes,
			}
		},
	},

	mutations: {
		START_WORKING(state) {
			state.numWorking += 1
		},

		FINISH_WORKING(state) {
			state.numWorking -= 1
		},

		SET_DATA(state, { data }) {
			state.databasePath = data.database.path  // DEPRECATED
			state.machines = data.machines
			state.themeList = data.theme.list
			state.wordpressPath = data.wordpress.path  // DEPRECATED
		},

		SET_THEME_LIST(state, { themes }) {
			state.themeList = themes
		},

		UPDATE_THEME(state, { theme }) {
			const oldTheme = state.themeList.find(v => v.id === theme.id)
			if (!oldTheme) {
				throw new Error('Theme not found')
			}

			const index = state.themeList.indexOf(oldTheme)
			state.themeList[index] = theme
		},

		ADD_THEME(state, { theme }) {
			state.themeList.push(theme)
		},

		SORT_THEME(state) {
			state.themeList = state.themeList.sort((t1, t2) => (t1.name > t2.name ? 1 : -1))
		},
	},

	actions: {
		load({ commit }) {
			commit('START_WORKING')
			bridge('loadPreferences')
				.then(data => {
					commit('FINISH_WORKING')
					commit('SET_DATA', { data })
				})
				.catch(error => {
					console.error(error)
				})
		},

		save({ getters, commit }) {
			commit('START_WORKING')

			commit('SORT_THEME')
			bridge('savePreferences', { data: getters.data })
				.then(data => {
					commit('FINISH_WORKING')
				})
				.catch(error => {
					console.error(error)
				})
		},

		addThemePath({ dispatch, commit }, { themePath }) {
			if (!themePath) {
				return
			}

			// Browserify's path.basename() doesn't support Windows path
			const name = path.basename(themePath.replace(/\\/g, '/'))

			const theme = {
				active: true,
				id: `${Date.now()}${Math.floor(Math.random() * 1000)}`,
				name: name,
				path: themePath,
			}

			commit('ADD_THEME', { theme })
			dispatch('save')
		},

		updateTheme({ state, dispatch, commit }, { theme }) {
			commit('UPDATE_THEME', { theme })
			dispatch('save')
		},

		removeThemes({ state, dispatch, commit }, { themeIds }) {
			const filtered = state.themeList.filter(v => !themeIds.includes(v.id))
			commit('SET_THEME_LIST', { themes: filtered })
			dispatch('save')
		},
	},
}

const bridge = require('../../lib/bridge.js')

module.exports = {
	namespaced: true,

	state: {
		numWorking: 0,
		running: false,
	},

	getters: {
		working(state) {
			return state.numWorking > 0;
		},
	},

	mutations: {
		START_WORKING(state) {
			state.numWorking += 1;
		},

		FINISH_WORKING(state) {
			state.numWorking -= 1;
		},

		SET_RUNNING(state, { running }) {
			state.running = running
		},
	},

	actions: {
		updateStatus({ commit }) {
			commit('START_WORKING');
			bridge('checkMachinStatus')
				.then(status => {
					commit('FINISH_WORKING');
					commit('SET_RUNNING', { running: status.running });
				})
		},

		start({ rootState, commit, dispatch }) {
			commit('START_WORKING');
			commit('SET_RUNNING', { running: true });
			bridge('startMachine', rootState.preferences)
				.then(status => {
					commit('FINISH_WORKING');
					dispatch('updateStatus')
				})
		},

		stop({ commit, dispatch }) {
			commit('START_WORKING');
			commit('SET_RUNNING', { running: false });
			bridge('stopMachine')
				.then(status => {
					commit('FINISH_WORKING');
					dispatch('updateStatus')
				})
		},
	},
}

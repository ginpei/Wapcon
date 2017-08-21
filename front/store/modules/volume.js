module.exports = {
	namespaced: true,

	state: {
		numWorking: 0,
		message: 'Hello World',
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

		FINISH_FORKING(state) {
			state.numWorking -= 1;
		},
	},

	actions: {
		update({ commit }) {
			console.log(123);
			commit('START_WORKING');

			setTimeout(_ => commit('FINISH_FORKING'), 500)
		},
	},
};

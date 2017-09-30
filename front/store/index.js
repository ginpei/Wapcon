const Vue = require('vue')
const Vuex = require('vuex')

const machine = require('./machine.js')
const preferences = require('./preferences.js')

Vue.use(Vuex)

module.exports = new Vuex.Store({
	modules: {
		machine,
		preferences,
	},
})

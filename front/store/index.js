/* global spawn */

const Vue = require('vue');
const Vuex = require('vuex');
const machine = require('./modules/machine.js');

Vue.use(Vuex);

module.exports = new Vuex.Store({
	modules: {
		machine,
	},
});

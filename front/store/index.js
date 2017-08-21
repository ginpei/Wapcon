/* global spawn */

const Vue = require('vue');
const Vuex = require('vuex');
const volume = require('./modules/volume.js');

Vue.use(Vuex);

module.exports = new Vuex.Store({
	modules: {
		volume,
	},
});

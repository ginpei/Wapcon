const Vue = require('vue')
const VueRouter = require('vue-router')

const Home = require('./screens/Home/index.vue')
const ThemeEdit = require('./screens/ThemeEdit/index.vue')

Vue.use(VueRouter)

module.exports = new VueRouter({
	routes: [
		{ path: '/', component: Home },
		{ path: '/themes/:id/edit', component: ThemeEdit },
	],
})

<template lang="pug">
	div.container
		GHeading.heading Docker (tmp)
		div
			GButton(:disabled="handlingDb" :onPress="startDb") Start DB
			GButton(:disabled="handlingDb" :onPress="stopDb") Stop DB
</template>

<style lang="sass" scoped>
	.container
		display: grid
		grid-template-rows: 20px auto 50px
		grid-gap: 8px
</style>

<script>
	const GHeading = require('../../components/form/GHeading.vue')
	const GButton = require('../../components/form/GButton.vue')

	const { ipcRenderer } = window.electron

	module.exports = {
		components: {
			GHeading,
			GButton,
		},

		data() {
			return {
				handlingDb: false,
			}
		},

		created() {
			this._ipcListeners = [
				['db-start.done', this.onDbStartDone],
				['db-start.error', this.onDbStartError],
				['db-stop.done', this.onDbStopDone],
				['db-stop.error', this.onDbStopError],
			].map(([channel, listener]) => {
				const f = listener.bind(this)
				ipcRenderer.on(channel, f)
				return [channel, f]
			})
		},

		destroyed() {
			this._ipcListeners.forEach(([channel, listener]) => {
				ipcRenderer.removeListener(channel, listener)
			})
		},

		methods: {
			startDb(event) {
				this.handlingDb = true
				console.log('start db');
				ipcRenderer.send('db-start')
			},

			stopDb(event) {
				this.handlingDb = true
				console.log('stop db');
				ipcRenderer.send('db-stop')
			},

			onDbStartDone(event, arg) {
				this.handlingDb = false
				console.log('#onDbStartDone', arg)
			},

			onDbStartError(event, arg) {
				this.handlingDb = false
				console.log('#onDbStartError', arg)
			},

			onDbStopDone(event, arg) {
				this.handlingDb = false
				console.log('#onDbStopDone', arg)
			},

			onDbStopError(event, arg) {
				this.handlingDb = false
				console.log('#onDbStopError', arg)
			},
		},
	}
</script>

<template lang="pug">
	BaseLayout.row
		ThemeColumn.item.main
		MachineColumn.item.aside(:executingMachine="executingMachine" :machineOn="machineOn" :onToggleMachine="onToggleMachine")
</template>

<style lang="sass" scoped>
	.row
		display: flex
		height: 100%

	.item.main
		flex: 1
		padding: 8px 0 8px 8px

	.item.aside
		padding: 8px
</style>

<script>
	const BaseLayout = require('../../components/BaseLayout/index.vue')
	const ThemeColumn = require('./ThemeColumn.vue')
	const MachineColumn = require('./MachineColumn.vue')

	module.exports = {
		components: {
			BaseLayout,
			ThemeColumn,
			MachineColumn,
		},

		data() {
			return {
				name: 'Wapcon',
				executingMachine: false,
				machineOn: false,
			}
		},

		created() {
			this._ipcListeners = [
				['docker-start.done', this.onDockerStartDone],
				['docker-start.error', this.onDockerStartError],
				['docker-stop.done', this.onDockerStopDone],
				['docker-stop.error', this.onDockerStopError],
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
			onToggleMachine({ on }) {
				if (this.executingMachine) {
					return
				}

				this.executingMachine = true
				if (on) {
					ipcRenderer.send('docker-start')
				}
				else {
					ipcRenderer.send('docker-stop')
				}
			},

			onDockerStartDone(event, arg) {
				this.executingMachine = false

				if (arg.success) {
					this.machineOn = arg.on
				}
				else {
					// TODO
				}

				console.log('#onDockerStartDone', arg)
			},

			onDockerStartError(event, error) {
				this.executingMachine = false
				console.error('ERROR', error)

				// TODO handle error
			},

			onDockerStopDone(event, arg) {
				this.executingMachine = false

				if (arg.success) {
					this.machineOn = arg.on
				}
				else {
					// TODO
				}

				console.log('#onDockerStopDone', arg)
			},

			onDockerStopError(event, error) {
				this.executingMachine = false
				console.error('ERROR', error)

				// TODO handle error
			},
		},
	}
</script>

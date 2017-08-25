<template lang="pug">
	BaseLayout.root
		ThemeColumn
		MachineColumn(:executingMachine="executingMachine" :machineOn="machineOn" :onToggleMachine="onToggleMachine")
</template>

<style lang="sass" scoped>
	.root
		display: flex
		height: 100%
</style>

<script>
	const BaseLayout = require('../../components/BaseLayout/index.vue')
	const ThemeColumn = require('./ThemeColumn.vue')
	const MachineColumn = require('./MachineColumn.vue')

	const { ipcRenderer } = window.electron

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
			this.f_onDockerStartDone = this.onDockerStartDone.bind(this)
			ipcRenderer.on('docker-start.done', this.f_onDockerStartDone)
			this.f_onDockerStartError = this.onDockerStartError.bind(this)
			ipcRenderer.on('docker-start.error', this.f_onDockerStartError)
		},

		destroyed() {
			ipcRenderer.removeListener('docker-start.done', this.f_onDockerStartDone)
			ipcRenderer.removeListener('docker-start.error', this.f_onDockerStartError)
		},

		methods: {
			onToggleMachine({ on }) {
				if (this.executingMachine) {
					return
				}

				this.executingMachine = true
				ipcRenderer.send('docker-start')
			},

			onDockerStartDone(event, arg) {
				this.executingMachine = false

				if (arg.success) {
					this.machineOn = arg.on
				}

				console.log(arg);
			},

			onDockerStartError(event, error) {
				this.executingMachine = false

				// console.error('ERROR', error)

				// TODO handle error
			},
		},
	}
</script>

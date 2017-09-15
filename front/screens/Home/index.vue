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
	const MachineColumn = require('./MachineColumn.vue')
	const ThemeColumn = require('./ThemeColumn.vue')
	const bridge = require('../../lib/bridge.js')

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
			this.updateMachineStatus()
		},

		destroyed() {
		},

		methods: {
			updateMachineStatus() {
				console.log('checking...')
				this.executingMachine = true
				bridge('checkMachinStatus')
					.then(status => {
						this.executingMachine = false
						this.machineOn = status.running
					})
			},

			onToggleMachine({ on }) {
				if (this.executingMachine) {
					return
				}

				this.machineOn = on

				this.executingMachine = true
				console.log('turnning ' + (on ? 'on' : 'off') + '...', on)
				const p = on ? bridge('startMachine') : bridge('stopMachine')
				p
					.then(result => {
						this.executingMachine = false
						console.log('done', result)
						this.updateMachineStatus()
					})
			},
		},
	}
</script>

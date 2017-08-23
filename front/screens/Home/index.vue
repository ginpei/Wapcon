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

		methods: {
			onToggleMachine({ on }) {
				if (this.executingMachine) {
					return
				}

				// TODO implement
				this.machineOn = on
				this.executingMachine = true
				setTimeout(_ => this.executingMachine = false, 1000)
			},
		},
	}
</script>

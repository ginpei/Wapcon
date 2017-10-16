<template lang="pug">
	BaseLayout.row
		ThemeColumn.item.main
		MachineColumn.item.aside(:working="$store.getters['machine/working']" :running="$store.state.machine.running" :onToggleMachine="onToggleMachine")
</template>

<style lang="sass" scoped>
	.row
		display: flex

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

	module.exports = {
		components: {
			BaseLayout,
			ThemeColumn,
			MachineColumn,
		},

		data() {
			return {
				name: 'Wapcon',
			}
		},

		created() {
			this.updateMachineStatus()
			this.$store.dispatch('preferences/load')
		},

		methods: {
			updateMachineStatus() {
				this.$store.dispatch('machine/updateStatus')
			},

			onToggleMachine({ on }) {
				if (this.$store.getters['machine/working']) {
					return
				}

				if (on) {
					this.$store.dispatch('machine/start')
				}
				else {
					this.$store.dispatch('machine/stop')
				}
			},
		},
	}
</script>

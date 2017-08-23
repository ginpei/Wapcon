<template lang="pug">
	div.controller
		GHeading Machine
		div.spacer
		GSwitch(:on="machineOn" :executing="executingMachine" :onClick="onClick")
		div.spacer
		div.settings
			GIconButton(title="Settings" icon="cog")
</template>

<style lang="sass" scoped>
	.controller
		display: grid
		grid-template-rows: 20px 8px auto 8px 50px
		padding: 8px

	.heading
		font-size: 16px
		line-height: 20px
		height: 20px

	.settings
		text-align: right
</style>

<script>
	const GHeading = require('../../components/form/GHeading.vue')
	const GIconButton = require('../../components/form/GIconButton.vue')
	const GSwitch = require('../../components/form/GSwitch.vue')

	module.exports = {
		components: {
			GHeading,
			GIconButton,
			GSwitch,
		},

		data() {
			return {
				executingMachine: false,
				machineOn: false,
			}
		},

		methods: {
			onClick({ on }) {
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

<template lang="pug">
	div.controller
		GHeading Machine
		div.spacer
		GSwitch(:on="machineOn" :onClick="onClick")
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
				machineOn: false,
			}
		},

		methods: {
			onClick({ on }) {
				console.debug(this.machineOn, on);
				this.machineOn = on
				console.debug('->', this.machineOn);
			},
		},
	}
</script>

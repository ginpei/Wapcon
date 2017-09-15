<template lang="pug">
	div.controller
		GHeading Machine
		GSwitch(:on="running" :executing="working" :onClick="onToggleMachine")
		div.settings
			GIconButton(title="Settings" icon="cog")
</template>

<style lang="sass" scoped>
	.controller
		display: grid
		grid-template-rows: 20px auto 50px
		grid-gap: 8px

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

		props: [
			'working',
			'running',
			'onToggleMachine',
		],

		// data() {
		// 	return {
		// 	}
		// },

		// methods: {
		// },
	}
</script>

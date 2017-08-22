<template lang="pug">
	div.controller
		GHeading Machine
		GSwitch
		div.settings
			GButton
				i.fa.fa-cog(aria-hidden="true")
</template>

<style lang="sass" scoped>
	.controller
		display: grid
		grid-template-rows: 20px auto 50px
		padding: 8px

	.heading
		font-size: 16px
		line-height: 20px
		height: 20px

	.settings
		text-align: right

	button
		height: 50px
		width: 50px
</style>

<script>
	const GButton = require('../../components/form/GButton.vue')
	const GHeading = require('../../components/form/GHeading.vue')
	const GSwitch = require('../../components/form/GSwitch.vue')

	module.exports = {
		components: {
			GButton,
			GHeading,
			GSwitch,
		},

		data() {
			return {
			}
		},

		methods: {
		},
	}
</script>

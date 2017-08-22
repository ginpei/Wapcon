<template lang="pug">
	div.controller
		Heading Machine
		SwitchControl
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
	const Heading = require('../../components/form/Heading.vue')
	const SwitchControl = require('../../components/form/SwitchControl.vue')

	module.exports = {
		components: {
			GButton,
			Heading,
			SwitchControl,
		},

		data() {
			return {
			}
		},

		methods: {
		},
	}
</script>

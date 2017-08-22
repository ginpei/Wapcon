<template lang="pug">
	div.themes
		GHeading Themes
		select(multiple)
			option My Greate Theme
			option My Wonderful Theme
			option Samurai X
		div.buttons
			GButton
				i.fa.fa-plus(aria-hidden="true")
			GButton
				i.fa.fa-minus(aria-hidden="true")
			GButton.folder
				i.fa.fa-folder-open-o(aria-hidden="true")
</template>

<style lang="sass" scoped>
	.themes
		flex: 1
		display: grid
		grid-template-rows: 20px auto 50px
		padding: 8px

	.buttons > button
		font-size: 14px
		height: 50px
		line-height: 14px
		vertical-align: middle
		width: 50px

		&.folder
			float: right
</style>

<script>
	const GButton = require('../../components/form/GButton.vue')
	const GHeading = require('../../components/form/GHeading.vue')

	module.exports = {
		components: {
			GButton,
			GHeading,
		},

		data() {
			return {
			}
		},

		methods: {
		},
	}
</script>

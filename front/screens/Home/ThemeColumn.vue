<template lang="pug">
	div.themes
		GHeading Themes
		select(multiple)
			option My Greate Theme
			option My Wonderful Theme
			option Samurai X
		div.buttons
			GIconButton(icon="plus")
			GIconButton(icon="minus")
			GIconButton.folder(icon="folder-open-o")
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
	const GHeading = require('../../components/form/GHeading.vue')
	const GIconButton = require('../../components/form/GIconButton.vue')

	module.exports = {
		components: {
			GHeading,
			GIconButton,
		},

		data() {
			return {
			}
		},

		methods: {
		},
	}
</script>

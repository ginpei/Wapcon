<template lang="pug">
	div.container
		GHeading.heading Themes
		div.spacer
		select(multiple)
			option My Greate Theme
			option My Wonderful Theme
			option Samurai X
		div.spacer
		div.buttons
			GIconButton(title="Add a folder" icon="plus")
			GIconButton(title="Remove from this list" icon="minus")
			GIconButton.folder(title="Open the folder" icon="folder-open-o")
</template>

<style lang="sass" scoped>
	.container
		flex: 1
		display: grid
		grid-template-rows: 20px 8px auto 8px 50px
		padding: 8px 0 8px 8px

	.folder
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

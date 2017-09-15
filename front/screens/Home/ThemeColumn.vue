<template lang="pug">
	div.container
		GHeading.heading Themes {{$store.state.preferences.themeList.length}}
		select(multiple)
			option(v-for="v in $store.state.preferences.themeList") {{v.name}}
		div.buttons
			GIconButton(title="Add a folder" icon="plus")
			GIconButton(title="Remove from this list" icon="minus")
			GIconButton.folder(title="Open the folder" icon="folder-open-o")
</template>

<style lang="sass" scoped>
	.container
		display: grid
		grid-template-rows: 20px auto 50px
		grid-gap: 8px

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

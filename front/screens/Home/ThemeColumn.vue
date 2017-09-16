<template lang="pug">
	div.container
		GHeading.heading Themes
		select(multiple)
			ThemeListRow(v-for="v in $store.state.preferences.themeList" :theme="v")
		div.buttons
			span.buttonGroup
				GIconButton(title="Add" icon="file-o")
			span.buttonGroup
				GIconButton(title="Edit" icon="pencil-square-o")
				GIconButton(title="Open the folder" icon="external-link")
			span.buttonGroup.danger
				GIconButton(title="Remove" icon="trash")
</template>

<style lang="sass" scoped>
	.container
		display: grid
		grid-template-rows: 20px auto 50px
		grid-gap: 8px

	.buttonGroup
		margin-right: 8px

	.danger
		float: right
</style>

<script>
	const GHeading = require('../../components/form/GHeading.vue')
	const GIconButton = require('../../components/form/GIconButton.vue')

	const ThemeListRow = require('./ThemeListRow.vue')

	module.exports = {
		components: {
			GHeading,
			GIconButton,
			ThemeListRow,
		},

		data() {
			return {
			}
		},

		methods: {
		},
	}
</script>

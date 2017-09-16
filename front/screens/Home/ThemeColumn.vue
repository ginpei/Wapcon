<template lang="pug">
	div.container
		GHeading.heading Themes
		select(v-model="selectedIds" multiple)
			ThemeListRow(v-for="v in $store.state.preferences.themeList" :theme="v")
		div.buttons
			span.buttonGroup
				GIconButton(:onPress="add_onClick" title="Add" icon="file-o")
			span.buttonGroup
				GIconButton(:disabled="!editingAvailable" title="Edit" icon="pencil-square-o")
				GIconButton(:disabled="!editingAvailable" title="Open the folder" icon="external-link")
			span.buttonGroup.danger
				GIconButton(:disabled="!deletingAvailable" title="Remove" icon="trash")
</template>

<style lang="sass" scoped>
	.container
		display: grid
		grid-template-rows: 20px auto 50px
		grid-gap: 8px

	.buttonGroup
		margin-right: 8px

		&:last-child
			margin-right: 0

	.danger
		float: right
</style>

<script>
	const GHeading = require('../../components/form/GHeading.vue')
	const GIconButton = require('../../components/form/GIconButton.vue')

	const ThemeListRow = require('./ThemeListRow.vue')
	const dialog = require('../../lib/dialog.js')

	module.exports = {
		components: {
			GHeading,
			GIconButton,
			ThemeListRow,
		},

		data() {
			return {
				selectedIds: [],
			}
		},

		computed: {
			editingAvailable() {
				return this.selectedIds.length === 1
			},

			deletingAvailable() {
				return this.selectedIds.length > 0
			},
		},

		methods: {
			addThemePath(themePath) {
				this.$store.dispatch('preferences/addThemePath', { themePath })
			},

			add_onClick() {
				dialog.showOpenDialog({ properties: ['openDirectory'] })
					.then(result => {
						// cancelled
						if (!result) {
							return
						}

						const path = result[0]
						this.addThemePath(path)
					})
			},
		},
	}
</script>

<template lang="pug">
	div.container
		GHeading.heading Themes
		select(v-model="selectedIds" multiple)
			ThemeListRow(v-for="v in $store.state.preferences.themeList" :theme="v")
		div.buttons
			span.buttonGroup
				GIconButton(:onPress="add_onClick" title="Add" icon="plus")
			span.buttonGroup
				GIconButton(:disabled="!editingAvailable" title="Edit" icon="pencil-square-o")
				GIconButton(:disabled="!editingAvailable" :onPress="open_onClick" title="Open the folder" icon="external-link")
			span.buttonGroup.danger
				GIconButton(:disabled="!deletingAvailable" :onPress="remove_onClick" title="Remove" icon="trash")
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

	const bridge = require('../../lib/bridge.js')
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

			selectedThemes() {
				return this.selectedIds
					.map(id => this.$store.state.preferences.themeList.find(v => v.id === id))  // id -> theme
					.filter(v => v)  // ignore not-found ones
			}
		},

		methods: {
			addThemePath(themePath) {
				this.$store.dispatch('preferences/addThemePath', { themePath })
			},

			removeThemePath(themeIds) {
				this.$store.dispatch('preferences/removeThemes', { themeIds })
				this.selectedIds.length = 0  // remove all selection
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

			open_onClick() {
				const id = this.selectedIds[0]
				const theme = this.$store.state.preferences.themeList.find(v => v.id === id)
				bridge('openDirectory', { dirPath: theme.path })
			},

			remove_onClick() {
				const selectedThemeNameListText = this.selectedThemes
					.map(v => `- ${v.name}`)
					.join('\n')

				const message = 'Are you sure you want to remove followings from the list?\n\n' + selectedThemeNameListText
				dialog.ask(message)
					.then(ok => {
						if (ok) {
							this.removeThemePath(this.selectedIds)
						}
					})
			},
		},
	}
</script>

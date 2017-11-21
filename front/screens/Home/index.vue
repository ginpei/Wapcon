<template lang="pug">
	.baseLayout

		section.baseLayout-section
			h1 Machine

			div.machine-toolbar
				GIconButton(v-show="machineFailed" :onPress="seeErrors_oncClick" title="See errors" icon="exclamation-circle") {{$store.state.machine.errors.length}}
				GIconButton(:onPress="preferences_oncClick" title="Settings" icon="cog")

			div.machine-controlPanel
				div.machine-controlPanel-switch
					GSwitch(:on="machineRunning" :executing="machineWorking" :onClick="onToggleMachine")
					// div
						select(disabled)
							option(selected) My WordPress
							option あのお仕事
							option WordPress 3.2.3
				div.machine-controlPanel-info
					div
						a(:class="linkClasses" href="http://localhost") http://localhost

		section.baseLayout-section
			h1 Themes

			div.theme-toolbar
				GIconButton(:onPress="refresh_onClick" title="Refresh" icon="refresh")
				GIconButton(:onPress="add_onClick" title="Add" icon="plus")

			div.theme-list
				div(v-show="enabledThemes.length < 1") (None)
				ThemeItem.theme-item(v-for="theme in enabledThemes" @click="themeItem_onClick" :key="theme.id" :theme="theme" :selected="isSelectedTheme(theme)")

			h2 Disabled themes
			div.theme-list
				div(v-show="disabledThemes.length < 1") (None)
				ThemeItem.theme-item(v-for="theme in disabledThemes" @click="themeItem_onClick" :key="theme.id" :theme="theme" :selected="isSelectedTheme(theme)")

</template>

<style lang="sass" scoped>
	@mixin borderedText($color)
		text-shadow: 1px 1px 0 $color, 1px -1px 0 $color, -1px 1px 0 $color, -1px -1px 0 $color

	.baseLayout

	h1,
	h2
		margin: 0

	.baseLayout-section
		margin: 1rem

	.machine-toolbar
		text-align: right
		margin-bottom: 1rem

	.machine-controlPanel
		display: grid
		grid-template-columns: 50% 50%

	.theme-toolbar
		text-align: right
		margin-bottom: 1rem

</style>

<script>
	const dialog = require('../../lib/dialog.js')
	const GSwitch = require('../../components/form/GSwitch.vue')
	const GIconButton = require('../../components/form/GIconButton.vue')
	const ThemeItem = require('./ThemeItem.vue')

	module.exports = {
		components: {
			GIconButton,
			GSwitch,
			ThemeItem,
		},

		data() {
			return {
				selectedThemeIds: [],
			}
		},

		computed: {
			linkClasses() {
				return {
					disabled: !this.machineRunning,
				}
			},

			enabledThemes() {
				return this.themes.filter(theme => theme.enabled)
			},

			disabledThemes() {
				return this.themes.filter(theme => !theme.enabled)
			},

			themes() {
				return this.$store.state.preferences.themeList
			},

			machineRunning() {
				return this.$store.state.machine.running
			},

			machineWorking() {
				return this.$store.getters['machine/working']
			},

			machineFailed() {
				return this.$store.getters['machine/failed']
			},

			machineErrorMessage() {
				const errors = this.$store.state.machine.errors
				const message =
					'Error:\n\n' +
					errors.map(v => `${v.type}: ${v.text}`).join('\n')
				return message
			},
		},

		created() {
			this.updateMachineStatus()
			this.$store.dispatch('preferences/load')
		},

		methods: {
			isSelectedTheme(theme) {
				return this.selectedThemeIds.includes(theme.id)
			},

			updateMachineStatus() {
				this.$store.dispatch('machine/updateStatus')
			},

			onToggleMachine({ on }) {
				if (this.$store.getters['machine/working']) {
					return
				}

				if (on) {
					this.$store.dispatch('machine/start')
				}
				else {
					this.$store.dispatch('machine/stop')
				}
			},

			addThemePath(themePath) {
				this.$store.dispatch('preferences/addThemePath', { themePath })
			},

			seeErrors_oncClick() {
				dialog.inform(this.machineErrorMessage, { buttons: ['Close', 'Clear'] })
					.then(buttonIndex => {
						// clear
						if (buttonIndex === 1) {
							this.$store.dispatch('machine/clearErrors')
						}
					})
			},
			preferences_oncClick() {
				this.$router.push('/preferences')
			},

			refresh_onClick() {
				// TODO
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

			themeItem_onClick(event, theme) {
				const index = this.selectedThemeIds.indexOf(theme.id)
				if (index >= 0) {
					this.selectedThemeIds.splice(index, 1)
				}
				else {
					this.selectedThemeIds.push(theme.id)
				}
			},
		},
	}
</script>

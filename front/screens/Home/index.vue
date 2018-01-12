<template lang="pug">
	.baseLayout

		section.baseLayout-section
			h1 Machines

			div.machine-toolbar
				GSwitch(:on="machineRunning" :executing="machineWorking" :onClick="onToggleMachine")
				GIconButton.seeErrors(v-show="machineFailed" :onPress="seeErrors_oncClick" title="See errors" icon="exclamation-circle") {{$store.state.machine.errors.length}}
				GIconButton(:onPress="preferences_oncClick" title="Settings" icon="cog")

			ul.machine-list
				li.machine-lite-item(v-for="machine in machines")
					a(:class="linkClasses" :href="machine.url" :title="machine.url") {{machine.name}}

		section.baseLayout-section
			h1 Themes

			div.theme-toolbar
				GIconButton(:onPress="add_onClick" title="Add" icon="plus")

			div.theme-list
				div(v-show="activeThemes.length < 1") (None)
				ThemeItem.theme-item(v-for="theme in activeThemes" @click="themeItem_onClick" :key="theme.id" :theme="theme" :selected="isSelectedTheme(theme)")

			h2 Disabled themes
			div.theme-list
				div(v-show="inactiveThemes.length < 1") (None)
				ThemeItem.theme-item(v-for="theme in inactiveThemes" @click="themeItem_onClick" :key="theme.id" :theme="theme" :selected="isSelectedTheme(theme)")

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

		& > *
			margin-left: 0.5rem

	.machine-list
		margin: 0

	.seeErrors
		color: #900
		border-color: #c99
		background-color: hsl(0, 30%, 87%)

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

			activeThemes() {
				return this.$store.getters['preferences/activeThemes']
			},

			inactiveThemes() {
				return this.$store.getters['preferences/inactiveThemes']
			},

			machines() {
				return this.$store.state.preferences.machines.map((m) => {
					return { name: m.name, url: `http://${m.host}:${m.port}` }
				})
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

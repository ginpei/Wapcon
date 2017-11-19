<template lang="pug">
	.baseLayout

		section.baseLayout-section
			h1 Machine

			div.machine-controlPanel
				GIconButton(:onPress="preferences_oncClick" title="Settings" icon="cog")

			div.machineControlPanel
				div.machineControlPanel-switch
					GSwitch
					div
						select(disabled)
							option(selected) My WordPress
							option あのお仕事
							option WordPress 3.2.3
				div.machineControlPanel-info
					div
						a(:class="linkClasses" href="http://localhost") http://localhost

		section.baseLayout-section
			h1 Themes

			div.theme-controlPanel
				GIconButton(:onPress="noop" title="Refresh" icon="refresh")
				GIconButton(:onPress="noop" title="Add" icon="plus")

			div.theme-list
				div(v-show="enabledThemes.length < 1") (None)
				ThemeItem.theme-item(v-for="theme in enabledThemes" :theme="theme")

			h2 Disabled themes
			div.theme-list
				div(v-show="disabledThemes.length < 1") (None)
				ThemeItem.theme-item(v-for="theme in disabledThemes" :theme="theme")

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

	.machine-controlPanel
		text-align: right
		margin-bottom: 1rem

	.machineControlPanel
		display: grid
		grid-template-columns: 50% 50%

	.theme-controlPanel
		text-align: right
		margin-bottom: 1rem

</style>

<script>
	const { mapState } = require('vuex')

	const BaseLayout = require('../../components/BaseLayout/index.vue')
	const MachineColumn = require('./MachineColumn.vue')
	const ThemeColumn = require('./ThemeColumn.vue')

	const GSwitch = require('../../components/form/GSwitch.vue')
	const GIconButton = require('../../components/form/GIconButton.vue')
	const ThemeItem = require('./ThemeItem.vue')

	const dialog = require('../../lib/dialog.js')

	module.exports = {
		components: {
			BaseLayout,
			ThemeColumn,
			MachineColumn,
			GIconButton,
			GSwitch,
			ThemeItem,
		},

		data() {
			return {
				running: false,
			}
		},

		computed: Object.assign({
			linkClasses() {
				return {
					disabled: !this.running,
				}
			},

			enabledThemes() {
				return this.themes.filter(theme => theme.enabled)
			},

			disabledThemes() {
				return this.themes.filter(theme => !theme.enabled)
			},

		}, mapState({
			themes: state => state.preferences.themeList,
		})),

		created() {
			// this.updateMachineStatus()
			// this.$store.dispatch('preferences/load')
		},

		methods: {
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

			preferences_oncClick() {
				this.$router.push('/preferences')
			},
		},
	}
</script>

<template lang="pug">
	BaseLayout.baseLayout
		div.header
			div.header-inner
				router-link.back(to="/")
					i.fa.fa-arrow-left
					| Back
				h1.title Preferences

		main.main
			section
				SettingHeading Database
				SettingTable
					tr
						th Path
						td
							SettingInput(:value="$store.state.preferences.databasePath" readonly)
					tr
						th Reset
						td
							GIconButton(icon="exclamation-triangle") Delete all

			section
				SettingHeading WordPress
				SettingTable
					tr
						th Path
						td
							input.preference-input(:value="$store.state.preferences.wordpressPath" readonly)
					tr
						th Download
						td
							a(href="https://wordpress.org/download/")
								i.fa.fa-external-link
								|  WordPress.org

			section
				SettingHeading Data
				SettingTable
					tr
						th Reset
						td
							GIconButton(:onPress="revert_onClick" icon="undo") Revert
</template>

<style lang="sass" scoped>
	.baseLayout
		background-color: #fff

	.header
		border-bottom: 1px solid #999

	.header-inner
		padding: 1em 1em 0
		max-width: 600px
		margin: 0 auto

	.back
		background-color: #efe
		color: #060
		display: inline-block
		padding: .5em 1em

	.title
		padding: 0 1rem

	.main
		padding: 1em
		max-width: 600px
		margin: 0 auto
</style>

<script>
	const BaseLayout = require('../../components/BaseLayout/index.vue')
	const GIconButton = require('../../components/form/GIconButton.vue')
	const SettingHeading = require('../../components/settings/SettingHeading.vue')
	const SettingInput = require('../../components/settings/SettingInput.vue')
	const SettingTable = require('../../components/settings/SettingTable.vue')

	module.exports = {
		components: {
			BaseLayout,
			GIconButton,
			SettingHeading,
			SettingInput,
			SettingTable,
		},

		data() {
			return {
			}
		},

		created() {
			this.$store.dispatch('preferences/load')
		},

		methods: {
			save() {
				this.$store.dispatch('preferences/updateTheme', { theme: this.theme })
			},

			name_onChange() {
				this.save()
			},

			revert_onClick() {
				this.theme.name = this.originalName
				this.save()
			},
		},
	}
</script>

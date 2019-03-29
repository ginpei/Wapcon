<template lang="pug">
	SettingLayout(title="Preferences")
		SettingTable(heading="Database")
			SettingColumn(title="Path")
				SettingInput(:value="$store.state.preferences.databasePath" readonly)
			SettingColumn(title="Reset")
				GIconButton(icon="exclamation-triangle") Delete all

		SettingTable(heading="WordPress")
			SettingColumn(title="Path")
				input.preference-input(:value="$store.state.preferences.wordpressPath" readonly)
			SettingColumn(title="Download")
				a(href="https://wordpress.org/download/")
						i.fa.fa-external-link
						|  WordPress.org

		SettingTable(heading="Data")
			SettingColumn(title="Reset")
				GIconButton(:onPress="revert_onClick" icon="undo") Revert
</template>

<style lang="sass" scoped>
</style>

<script>
const GIconButton = require('../../components/form/GIconButton.vue')
const {
	SettingColumn,
	SettingInput,
	SettingLayout,
	SettingTable,
} = require('../../components/settings/index.js')

module.exports = {
	components: {
		GIconButton,
		SettingColumn,
		SettingInput,
		SettingLayout,
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

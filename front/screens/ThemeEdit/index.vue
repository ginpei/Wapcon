<template lang="pug">
	SettingLayout(title="Edit Theme Data")

		SettingTable(heading="File")
			SettingColumn(title="Path")
				SettingInput(:value="theme.path" readonly)
			SettingColumn(title="Name")
				SettingInput(:value="theme.name" @input="name_onChange")

		SettingTable(heading="Data")
			SettingColumn(title="Reset")
				GIconButton(:onPress="revert_onClick" icon="undo") Revert
</template>

<style lang="sass" scoped>
	.header
		display: flex

		> *
			margin: 0.2em 0.5em

	h1
		font-size: 1em
		margin: 0
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
			const id = this.$route.params.id
			const theme = this.$store.state.preferences.themeList.find(v => v.id === id) || {}
			return {
				originalName: theme.name,
				theme: theme,
			}
		},

		created() {
			// if not found, get back home
			if (!this.theme.id) {
				this.$router.push('/')
			}
		},

		methods: {
			save() {
				this.$store.dispatch('preferences/updateTheme', { theme: this.theme })
			},

			name_onChange(event) {
				this.theme.name = event.target.value
				this.save()
			},

			revert_onClick() {
				this.theme.name = this.originalName
				this.save()
			},
		},
	}
</script>

<template lang="pug">
	BaseLayout
		div.header
			router-link(to="/")
				i.fa.fa-arrow-left
				| Back
			h1 Wapcon Preferences

		section
			h2 Database
			table
				tr
					th Path
					td
						input(:value="$store.state.preferences.databasePath" readonly)
				tr
					th Reset
					td
						GIconButton(icon="exclamation-triangle") Delete all

		section
			h2 WordPress
			table
				tr
					th Path
					td
						input(:value="$store.state.preferences.wordpressPath" readonly)
				tr
					th Version
					td 0.0.0

		div
			GIconButton(:onPress="revert_onClick" icon="undo") Revert
</template>

<style lang="sass" scoped>
	.header
		display: flex

		> *
			margin: 0.2em 0.5em

	h1,
	h2
		font-size: 1em
		margin: 0

	section
		margin: 1em 0
</style>

<script>
	const BaseLayout = require('../../components/BaseLayout/index.vue')
	const GIconButton = require('../../components/form/GIconButton.vue')

	module.exports = {
		components: {
			BaseLayout,
			GIconButton,
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

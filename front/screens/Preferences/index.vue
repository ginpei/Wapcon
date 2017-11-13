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
				h2.preference-heading Database
				table.preference-table
					tr
						th Path
						td
							input.preference-input(:value="$store.state.preferences.databasePath" readonly)
					tr
						th Reset
						td
							GIconButton(icon="exclamation-triangle") Delete all

			section
				h2.preference-heading WordPress
				table.preference-table
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
				h2.preference-heading Data
				table.preference-table
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

	.preference-heading
		background-color: #eee
		color: #333
		font-family: sans-serif
		font-size: 1em
		font-weight: normal
		padding: .5em 1em

	.preference-table
		width: 100%

		& > tr > th
			font-weight: normal
			padding: .5em 1em
			text-align: left
			width: 50%

	.preference-input
		box-sizing: border-box
		width: 100%
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

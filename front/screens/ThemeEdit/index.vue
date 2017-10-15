<template lang="pug">
	BaseLayout
		div.header
			router-link(to="/")
				i.fa.fa-arrow-left
				| Back
			h1 Edit
		table
			tbody
				tr
					th Path
					td
						input(:value="theme.path" readonly)
				tr
					th Name
					td
						input(v-model="theme.name" @input="name_onChange")
		div
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
	const BaseLayout = require('../../components/BaseLayout/index.vue')
	const GIconButton = require('../../components/form/GIconButton.vue')

	module.exports = {
		components: {
			BaseLayout,
			GIconButton,
		},

		data() {
			const id = this.$route.params.id
			const theme = this.$store.state.preferences.themeList.find(v => v.id === id)
			// TODO what if theme is not found
			return {
				originalName: theme.name,
				theme: theme,
			}
		},

		methods: {
			name_onChange() {
				this.$store.dispatch('preferences/updateTheme', { theme: this.theme })
			},

			revert_onClick() {
				this.theme.name = this.originalName
				this.$store.dispatch('preferences/updateTheme', { theme: this.theme })
			},
		},
	}
</script>

<template lang="pug">
	div.controller
		GHeading Machine
		div
			GSwitch(:on="running" :executing="working" :onClick="onToggleMachine")
			div
				a(:class="linkClasses" href="http://localhost") http://localhost
		div.settings
			GIconButton(v-show="$store.getters['machine/failed']" :onPress="seeErrors_oncClick" title="See errors" icon="exclamation-circle") {{$store.state.machine.errors.length}}
			GIconButton(:onPress="preferences_oncClick" title="Settings" icon="cog")
</template>

<style lang="sass" scoped>
	.controller
		display: grid
		grid-template-rows: 20px auto 50px
		grid-gap: 8px

	.heading
		font-size: 16px
		line-height: 20px
		height: 20px

	.settings
		text-align: right
</style>

<script>
	const GHeading = require('../../components/form/GHeading.vue')
	const GIconButton = require('../../components/form/GIconButton.vue')
	const GSwitch = require('../../components/form/GSwitch.vue')
	const dialog = require('../../lib/dialog.js')

	module.exports = {
		components: {
			GHeading,
			GIconButton,
			GSwitch,
		},

		props: [
			'working',
			'running',
			'onToggleMachine',
		],

		// data() {
		// 	return {
		// 	}
		// },

		computed: {
			linkClasses() {
				return {
					disabled: !this.running,
				}
			},

			errorMessage() {
				const errors = this.$store.state.machine.errors
				const message =
					'Error:\n\n' +
					errors.map(v => `${v.type}: ${v.text}`).join('\n')
				return message
			},
		},

		methods: {
			seeErrors_oncClick() {
				dialog.inform(this.errorMessage, { buttons: ['Close', 'Clear'] })
					.then(buttonIndex => {
						if (buttonIndex === 1) {
							this.$store.dispatch('machine/clearErrors')
						}
					})
			},

			preferences_oncClick() {
				this.$router.push('/preferences')
			},
		},
	}
</script>

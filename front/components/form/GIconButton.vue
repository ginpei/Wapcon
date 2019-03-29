<template lang="pug">
	GButton(:title="title" :onPress="onPress")
		i.fa(:class="classes" aria-hidden="true")
		span.slot
			slot
</template>

<style lang="sass" scoped>
	button
		border: 1px solid #999
		box-shadow: 1px 1px 1px rgba(255, 255, 255, 0.99) inset
		text-shadow: 1px 1px #fff

	.slot:not(:empty)
		margin-left: 0.2em
</style>

<script>
const GButton = require('../../components/form/GButton.vue')

module.exports = {
	components: {
		GButton,
	},

	props: [
		'icon',
		'title',
		'onPress',
	],

	computed: {
		classes() {
			return {
				[`fa-${this.icon}`]: true,
			}
		},
	},
}
</script>

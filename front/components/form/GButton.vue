<template lang="pug">
	button(:title="title" @click="button_onClick")
		slot
</template>

<style lang="sass" scoped>
	button
		border: 1px solid #999
		box-shadow: 1px 1px 1px rgba(255, 255, 255, 0.9) inset
		min-height: 50px
		min-width: 50px
		padding: calc(0.5em + 1px)
		text-shadow: 1px 1px rgba(255, 255, 255, 0.5)
		vertical-align: middle

		&:active
			box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2) inset
			padding: calc(0.5em + 2px) 0.5em 0.5em calc(0.5em + 2px)

		&:disabled
			box-shadow: none
			color: #999
</style>

<script>
	module.exports = {
		props: [
			'title',
			'onPress',
		],

		methods: {
			button_onClick(event) {
				if (this.onPress) {
					this.onPress(event)
				}
			},
		},
	}
</script>

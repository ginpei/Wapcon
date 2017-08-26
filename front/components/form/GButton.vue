<template lang="pug">
	button(:title="title" @click="button_onClick")
		slot
</template>

<style lang="sass" scoped>
	button
		border: 1px solid #999
		box-shadow: 1px 1px 1px rgba(255, 255, 255, 0.99) inset
		min-height: 50px
		text-shadow: 1px 1px rgba(255, 255, 255, 0.5)
		min-width: 50px
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
			}
		},
	}
</script>

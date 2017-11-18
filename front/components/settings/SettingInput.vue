<template lang="pug">
	input.setting-input(v-model="currentValue" :readonly="readonly" @input="pathEvent")
</template>

<style lang="sass" scoped>
	input.setting-input
		box-sizing: border-box
		width: 100%
</style>

<script>
	module.exports = {
		// will be extended
		props: [
			'readonly',
			'value',
		],

		data() {
			return {
				currentValue: this.value,
			}
		},

		watch: {
			value(value) {
				this.currentValue = value
			},
		},

		methods: {
			pathEvent(event) {
				this.$emit(event.type, event)
			},
		},
	}
</script>

<template lang="pug">
	input.setting-input(:value="value" :readonly="readonly")
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
	}
</script>

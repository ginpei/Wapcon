<template lang="pug">
	div.wrapper
		slot
</template>

<style lang="sass" scoped>
</style>

<script>
const routingAnimation = require('./routing-animation.js').get()

module.exports = {
	mounted() {
		routingAnimation.start()
	},

	updated() {
		routingAnimation.animateNext()
	},

	unmounted() {
		routingAnimation.stop()
	},
}
</script>

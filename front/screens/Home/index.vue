<template lang="pug">
	BaseLayout.root
		h1 {{name}}
		div
			button(:disabled="$store.getters['volume/working']" @click="work_onClick") Work
		p(v-show="!$store.getters['volume/working']") {{$store.state.volume.message}}
</template>

<style lang="sass" scoped>
	.root
		text-align: center
</style>

<script>
	const BaseLayout = require('../../components/BaseLayout/index.vue')

	module.exports = {
		components: {
			BaseLayout,
		},

		data() {
			return {
				name: 'Wapcon',
			}
		},

		methods: {
			work_onClick(event) {
				this.$store.dispatch('volume/update')
			},
		},
	}
</script>

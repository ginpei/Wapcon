<template lang="pug">
	BaseLayout.root
		ThemeColumn
		MachineColumn
</template>

<style lang="sass" scoped>
	.root
		display: flex
		height: 100%
</style>

<script>
	const BaseLayout = require('../../components/BaseLayout/index.vue')
	const ThemeColumn = require('./ThemeColumn.vue')
	const MachineColumn = require('./MachineColumn.vue')

	module.exports = {
		components: {
			BaseLayout,
			ThemeColumn,
			MachineColumn,
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

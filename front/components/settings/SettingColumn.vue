<template lang="pug">
	tr
		th {{title}}
		td
			slot
</template>

<style lang="sass" scoped>
	table.setting-table > tr > th
		font-weight: normal
		padding: .5em 1em
		text-align: left
		width: 50%
</style>

<script>
	module.exports = {
		props: [
			'title',
		],
	}
</script>

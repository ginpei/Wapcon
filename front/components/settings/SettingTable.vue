<template lang="pug">
	section
		h2.setting-heading {{heading}}
		table.setting-table
			slot
</template>

<style lang="sass" scoped>
	.setting-heading
		background-color: #eee
		color: #333
		font-family: sans-serif
		font-size: 1em
		font-weight: normal
		padding: .5em 1em

	table.setting-table
		width: 100%
</style>

<script>
module.exports = {
	props: [
		'heading',
	],
}
</script>

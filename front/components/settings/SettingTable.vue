<template lang="pug">
	table.setting-table
		slot
</template>

<style lang="sass" scoped>
	table.setting-table
		width: 100%

		& > tr > th
			font-weight: normal
			padding: .5em 1em
			text-align: left
			width: 50%
</style>

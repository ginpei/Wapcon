<template lang="pug">
	tr
		th {{title}}
		td
			slot
</template>

<style lang="sass" scoped>
</style>

<script>
	module.exports = {
		props: [
			'title',
		],
	}
</script>

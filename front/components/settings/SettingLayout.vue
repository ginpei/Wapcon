<template lang="pug">
	div.layout
		div.header
			div.header-inner
				router-link.back(to="/")
					i.fa.fa-arrow-left
					| Back
				h1.title {{title}}

		main.main
			slot
</template>

<style lang="sass" scoped>
	.layout
		background-color: #fff

	.header
		border-bottom: 1px solid #999

	.header-inner
		padding: 1em
		max-width: 600px
		margin: 0 auto

	.back
		background-color: #efe
		border: 1px solid #060
		color: #060
		display: inline-block
		padding: .5em 1em

	.title
		margin: 0
		padding: 0 1rem

	.main
		padding: 1em
		max-width: 600px
		margin: 0 auto
</style>

<script>
	module.exports = {
		props: [
			'title',
		],
	}
</script>

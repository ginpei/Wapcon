<template lang="pug">
	article.layout
		header.header
			div.header-inner
				router-link.back(to="/")
					i.fa.fa-arrow-left
					| Done
				h1.title {{title}}

		main.main
			slot
</template>

<style lang="sass" scoped>
	.layout
		background-color: #fff

	.header
		background-color: #fff
		box-shadow: 0 0 10px rgba(0,0,0,0.3)
		left: 0
		position: sticky
		top: 0

	.header-inner
		padding: 1rem
		max-width: 600px
		margin: 0 auto

	.back
		background-color: #efe
		border: 1px solid #060
		color: #060
		display: inline-block
		margin-right: 1rem
		padding: .5em 1em
		vertical-align: baseline

		& > .fa
			margin-right: 0.2rem

	.title
		display: inline
		font-size: 1em
		margin: 0

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

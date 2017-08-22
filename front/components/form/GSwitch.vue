<template lang="pug">
	label.switch
		input(type="checkbox")
		span.label
			span.on ON
			span.separator
			span.off OFF
</template>

<style lang="sass" scoped>
	.switch
		border-radius: 20px
		border: solid 1px #999
		display: inline-block
		height: 40px
		overflow: hidden
		-webkit-tap-highlight-color: transparent
		tap-highlight-color: transparent
		user-select: none
		width: 100px

	[type=checkbox]
		display: none

	.label
		cursor: pointer
		margin-left: -60px
		transition: margin .1s
		white-space: nowrap

	*:checked + .label
		margin-left: 0

	.label > *
		vertical-align: top

	.on,
	.off
		display: inline-block
		height: 40px
		line-height: 40px
		text-align: center
		width: 80px

	.on
		background-color: #00f
		background-image: linear-gradient(to bottom, hsl(214,90%,40%), hsl(214,90%,70%))
		box-shadow: 3px 2px 10px rgba(0,0,0,.2) inset, -3px 2px 10px rgba(0,0,0,.2) inset
		color: #fff
		text-shadow: -1px -1px rgba(0,0,0,.3)


	.separator
		background-color: #eee
		border: solid 1px #999
		border-radius: 50%
		box-sizing: border-box
		box-shadow: 1px 2px #fff inset, -1px 2px #fff inset, 1px 1px 5px rgba(0,0,0,.2)
		display: inline-block
		height: 40px
		margin: 0 -20px
		position: relative
		width: 40px

	.off
		background-color: #eee
		box-shadow: 5px 5px 10px rgba(0,0,0,.2) inset
		color: #777
		text-shadow: 1px 1px #fff

</style>

<script>
	module.exports = {
		components: {
		},

		data() {
			return {
			}
		},

		methods: {
		},
	}
</script>

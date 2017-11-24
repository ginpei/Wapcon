<template lang="pug">
	label.switch(@click.prevent="root_onClick" :data-executing="executing")
		input.checkbox(:checked="on" type="checkbox")
		span.label
			span.on ON
			span.separator
				i.separator-icon.powerIcon.fa.fa-power-off(v-show="!executing" aria-hidden="true")
				i.separator-icon.executingIndicator.fa.fa-power-off.fa-pulse(v-show="executing" aria-hidden="true")
			span.off OFF
</template>

<style lang="sass" scoped>
	$height: 2.5rem

	.switch
		border: 1px solid #999
		display: inline-block
		height: $height
		overflow: hidden
		-webkit-tap-highlight-color: transparent
		tap-highlight-color: transparent
		text-shadow: 1px 1px #fff
		user-select: none
		width: $height * 3

	.checkbox
		display: none

	.label
		cursor: pointer
		transition: margin .1s
		white-space: nowrap

		.checkbox:not(:checked) + &
			margin-left: calc(#{$height * -2} - 1px)

		.checkbox:checked + &
			margin-left: 0

	.label > *
		vertical-align: top

	.on,
	.off
		display: inline-block
		height: $height
		line-height: $height
		text-align: center
		text-shadow: 1px 1px #fff
		width: $height * 2

		.switch[data-executing] &
			color: #999

	.on
		color: #060
		background-color: #efe

	.off
		background-color: #fff

	.separator
		background-color: buttonface
		border-left: 1px solid #999
		border-right: 1px solid #999
		box-shadow: 1px 1px 1px #fff inset
		display: inline-block
		height: $height
		line-height: $height
		position: relative
		width: $height

	.separator-icon
		display: inline-block
		height: $height
		line-height: $height
		text-align: center
		width: $height

	.executingIndicator
		color: #999
		text-shadow: none

</style>

<script>
	module.exports = {
		props: [
			'executing',
			'on',
			'onClick',
		],

		methods: {
			root_onClick(event) {
				this.onClick({ on: !this.on })
			},
		},
	}
</script>

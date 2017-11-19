<template lang="pug">
	div.ThemeItem(:class="classes")
		img.thumbnail(:src="thumbnailUrl")
		div.hoverItem.overlay
		div.hoverItem.controlPanel
			GIconButton.control(:onPress="open_onClick" title="Open folder" icon="folder-open-o")
			GIconButton.control(:onPress="edit_onClick" title="Edit" icon="pencil")
			GIconButton.control(v-if="theme.enabled" :onPress="disable_onClick" title="Disable" icon="ban")
			GIconButton.control(v-if="!theme.enabled" :onPress="enable_onClick" title="Enable" icon="superpowers")
		span.name {{theme.name}}
</template>

<style lang="sass" scoped>
	@mixin borderedText($color)
		text-shadow: 1px 1px 0 $color, 1px -1px 0 $color, -1px 1px 0 $color, -1px -1px 0 $color


	.ThemeItem
		--duration: 200ms

		border: 1px solid #ddd
		box-sizing: border-box
		display: inline-block
		height: 150px
		margin: 0 1em 1em 0
		overflow: hidden
		position: relative
		width: 200px

	.thumbnail
		height: 100%
		transition: filter var(--duration)
		width: 100%

		.ThemeItem.-noThumbnail &
			background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAALElEQVQYGWO8d+/efwYkoKioiMRjYGBC4WHhUK6A8T8QIJt8//59ZC493AAAQssKpBK4F5AAAAAASUVORK5CYII=)

		.ThemeItem:hover &
			filter: blur(1px)

	.hoverItem
		opacity: 0
		transition: opacity var(--duration)

		.ThemeItem:hover &
			opacity: 1

	.overlay
		background-color: rgba(0,0,0,0.3)
		height: 100%
		left: 0
		overflow: hidden
		position: absolute
		top: 0
		width: 100%

	.name
		@include borderedText(#fff)
		bottom: 0
		left: 0
		padding: 0.2em
		position: absolute
		width: 100%

	.controlPanel
		position: absolute
		right: 0
		top: 0

</style>

<script>
	const bridge = require('../../lib/bridge.js')
	const GIconButton = require('../../components/form/GIconButton.vue')

	module.exports = {
		components: {
			GIconButton,
		},

		props: [
			'theme',
		],

		data() {
			return {
			}
		},

		computed: {
			classes() {
				return {
					'-noThumbnail': !this.theme.imageUrl,
				}
			},

			thumbnailUrl() {
				const emptyImageUrl = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
				return this.theme.imageUrl || emptyImageUrl
			},
		},

		methods: {
			open_onClick() {
				bridge('openDirectory', { dirPath: this.theme.path })
			},

			edit_onClick() {
				this.$router.push(`/themes/${this.theme.id}/edit`)
			},

			enable_onClick() {
				this.theme.enabled = true
			},

			disable_onClick() {
				this.theme.enabled = false
			},
		},
	}
</script>

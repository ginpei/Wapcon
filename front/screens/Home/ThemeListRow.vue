<template lang="pug">
	option(:value="theme.id" :title="theme.path")
		| {{theme.name}}
</template>

<script>
	module.exports = {
		props: [
			'theme',
		],
	}
</script>

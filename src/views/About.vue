<template>
	<div class="about-wrap">
		<Breadcrumb :breadcrumb="breadcrumb" />
		<div class="about-container">
			<img src="../assets/images/about-head-img.jpg" alt="" />
			<p>
				关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们
			</p>
		</div>
	</div>
</template>

<script>
	import Breadcrumb from '../components/breadcrumb'

	export default {
		data() {
			return {
				breadcrumb: {
					title: {
						zh: '关于我们',
						en: 'ABOUT US'
					},
					address: ['关于我们']
				}
			}
		},
		components: {
			Breadcrumb,
		}
	}
</script>

<style lang="stylus" scoped>
	.about-container 
		width 1100px
		height auto 
		margin auto
		padding 20px 0 100px 0

		img 
			width 100%
			height auto 
		
		p
			font-size 12px
			color #807f7f
			line-height 1.8
			text-indent 2em
			text-align left
			margin-top 20px
</style>


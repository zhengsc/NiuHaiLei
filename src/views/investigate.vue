<template>
	<div class="investigate-wrap">
		<Breadcrumb :breadcrumb="breadcrumb" />
		<div class="investigate-container">
			<div 
				v-for="(invest, index) in investList"
				:key="index"
				:class="['investigate-text-info', index % 2 === 1 ? 'reverse' : '']"
			>
				<div class="text">
					<h3>{{invest.title}}</h3>
					<p>{{invest.content}}</p>
				</div>
				<div class="image">
					<img :src="invest.image" alt="">
				</div>
			</div>
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
				},
				investList: [
					{
						title: '实地考察',
						content: '实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察',
						image: require('../assets/images/investigate-text-image.jpg')
					},
					{
						title: '实地考察',
						content: '实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察',
						image: require('../assets/images/investigate-text-image.jpg')
					},
					{
						title: '实地考察',
						content: '实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察实地考察',
						image: require('../assets/images/investigate-text-image.jpg')
					}
				]
			}
		},
		components: {
			Breadcrumb,
		}
	}
</script>

<style lang="stylus" scoped>
	.investigate-container
		width 1100px
		height auto 
		margin auto 
		padding 20px 0 40px 0

		.investigate-text-info
			display flex
			justify-content space-between
			align-items flex-start
			height 280px

			&.reverse
				flex-direction row-reverse

			.text
				width 525px
				// display flex
				// flex-direction column
				// justify-content flex-start
				// align-items flex-start
				
				h3
					font-size 22px
					color #343434
					text-align left
					line-height 2
					border-bottom 1px solid #909090
				
				p
					font-size 16px
					color #909090
					margin-top 35px
					text-align left

			.image
				width 525px
</style>


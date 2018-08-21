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
		<div class="investigate-contcat-wrap">
			<div class="address">
				<img src="../assets/images/breadcrumb-address-icon.png" alt="">
				<span>地址</span>
				<p>石家庄高新开发区润江慧谷大厦B座2105-2108</p>
			</div>
			<div class="tel">
				<img src="../assets/images/investigate-tel-icon.png" alt="">
				<span>电话</span>
				<p>400-000-0000</p>
			</div>
			<div class="address">
				<img src="../assets/images/investigate-time-icon.png" alt="">
				<span>办公时间</span>
				<p>早9：00~晚18：00</p>
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
	.investigate-container,
	.investigate-container
		width 1100px
		height auto 
		margin auto 
		padding-top 20px

	.investigate-text-info
		display flex
		justify-content space-between
		align-items flex-start
		height 280px
		
		&:not(:first-child) {
			margin-top 35px
		}

		&.reverse
			flex-direction row-reverse

			.image 
				img
					&:hover
						transform translateX(-20px)

		.text
			width 525px
			
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
			overflow hidden

			img 
				transition transform .5s ease

				&:hover 
					transform translateX(20px)

	.investigate-contcat-wrap
		display flex
		justify-content space-around
		align-items center
		width 1100px
		height 320px
		margin 40px auto

		> div 
			display: flex
			flex-direction column
			justify-content center
			align-items center
			width 350px
			height 100%
			background-color #eeeeee

			&:hover
				img
					transform translateY(-10px)

			img 
				transition transform .5s ease

				

			span 
				font-size 18px
				color #919191
				margin: 20px 0

			p 
				font-weight bold
				font-size 22px
				color #232323
				padding 0 20px
				height 60px
</style>


<template>
	<div class="personal-center-wrap">
		<div class="personal-info">
			<div class="info-left">
				<img src="../assets/images/personal-center-user-img.png" alt="">
				<div class="info-container">
					<h3>NiuHaiLei</h3>
					<p>
						<span>男</span>
						<span>1992-05-10</span>
						<span>子时</span>
						<span>18310469506</span>
					</p>
				</div>
			</div>
			<div class="info-right">
				<p>
					<img src="../assets/images/personal-center-amount-icon.png" alt="">
					<span>账户余额：</span>
					<span class="amount">200.00</span>
					<span class="unit">元</span>
				</p>
			</div>
		</div>
		<div class="personal-charge">
			<h3>请选择充值金额</h3>
			<div class="charge-list">
				<div 
					v-for="(item, index) in chargeList"
					:key="index"
					:class="['charge-item', chargeCheckedItem === index ? 'checked' : '']"
					@click="checkChargeItem(index)"
				>
					<img 
						v-if="item.recommend" 
						src="../assets/images/personal-center-charge-recommend.png" 
						alt=""
						class="charge-item-recommend"
					>
					<div>
						<span>{{item.money}}</span>
						<span>元</span>
					</div>
					<p>充值金额</p>
					<img 
						class="charge-item-checked"
						src="../assets/images/personal-center-charge-checked.png" 
						alt=""
					>
				</div>
			</div>
			<el-button class="check-charge-item-btn" type="primary">确认</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		
		data() {
			return {
				chargeList: [
					{
						money: 400,
						recommend: true
					},
					{
						money: 300,
						recommend: false
					},
					{
						money: 200,
						recommend: false
					},
					{
						money: 100,
						recommend: false
					},
				],
				chargeCheckedItem: 0,
			}
		},
		watch: {
			'chargeList'(list) {
				let index = list.findIndex(item => item.recommend)

				this.chargeCheckedItem = index === -1 ? 0 : index
			}
		},
		methods: {
			checkChargeItem(index) {
				this.chargeCheckedItem = index
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.personal-center-wrap
		height auto

		.personal-info
			display flex
			justify-content space-between
			align-items center 
			height 200px
			color #fff
			background url('../assets/images/personal-center-banner.png') center center no-repeat
			background-size cover
			padding 0 20px

			.info-left 
				display flex
				justify-content flex-start
				align-items center

				img 
					width 100px
					height 100px
					margin-right 20px

				.info-container
					text-align left
					h3 
						font-size 24px
						margin-bottom 10px
					p 
						font-size 12px

						span 
							padding-right 8px
							line-height 1

							&:not(:last-child) 
								border-right 1px solid #fff
							&:not(:first-child)
								padding-left 8px

			.info-right
				display flex
				align-items center
				justify-content center
				height 100px
				padding 0 20px
				background-color rgba(0, 0, 0, 0.3)
				border-radius 4px

				p 
					text-align center
					font-size 14px

					img 
						width 16px
						height 16px
						margin-right 5px

					.amount,
					.unit 
						color #de0000
					.amount 
						font-size 50px
						margin-right 5px
					.unit
						font-size 16px

		.personal-charge
			width 1000px
			height auto
			margin auto
			margin-top 30px
			box-shadow 0 0 30px 1px rgba(0, 0, 0, 0.2)
			padding-top 40px

			h3 
				color #636363
				font-size 16px
				font-weight normal
				margin-bottom 40px
			
			.charge-list
				width 960px
				margin auto
				display flex
				justify-content flex-start
				align-items center

				.charge-item 
					position relative
					width 225px
					height 150px
					border 1px solid #bebebe
					border-radius 5px
					display flex
					flex-direction column
					align-items center
					justify-content center
					padding 0 30px
					color #fd521f
					cursor pointer

					&.checked 
						border-color #fd521f

						.charge-item-checked 
							display block

					&:not(:last-child)
						margin-right 20px

					.charge-item-recommend,
					.charge-item-checked
						position absolute 
						right 0

					.charge-item-recommend 
						top 0

					.charge-item-checked 
						bottom -1px
						display none

					div 
						width 100%
						border-bottom 1px solid #fd521f

						span
							&:first-child 
								font-size 40px
								margin-right 5px
							&:last-child 
								font-size 16px

					p 
						font-size 16px
						margin-top 20px
			
			.check-charge-item-btn
				width 120px
				margin 30px 0
</style>


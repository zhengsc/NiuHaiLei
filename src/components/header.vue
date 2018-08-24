<template>
	<div class="header-wrap">
		<div class="header-container">
			<div class="header-logo-wrap">
				<div class="container">
					<div class="header-logo-wrap">
						<a href="/">
							<img src="../assets/images/header-logo.png" alt="" />
						</a>
					</div>
					<div class="header-tool-wrap">
						<div class="header-tool-tel">
							<img src="../assets/images/header-tel-icon.png" alt="" />
							<span>TEL: 400-6588-128</span>
						</div>
						<div class="header-tool-user">
							<a href="javascript:;" @click="openLoginWrapHandler">登录</a>
							<span>|</span>
							<a href="javascript:;">注册</a>
						</div>
					</div>
				</div>
			</div>
			<div class="header-menu-wrap">
				<div class="container">
					<router-link
						v-for="(menu, index) in menuList"
						:key="index"
						:to="menu.path"
						active-class="active"
					>{{menu.text}}</router-link>
				</div>
			</div>
			<div class="header-banner-wrap">
				
			</div>
		</div>
	</div>
</template>

<script>
	import Menu from '../assets/js/menu'
	
	export default {
		data() {
			return {
				menuList: Menu
			}
		},
		methods: {
			openLoginWrapHandler() {
				this.$store.commit('setLoginWrapState', true)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.header-wrap 
		width: 100%
		height: auto

		.header-container 

			.header-logo-wrap
				height 52px
				background-color: #f5e9da
			.header-menu-wrap
				height 50px
				background: -webkit-linear-gradient(top, #7d4f4e, #502c2b)
			.header-banner-wrap
				height 192px
				background #453039 url('../assets/images/header-banner.png') center center no-repeat
			.container
				width: 1100px
				margin: auto
				display: flex
				justify-content: space-between
				align-items: center

				.header-tool-wrap 
					display: flex
					justify-content: center
					align-items: center

					> div 
						display: flex
						align-items: center

					.header-tool-tel
						margin-right: 35px

						span 
							margin-left: 10px

					.header-tool-user 
						a 
							margin: 0 10px
							font-size: 15px

			.header-menu-wrap
				.container
					display: flex
					justify-content: center
					align-items: center
					height 100%

					a
						display flex
						height 100%
						align-items center
						justify-content center
						flex 1
						color #fff
						cursor pointer
						font-size 16px
						transition all .3s ease

						&.active,
						&:hover
							background-color #533231

						&:not(:last-child) 
							border-right 1px solid #5d3c3a
</style>

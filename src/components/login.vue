<template>
	<div class="login-wrap">
		<transition name="slide-in">
			<div v-if="loginContainerShow" class="login-container">
				<div class="login-module">
					<img class="login-close" @click="closeLoginWrapHandler" src="../assets/images/close-icon.png" alt="">
					<div class="login-desc-line">
						<img src="../assets/images/login-head-line-icon.jpg" alt="">
						<div>
							<h3>绑定手机</h3>
							<p>
								<img src="../assets/images/login-head-warning-icon.jpg" alt="">
								<span>根据法律相关规定，用户需绑定真实手机号进行相关验证</span>
							</p>
						</div>
					</div>
					<div class="login-input-wrap">
						<el-form
							label-position="left"
							label-width="70px"
						>
							<el-form-item
								label="手机号:"
							>
								<el-input v-model="loginObj.phone" placeholder="请输入手机号"></el-input>
							</el-form-item>
							<el-form-item
								label="验证码:"
							>
								<div class="login-form-code-line">
									<el-input class="code-line-input" v-model="loginObj.code" placeholder="请输入验证码"></el-input>
									<el-button 
										class="code-line-button" 
										:disabled="isSendingCode"
										@click="sendCodeHandler"
									>{{isSendingCode ? countDown + ' S' : '点击发送'}}</el-button>
								</div>
							</el-form-item>
							<div class="login-form-tool-wrap">
								<el-button 
									class="login-form-submit" 
									type="primary" 
									:disabled="submitInfoBtnDisabled"
									@click="login"
								>提交</el-button>
							</div>
						</el-form>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	const COUNT_DOWN_SECOND = 60

	export default {
		data() {
			return {
				loginObj: {
					phone: '',
					code: '',
				},
				loginContainerShow: false,
				countDown: COUNT_DOWN_SECOND,
				isSendingCode: false,
			}
		},
		computed: {
			submitInfoBtnDisabled() {
				return !this.isPhone() || !this.loginObj.code
			}
		},
		mounted() {
			this.loginContainerShow = true
		},
		methods: {
			login() {
				// TODO login
			},
			sendCode() {
				this.countDownHandler()
			},
			closeLoginWrapHandler() {
				this.$store.commit('setLoginWrapState', false)
			},
			isPhone() {
				return /(13|15|17|18|14|16)[0-9]{9}/.test(this.loginObj.phone)
			},
			sendCodeHandler() {
				if(!this.isPhone()) {
					this.$message.error('请输入正确的手机号')

					return 
				}

				this.sendCode()
			},
			countDownHandler() {
				let timer = null
				this.isSendingCode = true
				this.countDown = COUNT_DOWN_SECOND

				timer = setInterval(() => {
					if(this.countDown > 0) {
						this.countDown --
					} else {
						clearInterval(timer)
						this.isSendingCode = false
					}
				}, 1000)
			}
		}
	}
</script>

<style lang="stylus" scoped>

	@keyframes translate-in {
		0% {
			transform: translateY(-3000px);
		}
		60% {
			transform: translateY(25px);
		}
		75% {
			transform: translateY(-10px);
		}
		90% {
			transform: translateY(5px);
		}
		100% {
			transform: translateY(0);
		}
	}

	.slide-in-enter-active, .slide-in-leave-active {
		animation: translate-in 1s cubic-bezier(.215, .61, .355, 1);
	}

	.login-wrap 
		position fixed
		top 0
		left 0
		bottom 0
		right 0
		overflow hidden
		background-color rgba(0, 0, 0, 0.8)
		display flex
		justify-content center
		align-items center

		.login-container
			width 500px
			height 380px
			background-color #ffffff
			border-radius 8px
			padding 30px 20px
			position relative

	.login-module
		width 100%

		.login-close
			width 14px
			height 14px
			position absolute 
			top 30px
			right 20px
			cursor pointer

		.login-desc-line 
			height 80px
			display flex
			justify-content flex-start
			align-items center
			border-bottom 1px solid #ccc
			
			img 
				width 24px
				height auto
				flex-grow 0
				margin 0 20px

			div 
				text-align left
				
				h3 
					font-size 16px

				p 
					font-size 12px
					display flex
					align-items center

					span 
						color #ff3a00

					img 
						width 14px
						height 14px
						margin-right 4px
						margin-left 0

		.login-input-wrap
			width 340px
			margin auto
			margin-top 40px

			.login-form-code-line
				display flex
				justify-content center
				align-items center

				.code-line-button
					margin-left 10px
					color #fff
					background-color #0060cd

			.login-form-tool-wrap
				text-align center

				.login-form-submit
					width 220px
					margin-top 10px
</style>


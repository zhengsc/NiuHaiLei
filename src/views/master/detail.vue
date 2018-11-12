<template>
	<div class="master-detail-wrap">
		<Breadcrumb :breadcrumb="breadcrumb" />
		<el-dialog
			:visible.sync="videoChatDialogVisible"
			width="700px"
		>
			<VideoChat />
		</el-dialog>
		<div class="master-personal-info">
			<div class="master-personal-img">
				<el-carousel 
					:interval="3000" 
					arrow="always" 
					class="maser-personal-carousel-item"
					indicator-position="none"
				>
					<el-carousel-item
						v-for="(carousel, index) in masterDetail.info.thumb"
						:key="index"
					>
						<img :src="carousel" alt="" />
					</el-carousel-item>
				</el-carousel>

			</div>
			<div class="master-personal-text">
				<div class="master-title">
					<h3>{{masterDetail.info.name}}</h3>
					<span>
						<el-tag 
							v-for="(tag, index) in masterDetail.info.biaoqian"
							:key="index"
							size="mini"
							class="master-tag"
						>
							{{tag}}
						</el-tag>
					</span>
				</div>
				<div class="master-desc">
					<p>{{masterDetail.info.description}}</p>
				</div>
			</div>
		</div>
		<div class="master-server-info">
			<h3 class="master-plate-title">
				<span>服务项目</span>
			</h3>
			<div class="master-server-list" v-if="masterDetail.fuwu">
				<div 
					class="master-server-item" 
					v-for="(server, index) in masterDetail.fuwu"
					:key="index"
				>
					<div class="item-desc">
						<p class="item-desc-title">
							<span>{{server.title}}</span>
							<span>
								<span>{{server.money}}</span>
								/次
							</span>
						</p>
						<p class="item-desc-text">
							<span>{{server.content}}</span>
						</p>
					</div>
					<div class="item-status">
						<div v-if="masterDetail.info.status == 1">
							<p>大师在线</p>
							<p>开始呼叫</p>
						</div>
						<div v-else>
							<p>业务繁忙</p>
							<p>暂停接单</p>
						</div>
					</div>
					<div>
                      <el-button @click="showVideoChatDialog">视频</el-button>
					</div>
				</div>
			</div>
			<div
				v-else
				class="no-message"
			>
				<h3>暂无服务</h3>
			</div>
		</div>
		<div class="master-comments-info">
			<h3 class="master-plate-title">
				<span>用户评价</span>
			</h3>
			<div class="master-comments-list">
				<div 
					class="comment-item"
					v-for="(comment, index) in masterDetail.Comments"
					:key="index"
				>
					<div class="comment-container">
						<div class="comment-user-info">
							<img src="../../assets/images/master-detail-comment-user.jpg" alt="">
							<div>
								<p class="comment-user-line">匿名用户</p>
								<p class="comment-date-line">{{getDateString(comment.addtime)}}</p>
							</div>
						</div>
						<div class="comment-context">
							<p>{{comment.content}}</p>
						</div>
					</div>
					<!-- <div class="cmment-tool">
						<el-button type="text">回复</el-button>
					</div> -->
				</div>
			</div>
			<div class="master-comment-write">
				<div class="comment-write-line">
					<img src="../../assets/images/master-detail-comment-write-user.jpg" alt="">
					<p>
						<el-input 
							class="comment-write-input" 
							placeholder="写下你的评论..." 
							v-model="userInputData.comment"
							:disabled="!getLoginStatus.login"
						>
							<template slot="append">{{userInputData.comment.length}}/{{totalComment}}</template>
						</el-input>
					</p>
					<el-button type="primary" @click="submitComment" :disabled="!getLoginStatus.login">发送</el-button>
				</div>
			</div>
		</div>
		<div class="master-other-list">
			<h3 class="master-plate-title">
				<span>其他大师</span>
			</h3>
			<div class="other-list-container">
				<Master :masterList="masterDetail.other" />
			</div>
		</div>
	</div>
</template>

<script>
	import Breadcrumb from '../../components/breadcrumb'
	import Master from '../../components/master'
	import VideoChat from '../../components/videoChat.vue'

	import mockData from '../../assets/js/mock'
	import Util from '../../assets/js/util'

	export default {
		data() {
			return {
				breadcrumb: {
					title: {
						zh: '大师详情',
						en: 'DETAILS OF THE MASTER'
					},
					address: ['大师列表', '>', '详情'],
				},
				userInputData: {
					comment: '',
				},
				totalComment: 200,
				videoChatDialogVisible: false,
				masterDetail: {
					info: {
						content: '',
						description: '',
						logo: '',
						name: '',
						biaoqian: [],
						thumb: [],
					},
					other: [],
					fuwu: [],
					comments: [],

					name: '罗永丰',
					tags: ['风水', '八卦', '周易'],
					images: [
						require('../../assets/images/master-detail-images-1.jpg'),
						require('../../assets/images/master-detail-images-2.jpg'),
						require('../../assets/images/master-detail-images-1.jpg'),
					],
					desc: '大师简介大师简介大师简介大师简介大师简介大师简介大师简介大师简介大师简介大师简介大师简介大师简介大师简介大师简介大师简介大师简介大师简介大师简介大师简介大师简介',
					services: [
						{
							name: '八卦',
							price: 12,
							desc: '算什么都很准算什么都很准算什么都很准算什么都很准算什么都很准算什么都很准',
							status: 1,
						},
						{
							name: '八卦',
							price: 12,
							desc: '算什么都很准',
							status: 0,
						},
						{
							name: '八卦',
							price: 12,
							desc: '算什么都很准',
							status: 1,
						},
						{
							name: '八卦',
							price: 12,
							desc: '算什么都很准',
							status: 0,
						},
						{
							name: '八卦',
							price: 12,
							desc: '算什么都很准',
							status: 1,
						},
					],
					commentList: [
						{
							userPic: require('../../assets/images/master-detail-comment-user.jpg'),
							username: '匿名用户',
							date: '2018-08-25',
							context: '特别准，而且会告诉你很多别的需要注意的事，感谢了，还会再次结缘的特别准，而且会告诉你很多别的需要注意的事，感谢了，还会再次结缘的特别准，而且会告诉你很多别的需要注意的事，感谢了，还会再次结缘的'
						},
						{
							userPic: require('../../assets/images/master-detail-comment-user.jpg'),
							username: '匿名用户',
							date: '2018-08-25',
							context: '算的很准'
						},
						{
							userPic: require('../../assets/images/master-detail-comment-user.jpg'),
							username: '匿名用户',
							date: '2018-08-25',
							context: '算的很准'
						},
						{
							userPic: require('../../assets/images/master-detail-comment-user.jpg'),
							username: '匿名用户',
							date: '2018-08-25',
							context: '算的很准'
						}
					]
				},
				otherMasterList: mockData.masterList.slice(0, 4)
			}
		},
		components: {
			Breadcrumb,
			Master,
			VideoChat,
		},
		watch: {
			'userInputData.comment': {
				handler: function(val) {
					this.$nextTick(() => {
						this.userInputData.comment = val.slice(0, this.totalComment)
					})
				},
				deep: true
			},
			'$route'() {
				let id = this.$route.query.id

				this.getMasterDetail(id)
			}
		},
		computed: {
			getLoginStatus() {
				return this.$store.state.userInfo
			}
		},
		created() {
			let id = this.$route.query.id
			let orderId = this.$route.query.orderId

			if (orderId) {
				this.validatePayResule(orderId)
			}

			this.getMasterDetail(id)
		},
		methods: {
			validatePayResule(orderId) {
				this.$http.get(this.Api.validateOrderId, {
					orderId,
				}).then(resp => {
					this.$alert('恭喜你，预约成功', '提示', {
						type: 'success'
					}).then(() => {
						// TODO
					})
				})
			},
			toggleVideoChatDialog() {
				this.videoChatDialogVisible = !this.videoChatDialogVisible
			},
			showVideoChatDialog() {
				this.toggleVideoChatDialog()
			},
			getMasterDetail(id) {
				this.$http.post(this.Api.POST_MASTER_DETAIL, 
					this.$qs.stringify({id:this.$route.query.id})
				).then(response => {
					this.masterDetail = response.data
				})
			},
			getDateString(timestamp) {
				return Util.getDateString(timestamp)
			},
			submitComment() {
				this.$http.post(this.Api.POST_SUBMIT_COMMENT, {
					content: this.userInputData.comment,
					mid: this.getLoginStatus.user.mid,
					uid: this.masterDetail.info.id,
				}).then(resp => {
					console.log(resp)
				}).catch(error => {
					console.log(error)
				})
			}
		}
	}
</script>

<style lang="stylus">
	.master-detail-wrap 
		width 1100px
		height auto 
		margin auto
		padding-bottom 20px

		.master-personal-info
			display flex
			justify-content center
			align-items: center
			margin-top 20px
			
			> div 
				width 50%
				height 300px

			.master-personal-img 
				.maser-personal-carousel-item
					width 100%
					height 100%

					img 
						width 100%
						height 100%

			.master-personal-text
				padding-left 30px

				.master-title 
					display flex
					justify-content space-between
					align-items center
					border-bottom 1px solid #dedede
					padding-bottom 10px
					margin-bottom 20px

					h3 
						font-size 16px
						color #5f3736

					.master-tag 
						margin-left 10px

				.master-desc
					p 
						font-size 12px
						line-height 1.8
						text-align left
						text-indent 2em
						color #090909

		.master-plate-title
			color #ffffff
			background-color #ececec
			height 70px
			display flex
			justify-content flex-start
			align-items center

			span
				padding-left 10px
				border-left #5f3736 3px solid 
				margin-left 16px
				font-size 18px
				line-height 1.2
				font-weight normal
				color #5f3736

		.master-server-info
			margin-top 40px

			> div 
				border 1px solid #d9d9d9
			
			.master-server-list
				display flex
				justify-content flex-start
				align-items flex-start
				flex-wrap wrap 
				padding 20px
				padding-bottom 0

				.master-server-item 
					width 520px
					height 100px
					display flex
					justify-content center
					align-items center
					border-top-right-radius 4px
					border-bottom-right-radius 4px
					margin-bottom 20px
					cursor pointer
					transition transform .5s ease 

					&:hover 
						transform translateY(-5px)

					&:nth-child(2n) {
						margin-left 18px
					}

					.item-desc
						flex-grow 1
						text-align left
						padding 15px 20px
						background-color #ececec
						height 100%
						display flex
						align-items flex-start
						flex-direction column
						justify-content flex-start

						.item-desc-title 
							font-size 18px

							span 
								&:last-child 
									color #c80d0d
									margin-left 6px

									span 
										font-weight bold

						.item-desc-text 
							font-size 14px
							margin-top 8px
					
					.item-status
						width 120px
						height 100%
						color #fff
						font-size 18px
						flex-shrink 0
						display flex
						flex-direction column
						justify-content center
						align-items center
						background-color: #5f3736
						border-radius 4px
						line-height 1.6

		.master-comments-info
			margin-top 40px

			.master-comments-list
				height auto
				
				.comment-item
					height 120px
					display flex
					justify-content center
					align-items center
					padding 0 20px
					border-bottom 1px dashed #d9d9d9						

					.comment-container
						flex-grow 1

						.comment-user-info 
							display flex
							justify-content flex-start
							align-items center

							img 
								width 40px
								height 40px
								margin-right 8px

							div 
								display flex
								flex-direction column 
								justify-content space-between
								align-items flex-start
								height 40px
							
								p 
									text-align left

									&.comment-user-line 
										font-size 14px
									
									&.comment-date-line 
										font-size 12px
										color #ccc

						.comment-context 
							text-align left
							margin-top 15px
							font-size 16px
							padding-right 20px 

					.cmment-tool
						font-size 16px

			.master-comment-write 
				margin-top 10px
				padding 15px
				background #fafafa
				border-radius 4px

				.comment-write-line
					display flex
					justify-content center
					align-items center

					img 
						width 40px
						height 40px
						margin-right 10px

					p 
						flex-grow 1
						margin-right 10px
						position relative

						// .comment-write-input
						// 	input
						// 		padding-right 70px

						span 
							position absolute 
							top 0
							right 10px
							display flex
							height 100%
							justify-content flex-end
							align-items center
							font-size 12px

		.master-other-list
			margin-top 40px

</style>


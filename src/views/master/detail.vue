<template>
	<div class="master-detail-wrap">
		<Breadcrumb :breadcrumb="breadcrumb" />
		<div class="master-personal-info">
			<div class="master-personal-img">
				<el-carousel :interval="3000" arrow="always">
					<el-carousel-item
						v-for="(carousel, index) in masterDetail.images"
						:key="index"
					>
						<img :src="carousel" alt="" />
					</el-carousel-item>
				</el-carousel>
			</div>
			<div class="master-personal-text">
				<div class="master-title">
					<h3>{{masterDetail.name}}</h3>
					<span>
						<el-tag 
							v-for="(tag, index) in masterDetail.tags"
							:key="index"
							size="mini"
							class="master-tag"
						>
							{{tag}}
						</el-tag>
					</span>
				</div>
				<div class="master-desc">
					<p>{{masterDetail.desc}}</p>
				</div>
			</div>
		</div>
		<div class="master-server-info">
			<h3 class="master-plate-title">
				<span>服务项目</span>
			</h3>
			<div class="master-server-list">
				<div 
					class="master-server-item" 
					v-for="(server, index) in masterDetail.services"
					:key="index"
				>
					<div class="item-desc">
						<p class="item-desc-title">
							<span>{{server.name}}</span>
							<span>
								<span>{{server.price}}</span>
								/次
							</span>
						</p>
						<p class="item-desc-text">
							<span>{{server.desc}}</span>
						</p>
					</div>
					<div class="item-status">
						<div v-if="server.status === 0">
							<p>业务繁忙</p>
							<p>暂停接单</p>
						</div>
						<div v-else-if="server.status === 1">
							<p>大师在线</p>
							<p>开始呼叫</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="master-comments-info">
			<h3 class="master-plate-title">
				<span>用户评价</span>
			</h3>
			<div class="master-comments-list">
				<div 
					class="comment-item"
					v-for="(comment, index) in masterDetail.commentList"
					:key="index"
				>
					<div class="comment-container">
						<div class="comment-user-info">
							<img :src="comment.userPic" alt="">
							<div>
								<p>{{comment.username}}</p>
								<p>{{comment.date}}</p>
							</div>
						</div>
						<div class="comment-context">
							<p>{{comment.context}}</p>
						</div>
					</div>
					<div class="cmment-tool">
						
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Breadcrumb from '../../components/breadcrumb'

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
				masterDetail: {
					name: '罗永丰',
					tags: ['风水', '八卦', '周易'],
					images: [
						'www.baidu.com',
						'www.baidu.com',
						'www.baidu.com',
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
						{
							name: '八卦',
							price: 12,
							desc: '算什么都很准',
							status: 0,
						}
					],
					commentList: [
						{
							userPic: 'www.baidu.com',
							username: '匿名用户',
							data: '2018-08-25',
							context: '算的很准'
						},
						{
							userPic: 'www.baidu.com',
							username: '匿名用户',
							data: '2018-08-25',
							context: '算的很准'
						},
						{
							userPic: 'www.baidu.com',
							username: '匿名用户',
							data: '2018-08-25',
							context: '算的很准'
						},
						{
							userPic: 'www.baidu.com',
							username: '匿名用户',
							data: '2018-08-25',
							context: '算的很准'
						}
					]
				}
			}
		},
		components: {
			Breadcrumb,
		}
	}
</script>

<style lang="stylus" scoped>
	.master-detail-wrap 
		width 1100px
		height auto 
		margin auto

		.master-personal-info
			display flex
			justify-content center
			align-items: center
			margin-top 20px
			
			> div 
				width 50%
				height 400px

			.master-personal-text
				padding-left 30px

				.master-title 
					display flex
					justify-content space-between
					align-items center

					h3 
						font-size 16px

					.master-tag 
						margin-left 10px

				.master-desc
					p 
						font-size 14px
						line-height 1.8
						text-align left
						text-indent 2em

		.master-plate-title
			color #ffffff
			background-color #cccccc
			height 30px
			display flex
			justify-content flex-start
			align-items center

			span
				padding-left 10px
				border-left #ff0000 4px solid 
				margin-left 10px
				font-size 14px
				line-height 1

		.master-server-info
			margin-top 20px
			
			.master-server-list
				display flex
				justify-content flex-start
				align-items flex-start
				flex-wrap wrap 
				padding 20px
				padding-bottom 0
				border 1px solid #ccc

				.master-server-item 
					width 520px
					height 80px
					background-color: #ff0000
					display flex
					justify-content center
					align-items center
					border-top-right-radius 4px
					border-bottom-right-radius 4px
					margin-bottom 20px

					&:nth-child(2n) {
						margin-left 18px
					}

					.item-desc
						flex-grow 1
						text-align left
						padding 10px 20px
						background-color #ccc
						height 100%
						display flex
						align-items flex-start
						flex-direction column
						justify-content flex-start

						.item-desc-title 
							font-size 16px

							span 
								&:last-child 
									color #ff0000
									margin-left 6px

									span 
										font-weight bold

						.item-desc-text 
							font-size 12px
					
					.item-status
						width 120px
						flex-shrink 0

		.master-comments-info
			margin-top 30px

			.master-comments-list
				height auto


</style>


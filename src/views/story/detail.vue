<template>
	<div class="story-detail-wrap">
		<Breadcrumb :breadcrumb="breadcrumb"></Breadcrumb>
		<div class="story-detail-wrap">
			<div class="story-title-info">
				<h3>{{story.title}}</h3>
				<div class="title-info-wrap">
					<el-tag type="info" size="mini">{{story.tag}}</el-tag>
					<span>原作者：{{story.author}}</span>
					<span><img src="" alt="">{{story.createDate}}</span>
					<span><img src="" alt="">{{story.readCount}}</span>
					<span>
						来自<a :href="story.referrer" target="_blank">{{story.referrer}}</a>
					</span>
				</div>
			</div>
			<div class="story-conetnt-wrap">
				<p>这里会是一段富文本，这里只做示例。这里会是一段富文本，这里只做示例。这里会是一段富文本，这里只做示例。这里会是一段富文本，这里只做示例。这里会是一段富文本，这里只做示例。这里会是一段富文本，这里只做示例。这里会是一段富文本，这里只做示例。这里会是一段富文本，这里只做示例。这里会是一段富文本，这里只做示例。这里会是一段富文本，这里只做示例。</p>
				<p>这是一段富文本，这里只做示例</p>
				<p>这是一段富文本，这里只做示例</p>
				<p>这是一段富文本，这里只做示例</p>
				<p>这是一段富文本，这里只做示例</p>
				<p>这是一段富文本，这里只做示例</p>
				<p>这是一段富文本，这里只做示例</p>
				<p>这是一段富文本，这里只做示例</p>
				<p>这是一段富文本，这里只做示例</p>
				<p>这是一段富文本，这里只做示例</p>
				<p>这是一段富文本，这里只做示例</p>
				<p>这是一段富文本，这里只做示例</p>
				<p>这是一段富文本，这里只做示例</p>
				<p>这是一段富文本，这里只做示例</p>
			</div>
			<div class="story-tool-wrap">
				<div class="story-change-page">
					<div><a :href="story.prevPage.href">上一篇：{{story.prevPage.title}}</a></div>
					<div><a :href="story.nextPage.href">下一篇：{{story.nextPage.title}}</a></div>
				</div>
				<div class="story-about-story">
					<h5>
						<span>相关阅读</span>
					</h5>
					<div class="about-story-list">
						<StoryItem
							v-for="story in storyAboutList"
							:key="story.id"
							:story="story"
						 />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Util from '../../assets/js/util'
	import Mock from '../../assets/js/mock'

	import Breadcrumb from '../../components/breadcrumb'
	import StoryItem from '../../components/storyItem'

	export default {
		data() {
			return {
				breadcrumb: {
					title: {
						zh: '命理故事',
						en: 'FREE FORTUNE TELLING'
					},
					address: ['命理故事', '>', '详情'],
				},
				story: {
					title: '八字，当官的命',
					tag: '原创',
					author: '作者名称',
					createDate: '2018-08-23 12:19',
					readCount: 15,
					referrer: 'www.baidu.com',
					nextPage: {
						title: '八字，当官的命',
						href: 'www.baidu.com'
					},
					prevPage: {
						title: '八字，当官的命',
						href: 'www.baidu.com'
					},
				},
				storyAboutList: Mock.storyList.slice(0, 4)
			}
		},
		components: {
			Breadcrumb,
			StoryItem,
		},
		created() {
			console.log('来自created')
			console.log(this.$route)
		},
		watch: {
			'$route': function() {
				console.log('watch')
				console.log(this.$route)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.story-detail-wrap
		width 1100px
		height auto 
		margin 20px auto 

		.story-title-info
			h3 
				font-size 18px

			.title-info-wrap
				display flex
				justify-content center
				align-items center
				font-size 12px
				margin 20px 0

				> span
					margin 0 10px
					display flex
					justify-content center
					align-items center

					a 
						color #0000ff

					img 
						display block
						width 10px
						height 10px
						border 1px solid #f00

		.story-conetnt-wrap
			font-size 14px
			line-height 2
			letter-spacing 1px
			text-indent 2em
			
			p 
				text-align left	
		
		.story-tool-wrap
			height auto 
			border-top 1px solid #ccc
			margin-top 20px
			padding-top 20px

			.story-change-page
				display flex
				justify-content space-between
				align-items center
				font-size 12px

			.story-about-story
				margin-top 50px

				h5 
					height 34px
					text-align left 
					background-color #cccccc
					border-radius 4px

					span 
						// display flex
						// justify-content center
						// align-items center
						padding-left 8px
						line-height 34px
						margin-left 8px
						border-left 4px solid #f00

				.about-story-list
					display flex
					justify-content flex-start
					align-items center
					margin-top 20px
</style>


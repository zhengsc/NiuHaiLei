<template>
	<div class="index-wrap">
		<div class="index-user-input-area-wrap">
			<h3>精准测算</h3>
			<div class="user-submit-data-form">
				<el-form
					:model="userInputData"
					:rules="userInputRules"
					ref="userSubmitForm"
					inline
				>
					<el-form-item class="user-input-item" prop="name">
						<el-input v-model="userInputData.name" placeholder="姓名"></el-input>
					</el-form-item>
					<el-form-item class="user-input-item" prop="sex">
						<el-select placeholder="性别" class="w130" v-model="userInputData.sex">
							<el-option value="1" label="男"></el-option>
							<el-option value="2" label="女"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="user-input-item" prop="type">
						<el-select placeholder="阳历/农历" class="w130" v-model="userInputData.type">
							<el-option value="1" label="阳历"></el-option>
							<el-option value="2" label="农历"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="user-input-item" prop="year">
						<el-date-picker
							type="year"
							placeholder="年"
							class="w130"
							format="yyyy"
							value-format="yyyy"
							v-model="userInputData.year"
						></el-date-picker>
					</el-form-item>
					<el-form-item class="user-input-item" prop="month">
						<el-select
							placeholder="月"
							class="w130"
							v-model="userInputData.month"
							:disabled="!userInputData.year"
							clearable
						>
							<span slot="prefix" class="el-icon-date"></span>
							<el-option 
								v-for="m in monthes"
								:key="m.id"
								:label="m.text"
								:value="m.id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="user-input-item" prop="date">
						<el-select
							placeholder="日"
							class="w130"
							v-model="userInputData.date"
							:disabled="!userInputData.year && !userInputData.month"
							clearable
						>
							<span slot="prefix" class="el-icon-date"></span>
							<el-option 
								v-for="d in dates"
								:key="d"
								:label="d"
								:value="d"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="user-input-item" prop="hour">
						<el-select
							placeholder="时"
							class="w130"
							v-model="userInputData.hour"
							clearable
						>
							<el-option 
								v-for="time in timeNotc"
								:key="time.id"
								:value="time.id"
								:label="time.text"
							></el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
			<div class="user-submit-data-button">
				<button class="user-submit-button" @click="validateUserSubmitData">提交</button>
			</div>
		</div>
		<div class="index-master-list-wrap">
			<div class="master-list-title">
				<h3>咨询大师</h3>
			</div>
			<div class="master-list-content">
				<div
					v-for="master in masterList"
					:key="master.id"
					class="master-list-item"
				>
					<div class="master-detail-img">
						<img :src="master.picture" alt="">
					</div>
					<div class="master-detail-text-wrap">
						<div class="master-detail-name">
							<span>{{master.name}}</span>
							<span :class="['master-status', master.status === 1 ? 'online' : 'offline']">{{master.status === 1 ? '在线' : '离线'}}</span>
						</div>
						<div class="master-detail-tag">
							<el-tag 
								v-for="(tag, index) in master.tags"
								:key="index"
								size="mini"
								class="tag-item"
							>{{tag}}</el-tag>
						</div>
						<div class="master-detail-desc">
							<p>{{master.desc}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Util from '../assets/js/util'

	export default {
		data() {
			return {
				timeNotc: Util.timeNotc,
				userInputData: {
					name: '',
					sex: '',
					type: '',
					year: '',
					month: '',
					date: '',
					hour: '',
				},
				userInputRules: {
					name: [ { required: true, message: '请输入姓名' } ],
					sex: [ { required: true, message: '请选择性别' } ],
					type: [ { required: true, message: '请选择阴历/农历' } ],
					year: [ { required: true, message: '请选择出生年份' } ],
					month: [ { required: true, message: '请选择出生月份' } ],
					date: [ { required: true, message: '请选择出生日期' } ],
					hour: [ { required: true, message: '请选择出生时辰' } ],
				},
				monthes: [
					{ id: 1, text: '一月' },
					{ id: 2, text: '二月' },
					{ id: 3, text: '三月' },
					{ id: 4, text: '四月' },
					{ id: 5, text: '五月' },
					{ id: 6, text: '六月' },
					{ id: 7, text: '七月' },
					{ id: 8, text: '八月' },
					{ id: 9, text: '九月' },
					{ id: 10, text: '十月' },
					{ id: 11, text: '十一月' },
					{ id: 12, text: '十二月' },
				],
				dates: [],
				masterList: [
					{
						id: 1,
						name: 'NiuHaiLei',
						picture: require('../assets/images/index-master-picture.jpg'),
						status: 1, // 在线
						tags: [ '推算', '风水', '事业运势' ],
						desc: '江湖高手，算命准确率极高，多年网络实战经验，实话实说不留情面',
					}, 
					{
						id: 2,
						name: 'NiuHaiLei',
						picture: require('../assets/images/index-master-picture.jpg'),
						status: 2, // 离线
						tags: [ '推算', '风水', '事业运势' ],
						desc: '江湖高手，算命准确率极高，多年网络实战经验，实话实说不留情面',
					},
					{
						id: 3,
						name: 'NiuHaiLei',
						picture: require('../assets/images/index-master-picture.jpg'),
						status: 1, // 在线
						tags: [ '推算', '风水', '事业运势' ],
						desc: '江湖高手，算命准确率极高，多年网络实战经验，实话实说不留情面',
					}, 
					{
						id: 4,
						name: 'NiuHaiLei',
						picture: require('../assets/images/index-master-picture.jpg'),
						status: 2, // 离线
						tags: [ '推算', '风水', '事业运势' ],
						desc: '江湖高手，算命准确率极高，多年网络实战经验，实话实说不留情面',
					},
					{
						id: 5,
						name: 'NiuHaiLei',
						picture: require('../assets/images/index-master-picture.jpg'),
						status: 1, // 在线
						tags: [ '推算', '风水', '事业运势' ],
						desc: '江湖高手，算命准确率极高，多年网络实战经验，实话实说不留情面',
					}, 
					{
						id: 6,
						name: 'NiuHaiLei',
						picture: require('../assets/images/index-master-picture.jpg'),
						status: 2, // 离线
						tags: [ '推算', '风水', '事业运势' ],
						desc: '江湖高手，算命准确率极高，多年网络实战经验，实话实说不留情面',
					},
				]
			}
		},
		watch: {
			'userInputData.year'() {
				this.setDateList()
			},
			'userInputData.month'() {
				this.setDateList()
			}
		},
		methods: {
			setDateList() {
				if(this.userInputData.year && this.userInputData.month) {
					let date = new Date(this.userInputData.year, this.userInputData.month, 0)
					
					this.dates = date.getDate()

					if(this.userInputData.date > this.dates) {
						this.userInputData.date = this.dates
					}
				}
			},
			validateUserSubmitData() {
				this.$refs.userSubmitForm.validate(valid => {
					if(valid) {
						this.$message.success('提交成功')
					}
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.index-wrap
		width 100%
		height auto 

		.index-user-input-area-wrap
			height 246px
			display flex
			justify-content center
			align-items center
			flex-direction column
			background url('../assets/images/index-submit-data-bg.jpg') no-repeat center center
			background-size cover

			h3 
				font-size 30px
				color #5f3736
				margin-top 30px

			.user-submit-data-form
				margin 30px 0

				.user-input-item
					height 40px

					.w130
						width 130px

			.user-submit-data-button 
				display flex
				justify-content center
				align-items center
				margin-bottom 30px

				.user-submit-button
					width 200px
					height 40px
					border-radius 40px
					background-color #5f3736
					color #ffffff
					font-size 20px

		.index-master-list-wrap
			width 1100px
			margin auto
			padding 30px 0

			.master-list-title
				display flex
				justify-content center
				align-items center

				h3 
					width 485px
					height 55px
					font-size 28px
					text-align center
					background url('../assets/images/index-master-list-title.png') no-repeat center bottom 
					background-size 485px 12px
			
			.master-list-content
				display flex
				justify-content flex-start
				align-items center
				flex-wrap wrap
				padding-top 10px

				.master-list-item
					width 267px
					height auto
					flex-shrink 1
					flex-grow 0
					margin-right 10px
					margin-top 10px
					cursor pointer

					&:nth-child(4n)
						margin-right 0

					.master-detail-img
						width 100%
						height 170px
						overflow hidden

						img
							transition .5s ease transform
							&:hover
								transform scale(1.1)
						

					.master-detail-text-wrap
						padding 10px 5px

						.master-detail-name 
							display flex
							justify-content space-between
							align-items center
							font-size 18px

							.master-status
								font-size 12px
								padding 2px 10px
								color #ffffff
								background-color #5f3736
								border-radius 4px

								&.offline
									background-color #cccccc

						.master-detail-tag
							text-align left 
							margin-top 10px

							.tag-item
								margin-right 10px

						.master-detail-desc
							margin-top 10px
							color #5f5f5f
							font-size 12px
							text-align left

	
</style>


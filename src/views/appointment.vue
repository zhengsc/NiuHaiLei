<template>
	<div class="appointment-wrap">
		<Breadcrumb :breadcrumb="breadcrumb" />
		<div class="appointment-user-info-wrap">
			<el-form
				:model="userSubmitInfo"
				:rules="userSubmitRule"
				ref="userSubmitForm"
				inline
			>
				<el-row class="form-row" type="flex" justify="start" align="middle">
					<el-col :span="2">
						<span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>
					</el-col>
					<el-col :span="22" class="form-row-input-area">
						<el-form-item class="form-item" prop="username">
							<el-input 
								v-model="userSubmitInfo.username" 
								placeholder="姓名"
								class="w300"
							></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="form-row" type="flex" justify="start" align="middle">
					<el-col :span="2">
						<span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
					</el-col>
					<el-col :span="22" class="form-row-input-area">
						<el-form-item class="form-item" prop="sex">
							<el-radio v-model.number="userSubmitInfo.sex" :label="1">男</el-radio>
							<el-radio v-model.number="userSubmitInfo.sex" :label="2">女</el-radio>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="form-row" type="flex" justify="start" align="middle">
					<el-col :span="2">
						<span>出生日期：</span>
					</el-col>
					<el-col :span="22" class="form-row-input-area">
						<el-form-item class="form-item" prop="type">
							<el-select placeholder="阳历/农历" class="w130" v-model="userSubmitInfo.type">
								<el-option value="1" label="阳历"></el-option>
								<el-option value="2" label="农历"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item class="form-item" prop="year">
							<el-date-picker
								type="year"
								placeholder="年"
								class="w130"
								format="yyyy"
								value-format="yyyy"
								v-model="userSubmitInfo.year"
							></el-date-picker>
						</el-form-item>
						<el-form-item class="form-item" prop="month">
							<el-select
								placeholder="月"
								class="w130"
								v-model="userSubmitInfo.month"
								:disabled="!userSubmitInfo.year"
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
						<el-form-item class="form-item" prop="date">
							<el-select
								placeholder="日"
								class="w130"
								v-model="userSubmitInfo.date"
								:disabled="!userSubmitInfo.year && !userSubmitInfo.month"
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
						<el-form-item class="form-item" prop="hour">
							<el-select
								placeholder="时"
								class="w130"
								v-model="userSubmitInfo.hour"
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
					</el-col>
				</el-row>
				<el-row class="form-row" type="flex" justify="start" align="middle">
					<el-col :span="2">
						<span>预约金额：</span>
					</el-col>
					<el-col :span="22" class="form-row-input-area tool">
						<span class="amount">120.00</span>
						<span class="price-unit">￥</span>
						<el-button type="primary" class="submit-button" @click="validateAppointInfo">去支付</el-button>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>

<script>
	import Util from '../assets/js/util'
	import Breadcrumb from '../components/breadcrumb'

	export default {
		data() {
			return {
				breadcrumb: {
					title: {
						zh: '预约上门',
						en: 'MAKE A RESERVATION'
					},
					address: ['预约上门'],
				},
				userSubmitInfo: {
					username: '',
					sex: 1,
					type: '',
					year: '',
					month: '',
					date: '',
					hour: '',
				},
				userSubmitRule: {
					username: [ { required: true, message: '请输入名称' } ],
					type: [ { required: true, message: '请选择阳历/农历' } ],
					year: [ { required: true, message: '请选择出生年份' } ],
					month: [ { required: true, message: '请选择出生月份' } ],
					date: [ { required: true, message: '请选择出生日期' } ],
					hour: [ { required: true, message: '请选择出生时辰' } ],
					sex: [ { required: true, message: '请选择性别' } ],
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
				timeNotc: Util.timeNotc
			}
		},
		watch: {
			'userSubmitInfo.year'() {
				this.setDateList()
			},
			'userSubmitInfo.month'() {
				this.setDateList()
			}
		},
		components: {
			Breadcrumb,
		},
		methods: {
			setDateList() {
				if(this.userSubmitInfo.year && this.userSubmitInfo.month) {
					let date = new Date(this.userSubmitInfo.year, this.userSubmitInfo.month, 0)
					
					this.dates = date.getDate()

					if(this.userSubmitInfo.date > this.dates) {
						this.userSubmitInfo.date = this.dates
					}
				}
			},
			validateAppointInfo() {
				this.$refs.userSubmitForm.validate(valid => {
					if(valid) {
						// TODO 支付
					}
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.appointment-user-info-wrap
		width 1100px
		height auto 
		margin 20px auto
		margin-bottom 150px
		padding 50px 20px
		border 1px solid #dfdfdf

		.form-row
			width 100%
			margin 20px 0

			.form-row-input-area
				display flex
				justify-content flex-start
				
				.form-item
					margin-bottom 0

				.submit-button
					margin-left 20px
					
					span 
						color #fff

				&.tool
					display flex
					align-items center

					span
						height 20px
						display flex
						align-items flex-end
						color #ff0000
						font-size 20px

						&.price-unit 
							font-size 14px

	.w130
		width 130px
		height 40px
	.w300
		width 300px
		height 40px
</style>


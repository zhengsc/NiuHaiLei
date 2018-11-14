const baseUrl = process.env.NODE_ENV === 'production' ? location.protocol : 'https:'
const Api = {
	POST_LOGIN: '/home/login/index', // 登录
	POST_SEND: '/home/login/send',//短信登陆
	POST_ADD: '/home/login/add', //注册
	POST_MASTER_LIST: '/home/index/users', // 大师列表
	POST_MASTER_DETAIL: '/home/index/usersview', // 大师详情
	POST_STORY_LIST: '/home/index/mlgs', // 故事列表
	POST_STORY_DETAIL: '/home/index/mlgsview', // 故事详情
	POST_INVESTIGATE_INFO: '/home/index/kaocha', // 实地考察
	POST_ABOUT_USE_INFO: '/home/index/about', // 关于我们
	POST_DIVINATION_DATA: 'http://dt.51dashizaixian.com/index.php', // 精准测算
	POST_SUBMIT_COMMENT: '/home/member/comments', // 提交评论
	POST_CHARGE_LIST: '/home/index/moneylist', // 充值列表
	POST_VALIDATE_ORDER: '/home/order/checkorder', // 查询订单状态
	POST_APPOINTMENT_PRICE: '/home/index/seramount', // 查询预约上门服务价格
	POST_VALIDATE_LOGIN_STATUS: '/home/login/checkmember', // 验证登录状态
	POST_PAY_PATH: '/home/pay/pay', // 支付
}


export { baseUrl, Api }
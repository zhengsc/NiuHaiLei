import Vue from 'vue'
import Axios from 'axios'
import { Message, Loading } from 'element-ui'

let axios = Axios.create()

let request = {}, loading = null

axios.interceptors.request.use(function(config) {
	let { data, method, headers, url } = config

	request = {
		data,
		method,
		headers,
		url
	}

	loading = Loading.service({
		lock: true,
		text: 'Loading',
		spinner: 'el-icon-loading',
		background: 'rgba(0, 0, 0, 0.7)',
	})
	
	// config.headers['TOKEN'] = User.getToken()
	
	return config
}, function(err) {
	return Promise.reject(err)
})

axios.interceptors.response.use(function(response) {

	let resp = response.data

	// 未登录
	// if(res.code === 13 || res.code === 604) {
	// 	// 线上环境清除token重新登录
	// 	if(process.env.NODE_ENV === 'production') {
	// 		User.removeToken()
	// 		return location.replace('/login?url=' + encodeURIComponent(location.pathname))
	// 	}
	// } else if(res.code === 605) {
	// 	// 原有token失效
	// 	User.setToken(res.data.token)

	// 	return axios({
	// 		...request
	// 	})
	// }

	loading.close()

	return resp
}, function(err) {
	loading.close()
	
	Message.error('接口响应异常, 请联系开发人员!')

	console.log(err)

	return Promise.reject(err)
})

axios.post = function(url, data, config) {
	let options = {
		method: 'post',
		url,
		data,
		responseType: 'json',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}
	
	Object.assign(options, config || {})

	return axios(options)
}

axios.install = (Vue, opt) => {
	axios.defaults.baseURL = opt.baseUrl
	
	Vue.prototype.$http = axios
}

export default axios
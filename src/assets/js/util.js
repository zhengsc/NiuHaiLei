export default {
	timeNotc: [
		{
			id: 1,
			text: '01:00--03:00（丑时）'
		},
		{
			id: 2,
			text: '03:00--05:00（寅时）'
		},
		{
			id: 3,
			text: '05:00--07:00（卯时）'
		},
		{
			id: 4,
			text: '07:00--09:00（辰时）'
		},
		{
			id: 5,
			text: '09:00--11:00（巳时）'
		},
		{
			id: 6,
			text: '11:00--13:00（午时）'
		},
		{
			id: 7,
			text: '13:00--15:00（未时）'
		},
		{
			id: 8,
			text: '15:00-17:00（申时）'
		},
		{
			id: 9,
			text: '17:00--19:00（酉时）'
		},
		{
			id: 10,
			text: '19:00--21:00（戌时）'
		},
		{
			id: 11,
			text: '21:00--23:00（亥时）'
		},
		{
			id: 12,
			text: '23:00--01:00 (子时)'
		},
	],
	getReparit0(num) {
		return num > 9 ? num : '0' + num
	},
	getDateString(timestamp) {
		let date = timestamp ? new Date(timestamp * 1000) : new Date()

		return `${date.getFullYear()}-${this.getReparit0(date.getMonth() + 1)}-${this.getReparit0(date.getDate())} ${this.getReparit0(date.getHours())}:${this.getReparit0(date.getMinutes())}:${this.getReparit0(date.getSeconds())}`
	}
}
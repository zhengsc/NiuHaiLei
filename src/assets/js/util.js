export default {
	timeNotc: [
		{
			id: 0,
			text: '00:00 (子时)'
		},
		{
			id: 1,
			text: '01:00（丑时）'
		},
		{
			id: 2,
			text: '02:00（丑时）'
		},
		{
			id: 3,
			text: '03:00（寅时）'
		},
		{
			id: 4,
			text: '04:00（寅时）'
		},
		{
			id: 5,
			text: '05:00（卯时）'
		},
		{
			id: 6,
			text: '06:00（卯时）'
		},
		{
			id: 7,
			text: '07:00（辰时）'
		},
		{
			id: 8,
			text: '08:00（辰时）'
		},
		{
			id: 9,
			text: '09:00（巳时）'
		},
		{
			id: 10,
			text: '10:00（巳时）'
		},
		{
			id: 11,
			text: '11:00（午时）'
		},
		{
			id: 12,
			text: '12:00（午时）'
		},
		{
			id: 13,
			text: '13:00（未时）'
		},
		{
			id: 14,
			text: '14:00（未时）'
		},
		{
			id: 15,
			text: '15:00（申时）'
		},
		{
			id: 16,
			text: '16:00（申时）'
		},
		{
			id: 17,
			text: '17:00（酉时）'
		},
		{
			id: 18,
			text: '18:00（酉时）'
		},
		{
			id: 19,
			text: '19:00（戌时）'
		},
		{
			id: 20,
			text: '20:00（戌时）'
		},
		{
			id: 21,
			text: '21:00（亥时）'
		},
		{
			id: 22,
			text: '22:00（亥时）'
		},
		{
			id: 23,
			text: '23:00 (子时)'
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
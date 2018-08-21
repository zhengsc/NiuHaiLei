<template>
	<div id="app">
		<Header />
		<vBody />
		<Footer />
		<Login v-show="showLoginWrap" />
	</div>
</template>

<script>
	import './assets/styles/reset.css'

	import Header from './components/header.vue'
	import vBody from './components/body.vue'
	import Footer from './components/footer.vue'
	import Login from './components/login.vue'

	export default {
		name: 'app',
		components: {
			Header,
			vBody,
			Footer,
			Login,
		},
		computed: {
			showLoginWrap() {
				return this.$store.state.loginWrap
			}
		}
	}
</script>

<style>

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		min-width: 1100px;
		width: 100%;
		min-height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
</style>

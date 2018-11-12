module.exports = {
	baseUrl: process.env.NODE_ENV === 'production' ? './' : './',
	outputDir: 'dist',
	assetsDir:'html',
	productionSourceMap: false,
	runtimeCompiler: true,
	devServer: {
		proxy: {
			'/home': {
				target: 'http://data.51dashizaixian.com',
				changeOrigin: true
			},
			'/user': {
				target: 'http://data.51dashizaixian.com',
				changeOrigin: true
			},
			'/Uploud': {
				target: 'http://data.51dashizaixian.com',
				changeOrigin: true
			}
		}
	}
}
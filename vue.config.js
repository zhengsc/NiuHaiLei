module.exports = {
	baseUrl: process.env.NODE_ENV === 'production' ? './' : './',
	outputDir: 'dist',
	assetsDir:'html',
	productionSourceMap: false,
	runtimeCompiler: true,
	devServer: {
		proxy: {
			'/home': {
				target: 'https://www.51dashizaixian.com',
				changeOrigin: true
			},
			'/user': {
				target: 'https://www.51dashizaixian.com',
				changeOrigin: true
			},
			'/Uploud': {
				target: 'https://www.51dashizaixian.com',
				changeOrigin: true
			}
		}
	}
}
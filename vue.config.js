module.exports = {
	baseUrl: process.env.NODE_ENV === 'production' ? '/' : './',
	outputDir: 'dist',
	assetsDir: 'html',
	productionSourceMap: false,
	runtimeCompiler: true,
	devServer: {
		proxy: {
			'/home': {
				target: 'http://operation.zhengsc.com',
				changeOrigin: true
			},
			'/user': {
				target: 'http://operation.zhengsc.com',
				changeOrigin: true
			}
		}
	}
}
module.exports = {
	baseUrl: process.env.NODE_ENV === 'production' ? '/' : './',
	outputDir: 'dist',
	productionSourceMap: false,
	runtimeCompiler: true,
	devServer: {
		proxy: {
			'/api': {
				target: '',
				changeOrigin: true
			}
		}
	}
}
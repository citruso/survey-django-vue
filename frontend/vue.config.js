module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  outputDir: 'dist',
  filenameHashing: false,
  productionSourceMap: false,
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/styles/vars.sass"'
      }
    }
  }
}

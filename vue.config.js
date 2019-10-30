const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: true,
  publicPath: '/',
  productionSourceMap: false,
  // assetsDir: 'static',
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('lin', resolve('src/lin'))
      .set('assets', resolve('src/assets'))
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use("vue-markdown-loader")
      .loader('vue-markdown-loader/lib/markdown-compiler')
    // set svg-sprite-loader
    config.module
        .rule('svg')
        .exclude.add(resolve('src/icons'))
        .end()
    config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
        .end()
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.json', '.vue', '.scss', '.html'],
    },
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/styles/share.scss";',
      },
    },
  },
  devServer: {},
  // node_modules依赖项es6语法未转换问题
  transpileDependencies: [
    'vuex-persist',
  ],
}

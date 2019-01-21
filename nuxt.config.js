const pkg = require('./package')


module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'ant-design-vue/dist/antd.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/antd-ui'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [,
    '@nuxtjs/pwa',
    '@nuxtjs/apollo',
    // '@nuxtjs/router'
  ],

  /*
    Configure Apollo so webpack doesn't complain about not knowing how
    to handle GraphQL files
  */
 apollo: {
  errorHandler(error) {
    console.log(
      '%cError',
      'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
      error.message
    )
  },
  clientConfigs: {
    default: {
      httpEndpoint: 'http://localhost:9000/graphql'
    }
  }
 },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

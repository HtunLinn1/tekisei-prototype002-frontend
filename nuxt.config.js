import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - proto-frontend',
    title: 'CM.適性検査-管理者画面・検査結果確認',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios/index',
    { src: "~/plugins/axios/request/request.js" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    ['@nuxtjs/dotenv', { filename: `.env.${process.env.NODE_ENV}` }]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-user-agent',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      // dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  // nuxt auth
  auth: {
    redirect: {
      login: '/login', // middleware:authを設定したURLにアクセスがあった場合の、リダイレクト先。
      logout: '/login', // ログアウト後のリダイレクト先
      callback: false,
      home: '/' /// ログイン後のリダイレクト先。
     },
    strategies: {
      local: {
        endpoints: {
          // ログイン処理に関する設定
          login: { url: '/v1/auth/sign_in', method: 'post', propertyName: 'access_token'}, 
          // ログアウト処理に関する設定
          logout: { url: '/v1/auth/sign_out', method: 'delete' },
          // ログイン時にユーザー情報を保存するか。
          user: false
         },
       }
     },
   },
}

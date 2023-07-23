import path from 'path';
import fs from 'fs';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  
  build: {
    transpile: ['vuetify'],
  },

  css: [
    'vuetify/lib/styles/main.sass',
    '@/assets/styles/global.scss',
    '@mdi/font/css/materialdesignicons.min.css',
  ],

  devtools: { enabled: true },
  devModules: [
    '@nuxtjs/eslint-module',
  ],

  modules: [
    'nuxt-lodash',
    '@nuxtjs/i18n',
  ],

  i18n: {
		lazy: true,
		langDir: 'locales',
		strategy: 'prefix_except_default',
		defaultLocale: 'en',
    precompile: {
      strictMessage: false,
    },
		locales: [
			{
				code: 'en',
				file: 'en.js',
				name: 'English',
				iso: 'en',
			}
		]
	},

	vite: {
		define: {
			'process.env.DEBUG': false,
		},
	},

  runtimeConfig: {
    public: {
      serviceHostname: process.env.service_hostname,
    }
  },

  devServer: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'ci/cert/cwash.key')).toString(),
      cert: fs.readFileSync(path.resolve(__dirname, 'ci/cert/myCA.pem')).toString(),
    }
  },
})

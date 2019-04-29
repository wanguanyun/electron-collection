import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import VueCropper from 'vue-cropper'
import animated from 'animate.css/animate.css'
import VueClipboard from 'vue-clipboard2'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.use(VueCropper)
Vue.use(VueClipboard)
Vue.use(Viewer)
Vue.use(animated)
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

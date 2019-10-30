import '@babel/polyfill'// babel帮我们编译es6语法
import Vue from 'vue'
import ElementUI from 'element-ui'

import '@/directives'
import '@/filter'
import '@/mixin'
import '@/plugins'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

import '@/assets/styles/index.scss' // eslint-disable-line
import '@/assets/styles/realize/element-variables.scss'

import '@/icons' // icon

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.component(CollapseTransition.name, CollapseTransition)

/* eslint no-unused-vars: 0 */
const AppInstance = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

// 设置 App 实例
window.App = AppInstance

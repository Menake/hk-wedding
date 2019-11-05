import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { firestorePlugin } from 'vuefire'
import VueScrollactive from 'vue-scrollactive'
import VueCarousel from 'vue-carousel'

Vue.use(VueScrollactive)
Vue.use(VueCarousel)
Vue.use(firestorePlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

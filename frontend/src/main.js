import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import './styles/main.sass'

Vue.config.productionTip = false
Vue.prototype.eventBus = new Vue()

Vue.filter('formattedName', name => {
  if (name !== undefined) {
    return name ? name : 'Новый опрос'
  }
  return '░░░░░░░░░░░░░░░░░░░'
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

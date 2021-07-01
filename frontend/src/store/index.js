import Vue from 'vue'
import Vuex from 'vuex'

import home from './home.module'
import poll from './poll.module'
import user from './user.module'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    home,
    poll,
    user
  }
})
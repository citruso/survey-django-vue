import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

import Home from '../views/Home'
import Index from '../views/Index'
import Login from '../views/Login'
import NotExist from '../views/NotExist'
import Register from '../views/Register'

import ActionMenu from '../components/ActionMenu'
import NavMenu from '../components/NavMenu'
import AppHeader from '../components/AppHeader'
import PollForm from '../components/PollForm'
import PollsList from '../components/PollsList'
import StatsInfo from '../components/StatsInfo'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: '404',
    meta: { title: 'Страница не найдена' },
    components: { default: NotExist, header: AppHeader }
  },
  {
    path: '/',
    meta: { title: 'Главная' },
    components: { default: Index, header: AppHeader }
  },
  {
    path: '/login',
    meta: { title: 'Вход' },
    component: Login
  },
  {
    path: '/register',
    meta: { title: 'Регистрация' },
    component: Register
  },
  {
    path: '/home',
    components: { default: Home, header: AppHeader },
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        meta: { title: 'Опросы' },
        components: { default: PollsList, leftside: NavMenu, rightside: StatsInfo }
      },
      {
        path: 'completed',
        meta: { title: 'Завершенные' },
        components: { default: PollsList, leftside: NavMenu, rightside: StatsInfo }
      },
      {
        path: 'favs',
        meta: { title: 'Закладки' },
        components: { default: PollsList, leftside: NavMenu, rightside: StatsInfo }
      }
    ]
  },
  {
    path: '/poll',
    components: { default: Home, header: AppHeader },
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: ':id(\\d+)',
        name: 'poll',
        beforeEnter: async (to, from, next) => {
          let poll
          if (!store.getters.isPollOpen(to.params.id)) {
            poll = await store.dispatch('getPoll', to.params.id)

            if (poll) {
              store.commit('openPoll', poll)
            } else {
              next({ name: '404' })
              return
            }
          } else {
            poll = store.getters.getOpenPoll(to.params.id)
          }
          document.title = poll.name ? poll.name : 'Новый опрос'
          store.commit('setPoll', poll)
          next()
        },
        components: { default: PollForm, leftside: NavMenu, rightside: ActionMenu },
      },
      {
        path: 'new',
        beforeEnter: (to, from, next) => {
          store.getters.isAdmin ? next() : next('/home')

          if (!store.getters.isPollOpen(-1))
            store.commit('openPoll',
              JSON.parse(JSON.stringify(store.getters.getBlankPoll))
            )

          store.commit('setPoll', store.getters.getOpenPoll(-1))
        },
        components: { default: PollForm, leftside: NavMenu, rightside: ActionMenu },
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.getters.isAuth ? next() : next('/login')
  } else {
    store.getters.isAuth && to.matched[0].path != '*'
      ? next('/home')
      : next()
  }
})

router.afterEach(to => {
  if (to.matched.some(record => record.meta.title)) {
    Vue.nextTick(() => {
      document.title = to.meta.title
    })
  }
})

export default router
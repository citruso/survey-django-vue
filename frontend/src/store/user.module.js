import Vue from 'vue'
import { User } from '../api'

const initialState = () => {
  return {
    id: NaN,
    username: '',
    password: '',
    is_admin: false,
    completed: [],
    favs: [],
  }
}

const getters = {
  getUserData: state => state,
  isAdmin: state => state.is_admin,
  isAuth: state => !!state.id,
  isCompleted: state => id => state.completed.includes(id),
  isFav: state => id => state.favs.includes(id)
}

const mutations = {
  setUser: (state, user) => {
    Object.assign(state, user)
    localStorage.setItem('user', JSON.stringify(user))
  },
  resetUser: state => {
    for (let key in state)
      Vue.set(state, key, initialState()[key])
    localStorage.setItem('user', null)
  },
  pushCompleted: (state, id) => {
    state.completed.push(id)
  },
  toggleFav: (state, id) => {
    state.favs.includes(id)
    ? state.favs.splice(state.favs.indexOf(id), 1)
    : state.favs.push(id)
  }
}

const actions = {
  updateUserData: ({ getters }) => {
    localStorage.setItem('user', JSON.stringify(getters.getUserData))
    User.update(getters.getUserData)
  },
  login: async ({ commit }, data) => {
    const response = await User.login(data)

    if (response.status == 200) {
      commit('setUser', response.data)
      return true
    }
    alert(response.data)
    return false
  },
  register: async ({ commit }, data) => {
    const response = await User.register(data)

    if (response.status == 200) {
      commit('setUser', response.data)
      return true
    }
    alert(response.data)
    return false
  }
}

export default {
  state: JSON.parse(localStorage.getItem('user')) || initialState,
  getters,
  mutations,
  actions
}
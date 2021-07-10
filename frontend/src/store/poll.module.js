import { Answer, Poll } from '../api'
import router from '../router/index'

const blankPoll = { // TODO: make it on server side and request it
  id: -1,
  name: '',
  desc: '',
  slides: [{
    type: 'button',
    question: '',
    choices: [''],
    answers: [],
    answerText: ''
  }]
}

const state = {
}

const getters = {
  getBlankPoll: () => blankPoll
}

const mutations = {
}

const actions = {
  getPoll: async ({ getters }, poll_id) => {
    const data = {}
    data.poll_id = poll_id
    data.user_id = getters.getUserData.id

    const response = await Poll.get(data)

    return response.status == 200 ? response.data : false
  },
  async deletePoll({ commit }, id) {
    await Poll.delete(id)

    commit('closePoll', id)
    router.push('/home')
  },
  async publishPoll({ commit }, poll) {
    await Poll.create(poll)

    commit('closePoll', poll.id)
    router.push('/home')
  },
  async createAnswer({ commit, dispatch }, data) {
    await Answer.create(data)

    commit('pushCompleted', data.poll_id)
    dispatch('updateUserData')
    commit('closePoll', data.poll_id)
    router.push('/home')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
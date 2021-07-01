import { Poll } from '../api'
import { MAX_OPEN_POLLS } from './consts'


const state = {
  polls: [],
  openPolls: [
    ...JSON.parse(localStorage.getItem('openPolls')) || []
  ]
}

const getters = {
  isPollOpen: state => id => {
    return state.openPolls.findIndex(poll => poll.id == id) != -1
  },
  getOpenPoll: state => id => {
    return state.openPolls.find(poll => poll.id == id)
  },
  getCompletedPolls: (state, getters) => {
    return state.polls.filter(poll => {
      return getters.isCompleted(poll.id)
    })
  },
  getFavsPolls: (state, getters) => {
    return state.polls.filter(poll => {
      return getters.isFav(poll.id)
    })
  },
}

const mutations = {
  setPolls: (state, polls) => {
    state.polls = polls
  },
  openPoll: (state, poll) => {
    state.openPolls.length < MAX_OPEN_POLLS
      ? state.openPolls.push(poll)
      : (state.openPolls.shift(), state.openPolls.push(poll))
    localStorage.setItem('openPolls', JSON.stringify(state.openPolls))
  },
  closePoll: (state, id) => {
    state.openPolls.splice(state.openPolls.findIndex(poll => poll.id == id), 1)
    localStorage.setItem('openPolls', JSON.stringify(state.openPolls))
  }
}

const actions = {
  getPolls: async ({ commit }) => {
    const response = await Poll.getAll()
    commit('setPolls', response.data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
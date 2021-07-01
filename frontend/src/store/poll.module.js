import Vue from 'vue'
import { Answer, Poll } from '../api'
import router from '../router/index'

const blankPoll = {
  id: -1,
  name: '',
  desc: '',
  slides: [{
    type: 'button',
    question: '',
    choices: ['']
  }]
}

const state = {
  poll: {},
  slidePos: 0
}

const getters = {
  getBlankPoll: () => blankPoll,
  getSlide: state => state.poll.slides[state.slidePos],
  getActiveID: state => state.poll.id,
  getActivePoll: state => state.poll,
  getName: state => state.poll.name,
  getDesc: state => state.poll.desc,
  getSlidesLen: state => state.poll.slides.length,
  isDoneToPublish: state => {
    return state.poll.name
    && state.poll.desc
    && state.poll.slides.every(slide => {
      return slide.question && slide.choices.every(val => {
        return slide.type == 'text' ? true : !!val
      })
    })
  },
  isDoneToAnswer: state => {
    if (state.poll.slides)
      return state.poll.slides.every(slide => {
        return slide.answers && slide.answers.length > 0
      })
    return false
  }
}

const mutations = {
  setSlidePos: (state, pos) => {
    state.slidePos += pos
  },
  setPoll: (state, poll) => {
    state.poll = poll
    state.slidePos = 0
  },
  resetPoll: state => {
    state.poll = {}
    state.slidePos = 0
  },
  setName: (state, e) => {
    state.poll.name = e.target.value.trim()
  },
  setDesc: (state, e) => {
    state.poll.desc = e.target.value.trim()
  },
  pushSlide: state => {
    state.poll.slides.push({
      question: '',
      type: 'button',
      choices: ['']
    })
  },
  updateSlide: (state, data) => {
    Vue.set(state.poll.slides, state.slidePos, data)
  }
}

const actions = {
  getPoll: async ({ getters }, poll_id) => {
    const data = {}
    data.poll_id = poll_id
    data.user_id = getters.getUserData.id

    const response = await Poll.get(data)

    return response.status == 200 ? response.data : false
  },
  async deletePoll({ getters, commit }) {
    await Poll.delete(getters.getActiveID)
    commit('closePoll', getters.getActiveID)
    router.push('/home')
  },
  async publishPoll({ getters, commit }) {
    await Poll.create(getters.getActivePoll)
    commit('closePoll', getters.getActiveID)
    router.push('/home')
  },
  async createAnswer({ getters, commit, dispatch }) {
    const data = {}
    data.poll_id = getters.getActiveID
    data.user_id = getters.getUserData.id
    data.answers = getters.getActivePoll.slides

    await Answer.create(data)

    commit('pushCompleted', getters.getActiveID)
    dispatch('updateUserData')
    commit('closePoll', getters.getActiveID)
    router.push('/home')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
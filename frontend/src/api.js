import axios from 'axios'

const HTTP = axios.create({
  baseURL: 'http://localhost:8000/api/'
})

const Answer = {
  create: data => {
    return HTTP.post('/answers/create', data)
  }
}

const Poll = {
  create: poll => {
    return HTTP.post('/polls/create', poll)
  },
  delete: id => {
    return HTTP.delete(`/polls/${id}/delete`)
  },
  get: data => {
    return HTTP.post(`/polls/${data.poll_id}`, data)
      .catch(err => err.response)
  },
  getAll: () => {
    return HTTP.get('/polls/all')
  }
}

const User = {
  update: data => {
    return HTTP.post('/users/update', data)
  },
  login: data => {
    return HTTP.post('/users/login', data)
      .catch(err => err.response)
  },
  register: data => {
    return HTTP.post('/users/register', data)
      .catch(err => err.response)
  }
}

export { Answer, Poll, User }
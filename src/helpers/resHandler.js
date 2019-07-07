import Store from '@/store/store'
import Router from '@/router'

const responseHandler = {
  response: response => {
    Store.commit('hideRequestStatus')
    return response
  },
  error: error => {
    Store.commit('hideRequestStatus')
    // error from server like wrong username, validation etc.
    if (error.response.status === 401) {
      Store.commit('createNotifier', { type: 'error', message: 'Unauthorized, please login.' })
      Router.push({ name: 'user.logout' })
      return Promise.reject(error)
    }
    Store.commit('createNotifier', { type: 'error', message: error.response.data.errors.message })
    return Promise.reject(error)
  }
}

export default responseHandler

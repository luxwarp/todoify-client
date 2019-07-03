import Store from '@/store/store'
import Router from '@/router'
export default (error) => {
  Store.commit('hideRequestStatus')

  // error while making request to server.
  if (!error.response) {
    Store.commit('createNotifier', { type: 'error', message: error.message })
    Router.push({ name: 'user.logout' })
    return Promise.reject(error)
  }

  // error from server like wrong username, validation etc.
  if (error.response) {
    Store.commit('createNotifier', { type: 'error', message: error.response.data.errors.message })
    return Promise.reject(error)
  }

  return Promise.reject(error)
}

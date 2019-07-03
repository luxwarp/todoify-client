import Store from '@/store/store'
import Router from '@/router'
export default (error) => {
  Store.commit('hideRequestStatus')
  if (!error.response) {
    Store.commit('createNotifier', { type: 'error', message: error.message })
    Router.push({ name: 'user.logout' })
  }
  return Promise.reject(error)
}

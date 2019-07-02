import Store from '@/store/store'
export default (config) => {
  Store.commit('showRequestStatus')
  if (Store.getters.isAuth()) {
    config.headers.Authorization = Store.getters.getToken
  }
  return config
}

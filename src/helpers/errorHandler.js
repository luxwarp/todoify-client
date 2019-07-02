import Store from '@/store/store'
export default (error) => {
  Store.commit('hideRequestStatus')
  return Promise.reject(error)
}

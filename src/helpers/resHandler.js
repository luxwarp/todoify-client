import Store from '@/store/store'
export default (response) => {
  Store.commit('hideRequestStatus')
  return response
}

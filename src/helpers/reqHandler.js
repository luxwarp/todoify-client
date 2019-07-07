import Store from '@/store/store'

const requestHandler = {
  config: (config) => {
    Store.commit('showRequestStatus')

    if (window.$cookies.isKey('accessToken')) {
      config.headers.Authorization = window.$cookies.get('accessToken')
    }

    return config
  },
  error: (error) => {
    Store.commit('hideRequestStatus')

    Store.commit('createNotifier', { type: 'error', message: error.message })
    return Promise.reject(error)
  }
}

export default requestHandler

import { getGirlInfo } from '@/api/girl'
const setting = {
  state: {
    // 用于获取大类信息
    girlInfo: {}
  },

  mutations: {
    SET_GIRLINFO: (state, girlInfo) => {
      state.girlInfo = girlInfo
    }
  },

  actions: {
    GetGirlInfo({ commit }, girlInfo) {
      return new Promise((resolve, reject) => {
        getGirlInfo(girlInfo).then(res => {
          commit('SET_GIRLINFO', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default setting

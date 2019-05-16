import { getGirlInfo } from '@/api/girl'
const setting = {
  state: {
    // 用于获取大类信息
    girlInfo: {},
    //图集大类列表展示排序-默认标题首字母
    querysort:'1',
    //图集大类列表检索-默认空
    queryname:'',
    //图集大类列表当前页 默认第一页
    currentpage:1,
  },

  mutations: {
    SET_GIRLINFO: (state, girlInfo) => {
      state.girlInfo = girlInfo
    },
    SET_QUERYSORT: (state, querysort) => {
      state.querysort = querysort
    },
    SET_QUERYNAME: (state, queryname) => {
      state.queryname = queryname
    },
    SET_CURRENTPAGE: (state, currentpage) => {
      state.currentpage = currentpage
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

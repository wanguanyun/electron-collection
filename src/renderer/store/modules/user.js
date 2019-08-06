import { login, logout, getInfo, changePw } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    // 默认头像
    avatar: '',
    roles: [],
    // 默认封面<大类>
    defaule_cover: '',
    // 默认封面<小类>
    defaule_item_cover: '',
    last_login_time: '',
    // 默认模式为正常模式 1：正常 2：隐私模式
    app_module: 1,
    //首页显示图集小类个数
    default_dashboard_item_number:10,
    //首页显示图集大类个数
    default_dashboard_number:10,
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = `${process.env.BASE_API}/img/${avatar}`
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_DEFAULT_COVER: (state, cover) => {
      state.defaule_cover = `${process.env.BASE_API}/img/${cover}`
    },
    SET_DEFAULT_ITEM_COVER: (state, cover) => {
      state.defaule_item_cover = `${process.env.BASE_API}/img/${cover}`
    },
    SET_LAST_LOGIN_TIME: (state, time) => {
      state.last_login_time = time
    },
    SET_APP_MODULE: (state, appModule) => {
      state.app_module = appModule
    },
    SET_DEFAULT_DASHBOARD_ITEM_NUMBER: (state, default_dashboard_item_number) => {
      state.default_dashboard_item_number = default_dashboard_item_number
    },
    SET_DEFAULT_DASHBOARD_NUMBER: (state, default_dashboard_number) => {
      state.default_dashboard_number = default_dashboard_number
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          commit('SET_AVATAR', data.default_avatar)
          commit('SET_NAME', data.userName)
          commit('SET_DEFAULT_COVER', data.gallery_img)
          commit('SET_DEFAULT_ITEM_COVER', data.gallery_item_img)
          commit('SET_LAST_LOGIN_TIME', data.last_login_time)
          commit('SET_APP_MODULE', data.app_module)
          commit('SET_DEFAULT_DASHBOARD_ITEM_NUMBER', data.default_dashboard_item_number)
          commit('SET_DEFAULT_DASHBOARD_NUMBER', data.default_dashboard_number)
          // sessionStorage.setItem("userInfo",JSON.stringify(data))
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 修改用户密码
    ChangePw({ commit }, param) {
      const oldPassword = param.oldPassword.trim()
      const newPassword = param.newPassword.trim()
      return new Promise((resolve, reject) => {
        changePw({
          oldPassword,
          newPassword
        }).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          commit('SET_AVATAR', data.default_avatar)
          commit('SET_NAME', data.userName)
          commit('SET_DEFAULT_COVER', data.gallery_img)
          commit('SET_DEFAULT_ITEM_COVER', data.gallery_item_img)
          commit('SET_LAST_LOGIN_TIME', data.last_login_time)
          commit('SET_APP_MODULE', data.app_module)
          commit('SET_DEFAULT_DASHBOARD_ITEM_NUMBER', data.default_dashboard_item_number)
          commit('SET_DEFAULT_DASHBOARD_NUMBER', data.default_dashboard_number)
          // sessionStorage.setItem("userInfo",JSON.stringify(data))
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户路由
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          // if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          //   commit('SET_ROLES', data.roles)
          // } else {
          //   reject('getInfo: roles must be a non-null array !')
          // }
          commit('SET_AVATAR', data.default_avatar)
          commit('SET_NAME', data.userName)
          commit('SET_DEFAULT_COVER', data.gallery_img)
          commit('SET_DEFAULT_ITEM_COVER', data.gallery_item_img)
          commit('SET_LAST_LOGIN_TIME', data.last_login_time)
          commit('SET_APP_MODULE', data.app_module)
          commit('SET_DEFAULT_DASHBOARD_ITEM_NUMBER', data.default_dashboard_item_number)
          commit('SET_DEFAULT_DASHBOARD_NUMBER', data.default_dashboard_number)
          // sessionStorage.setItem("userInfo",JSON.stringify(data))
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          sessionStorage.clear()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        removeToken()
        commit('SET_TOKEN', '')
        sessionStorage.clear()
        resolve()
      })
    }
  }
}

export default user

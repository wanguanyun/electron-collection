const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  defaule_cover: state => state.user.defaule_cover,
  defaule_item_cover: state => state.user.defaule_item_cover,
  last_login_time: state => state.user.last_login_time,
  girlInfo: state => state.setting.girlInfo
}
export default getters

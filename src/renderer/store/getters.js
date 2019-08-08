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
  app_module: state => state.user.app_module,
  default_dashboard_item_number: state => state.user.default_dashboard_item_number,
  default_dashboard_number: state => state.user.default_dashboard_number,
  querysort: state => state.setting.querysort,
  queryname: state => state.setting.queryname,
  currentpage: state => state.setting.currentpage,
  girlInfo: state => state.setting.girlInfo
}
export default getters

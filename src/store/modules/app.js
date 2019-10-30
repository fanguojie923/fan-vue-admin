import stageConfig from '@/config/stage' // 引入舞台配置
import AppConfig from '@/config/index' // 引入项目配置

const state = {
  logined: false, // 是否登录
  user: null, // 当前用户
  sideBarLevel: AppConfig.sideBarLevel || 3,
  defaultRoute: AppConfig.defaultRoute || '/about',

  // 推送消息
  readedMessages: [],
  unreadMessages: [],
  auths: [], // 每个用户的所有权限

  // 舞台配置
  stageConfig,
  // 当前页信息
  currentRoute: {
    config: null,
    treePath: [],
  },
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

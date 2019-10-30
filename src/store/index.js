import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import state from './state'
import * as getters from './getters'
import actions from './actions'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    reducer: state => ({ // eslint-disable-line
        // commonInfo: state.app.commonInfo,
        // user: state.user.user,
        // logined: state.user.logined,
    }),
})

const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

const store = new Vuex.Store({
    // modules: {
    //     app,
    //     settings,
    //     user
    // },
    modules,
    state,
    mutations,
    actions,
    getters,
    plugins: [vuexLocal.plugin],
})

export default store

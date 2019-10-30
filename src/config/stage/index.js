import Utils from '@/utils/util'

// eslint-disable-next-line import/no-mutable-exports
let homeRouter = [
  {
    title: '仪表盘',
    type: 'view',
    name: Symbol('about'),
    route: '/about',
    filePath: 'views/about/About.vue',
    inNav: true,
    icon: 'iconfont icon-yibiaopan',
    order: 0,
  },
  {
    title: '404',
    type: 'view',
    name: Symbol('404'),
    route: '/404',
    filePath: 'views/error-page/404.vue',
    inNav: true,
    icon: 'iconfont icon-icon-test',
  },
  {
    title: 'Table',
    type: 'view',
    name: Symbol('table'),
    route: '/table',
    filePath: 'views/table/Table.vue',
    inNav: true,
    icon: 'iconfont icon-zu',
  },
  {
    title: '个人中心',
    type: 'view',
    name: Symbol('personal'),
    route: '/personal',
    filePath: 'views/personal/index.vue',
    inNav: false,
    icon: 'iconfont icongerenzhongxin-zhong',
  },
]

// 处理顺序
homeRouter = Utils.sortByOrder(homeRouter)

// 使用 Symbol 处理 name 字段, 保证唯一性
const deepReduceName = (target) => {
  if (Array.isArray(target)) {
    target.forEach((item) => {
      if (typeof item !== 'object') {
        return
      }
      deepReduceName(item)
    })
    return
  }
  if (typeof target === 'object') {
    if (typeof target.name !== 'symbol') {
      // eslint-disable-next-line no-param-reassign
      target.name = target.name || Utils.getRandomStr()
      // eslint-disable-next-line no-param-reassign
      target.name = Symbol(target.name)
    }

    if (Array.isArray(target.children)) {
      target.children.forEach((item) => {
        if (typeof item !== 'object') {
          return
        }
        deepReduceName(item)
      })
    }
  }
}

deepReduceName(homeRouter)

export default homeRouter

import moment from 'moment'

// 设置语言为中文
moment.locale('zh-cn')
const _ = require('lodash')

/**
 * @param {number} hours
 */
export function getDateAfterHours(hours) {
  const now = new Date()
  return new Date(now.setHours(now.getHours() + hours))
}

/**
 * @param {number} days
 */
export function getDateAfterDays(days) {
  const now = new Date()
  return new Date(now.setHours(now.getHours() + (days * 24)))
}

/**
 * 获取时间段List列表
 * @param {String} startTime
 * @param {String} endTime
 */
export function getBetweenDate(startTime, endTime) {
  if (startTime === '' || startTime === undefined) {
    startTime = moment().subtract(30, 'days').format('YYYY-MM-DD')
  }
  if (endTime === '' || endTime === undefined) {
    endTime = moment().format('YYYY-MM-DD')
  }
  const diffTimes = moment(endTime).diff(moment(startTime), 'd')
  const dateList = []
  _.times(diffTimes, i => {
    const newStartTime = moment(startTime)// 每次重新初始化开始时间，因为我碰到了深拷贝的问题
    dateList.push(newStartTime.add(i, 'days').format('YYYY-MM-DD'))// 数组下标从０开始，可以用它进行每次的天数递增
  })
  return dateList
}

/**
 * JS获取传入日期之前或者之后的日期
 * @param date 传入的日期，不传默认为当日，
 * @param days 天数
 * @param type  1:当前日期之后；其他:当前日期之前
 * @param format  类型：YYYY-MM-DD
 * @returns {string}
 */
export function diffDate(days, type, format = 'YYYY-MM-DD', date) {
  let newDate = ''
  if (type === 1) { // 当前日期后的日期
    newDate = moment(date).add(days, 'days').format(format)
  } else { // 当前日期前的日期
    newDate = moment(date).subtract(days, 'days').format(format)
  }
  return newDate
}

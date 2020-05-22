/**
 * 生成任意长度的随机数
 * @param len 随机数长度
 */
export const randomId = (len: number) => {
  const genUnit = () =>
    Math.random()
      .toString(36)
      .substr(2)

  const randomUnit = genUnit()
  if (len <= 0) return randomUnit
  else if (len <= 11) return randomUnit.substr(0, len)
  else {
    let rs = ''
    while (rs.length < len) {
      rs += genUnit()
    }
    return rs.substr(0, len)
  }
}

/**
 * 生成随机6位长度的颜色值
 */
export const randomHex = () =>
  '#' +
  Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0')

/**
 * 取整的方法，只取整数部分, number >> 0, number | 0;
 */

export const ThousandNum = (num: string | number) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

/**
 * 保留指定位数
 * @param num 原始数字
 * @param decimal 保留的小数位数
 */
export const round = (num: number, decimal: number) =>
  Math.round(num * 10 ** decimal) / 10 ** decimal

/**
 * 指定范围的整数
 * @param start 开始
 * @param end 结束
 * @param step 步长
 */
export const range = (start: number, end: number, step: number = 1) => {
  if (step === 0) return []
  if (start > end) console.warn('start should less than end')

  const _start = Math.min(start, end)
  const _end = Math.max(start, end)

  const rs = []
  if (step > 0) {
    for (let i = _start; i <= _end; i += step) {
      rs.push(i)
    }
    return rs
  }

  for (let i = _end; i >= _start; i += step) {
    rs.push(i)
  }
  return rs
}

export const shuffle = (arr: []) => arr.slice().sort(() => Math.random() - 0.5)

export const counter = (arr: []) =>
  arr.reduce((acc: any, cur: any) => {
    acc[cur] = acc[cur] ? ++acc[cur] : 1
    return acc
  }, {})

/**
 * 创建指定长度的数组
 */

export const fakeArray = (len: number) => [...new Array(len).keys()]

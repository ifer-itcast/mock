const fs = require('fs')
const path = require('path')
const JSON5 = require('json5')
const Mock = require('mockjs')

const getJsonFile = (filePath) => {
  // 读取 JSON5 配置
  const json = fs.readFileSync(path.join(__dirname, filePath), 'utf-8')
  // 转换 JSON5 为对象
  return JSON5.parse(json)
}

module.exports = app => {
  if (process.env.MOCK === 'true') {
    app.get('/user/userinfo', (req, res) => {
      const json = getJsonFile('./userInfo.json5')
      res.json(Mock.mock(json))
    })
  }
}

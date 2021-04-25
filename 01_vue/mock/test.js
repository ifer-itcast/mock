const Mock = require('mockjs')

// console.log(Mock.Random.id())
// console.log(Mock.mock('@id'))
// console.log(Mock.mock('@id()'))

const obj = Mock.mock({
  id: '@id',
  username: '@cname',
  date: '@date',
  // Random.image( size, background, foreground, text )
  avatar: '@image("200x100", "#50B347", "#FFF", "Mock.js")',
  description: '@paragraph',
  ip: '@ip',
  emai: '@email'
})
console.log(obj)

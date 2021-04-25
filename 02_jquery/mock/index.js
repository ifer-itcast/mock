// if (!window.MOCK) return; // 注意 return 只能用到函数里面，这样写语法错误
if (window.MOCK) {
  Mock.mock('/user/userinfo', 'get', {
    id: '@id',
    username: '@cname',
    date: '@date',
    // Random.image( size, background, foreground, text )
    avatar: '@image("200x100", "#50B347", "#FFF", "Mock.js")',
    description: '@paragraph',
    ip: '@ip',
    emai: '@email',
  });
}

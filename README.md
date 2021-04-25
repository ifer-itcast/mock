## Vue

### 0. 安装

```bash
npm i axios
npm i json5 -D
npm i mockjs -D
```

### 1. Mock 配置

`mock/userInfo.json5`

```js
{
    id: '@id',
    username: '@cname',
    date: '@date',
    // Random.image( size, background, foreground, text )
    avatar: '@image("200x100", "#50B347", "#FFF", "Mock.js")',
    description: '@paragraph',
    ip: '@ip',
    emai: '@email'
}
```

`mock/index.js`

```js
const fs = require('fs');
const path = require('path');
const JSON5 = require('json5');
const Mock = require('mockjs');

const getJsonFile = (filePath) => {
    // 读取 JSON5 配置
    const json = fs.readFileSync(path.join(__dirname, filePath), 'utf-8');
    // 转换 JSON5 为对象
    return JSON5.parse(json);
};

module.exports = (app) => {
    if (process.env.MOCK === 'true') {
        app.get('/user/userinfo', (req, res) => {
            const json = getJsonFile('./userInfo.json5');
            res.json(Mock.mock(json));
        });
    }
};
```

## 2. 项目配置

`vue.config.js`

```js
module.exports = {
    devServer: {
        before: require('./mock/index'),
    },
};
```

`.env.development.js`

```bash
MOCK=true
```

### 3. 使用 Mock

`src/components/HelloWorld.vue`

```html
<script>
    import axios from 'axios';
    export default {
        name: 'HelloWorld',
        props: {
            msg: String,
        },
        created() {
            axios
                .get('/user/userinfo')
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.error(err);
                });
        },
    };
</script>
```

## jQuery

`mock/index.js`

```js
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
```

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Document</title>
        <script src="https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js"></script>
        <script src="https://cdn.bootcss.com/Mock.js/1.0.0/mock-min.js"></script>
    </head>

    <body>
        <script>
            window.MOCK = true;
        </script>
        <script src="mock/index.js"></script>
        <script>
            $.ajax({
                url: '/user/userinfo',
                dataType: 'json',
                success: (data) => {
                    console.log(data);
                },
            });
        </script>
    </body>
</html>
```

# wallet-backend

the backend service for zjubca wallet-app

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

#### Database Migration

```bash
$ npx sequelize db:migrate
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

## API Doc
- [资产管理API](#user-content-资产管理)
- [Dapp市场API](#user-content-Dapp市场)
- [发现API](#user-content-发现)

##### 错误码
每个响应都会返回一个`code`字段，拥有以下值：
- 0 成功
- 非0 失败，需提供额外的`msg`字段以显示错误信息。
### 资产管理

### Dapp市场
**1. GET `/dapps` 获取Dapp列表**

query参数：
- type: string 种类，若不填则不分类
- keywords: string 关键词，若不填则不进行关键词筛选
- page
- pageSize

响应：
- code
- data

**2. GET `/dapp/:id` 获取Dapp详情**

响应：
- code
- data
    - dapp: JSON

**3. POST `/dapp/:id` 添加Dapp**

body参数：
- icon: url Dapp图标
- type: string Dapp种类
    - "social" 社交
    - "life" 生活
    - "shop" 购物
    - "movie" 影视
    - "game" 游戏 
    - "edu" 教育
    - "tool" 工具
    - "system" 区块链系统相关
- name: string Dapp名称
- url: url Dapp URL
- author: string 作者
- intro: string Dapp简介
- content: string Dapp详细介绍

响应：
- code
- data
    - dapp: JSON

**4. PUT `/dapp/:id` 修改Dapp**

body参数：
- update: JSON 字段不需要全部提供
    - icon
    - type
    - name
    - url
    - author
    - intro
    - content

响应:
- code
- data
    - dapp: JSON
    
**5. DELETE `/dapp/:id` 删除Dapp**

响应：
- code

#### 发现
##### 精选文章
**1. GET `/sharings` 获取精选文章列表**

query参数：
- page
- pageSize

响应：
- code 0 成功 非0 失败
- data
    - posts: Array
   
**2. GET `/sharing/:id` 获取文章详情**

响应:
- code
- data
    - post: JSON

**3. POST `/sharing` 添加精选文章**

body参数：
- pic: url 封面图片
- author: string 作者
- title: string 标题
- content: string 内容(html或markdown格式)

响应：
- code
- data
    - post: JSON 

**4. PUT `/sharing/:id` 更改精选文章**

body参数：
- update: JSON 字段不需要全部提供
    - pic
    - author
    - title
    - content

响应：
- code
- data
    - post: JSON 更新后的文章
    
**5. DELETE `/sharing/:id` 删除精选文章**

响应：
- code

##### 活动
**1. GET `/recommands` 获取轮播图活动列表**

**2. GET `/activities` 获取活动列表**

query参数：
- page
- pageSize

响应：
- code
- data
    - actvs: Array 活动列表

**3. POST `/activity` 添加活动**

body参数：
- pic: url 封面图片
- title: string 活动标题
- sponsor: string 主办方
- abstract: string 摘要介绍
- url: string 活动链接

响应：
- code
- data
    - actv: JSON 活动

**4. PUT `/activity/:id` 更新活动**

body参数：
- update: JSON 字段不需要全部提供
    - pic
    - title
    - sponsor
    - abstract
    - url

响应：
- code
- data
    - actv: JSON 更新后的活动

**5. DELETE `/activity/:id` 删除活动**

响应：
- code

##### Token兑换商城
**1. GET `/goods` 获取商品列表**

query参数：
- page
- pageSize

响应：
- code
- data
    - items: 可兑换商品列表
    
**2. GET `/good/:id` 获取商品详情**

query参数：
- page
- pageSize

响应：
- code
- data
    - item
    
**3. POST `/item` 添加商品**

body参数：
- pic: url 商品图片
- name: string 商品名称
- provider: string 商品提供方
- intro: string 商品介绍
- value: number 商品标价，如"100.0000 ZJUBCA"
- token: string 标价token种类
- deadline: datetime 到期日

响应：
- code
- data
    - item: JSON
    
**4. PUT `/item/:id` 更新商品**

body参数：
- update: JSON 字段不需要全部提供
    - pic
    - name
    - provider
    - intro
    - value
    - token
    - deadline

响应：
- code
- data
    - item 更新后的商品

**5. DELETE `/item/:id` 删除商品**

响应
- code


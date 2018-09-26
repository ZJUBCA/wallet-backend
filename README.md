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

# API Doc
- [资产管理API](#user-content-资产管理)
- [Dapp市场API](#user-content-Dapp市场)
- [发现API](#user-content-发现)

##### 错误码
每个响应都会返回一个`code`字段，拥有以下值：
- 0 成功
- 非0 失败，需提供额外的`msg`字段以显示错误信息。
## 新用户注册
### 公私钥生成
由前端使用[eosjs-ecc](https://github.com/EOSIO/eosjs-ecc)生成，例子可看[key-pair-generate](https://github.com/Blockchain-zju/wallet-develop-tutorial/tree/master/key-pair-generate)

### 账户注册
**POST xxxx/signup 注册账户**
Url请咨询管理员。该部分已由私有仓库实现。

body参数:
- account: 注册的账户名，12位(a-z,1-5)
- pubKey: 公钥
- signature: 利用私钥对账户名的签名
- debug: 是否debug模式，可选（debug模式下抵押和购买所花费的EOS不同）

该API会执行以下两个过程：
1. 利用协会的账户signuphelper为调用者创建一个指定账户。
2. 为新账户购买250KB的内存。
3. 为新账户抵押的CPU带宽和网络带宽资源**各20EOS**。

## 账户系统（该API专为后台管理设计）
TODO...

**1. POST `/login` 登录**

body参数:
- username
- password

响应：
- code
- msg
- data
    - token: 登录身份凭证
    
**2. PUT `/password` 修改密码**

body参数:
- username
- oldPassword
- newPassword

响应：
- code
- msg

## 资产管理
该部分完全与EOS区块链交互。TODO...

## Dapp市场
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

## 发现
### 精选文章
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

### 活动
**1. GET `/recommends` 获取轮播图活动列表**
注意：每个活动有优先级字段，前端按该字段优先显示前5个（从左到右）。

响应：
- code
- data
	- actvs: JSON数组
		- pic: 活动图片
		- title: 活动title
		- url: 活动url
		- weight: 权重
		- 
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
- order: number 非必填，当需要将活动推上推荐轮播图时，该字段填写优先级顺序，与recomAct表的id对应

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

**6. POST `/recommend` 将已有活动推上推荐列表**

body参数:
- sid: 活动id
- order: 优先级顺序, 与recomAct表中的id对应

响应：
- code
- data
	- recom: JSON

**7. PUT `/recommend` 更新推荐活动**

body参数：
- id
- sid: 活动id
- weight: 权重

响应：
- code
- data
	- recom: JSON

**8. DELETE `/recommend/:id` 删除推荐活动**

**9. DELETE `/recommend/id=&id=&id=`  批量删除推荐**
响应:
- code

### Token兑换商城
**1. GET `/goods` 获取商品列表**

query参数：
- page
- pageSize

响应：
- code
- data
    - items: 可兑换商品列表
    
**2. GET `/good/:id` 获取商品详情**

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


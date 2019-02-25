## 美团 Web APP

采用 react 技术栈，高仿美团外卖 Web APP。

### 技术栈

- Webpack 构建项目基本配置，Babel 和 ESLint 进行新语法解析与代码语法规范
- 采用 Flex 布局和 Rem 适配方案
- 局部滚动与全局滚动加载
- 使用 ES6 语法，运用 Axios 数据请求管理
- 用 React + Redux 实现页面逻辑框架
- React-router 路由管理 Tab 之间的切换
- 采用 Express 实现后端代理请求真实数据

### 本地访问

```bash
git clone https://github.com/amenzai/react-mt-webapp.git
cd react-mt-webapp
npm i

# 不使用 node 代理接口
npm run dev # 访问 localhost:2019

# 使用 node 代理接口
cd server
npm i
npm start # 访问 localhost:3000
```

[在线访问地址](http://oas.vastsum.net)

# MegaView Summary SDK 部署指南

本文档提供了将 MegaView Summary SDK 及其后端服务部署到 Vercel 的详细步骤。

## 前提条件

1. 已有 [Vercel](https://vercel.com) 账号
2. 已安装 [Node.js](https://nodejs.org/) (14.x 或更高版本)
3. 已安装 [Vercel CLI](https://vercel.com/docs/cli)：`npm install -g vercel`

## 部署后端服务

### 1. 准备项目

确保项目结构如下：

```
sdk/
  - server.js            # 后端服务
  - package.json         # 项目依赖
  - vercel.json          # Vercel 配置
  - .gitignore           # Git 忽略文件
  - megaview-summary-sdk.js  # SDK 核心文件
  - megaview-summary-sdk.css # SDK 样式文件
  - index.js             # SDK 入口文件
  - test.html            # 测试页面
```

### 2. 本地测试

在部署前，先在本地测试服务是否正常运行：

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000/health 确认服务正常运行。

### 3. 部署到 Vercel

#### 使用 Vercel CLI 部署

```bash
# 登录 Vercel
vercel login

# 部署项目
vercel
```

按照提示进行操作，完成部署。

#### 使用 Vercel 仪表板部署

1. 将项目推送到 GitHub 仓库
2. 登录 [Vercel 仪表板](https://vercel.com/dashboard)
3. 点击 "Import Project"
4. 选择 "Import Git Repository"
5. 选择您的 GitHub 仓库
6. 配置项目设置（默认值通常即可）
7. 点击 "Deploy"

### 4. 验证部署

部署完成后，Vercel 会提供一个域名（例如：`your-project.vercel.app`）。

访问以下 URL 验证部署是否成功：
- `https://your-project.vercel.app/health` - 应返回 "OK"
- `https://your-project.vercel.app/api/summary` - 应返回 JSON 数据

## 集成 SDK 与后端服务

### 1. 更新 SDK 配置

在您的应用中使用 SDK 时，将 API URL 设置为 Vercel 部署的地址：

```javascript
MegaviewSummary.render(container, {
  conversationId: "your-conversation-id",
  apiUrl: "https://your-project.vercel.app/api"
});
```

### 2. 测试跨域请求

1. 将 SDK 部署到另一个域名（可以是另一个 Vercel 项目或其他托管服务）
2. 使用 `test.html` 页面测试跨域请求
3. 确保 API 请求成功，没有 CORS 错误

## 故障排除

### CORS 错误

如果遇到 CORS 错误，请检查：

1. `server.js` 中的 CORS 配置是否正确
2. `vercel.json` 中的 headers 配置是否正确
3. 请求 URL 是否正确

### API 请求失败

如果 API 请求失败，请检查：

1. 请求 URL 是否正确
2. 服务器是否正常运行（访问 `/health` 端点）
3. 浏览器控制台是否有错误信息

## 生产环境注意事项

在生产环境中，建议：

1. 限制 CORS 配置，只允许特定域名访问
2. 添加适当的身份验证机制
3. 设置环境变量，而不是硬编码配置
4. 监控服务性能和错误 
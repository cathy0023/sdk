# MegaView Summary SDK 后端服务

这是一个简单的Node.js后端服务，用于测试MegaView Summary SDK的跨域请求功能。

## 功能

- 提供API端点供SDK调用
- 支持CORS跨域请求
- 返回模拟的摘要数据

## 安装

```bash
npm install
```

## 本地运行

```bash
npm run dev
```

服务将在 http://localhost:3000 上运行。

## API端点

### GET /api/summary

返回模拟的摘要数据，用于测试SDK的跨域请求功能。

### GET /health

健康检查端点，返回状态码200和"OK"。

## 部署到Vercel

1. 安装Vercel CLI：

```bash
npm install -g vercel
```

2. 登录Vercel：

```bash
vercel login
```

3. 部署项目：

```bash
vercel
```

## 与SDK集成

在SDK中，将API地址设置为：

- 本地测试：`http://localhost:3000/api`
- Vercel部署：`https://your-vercel-app-name.vercel.app/api`

## 跨域测试

这个后端服务已配置为允许所有来源的跨域请求。在生产环境中，应该将CORS配置限制为特定的域名。 
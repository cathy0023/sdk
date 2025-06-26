# MegaView Summary SDK

MegaView Summary SDK 是一个用于在任何网页中嵌入和显示会话纪要的JavaScript SDK。它提供了简单的API，可以轻松地将会话纪要功能集成到您的应用程序中。

## 功能特点

- 显示会话纪要内容
- 支持查看关键事件
- 支持再次运行指令
- 支持展开/收起功能
- 支持查看原文
- 提供弹窗和内嵌两种展示方式
- 支持自定义API地址和认证信息

## 安装

### 方式一：直接引入

```html
<script src="path/to/megaview-summary-sdk.js"></script>
<link rel="stylesheet" href="path/to/megaview-summary-sdk.css">
```

### 方式二：NPM安装（待实现）

```bash
npm install megaview-summary-sdk
```

```javascript
import MegaviewSummary from 'megaview-summary-sdk';
import 'megaview-summary-sdk/dist/megaview-summary-sdk.css';
```

## 使用方法

### 方式一：内嵌到页面中

```javascript
// 渲染会话纪要到指定容器
const widget = MegaviewSummary.render('#summary-container', {
  conversationId: '123456',  // 会话ID
  apiUrl: 'https://api.example.com',  // API地址
  token: 'your-auth-token'  // 认证token
});

// 监听事件
MegaviewSummary.on(widget, 'summary-loaded', function(e) {
  console.log('会话纪要加载完成:', e.detail);
});

MegaviewSummary.on(widget, 'original-text-click', function(e) {
  console.log('点击查看原文:', e.detail.order);
});
```

### 方式二：弹窗显示

```javascript
// 弹窗显示会话纪要
MegaviewSummary.showModal({
  title: '会话纪要',  // 弹窗标题
  conversationId: '123456',  // 会话ID
  apiUrl: 'https://api.example.com',  // API地址
  token: 'your-auth-token',  // 认证token
  onClose: function() {
    console.log('弹窗已关闭');
  }
});
```

## API文档

### MegaviewSummary.render(container, options)

在指定容器中渲染会话纪要组件。

- `container`: 容器元素或选择器
- `options`: 配置选项
  - `conversationId`: 会话ID（必填）
  - `apiUrl`: API地址（可选，默认为"http://localhost:9528"）
  - `token`: 认证token（可选）

返回值：会话纪要组件实例

### MegaviewSummary.showModal(options)

弹窗显示会话纪要。

- `options`: 配置选项
  - `title`: 弹窗标题（可选，默认为"会话纪要"）
  - `conversationId`: 会话ID（必填）
  - `apiUrl`: API地址（可选，默认为"http://localhost:9528"）
  - `token`: 认证token（可选）
  - `onClose`: 弹窗关闭回调（可选）

返回值：会话纪要组件实例

### MegaviewSummary.on(element, eventName, callback)

监听会话纪要组件的事件。

- `element`: 会话纪要组件实例或选择器
- `eventName`: 事件名称
  - `summary-loaded`: 会话纪要加载完成
  - `rerunning-instruct`: 再次运行指令
  - `summary-toggle`: 展开/收起切换
  - `original-text-click`: 点击查看原文
- `callback`: 事件回调函数

## 事件

### summary-loaded

会话纪要加载完成事件。

```javascript
MegaviewSummary.on(widget, 'summary-loaded', function(e) {
  console.log('会话纪要加载完成:', e.detail);
  // e.detail.conversationId: 会话ID
  // e.detail.summary: 会话纪要数据
});
```

### rerunning-instruct

再次运行指令事件。

```javascript
MegaviewSummary.on(widget, 'rerunning-instruct', function(e) {
  console.log('再次运行指令:', e.detail);
  // e.detail.conversationId: 会话ID
});
```

### summary-toggle

展开/收起切换事件。

```javascript
MegaviewSummary.on(widget, 'summary-toggle', function(e) {
  console.log('展开/收起切换:', e.detail);
  // e.detail.expanded: 是否展开
});
```

### original-text-click

点击查看原文事件。

```javascript
MegaviewSummary.on(widget, 'original-text-click', function(e) {
  console.log('点击查看原文:', e.detail);
  // e.detail.order: 原文顺序号
});
```

## 浏览器兼容性

- Chrome 60+
- Firefox 63+
- Safari 10.1+
- Edge 79+

## 许可证

MIT 
# MegaView Summary SDK - Vue 集成指南

本指南将帮助您在 Vue 2.7 项目中正确集成 MegaView Summary SDK。

## 安装步骤

### 1. 引入必要的文件

在您的 Vue 项目的 `public/index.html` 文件中，添加以下代码：

```html
<!-- 在 head 标签中添加 -->
<link rel="stylesheet" href="https://sdk-bice.vercel.app/megaview-summary-sdk.css">

<!-- 在 body 标签结束前添加 -->
<script src="https://sdk-bice.vercel.app/megaview-summary-sdk.js"></script>
<script src="https://sdk-bice.vercel.app/megaview-summary-vue.js"></script>
```

### 2. 在 Vue 项目中注册插件

在您的 `main.js` 文件中，添加以下代码：

```javascript
import Vue from 'vue';
import App from './App.vue';

// 确保 MegaviewSummary 对象存在
if (window.MegaviewSummaryPlugin) {
  Vue.use(window.MegaviewSummaryPlugin, {
    apiUrl: 'https://sdk-bice.vercel.app/api' // 您的 API 地址
  });
} else {
  console.error('MegaView SDK: Plugin not found, please check if the script is loaded correctly');
}

new Vue({
  render: h => h(App)
}).$mount('#app');
```

## 使用方法

### 方法一：使用全局组件

在任何 Vue 组件的模板中，您可以直接使用 `megaview-summary` 组件：

```vue
<template>
  <div class="container">
    <h1>会话纪要</h1>
    <megaview-summary 
      conversation-id="63332" 
      api-url="https://sdk-bice.vercel.app/api">
    </megaview-summary>
  </div>
</template>
```

### 方法二：使用 Vue 原型方法

在任何 Vue 组件中，您可以使用 `this.$megaviewSummary` 来调用 SDK 的方法：

```vue
<template>
  <div class="container">
    <button @click="showSummaryModal">显示会话纪要</button>
  </div>
</template>

<script>
export default {
  methods: {
    showSummaryModal() {
      this.$megaviewSummary.showModal({
        title: '会话纪要',
        conversationId: '63332',
        apiUrl: 'https://sdk-bice.vercel.app/api',
        onClose: () => {
          console.log('弹窗已关闭');
        }
      });
    }
  }
}
</script>
```

### 方法三：直接使用全局对象

如果您需要在非 Vue 组件的环境中使用 SDK，可以直接使用全局对象：

```javascript
// 确保页面已经加载完成
document.addEventListener('DOMContentLoaded', () => {
  if (window.MegaviewSummary && window.MegaviewSummary.showModal) {
    window.MegaviewSummary.showModal({
      title: '会话纪要',
      conversationId: '63332',
      apiUrl: 'https://sdk-bice.vercel.app/api'
    });
  } else {
    console.error('MegaView SDK: MegaviewSummary.showModal not found');
  }
});
```

## 故障排除

### 1. "MegaviewSummary.showModal is not a function" 错误

如果您遇到此错误，请检查：

- 确保在 Vue 实例创建之前加载了 SDK 脚本
- 检查浏览器控制台是否有其他相关错误
- 尝试在 `mounted` 钩子中使用 `setTimeout` 延迟调用：

```javascript
mounted() {
  setTimeout(() => {
    this.$megaviewSummary.showModal({
      // 配置项...
    });
  }, 500);
}
```

### 2. SDK 样式不正确

确保正确引入了 CSS 文件，并且没有被项目中的其他样式覆盖。您可以尝试增加 CSS 选择器的优先级：

```css
/* 在您的组件样式中 */
.megaview-summary-modal.megaview-summary-modal {
  /* 重复选择器以提高优先级 */
  z-index: 9999 !important;
}
```

### 3. 跨域问题

如果遇到跨域问题，请确保：

- API 服务器已正确配置 CORS 头
- 检查请求 URL 是否正确
- 可以尝试使用代理解决跨域问题

## 示例项目

完整的示例项目可以在这里找到：[示例项目链接]

## 技术支持

如果您有任何问题，请联系技术支持团队。 
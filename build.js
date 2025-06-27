// SDK构建脚本
const path = require('path');
const fs = require('fs');

// 创建dist目录
const distDir = path.resolve(__dirname, '../../dist-sdk');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// 合并SDK文件
const sdkJs = fs.readFileSync(path.resolve(__dirname, './megaview-summary-sdk.js'), 'utf8');
const sdkCss = fs.readFileSync(path.resolve(__dirname, './megaview-summary-sdk.css'), 'utf8');
const purifyJs = fs.readFileSync(path.resolve(__dirname, './purify.min.js'), 'utf8');

// 创建UMD版本
const umdContent = `
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.MegaviewSummary = factory());
}(this, (function () {
  'use strict';
  
  // 注入CSS
  const style = document.createElement('style');
  style.textContent = \`${sdkCss}\`;
  document.head.appendChild(style);
  
  // 注入DOMPurify
  ${purifyJs}
  
  ${sdkJs}
  
  return window.MegaviewSummary;
})));
`;

// 写入文件
fs.writeFileSync(path.resolve(distDir, 'megaview-summary-sdk.js'), umdContent);
fs.writeFileSync(path.resolve(distDir, 'megaview-summary-sdk.css'), sdkCss);

// 创建ES模块版本
const esContent = `
// 注入CSS
const style = document.createElement('style');
style.textContent = \`${sdkCss}\`;
document.head.appendChild(style);

// 注入DOMPurify
${purifyJs}

${sdkJs}

export default window.MegaviewSummary;
`;

fs.writeFileSync(path.resolve(distDir, 'megaview-summary-sdk.esm.js'), esContent);

// 创建示例HTML
const exampleHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MegaView Summary SDK 示例</title>
  <link rel="stylesheet" href="./megaview-summary-sdk.css">
</head>
<body>
  <h1>MegaView Summary SDK 示例</h1>
  
  <div style="margin: 20px 0;">
    <button id="showModal">显示会话纪要弹窗</button>
    <button id="renderInline">在页面内渲染</button>
  </div>
  
  <div id="summary-container" style="width: 100%; height: 500px; border: 1px solid #ddd; margin-top: 20px;"></div>
  
  <script src="./megaview-summary-sdk.js"></script>
  <script>
    document.getElementById('showModal').addEventListener('click', function() {
      MegaviewSummary.showModal({
        title: '会话纪要',
        conversationId: '12345'
      });
    });
    
    document.getElementById('renderInline').addEventListener('click', function() {
      MegaviewSummary.render('summary-container', {
        conversationId: '12345'
      });
    });
  </script>
</body>
</html>
`;

fs.writeFileSync(path.resolve(distDir, 'example.html'), exampleHtml);

console.log('SDK构建完成，输出目录：', distDir); 
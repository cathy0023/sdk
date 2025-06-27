// 复制DOMPurify库到项目根目录
const fs = require('fs');
const path = require('path');

// DOMPurify源文件路径
const sourcePath = path.resolve(__dirname, './node_modules/dompurify/dist/purify.min.js');
// 目标路径
const destPath = path.resolve(__dirname, './purify.min.js');

// 复制文件
try {
  const content = fs.readFileSync(sourcePath);
  fs.writeFileSync(destPath, content);
  console.log(`DOMPurify库已复制到: ${destPath}`);
} catch (error) {
  console.error('复制DOMPurify库失败:', error);
} 
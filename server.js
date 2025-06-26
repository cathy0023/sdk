const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// 启用CORS
app.use(cors({
  origin: '*', // 允许所有来源访问，生产环境中应该限制为特定域名
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 中间件
app.use(express.json());

// 路由
app.get('/api/summary', (req, res) => {
  // 返回一个简单的摘要数据
  res.json({
    success: true,
    data: {
      lastUpdateTime: new Date().toISOString(),
      summaryItems: [
        {
          title: '会话摘要',
          content: '这是一个测试摘要，用于验证跨域请求是否正常工作。'
        }
      ],
      questions: [
        {
          id: 1,
          question: '这是一个测试问题?',
          answers: [
            {
              content: '这是问题的回答内容，来自后端服务。',
              originalText: '原始对话文本内容示例。'
            }
          ]
        }
      ]
    }
  });
});

// 健康检查端点
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
}); 
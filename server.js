const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// 启用CORS
app.use(
  cors({
    origin: "*", // 允许所有来源访问，生产环境中应该限制为特定域名
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 中间件
app.use(express.json());

// 静态文件服务
app.use(express.static(__dirname));

// 设置默认首页
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// 路由
app.get("/api/summary", (req, res) => {
  // 返回一个简单的摘要数据
  res.json({
    success: true,
    code: 200,
    results: {
      data: [
        {
          copilot_instruction_set_id: 798,
          copilot_instruction_set_name: "会话质检_1748416231074",
          content: [
            {
              question_name: "销售是否挖需",
              answer_description: "销售是否主动挖掘了客户需求",
              answers: [
                {
                  llm_answer: "否",
                  original_text: [],
                  reasoning_process: "",
                  enum_answer: {
                    enum: "否",
                    event_id: "c59306",
                    event_name: "📗未挖需",
                    event_bg_color: 6,
                  },
                },
              ],
              visible: true,
              order: 2,
            },
            {
              question_name: "销售是否违规",
              answer_description: "销售是否有脏话、辱骂客户等违规行为",
              answers: [
                {
                  llm_answer: "否",
                  original_text: [],
                  reasoning_process: "",
                  enum_answer: {
                    enum: "否",
                    event_id: "c59312",
                    event_name: "📗无违规行为",
                    event_bg_color: 3,
                  },
                },
              ],
              visible: true,
              order: 3,
            },
          ],
        },
      ],
      has_instruction_set: true,
      last_update_time: new Date().toISOString(),
      status: 2,
    },
  });
});

// 健康检查端点
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});

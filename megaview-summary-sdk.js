// MegaView Summary SDK
// 版本: 1.0.0

(function() {
  // 图标定义
  const ICONS = {
    'icon-refresh-right': '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M512 170.666667c-188.544 0-341.333333 152.789333-341.333333 341.333333 0 78.506667 26.538667 150.741333 71.082666 208.298667l-59.733333 59.733333 60.373333 60.373333 59.733334-59.733333a340.48 340.48 0 0 0 209.877333 71.082667c188.544 0 341.333333-152.789333 341.333333-341.333334S700.544 170.666667 512 170.666667z m0 597.333333c-141.376 0-256-114.624-256-256s114.624-256 256-256 256 114.624 256 256-114.624 256-256 256z" fill="currentColor"></path><path d="M657.664 392.874667l-60.330667-60.330667-85.333333 85.333333-85.333333-85.333333-60.330667 60.330667 85.333333 85.333333-85.333333 85.333333 60.330667 60.330667 85.333333-85.333333 85.333333 85.333333 60.330667-60.330667-85.333333-85.333333z" fill="currentColor"></path></svg>',
    'icon-content-collapse': '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M896 469.333333H128v85.333334h768v-85.333334z" fill="currentColor"></path></svg>',
    'icon-content-expansion': '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M469.333333 469.333333V128h85.333334v341.333333h341.333333v85.333334H554.666667v341.333333h-85.333334V554.666667H128v-85.333334h341.333333z" fill="currentColor"></path></svg>',
    'icon-arrow-left': '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M672 97.28l-448 448 448 448 56.32-56.32-392.32-392.32 392.32-392.32z" fill="currentColor"></path></svg>',
    'icon-arrow-down-small': '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M512 714.667c-8.533 0-17.067-2.134-23.467-8.534L147.2 364.8c-12.8-12.8-12.8-34.133 0-46.933 12.8-12.8 34.133-12.8 46.933 0L512 635.733l317.867-317.866c12.8-12.8 34.133-12.8 46.933 0 12.8 12.8 12.8 34.133 0 46.933L535.467 706.133c-6.4 6.4-14.934 8.534-23.467 8.534z" fill="currentColor"></path></svg>'
  };

  // 样式定义 - 包含ConversationDetailSummaryResult组件的样式
  const styles = `
    .megaview-summary-container {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      width: 100%;
      height: 100%;
      position: relative;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    
    .summary-result__header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 8px 16px;
      gap: 8px;
    }
    
    .last-update-time {
      margin-right: auto;
      font-size: 12px;
      color: #909399;
      line-height: 16px;
    }
    
    .summary-result__content {
      position: relative;
      display: flex;
      overflow: auto;
      overflow-x: hidden;
      padding: 0 16px 20px;
      flex: 1;
      flex-direction: column;
      gap: 20px;
      max-height: calc(100% - 90px);
    }
    
    .run-loading {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 32px;
      color: #606266;
      padding: 40px 0;
    }
    
    .run-loading img {
      width: 60px;
      height: 60px;
    }
    
    .no-results {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 32px;
      color: #606266;
      padding: 40px 0;
    }
    
    .can-click-text {
      cursor: pointer;
      color: #4461ec;
    }
    
    /* 摘要项样式 */
    .summary-result-item {
      padding: 16px;
      border-radius: 8px;
      background: #f5f7fa;
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .summary-result-item__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    
    .summary-result-item__title {
      display: flex;
      align-items: center;
      overflow: hidden;
      padding: 0 16px;
      width: 100%;
      font-size: 16px;
      font-weight: 600;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #303133;
      line-height: 140%;
      gap: 10px;
    }
    
    .summary-result-item__title-icon {
      width: 4px;
      height: 12px;
      border-radius: 3px;
      background: #4461ec;
    }
    
    .summary-result-item__title-num {
      font-size: 12px;
      font-weight: 600;
      color: #303133;
      line-height: 16px;
    }
    
    .summary-result-item__content {
      padding: 0 8px;
      color: #606266;
      line-height: 1.6;
    }
    
    /* 问题项样式 */
    .summary-result-item__content-item {
      margin-bottom: 8px;
    }
    
    .content-item__title {
      display: flex;
      padding: 8px;
      gap: 8px;
      cursor: pointer;
    }
    
    .content-item__title:hover {
      border-radius: 5px;
      background: #f0f2f5;
    }
    
    .content-item__title.only-read {
      cursor: default;
    }
    
    .content-item__title-left {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      padding-top: 2px;
    }
    
    .content-item__title-text {
      margin: 4px 4px 0 0;
      font-size: 14px;
      white-space: pre-wrap;
      color: #303133;
      line-height: 140%;
    }
    
    .content-item__title-text-index,
    .content-item__title-text-question-name {
      font-weight: 600;
    }
    
    .content-item__title-text-answer {
      white-space: pre-line;
    }
    
    .content-item__title-right {
      display: flex;
      align-items: center;
      gap: 4px;
      width: fit-content;
      height: fit-content;
    }
    
    .expand-icon-container {
      transition: all 0.2s;
    }
    
    .expand-icon-container.is-expand {
      transform: rotate(180deg);
    }
    
    .event-button {
      margin-right: 4px;
      margin-bottom: 4px;
    }
    
    /* 未提及问题样式 */
    .not-mentioned-question {
      padding: 0 16px;
    }
    
    .not-mentioned-question__title {
      display: flex;
      align-items: center;
      padding: 8px 0;
      font-size: 14px;
      color: #909399;
      gap: 4px;
      line-height: 16px;
      cursor: pointer;
    }
    
    .not-mentioned-question__title-icon {
      transition: all 0.2s;
    }
    
    .not-mentioned-question__title-icon.is-expand {
      transform: rotate(180deg);
    }
    
    .not-mentioned-question__content-item {
      padding: 8px 0;
      font-size: 14px;
      color: #303133;
      line-height: 140%;
    }
    
    /* 答案原文样式 */
    .answer-original-text {
      padding: 8px 16px;
      margin: 4px 0;
      background-color: #f5f7fa;
      border-radius: 4px;
    }
    
    .answer-reasoning {
      padding: 8px 16px;
      margin: 4px 0;
      background-color: #f5f7fa;
      border-radius: 4px;
    }
    
    .original-text-link {
      color: #4461ec;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px 0;
      font-size: 12px;
    }
    
    .key-event-item {
      display: flex;
      padding: 8px 0;
      border-bottom: 1px solid #ebeef5;
    }
    
    .key-event-item__title {
      font-weight: 500;
      margin-right: 8px;
      color: #303133;
    }
    
    .key-event-item__content {
      color: #606266;
    }
    
    .megaview-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 6px;
      font-size: 14px;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      background-color: #fff;
      color: #606266;
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .megaview-button:hover {
      color: #409eff;
      border-color: #c6e2ff;
      background-color: #ecf5ff;
    }
    
    .megaview-button-text {
      border: none;
      background: transparent;
    }
    
    .megaview-button[disabled] {
      cursor: not-allowed;
      opacity: 0.6;
    }
    
    .key-event-detail {
      overflow: auto;
      overflow-x: hidden;
      padding: 0 8px;
      padding-bottom: 20px;
      flex: 1;
    }
    
    .key-event-detail-header {
      display: flex;
      align-items: center;
      padding: 16px 0;
      height: 48px;
      font-weight: 600;
      box-sizing: border-box;
    }
    
    .key-event-detail-header i {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 8px;
      width: 32px;
      height: 32px;
      cursor: pointer;
    }
    
    .key-event-detail-header i:hover {
      border-radius: 6px;
      background: rgba(0, 0, 0, 0.05);
    }
    
    .key-event-detail-header span {
      display: block;
      font-size: 14px;
      line-height: 1.4;
      color: #303133;
    }
    
    .ai-generate-tip {
      position: absolute;
      bottom: 7px;
      left: 16px;
      font-size: 12px;
      color: #909399;
    }
    
    /* 图标样式 */
    .icon {
      width: 1em;
      height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  `;

  // 定义Web Component
  class MegaviewSummaryWidget extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.isLoading = true;
      this.summaryData = null;
      this.isSummaryExpanded = false;
      this.eventTrackerData = [];
      this.eventTrackerTitle = '';
      this.participantsInfo = [];
    }

    static get observedAttributes() {
      return ['conversation-id', 'api-url', 'token'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        if (name === 'conversation-id' && newValue) {
          this.loadSummaryData();
        }
      }
    }

    connectedCallback() {
      this.render();
      if (this.getAttribute('conversation-id')) {
        this.loadSummaryData();
      }
    }

    render() {
      // 清空shadowRoot
      while (this.shadowRoot.firstChild) {
        this.shadowRoot.removeChild(this.shadowRoot.firstChild);
      }

      // 添加样式
      const styleElement = document.createElement('style');
      styleElement.textContent = styles;
      this.shadowRoot.appendChild(styleElement);

      // 创建容器
      const container = document.createElement('div');
      container.className = 'megaview-summary-container';
      
      // 渲染内容
      this.renderSummaryResult(container);
      
      this.shadowRoot.appendChild(container);
    }

    renderSummaryResult(container) {
      const summaryResult = document.createElement('div');
      summaryResult.className = 'summary-result';
      
      if (!this.eventTrackerData.length) {
        // 渲染常规会话纪要
        this.renderRegularSummary(summaryResult);
      } else {
        // 渲染关键事件详情
        this.renderKeyEventDetail(summaryResult);
      }
      
      // 添加AI生成提示
      if (this.summaryData?.data?.length && !this.eventTrackerData.length) {
        const aiTip = document.createElement('div');
        aiTip.className = 'ai-generate-tip';
        aiTip.textContent = '此内容由AI总结生成';
        summaryResult.appendChild(aiTip);
      }
      
      container.appendChild(summaryResult);
    }
    
    renderRegularSummary(container) {
      // 创建头部
      const header = document.createElement('div');
      header.className = 'summary-result__header';
      
      if (this.summaryData && this.summaryData.last_update_time) {
        const lastUpdateTime = document.createElement('div');
        lastUpdateTime.className = 'last-update-time';
        lastUpdateTime.textContent = `更新时间：${this.formatDate(this.summaryData.last_update_time)}`;
        header.appendChild(lastUpdateTime);
      }
      
      // 添加"再次运行指令"按钮
      if (this.checkReRunningPermission()) {
        const refreshButton = document.createElement('button');
        refreshButton.className = 'megaview-button megaview-button-text';
        refreshButton.title = '再次运行指令';
        refreshButton.innerHTML = `<i class="icon">${ICONS['icon-refresh-right']}</i>`;
        refreshButton.disabled = this.summaryData?.isRunning || false;
        refreshButton.addEventListener('click', () => this.reRunningInstruct());
        header.appendChild(refreshButton);
      }
      
      // 添加展开/收起按钮
      const expandButton = document.createElement('button');
      expandButton.className = 'megaview-button megaview-button-text';
      expandButton.title = this.isSummaryExpanded ? '全部收起' : '全部展开';
      expandButton.innerHTML = `<i class="icon">${this.isSummaryExpanded ? ICONS['icon-content-collapse'] : ICONS['icon-content-expansion']}</i>`;
      expandButton.addEventListener('click', () => this.toggleSummaryResultExpand());
      header.appendChild(expandButton);
      
      container.appendChild(header);
      
      // 创建内容区域
      const content = document.createElement('div');
      content.className = 'summary-result__content';
      
      if (this.summaryData?.isRunning) {
        // 渲染加载状态
        const loading = document.createElement('div');
        loading.className = 'run-loading';
        loading.innerHTML = `
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA1MCI+PHBhdGggZD0iTTI1IDVhMjAgMjAgMCAxIDAgMCA0MCAxIDEgMCAwIDAgMC0yIDIwIDIwIDAgMCAxIDAtMzYgMSAxIDAgMCAwIDAtMnoiIGZpbGw9IiM0MDllZmYiPjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBmcm9tPSIwIDI1IDI1IiB0bz0iMzYwIDI1IDI1IiBkdXI9IjAuOHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+PC9wYXRoPjwvc3ZnPg==" />
          <p>指令运行中，请稍候几分钟再查看结果</p>
        `;
        content.appendChild(loading);
      } else if (!this.summaryData?.data?.length) {
        // 渲染无数据状态
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        
        const noDataText = document.createElement('p');
        if (!this.checkReRunningPermission()) {
          noDataText.textContent = '暂无内容';
        } else {
          noDataText.innerHTML = '暂无内容，您是否想 <span class="can-click-text">现在运行指令</span>';
          noDataText.querySelector('.can-click-text').addEventListener('click', () => this.reRunningInstruct());
        }
        
        noResults.appendChild(noDataText);
        content.appendChild(noResults);
      } else {
        // 渲染摘要内容
        this.renderSummaryItems(content);
      }
      
      container.appendChild(content);
    }
    
    renderSummaryItems(container) {
      if (!this.summaryData?.data?.length) return;
      
      this.summaryData.data.forEach(item => {
        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-result-item';
        
        // 创建标题部分
        const titleDiv = document.createElement('div');
        titleDiv.className = 'summary-result-item__title';
        
        const titleIcon = document.createElement('div');
        titleIcon.className = 'summary-result-item__title-icon';
        titleDiv.appendChild(titleIcon);
        
        // 添加标题文本
        titleDiv.appendChild(document.createTextNode(item.copilot_instruction_set_name || '会话摘要'));
        
        // 添加数量标签
        if (item.content && Array.isArray(item.content)) {
          const visibleCount = item.content.filter(c => c.visible).length;
          const totalCount = item.content.length;
          
          const countSpan = document.createElement('span');
          countSpan.className = 'summary-result-item__title-num';
          countSpan.textContent = `${visibleCount}/${totalCount}`;
          titleDiv.appendChild(countSpan);
        }
        
        summaryItem.appendChild(titleDiv);
        
        // 渲染提及的内容
        if (item.content && Array.isArray(item.content)) {
          const hitQuestionList = item.content.filter(q => q.visible);
          
          if (hitQuestionList.length > 0) {
            const contentDiv = document.createElement('div');
            contentDiv.className = 'summary-result-item__content';
            
            hitQuestionList.forEach((question, index) => {
              this.renderQuestionItem(contentDiv, question, index, hitQuestionList.length);
            });
            
            summaryItem.appendChild(contentDiv);
          }
          
          // 渲染未提及的内容
          const notMentionedList = item.content.filter(q => !q.visible);
          if (notMentionedList.length > 0) {
            this.renderNotMentionedQuestions(summaryItem, notMentionedList);
          }
        }
        
        container.appendChild(summaryItem);
      });
    }
    
    renderQuestionItem(container, question, index, totalQuestions) {
      // 创建问题项容器
      const contentItem = document.createElement('div');
      contentItem.className = 'summary-result-item__content-item';
      
      // 初始化问题的展开状态
      question.isExpand = question.isExpand || false;
      
      // 创建标题部分
      const titleDiv = document.createElement('div');
      titleDiv.className = 'content-item__title';
      
      // 检查是否有答案列表可以显示
      const hasAnswerList = this.isShowAnswerList(question.answers);
      if (!hasAnswerList) {
        titleDiv.classList.add('only-read');
      }
      
      // 添加点击事件来切换展开状态
      titleDiv.addEventListener('click', () => {
        question.isExpand = !question.isExpand;
        this.renderSummaryResult(this.shadowRoot.querySelector('.megaview-summary-container'));
      });
      
      // 创建左侧内容
      const titleLeft = document.createElement('div');
      titleLeft.className = 'content-item__title-left';
      
      // 创建标题文本
      const titleText = document.createElement('div');
      titleText.className = 'content-item__title-text';
      
      // 添加索引（如果有多个问题）
      if (totalQuestions > 1) {
        const indexSpan = document.createElement('span');
        indexSpan.className = 'content-item__title-text-index';
        indexSpan.textContent = `${index + 1}.`;
        titleText.appendChild(indexSpan);
      }
      
      // 添加问题名称
      if (question.question_name) {
        const questionNameSpan = document.createElement('span');
        questionNameSpan.className = 'content-item__title-text-question-name';
        questionNameSpan.textContent = `${question.question_name}：`;
        titleText.appendChild(questionNameSpan);
      }
      
      // 添加答案文本
      const hitEvents = this.getHitEventList(question.answers);
      if (!hitEvents.filter(item => item.event_id).length) {
        const answerP = document.createElement('p');
        answerP.className = 'content-item__title-text-answer';
        answerP.innerHTML = this.allLLMAnswer(question.answers).join('、');
        titleText.appendChild(answerP);
      }
      
      titleLeft.appendChild(titleText);
      
      // 添加关键事件按钮
      hitEvents.forEach(event => {
        if (event.event_id) {
          const eventButton = document.createElement('button');
          eventButton.className = 'event-button';
          eventButton.textContent = event.event_name;
          eventButton.style.backgroundColor = event.event_bg_color || '#4461ec';
          eventButton.style.color = '#fff';
          eventButton.style.border = 'none';
          eventButton.style.borderRadius = '4px';
          eventButton.style.padding = '2px 8px';
          eventButton.style.marginRight = '4px';
          eventButton.style.marginBottom = '4px';
          eventButton.style.cursor = 'pointer';
          eventButton.style.fontSize = '12px';
          
          eventButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.onClickKeyEvent(event.event_id);
          });
          
          titleLeft.appendChild(eventButton);
        }
      });
      
      titleDiv.appendChild(titleLeft);
      
      // 创建右侧内容（如果有答案列表）
      if (hasAnswerList) {
        const titleRight = document.createElement('div');
        titleRight.className = 'content-item__title-right';
        
        // 添加展开/收起图标
        const expandIcon = document.createElement('div');
        expandIcon.className = 'expand-icon-container';
        if (question.isExpand) {
          expandIcon.classList.add('is-expand');
        }
        
        const icon = document.createElement('i');
        icon.className = 'icon';
        icon.innerHTML = ICONS['icon-arrow-down-small'];
        expandIcon.appendChild(icon);
        
        titleRight.appendChild(expandIcon);
        titleDiv.appendChild(titleRight);
      }
      
      contentItem.appendChild(titleDiv);
      
      // 添加展开的答案内容
      if (hasAnswerList) {
        const answerContent = document.createElement('div');
        answerContent.style.display = question.isExpand ? 'block' : 'none';
        answerContent.style.transition = 'all 0.3s';
        
        this.renderAnswerList(answerContent, question.answers);
        contentItem.appendChild(answerContent);
      }
      
      container.appendChild(contentItem);
    }
    
    renderAnswerList(container, answers) {
      answers.forEach(answer => {
        if (answer.original_text && answer.original_text.length) {
          answer.original_text.forEach(originalText => {
            if (originalText.content) {
              const originalTextDiv = document.createElement('div');
              originalTextDiv.className = 'answer-original-text';
              originalTextDiv.style.padding = '8px 16px';
              originalTextDiv.style.margin = '4px 0';
              originalTextDiv.style.backgroundColor = '#f5f7fa';
              originalTextDiv.style.borderRadius = '4px';
              
              const contentP = document.createElement('p');
              contentP.innerHTML = originalText.content;
              originalTextDiv.appendChild(contentP);
              
              // 添加原文链接
              if (originalText.order) {
                const linkBtn = document.createElement('button');
                linkBtn.className = 'original-text-link';
                linkBtn.textContent = '查看原文';
                linkBtn.style.color = '#4461ec';
                linkBtn.style.background = 'none';
                linkBtn.style.border = 'none';
                linkBtn.style.cursor = 'pointer';
                linkBtn.style.padding = '4px 0';
                linkBtn.style.fontSize = '12px';
                
                linkBtn.addEventListener('click', () => {
                  this.onClickOriginalText(originalText.order);
                });
                
                originalTextDiv.appendChild(linkBtn);
              }
              
              container.appendChild(originalTextDiv);
            }
          });
        }
        
        // 添加推理过程
        if (answer.reasoning_process) {
          const reasoningDiv = document.createElement('div');
          reasoningDiv.className = 'answer-reasoning';
          reasoningDiv.style.padding = '8px 16px';
          reasoningDiv.style.margin = '4px 0';
          reasoningDiv.style.backgroundColor = '#f5f7fa';
          reasoningDiv.style.borderRadius = '4px';
          
          const reasoningTitle = document.createElement('div');
          reasoningTitle.textContent = '推理过程：';
          reasoningTitle.style.fontWeight = 'bold';
          reasoningTitle.style.marginBottom = '4px';
          
          const reasoningContent = document.createElement('div');
          reasoningContent.innerHTML = answer.reasoning_process;
          
          reasoningDiv.appendChild(reasoningTitle);
          reasoningDiv.appendChild(reasoningContent);
          
          container.appendChild(reasoningDiv);
        }
      });
    }
    
    renderNotMentionedQuestions(container, notMentionedList) {
      const notMentionedDiv = document.createElement('div');
      notMentionedDiv.className = 'not-mentioned-question';
      
      // 创建标题
      const titleDiv = document.createElement('div');
      titleDiv.className = 'not-mentioned-question__title';
      titleDiv.innerHTML = `<div>${notMentionedList.length}条未提及</div>`;
      
      // 添加展开/收起图标
      const iconDiv = document.createElement('div');
      iconDiv.className = 'not-mentioned-question__title-icon';
      
      // 初始化展开状态
      if (!container.notMentionedQuestionExpand) {
        container.notMentionedQuestionExpand = false;
      }
      
      if (container.notMentionedQuestionExpand) {
        iconDiv.classList.add('is-expand');
      }
      
      const icon = document.createElement('i');
      icon.className = 'icon';
      icon.innerHTML = ICONS['icon-arrow-down-small'];
      iconDiv.appendChild(icon);
      
      titleDiv.appendChild(iconDiv);
      
      // 添加点击事件
      titleDiv.addEventListener('click', () => {
        container.notMentionedQuestionExpand = !container.notMentionedQuestionExpand;
        this.renderSummaryResult(this.shadowRoot.querySelector('.megaview-summary-container'));
      });
      
      notMentionedDiv.appendChild(titleDiv);
      
      // 创建内容部分
      const contentDiv = document.createElement('div');
      contentDiv.className = 'not-mentioned-question__content';
      contentDiv.style.display = container.notMentionedQuestionExpand ? 'block' : 'none';
      
      notMentionedList.forEach((question, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'not-mentioned-question__content-item';
        
        if (notMentionedList.length > 1) {
          itemDiv.innerHTML = `<span>${index + 1}.</span> ${question.question_name}：${this.notMentionedQuestionAnswer(question)}`;
        } else {
          itemDiv.innerHTML = `${question.question_name}：${this.notMentionedQuestionAnswer(question)}`;
        }
        
        contentDiv.appendChild(itemDiv);
      });
      
      notMentionedDiv.appendChild(contentDiv);
      container.appendChild(notMentionedDiv);
    }
    
    // 辅助方法
    allLLMAnswer(answers) {
      const res = [];
      if (answers && Array.isArray(answers)) {
        answers.forEach(answer => {
          if (answer.llm_answer) {
            res.push(answer.llm_answer);
          }
        });
      }
      return res;
    }
    
    notMentionedQuestionAnswer(notMentionedQuestion) {
      const answers = notMentionedQuestion.answers;
      if (answers && Array.isArray(answers)) {
        const allAnswers = answers.map(answer => answer.llm_answer).filter(Boolean);
        return allAnswers.join('、');
      }
      return '';
    }
    
    isShowAnswerList(answers) {
      if (!answers || !Array.isArray(answers)) return false;
      
      const allOriginalText = answers.flatMap(item => item.original_text || []);
      const allReasoningProcess = answers.filter(item => item.reasoning_process);
      
      return allOriginalText.length > 0 || allReasoningProcess.length > 0;
    }
    
    getHitEventList(answerList) {
      const eventList = [];
      if (answerList && Array.isArray(answerList)) {
        answerList.forEach(item => {
          if (item.enum_answer) {
            eventList.push(item.enum_answer);
          }
        });
      }
      return eventList;
    }

    async loadSummaryData() {
      const conversationId = this.getAttribute('conversation-id');
      const apiUrl = this.getAttribute('api-url') || 'http://localhost:9528';
      const token = this.getAttribute('token');
      
      this.isLoading = true;
      this.summaryData = { isRunning: true };
      this.render();
      
      try {
        // 实际API调用
        const res = await this.fetchSummaryData({
          conversationId,
          apiUrl,
          token
        });

        console.log('fetchSummaryData data', res);
        
        this.isLoading = false;
        // 处理API返回的数据结构
        if (res.results) {
          this.summaryData = res.results;
        } else if (res.data) {
          this.summaryData = {
            data: res.data,
            last_update_time: res.last_update_time || new Date().toISOString()
          };
        } else {
          this.summaryData = res;
        }
        
        // 触发加载完成事件
        const event = new CustomEvent('summary-loaded', {
          detail: {
            conversationId,
            summary: this.summaryData
          }
        });
        this.dispatchEvent(event);
      } catch (error) {
        console.error('加载会话纪要失败:', error);
        this.isLoading = false;
        this.summaryData = { 
          error: true,
          errorMessage: '加载失败，请稍后重试'
        };
      }
      
      this.render();
    }
    
    async fetchSummaryData(options) {
      const { conversationId, apiUrl, token } = options;
      
      // 适配新的后端API
      const headers = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      // 使用新的API端点
      const response = await fetch(`${apiUrl}/summary`, {
        method: 'GET',
        headers
      });
      
      if (!response.ok) {
        throw new Error(`获取会话纪要失败: ${response.status}`);
      }
      
      return await response.json();
      
    }
    
    async getEventTrackerApi(options) {
      const { conversation_id, event_id } = options;
      
      // 模拟API调用
      this.eventTrackerData = [
        { 
          id: event_id,
          title: '关键事件详情',
          content: '这是关键事件的详细内容，包含了会话中的重要信息。',
          order: 5
        },
        {
          id: event_id + '1',
          title: '补充信息',
          content: '这是关于该事件的补充信息，提供了更多上下文。',
          order: 6
        }
      ];
      this.eventTrackerTitle = '关键事件详情';
      
      this.render();
      
      // 实际API调用代码
      /*
      const apiUrl = this.getAttribute('api-url') || 'https://api.megaview.com';
      const token = this.getAttribute('token');
      
      const headers = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${apiUrl}/api/v1/conversations/${conversation_id}/events/${event_id}`, {
        method: 'GET',
        headers
      });
      
      if (!response.ok) {
        throw new Error(`获取关键事件失败: ${response.status}`);
      }
      
      const data = await response.json();
      this.eventTrackerData = data.events;
      this.eventTrackerTitle = data.title;
      
      this.render();
      */
    }

    async reRunningInstruct() {
      const conversationId = this.getAttribute('conversation-id');
      const apiUrl = this.getAttribute('api-url') || 'https://api.megaview.com';
      const token = this.getAttribute('token');
      
      this.summaryData = { isRunning: true };
      this.render();
      
      // 触发再次运行事件
      const event = new CustomEvent('rerunning-instruct', {
        detail: { conversationId }
      });
      this.dispatchEvent(event);
      
      // 实际API调用代码
      /*
      try {
        const headers = {
          'Content-Type': 'application/json'
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await fetch(`${apiUrl}/api/v1/conversations/${conversationId}/summary/run`, {
          method: 'POST',
          headers
        });
        
        if (!response.ok) {
          throw new Error(`重新运行指令失败: ${response.status}`);
        }
        
        // 轮询检查结果
        this.pollSummaryResult(conversationId, apiUrl, token);
      } catch (error) {
        console.error('重新运行指令失败:', error);
        this.summaryData = { 
          error: true,
          errorMessage: '运行失败，请稍后重试'
        };
        this.render();
      }
      */
      
      // 模拟API调用
      setTimeout(() => {
        this.loadSummaryData();
      }, 3000);
    }
    
    /*
    async pollSummaryResult(conversationId, apiUrl, token) {
      const checkResult = async () => {
        try {
          const data = await this.fetchSummaryData({
            conversationId,
            apiUrl,
            token
          });
          
          if (data.isRunning) {
            // 继续轮询
            setTimeout(checkResult, 5000);
          } else {
            // 完成
            this.summaryData = data;
            this.render();
          }
        } catch (error) {
          console.error('轮询会话纪要失败:', error);
          this.summaryData = { 
            error: true,
            errorMessage: '获取结果失败，请稍后重试'
          };
          this.render();
        }
      };
      
      // 开始轮询
      setTimeout(checkResult, 5000);
    }
    */

    toggleSummaryResultExpand() {
      this.isSummaryExpanded = !this.isSummaryExpanded;
      
      // 触发展开/收起事件
      const event = new CustomEvent('summary-toggle', {
        detail: {
          expanded: this.isSummaryExpanded
        }
      });
      this.dispatchEvent(event);
      
      this.render();
    }
    
    onClickKeyEvent(eventId) {
      const conversationId = this.getAttribute('conversation-id');
      
      this.getEventTrackerApi({
        conversation_id: conversationId,
        event_id: eventId
      });
    }
    
    onClickOriginalText(order) {
      // 触发原文点击事件
      const event = new CustomEvent('original-text-click', {
        detail: { order }
      });
      this.dispatchEvent(event);
    }
    
    clearEventTracker() {
      this.eventTrackerData = [];
      this.eventTrackerTitle = '';
      this.render();
    }
    
    checkReRunningPermission() {
      // 实际项目中，这里应该检查用户权限
      // 这里简单返回true，表示有权限
      return true;
    }

    renderKeyEventDetail(container) {
      const keyEventDetail = document.createElement('div');
      keyEventDetail.className = 'key-event-detail';
      
      // 创建头部
      const header = document.createElement('div');
      header.className = 'key-event-detail-header';
      
      const backIcon = document.createElement('i');
      backIcon.className = 'icon';
      backIcon.innerHTML = ICONS['icon-arrow-left'];
      backIcon.addEventListener('click', () => this.clearEventTracker());
      header.appendChild(backIcon);
      
      const title = document.createElement('span');
      title.textContent = this.eventTrackerTitle;
      header.appendChild(title);
      
      keyEventDetail.appendChild(header);
      
      // 创建关键事件列表
      const eventList = document.createElement('div');
      eventList.className = 'key-event-detail-list';
      
      this.eventTrackerData.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = 'key-event-item';
        eventItem.innerHTML = `
          <div class="key-event-item__title">${event.title}</div>
          <div class="key-event-item__content">${event.content}</div>
        `;
        
        // 添加原文点击事件
        if (event.order) {
          const originalTextBtn = document.createElement('button');
          originalTextBtn.className = 'megaview-button megaview-button-text';
          originalTextBtn.textContent = '查看原文';
          originalTextBtn.addEventListener('click', () => this.onClickOriginalText(event.order));
          eventItem.appendChild(originalTextBtn);
        }
        
        eventList.appendChild(eventItem);
      });
      
      keyEventDetail.appendChild(eventList);
      container.appendChild(keyEventDetail);
    }

    formatDate(dateString) {
      const date = new Date(dateString);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    }
  }

  // 注册Web Component
  if (!customElements.get('megaview-summary-widget')) {
    customElements.define('megaview-summary-widget', MegaviewSummaryWidget);
  }

  // 暴露全局API
  window.MegaviewSummary = {
    // 渲染摘要组件到指定容器
    render: function(container, options = {}) {
      if (typeof container === 'string') {
        container = document.querySelector(container);
      }
      
      if (!container) {
        console.error('MegaviewSummary: 无法找到目标容器');
        return;
      }
      
      const widget = document.createElement('megaview-summary-widget');
      
      if (options.conversationId) {
        widget.setAttribute('conversation-id', options.conversationId);
      }
      
      if (options.apiUrl) {
        widget.setAttribute('api-url', options.apiUrl);
      }
      
      if (options.token) {
        widget.setAttribute('token', options.token);
      }
      
      // 清空容器并添加组件
      container.innerHTML = '';
      container.appendChild(widget);
      
      return widget;
    },
    
    // 监听事件
    on: function(element, eventName, callback) {
      if (typeof element === 'string') {
        element = document.querySelector(element);
      }
      
      if (!element || !(element instanceof HTMLElement)) {
        console.error('MegaviewSummary: 无效的元素');
        return;
      }
      
      element.addEventListener(eventName, callback);
    }
  };
})(); 
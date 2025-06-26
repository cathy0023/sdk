// MegaView Summary SDK 入口文件

// 导入SDK样式
import './megaview-summary-sdk.css';
// 导入SDK核心
import './megaview-summary-sdk.js';

// 可选：导入纯JavaScript版本（不使用Web Components）
// import './megaview-summary-sdk-pure.js';

// 导出SDK API
export default window.MegaviewSummary;

// 提供弹窗展示功能
window.MegaviewSummary.showModal = function(options = {}) {
  // 创建模态框容器
  const modal = document.createElement('div');
  modal.className = 'megaview-summary-modal megaview-fade-in';
  
  // 创建模态框内容
  const modalContent = document.createElement('div');
  modalContent.className = 'megaview-summary-modal-content';
  
  // 创建模态框头部
  const modalHeader = document.createElement('div');
  modalHeader.className = 'megaview-summary-modal-header';
  
  const modalTitle = document.createElement('div');
  modalTitle.className = 'megaview-summary-modal-title';
  modalTitle.textContent = options.title || '会话纪要';
  
  const modalClose = document.createElement('div');
  modalClose.className = 'megaview-summary-modal-close';
  modalClose.textContent = '×';
  modalClose.addEventListener('click', () => {
    document.body.removeChild(modal);
    if (typeof options.onClose === 'function') {
      options.onClose();
    }
  });
  
  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(modalClose);
  
  // 创建模态框主体
  const modalBody = document.createElement('div');
  modalBody.className = 'megaview-summary-modal-body';
  
  // 组装模态框
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modal.appendChild(modalContent);
  
  // 添加到页面
  document.body.appendChild(modal);
  
  // 渲染摘要组件
  return window.MegaviewSummary.render(modalBody, {
    conversationId: options.conversationId,
    apiUrl: options.apiUrl,
    token: options.token
  });
};

// 提供在元素旁边显示的弹出框功能
window.MegaviewSummary.showPopover = function(triggerElement, options = {}) {
  // 实现弹出框逻辑
  // ...
  
  // 简单实现，后续可扩展
  return window.MegaviewSummary.showModal(options);
}; 
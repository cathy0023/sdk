/**
 * MegaView Summary SDK - Vue 包装器
 * 专为Vue项目设计的SDK集成方案
 */

// 确保SDK核心对象存在
if (!window.MegaviewSummary) {
  window.MegaviewSummary = {};
}

// 添加弹窗展示功能
window.MegaviewSummary.showModal = function(options = {}) {
  console.log('MegaView SDK: showModal called with options:', options);
  
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
  if (typeof window.MegaviewSummary.render === 'function') {
    return window.MegaviewSummary.render(modalBody, {
      conversationId: options.conversationId,
      apiUrl: options.apiUrl,
      token: options.token
    });
  } else {
    console.error('MegaView SDK: render method not found');
    modalBody.innerHTML = '<div style="padding: 20px; color: #f56c6c;">SDK 渲染方法未找到，请确保正确加载了SDK核心文件</div>';
    return null;
  }
};

// 提供在元素旁边显示的弹出框功能
window.MegaviewSummary.showPopover = function(triggerElement, options = {}) {
  return window.MegaviewSummary.showModal(options);
};

// 为Vue项目提供的插件
const MegaviewSummaryPlugin = {
  install(Vue, options = {}) {
    // 注册全局组件
    Vue.component('megaview-summary', {
      props: {
        conversationId: {
          type: String,
          required: true
        },
        apiUrl: {
          type: String,
          default: options.apiUrl || 'https://sdk-bice.vercel.app/api'
        },
        token: String
      },
      template: '<div ref="container" class="megaview-summary-container"></div>',
      mounted() {
        // 在组件挂载后渲染SDK
        if (window.MegaviewSummary && typeof window.MegaviewSummary.render === 'function') {
          window.MegaviewSummary.render(this.$refs.container, {
            conversationId: this.conversationId,
            apiUrl: this.apiUrl,
            token: this.token
          });
        } else {
          console.error('MegaView SDK: MegaviewSummary.render is not a function');
          this.$refs.container.innerHTML = '<div style="padding: 20px; color: #f56c6c;">SDK 未正确加载，请检查引入顺序</div>';
        }
      }
    });

    // 添加到Vue原型，方便调用
    Vue.prototype.$megaviewSummary = {
      showModal(options) {
        return window.MegaviewSummary.showModal(options);
      },
      showPopover(triggerElement, options) {
        return window.MegaviewSummary.showPopover(triggerElement, options);
      }
    };
  }
};

// 导出Vue插件
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = MegaviewSummaryPlugin;
  }
  exports.MegaviewSummaryPlugin = MegaviewSummaryPlugin;
} else if (typeof window !== 'undefined') {
  window.MegaviewSummaryPlugin = MegaviewSummaryPlugin;
}

// 自动安装（如果Vue可用）
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(MegaviewSummaryPlugin);
} 
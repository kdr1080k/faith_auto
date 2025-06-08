# Faith Auto UI/UX Design Guide

## 1. 设计概述

### 1.1 品牌定位
Faith Auto是澳大利亚领先的汽车订阅服务平台，致力于为用户提供灵活、便捷、全包式的汽车使用体验。我们的设计理念体现了现代、专业、可信赖的品牌形象。

### 1.2 设计原则
- **简洁明了**: 界面简洁，信息层次清晰
- **用户友好**: 以用户需求为中心，提供直观的操作体验
- **响应式设计**: 适配各种设备和屏幕尺寸
- **可访问性**: 确保所有用户都能轻松使用
- **品牌一致性**: 保持统一的视觉语言和交互模式

## 2. 视觉设计系统

### 2.1 品牌色彩

#### 主色调
```css
/* 主要品牌色 */
--primary: #00BFA5;        /* 青绿色 - 主要CTA按钮、链接、强调元素 */
--accent: #00A693;         /* 深青绿色 - 悬停状态、次要强调 */

/* 中性色 */
--gray-900: #263238;       /* 深灰色 - 主要文本、标题 */
--gray-800: #37474F;       /* 深灰色 - 次要文本 */
--gray-600: #546E7A;       /* 中灰色 - 辅助文本 */
--gray-400: #90A4AE;       /* 浅灰色 - 占位符、禁用状态 */
--gray-300: #B0BEC5;       /* 浅灰色 - 边框、分割线 */
--gray-100: #ECEFF1;       /* 极浅灰色 - 背景、卡片 */
--gray-50: #F5F7FA;        /* 背景色 */

/* 功能色 */
--white: #FFFFFF;          /* 纯白色 - 卡片背景、按钮文字 */
--success: #4CAF50;        /* 成功状态 */
--warning: #FF9800;        /* 警告状态 */
--error: #F44336;          /* 错误状态 */
--info: #2196F3;           /* 信息提示 */
```

#### 色彩使用规范
- **主色调 (#00BFA5)**: 用于主要CTA按钮、导航激活状态、重要链接
- **深灰色 (#263238)**: 用于标题、主要文本内容
- **中性灰色**: 用于次要文本、边框、背景
- **白色**: 用于卡片背景、按钮文字、清洁的背景区域

### 2.2 字体系统

#### 字体族
```css
/* 主要字体 */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

/* 等宽字体（用于代码、数据） */
font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
```

#### 字体层级
```css
/* 标题层级 */
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }    /* 36px - 主标题 */
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }  /* 30px - 二级标题 */
.text-2xl { font-size: 1.5rem; line-height: 2rem; }       /* 24px - 三级标题 */
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }    /* 20px - 四级标题 */
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }   /* 18px - 大文本 */

/* 正文层级 */
.text-base { font-size: 1rem; line-height: 1.5rem; }      /* 16px - 正文 */
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }   /* 14px - 小文本 */
.text-xs { font-size: 0.75rem; line-height: 1rem; }       /* 12px - 极小文本 */

/* 字重 */
.font-bold { font-weight: 700; }      /* 粗体 - 标题、强调 */
.font-semibold { font-weight: 600; }  /* 半粗体 - 次要标题 */
.font-medium { font-weight: 500; }    /* 中等 - 按钮、导航 */
.font-normal { font-weight: 400; }    /* 正常 - 正文 */
```

### 2.3 间距系统

#### 间距规范
```css
/* Tailwind CSS 间距系统 */
.space-1 { margin/padding: 0.25rem; }   /* 4px */
.space-2 { margin/padding: 0.5rem; }    /* 8px */
.space-3 { margin/padding: 0.75rem; }   /* 12px */
.space-4 { margin/padding: 1rem; }      /* 16px */
.space-6 { margin/padding: 1.5rem; }    /* 24px */
.space-8 { margin/padding: 2rem; }      /* 32px */
.space-12 { margin/padding: 3rem; }     /* 48px */
.space-16 { margin/padding: 4rem; }     /* 64px */
.space-20 { margin/padding: 5rem; }     /* 80px */
```

#### 间距使用指南
- **组件内间距**: 使用 4px、8px、12px、16px
- **组件间间距**: 使用 16px、24px、32px
- **区块间间距**: 使用 48px、64px、80px
- **页面边距**: 使用 16px (移动端)、24px (平板)、32px (桌面)

### 2.4 圆角和阴影

#### 圆角系统
```css
.rounded-none { border-radius: 0; }
.rounded-sm { border-radius: 0.125rem; }    /* 2px */
.rounded { border-radius: 0.25rem; }        /* 4px - 默认 */
.rounded-md { border-radius: 0.375rem; }    /* 6px - 按钮 */
.rounded-lg { border-radius: 0.5rem; }      /* 8px - 卡片 */
.rounded-xl { border-radius: 0.75rem; }     /* 12px - 大卡片 */
.rounded-full { border-radius: 9999px; }    /* 圆形按钮 */
```

#### 阴影系统
```css
.shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
.shadow { box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); }
.shadow-md { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
.shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
```

## 3. 组件设计规范

### 3.1 按钮设计

#### 主要按钮 (Primary Button)
```css
/* 样式规范 */
background: #00BFA5;
color: #FFFFFF;
padding: 12px 24px;
border-radius: 6px;
font-weight: 500;
font-size: 16px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

/* 悬停状态 */
background: #00A693;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

/* 禁用状态 */
background: #B0BEC5;
cursor: not-allowed;
```

#### 次要按钮 (Secondary Button)
```css
/* 样式规范 */
background: transparent;
color: #00BFA5;
border: 2px solid #00BFA5;
padding: 10px 22px;
border-radius: 6px;
font-weight: 500;
font-size: 16px;

/* 悬停状态 */
background: #00BFA5;
color: #FFFFFF;
```

#### 按钮尺寸
- **大按钮**: padding: 16px 32px, font-size: 18px
- **标准按钮**: padding: 12px 24px, font-size: 16px
- **小按钮**: padding: 8px 16px, font-size: 14px

### 3.2 表单组件

#### 输入框 (Input Field)
```css
/* 样式规范 */
border: 2px solid #E0E0E0;
border-radius: 6px;
padding: 12px 16px;
font-size: 16px;
background: #FFFFFF;

/* 聚焦状态 */
border-color: #00BFA5;
box-shadow: 0 0 0 3px rgba(0, 191, 165, 0.1);

/* 错误状态 */
border-color: #F44336;
box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
```

#### 选择框 (Select)
```css
/* 样式规范 */
border: 2px solid #E0E0E0;
border-radius: 6px;
padding: 12px 16px;
background: #FFFFFF;
position: relative;

/* 下拉箭头 */
&::after {
  content: "▼";
  position: absolute;
  right: 16px;
  color: #90A4AE;
}
```

#### 复选框 (Checkbox)
```css
/* 样式规范 */
width: 20px;
height: 20px;
border: 2px solid #E0E0E0;
border-radius: 4px;
background: #FFFFFF;

/* 选中状态 */
background: #00BFA5;
border-color: #00BFA5;
```

### 3.3 卡片设计

#### 标准卡片
```css
/* 样式规范 */
background: #FFFFFF;
border-radius: 8px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
padding: 24px;
border: 1px solid #F0F0F0;

/* 悬停状态 */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
transform: translateY(-2px);
transition: all 0.2s ease;
```

#### 车辆卡片
```css
/* 特殊样式 */
border-radius: 12px;
overflow: hidden;
background: #FFFFFF;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

/* 图片区域 */
.image-container {
  height: 200px;
  background-size: cover;
  background-position: center;
}

/* 内容区域 */
.content {
  padding: 20px;
}
```

### 3.4 导航设计

#### 主导航
```css
/* Header 样式 */
background: #FFFFFF;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
height: 64px;
position: sticky;
top: 0;
z-index: 50;

/* 导航链接 */
.nav-link {
  color: #546E7A;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: #00BFA5;
  background: rgba(0, 191, 165, 0.1);
}

.nav-link.active {
  color: #00BFA5;
  background: rgba(0, 191, 165, 0.1);
}
```

#### 移动端导航
```css
/* 汉堡菜单 */
.mobile-menu-button {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background: transparent;
  border: none;
  color: #546E7A;
}

/* 移动端菜单 */
.mobile-menu {
  background: #FFFFFF;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 8px 8px;
}
```

## 4. 用户体验设计

### 4.1 信息架构

#### 网站结构
```
首页 (Home)
├── 车辆浏览 (Browse Cars)
├── 服务介绍
│   ├── 汽车订阅 (Car Subscription)
│   ├── 长期租赁 (Long-term Rental)
│   └── 智能电动车 (Smart EV)
├── 关于我们 (About)
├── 帮助中心 (Help)
├── 联系我们 (Contact)
└── 询价表单 (Enquiry)
```

#### 页面层级
1. **一级页面**: 主要功能页面，从主导航直接访问
2. **二级页面**: 详细信息页面，如车辆详情页
3. **功能页面**: 特定功能页面，如询价表单

### 4.2 用户流程设计

#### 主要用户路径
1. **浏览车辆流程**:
   首页 → 搜索表单 → 车辆列表 → 车辆详情 → 询价表单

2. **服务了解流程**:
   首页 → 服务介绍页 → 帮助中心 → 联系我们

3. **申请流程**:
   任意页面 → 询价表单 → 完成提交

#### 询价表单用户体验
- **进度指示**: 8个步骤的可视化进度条
- **自动推进**: 大部分步骤选择后自动进入下一步
- **返回功能**: 允许用户返回修改之前的选择
- **表单验证**: 实时验证必填字段
- **响应式设计**: 适配移动端和桌面端

### 4.3 交互设计原则

#### 反馈机制
- **即时反馈**: 按钮悬停、点击状态变化
- **加载状态**: 数据加载时显示加载指示器
- **成功提示**: 操作成功后显示确认信息
- **错误处理**: 清晰的错误信息和解决建议

#### 动画和过渡
```css
/* 标准过渡 */
transition: all 0.2s ease;

/* 悬停效果 */
transform: translateY(-2px);
transition: transform 0.2s ease;

/* 淡入效果 */
opacity: 0;
animation: fadeIn 0.3s ease forwards;

@keyframes fadeIn {
  to { opacity: 1; }
}
```

## 5. 响应式设计

### 5.1 断点系统
```css
/* 移动端优先 */
/* xs: 0px - 默认 */
/* sm: 640px */
@media (min-width: 640px) { }

/* md: 768px */
@media (min-width: 768px) { }

/* lg: 1024px */
@media (min-width: 1024px) { }

/* xl: 1280px */
@media (min-width: 1280px) { }

/* 2xl: 1536px */
@media (min-width: 1536px) { }
```

### 5.2 响应式布局

#### 网格系统
- **移动端**: 单列布局，全宽度
- **平板端**: 2-3列网格布局
- **桌面端**: 3-4列网格布局

#### 组件适配
- **导航**: 移动端折叠为汉堡菜单
- **卡片**: 移动端堆叠，桌面端网格排列
- **表单**: 移动端单列，桌面端多列

### 5.3 移动端优化

#### 触摸友好设计
- **最小触摸目标**: 44px × 44px
- **按钮间距**: 至少8px间距
- **滚动区域**: 流畅的滚动体验

#### 性能优化
- **图片优化**: 响应式图片，适配不同分辨率
- **字体加载**: 系统字体优先，减少加载时间
- **动画性能**: 使用transform和opacity进行动画

## 6. 可访问性设计

### 6.1 颜色对比度
- **正文文字**: 对比度至少4.5:1
- **大文字**: 对比度至少3:1
- **非文字元素**: 对比度至少3:1

### 6.2 键盘导航
- **Tab顺序**: 逻辑的Tab键导航顺序
- **焦点指示**: 清晰的焦点状态样式
- **跳过链接**: 提供跳过导航的链接

### 6.3 屏幕阅读器支持
- **语义化HTML**: 使用正确的HTML标签
- **ARIA标签**: 适当的ARIA属性
- **替代文本**: 图片的描述性alt文本

## 7. 设计规范检查清单

### 7.1 视觉一致性
- [ ] 使用统一的色彩系统
- [ ] 遵循字体层级规范
- [ ] 保持间距系统一致性
- [ ] 统一的圆角和阴影使用

### 7.2 用户体验
- [ ] 清晰的信息层次
- [ ] 直观的导航结构
- [ ] 有效的反馈机制
- [ ] 流畅的交互动画

### 7.3 响应式设计
- [ ] 移动端优先设计
- [ ] 适配所有主要断点
- [ ] 触摸友好的交互元素
- [ ] 性能优化

### 7.4 可访问性
- [ ] 符合WCAG 2.1 AA标准
- [ ] 键盘导航支持
- [ ] 屏幕阅读器兼容
- [ ] 颜色对比度达标

## 8. 设计工具和资源

### 8.1 设计工具
- **Figma**: 主要设计工具，用于界面设计和原型制作
- **Adobe Illustrator**: 图标和矢量图形设计
- **Adobe Photoshop**: 图片处理和优化

### 8.2 开发工具
- **Tailwind CSS**: 实用优先的CSS框架
- **React**: 组件化前端开发
- **TypeScript**: 类型安全的JavaScript

### 8.3 测试工具
- **Chrome DevTools**: 响应式设计测试
- **WAVE**: 可访问性测试
- **Lighthouse**: 性能和最佳实践审计

## 9. 维护和更新

### 9.1 设计系统维护
- **定期审查**: 每季度审查设计系统的使用情况
- **组件更新**: 根据用户反馈更新组件设计
- **文档更新**: 保持设计文档的最新状态

### 9.2 用户反馈收集
- **用户测试**: 定期进行可用性测试
- **数据分析**: 分析用户行为数据
- **反馈渠道**: 建立用户反馈收集机制

### 9.3 设计趋势跟踪
- **行业研究**: 关注汽车行业的设计趋势
- **技术发展**: 跟踪前端技术的发展
- **竞品分析**: 定期分析竞争对手的设计

---

*本文档将随着产品的发展持续更新，确保设计系统的一致性和有效性。* 
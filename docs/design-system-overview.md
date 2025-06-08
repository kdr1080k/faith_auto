# Faith Auto 设计系统总览

## 📋 目录

1. [设计系统介绍](#1-设计系统介绍)
2. [品牌标识](#2-品牌标识)
3. [设计原则](#3-设计原则)
4. [视觉语言](#4-视觉语言)
5. [组件库](#5-组件库)
6. [用户体验](#6-用户体验)
7. [实施指南](#7-实施指南)
8. [维护更新](#8-维护更新)

---

## 1. 设计系统介绍

### 1.1 什么是Faith Auto设计系统

Faith Auto设计系统是一套完整的设计语言和组件库，旨在为澳大利亚汽车订阅服务平台提供一致、高效、可扩展的用户界面解决方案。

### 1.2 设计系统目标

- **一致性**: 确保所有产品界面的视觉和交互一致性
- **效率**: 提高设计和开发团队的工作效率
- **可扩展性**: 支持产品功能的快速迭代和扩展
- **可访问性**: 确保所有用户都能无障碍使用产品
- **品牌强化**: 强化Faith Auto品牌形象和用户认知

### 1.3 适用范围

- **Web应用**: 主要网站和管理后台
- **移动应用**: iOS和Android原生应用
- **营销材料**: 宣传页面和广告素材
- **文档系统**: 帮助文档和API文档

---

## 2. 品牌标识

### 2.1 品牌定位

**Faith Auto** - 澳大利亚领先的汽车订阅服务平台

**品牌承诺**: "灵活用车，自由生活"

**核心价值**:
- 🚗 **灵活性**: 按需用车，随时调整
- 🛡️ **可靠性**: 高质量车辆，全面保障
- 💡 **创新性**: 科技驱动，体验优先
- 🤝 **信任感**: 透明定价，诚信服务

### 2.2 Logo设计

#### 2.2.1 主Logo
```svg
<!-- 主Logo - 水平版本 -->
<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
  <!-- Logo图形部分 -->
  <circle cx="30" cy="30" r="25" fill="#00BFA5"/>
  <path d="M15 30 L30 15 L45 30 L30 45 Z" fill="#FFFFFF"/>
  
  <!-- 文字部分 -->
  <text x="70" y="25" font-family="Inter" font-weight="600" font-size="18" fill="#263238">
    Faith Auto
  </text>
  <text x="70" y="45" font-family="Inter" font-weight="400" font-size="12" fill="#546E7A">
    Car Subscription
  </text>
</svg>
```

#### 2.2.2 Logo变体
- **水平版本**: 用于页面头部和宽屏展示
- **垂直版本**: 用于移动端和窄屏展示
- **图标版本**: 用于favicon和应用图标
- **单色版本**: 用于单色印刷和特殊场景

#### 2.2.3 Logo使用规范
```css
/* Logo最小尺寸 */
.logo-minimum {
  min-width: 120px;
  min-height: 36px;
}

/* Logo安全区域 */
.logo-safe-area {
  padding: 1em; /* 等于Logo高度的1/4 */
}

/* Logo颜色变体 */
.logo-primary { color: #00BFA5; }
.logo-dark { color: #263238; }
.logo-light { color: #FFFFFF; }
.logo-mono { color: currentColor; }
```

### 2.3 品牌色彩

#### 2.3.1 主色调
```css
:root {
  /* 主品牌色 */
  --primary: #00BFA5;        /* 青绿色 - 主要CTA、链接 */
  --primary-light: #4DD0E1;  /* 浅青绿色 - 悬停状态 */
  --primary-dark: #00A693;   /* 深青绿色 - 按下状态 */
  
  /* 辅助色 */
  --secondary: #263238;      /* 深灰蓝 - 主要文本 */
  --accent: #FF6B35;         /* 橙色 - 警告、强调 */
}
```

#### 2.3.2 中性色系
```css
:root {
  /* 灰色系 */
  --gray-50: #F8FAFC;
  --gray-100: #F1F5F9;
  --gray-200: #E2E8F0;
  --gray-300: #CBD5E1;
  --gray-400: #94A3B8;
  --gray-500: #64748B;
  --gray-600: #475569;
  --gray-700: #334155;
  --gray-800: #1E293B;
  --gray-900: #0F172A;
}
```

#### 2.3.3 功能色彩
```css
:root {
  /* 状态色 */
  --success: #10B981;        /* 成功状态 */
  --warning: #F59E0B;        /* 警告状态 */
  --error: #EF4444;          /* 错误状态 */
  --info: #3B82F6;           /* 信息状态 */
  
  /* 背景色 */
  --bg-primary: #FFFFFF;     /* 主背景 */
  --bg-secondary: #F8FAFC;   /* 次要背景 */
  --bg-tertiary: #F1F5F9;    /* 第三级背景 */
}
```

### 2.4 字体系统

#### 2.4.1 字体族
```css
:root {
  /* 主字体 - 现代无衬线字体 */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  /* 标题字体 - 更具表现力 */
  --font-heading: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  /* 等宽字体 - 代码和数据 */
  --font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
}
```

#### 2.4.2 字体大小
```css
:root {
  /* 字体大小系统 */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
  --text-6xl: 3.75rem;   /* 60px */
}
```

#### 2.4.3 字体权重
```css
:root {
  --font-thin: 100;
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
  --font-black: 900;
}
```

---

## 3. 设计原则

### 3.1 核心设计原则

#### 3.1.1 用户优先 (User-First)
- 以用户需求为设计出发点
- 简化用户操作流程
- 提供清晰的反馈和指引
- 确保无障碍访问

#### 3.1.2 简洁明了 (Clarity)
- 去除不必要的视觉元素
- 使用清晰的信息层次
- 保持一致的视觉语言
- 优先展示核心功能

#### 3.1.3 响应式设计 (Responsive)
- 适配所有设备尺寸
- 优化触摸交互体验
- 考虑网络环境差异
- 支持多种输入方式

#### 3.1.4 性能优先 (Performance)
- 优化加载速度
- 减少用户等待时间
- 智能预加载内容
- 渐进式增强体验

### 3.2 视觉设计原则

#### 3.2.1 对比度 (Contrast)
```css
/* 确保足够的颜色对比度 */
.text-primary { 
  color: #263238; 
  /* 对比度比例 > 4.5:1 */
}

.text-secondary { 
  color: #546E7A; 
  /* 对比度比例 > 3:1 */
}
```

#### 3.2.2 层次结构 (Hierarchy)
```css
/* 清晰的视觉层次 */
.heading-1 { 
  font-size: 3rem; 
  font-weight: 700; 
  line-height: 1.2; 
}

.heading-2 { 
  font-size: 2.25rem; 
  font-weight: 600; 
  line-height: 1.3; 
}

.body-text { 
  font-size: 1rem; 
  font-weight: 400; 
  line-height: 1.6; 
}
```

#### 3.2.3 间距系统 (Spacing)
```css
:root {
  /* 8px基础间距系统 */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.25rem;  /* 20px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-10: 2.5rem;  /* 40px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
  --space-20: 5rem;    /* 80px */
  --space-24: 6rem;    /* 96px */
}
```

---

## 4. 视觉语言

### 4.1 图标系统

#### 4.1.1 图标风格
- **风格**: 线性图标，2px描边
- **尺寸**: 16px, 20px, 24px, 32px
- **圆角**: 2px圆角
- **颜色**: 继承父元素颜色

#### 4.1.2 常用图标
```typescript
// 图标组件示例
interface IconProps {
  size?: 16 | 20 | 24 | 32;
  color?: string;
  className?: string;
}

const CarIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path 
      d="M5 12V7a1 1 0 011-1h12a1 1 0 011 1v5M5 12l-2 5h18l-2-5M5 12h14" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);
```

### 4.2 插图风格

#### 4.2.1 插图原则
- **风格**: 扁平化设计，简洁现代
- **色彩**: 使用品牌色彩系统
- **构图**: 居中对称，平衡稳定
- **细节**: 适度简化，突出重点

#### 4.2.2 插图应用场景
- 空状态页面
- 错误页面
- 引导流程
- 功能说明

### 4.3 摄影风格

#### 4.3.1 摄影原则
- **主题**: 真实的用车场景
- **色调**: 明亮自然，符合品牌调性
- **构图**: 简洁大方，突出主体
- **情感**: 传达自由、便捷的生活方式

#### 4.3.2 图片处理规范
```css
/* 图片样式规范 */
.image-hero {
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: 12px;
}

.image-card {
  aspect-ratio: 4/3;
  object-fit: cover;
  border-radius: 8px;
}

.image-avatar {
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 50%;
}
```

---

## 5. 组件库

### 5.1 基础组件

#### 5.1.1 按钮组件
```typescript
// 按钮变体和状态
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size: 'sm' | 'md' | 'lg';
  state: 'default' | 'hover' | 'active' | 'disabled' | 'loading';
  icon?: React.ReactNode;
  children: React.ReactNode;
}
```

#### 5.1.2 输入组件
```typescript
// 输入框类型和状态
interface InputProps {
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  state: 'default' | 'focus' | 'error' | 'success' | 'disabled';
  size: 'sm' | 'md' | 'lg';
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
}
```

### 5.2 复合组件

#### 5.2.1 卡片组件
```typescript
// 卡片组件结构
interface CardProps {
  variant: 'default' | 'outlined' | 'elevated';
  padding: 'none' | 'sm' | 'md' | 'lg';
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}
```

#### 5.2.2 模态框组件
```typescript
// 模态框组件
interface ModalProps {
  size: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}
```

### 5.3 业务组件

#### 5.3.1 车辆卡片
```typescript
// 车辆展示卡片
interface CarCardProps {
  car: {
    id: string;
    make: string;
    model: string;
    year: number;
    price: number;
    image: string;
    features: string[];
  };
  variant: 'grid' | 'list' | 'featured';
  onSelect?: (carId: string) => void;
}
```

#### 5.3.2 搜索表单
```typescript
// 车辆搜索表单
interface SearchFormProps {
  onSearch: (criteria: SearchCriteria) => void;
  initialValues?: Partial<SearchCriteria>;
  variant: 'compact' | 'expanded';
}
```

---

## 6. 用户体验

### 6.1 交互模式

#### 6.1.1 导航模式
- **主导航**: 水平导航栏，支持下拉菜单
- **移动导航**: 汉堡菜单，全屏覆盖
- **面包屑**: 显示当前位置和路径
- **分页**: 数字分页，支持跳转

#### 6.1.2 反馈模式
- **即时反馈**: 表单验证，按钮状态
- **进度指示**: 加载状态，步骤进度
- **通知消息**: Toast提示，系统通知
- **确认对话**: 重要操作确认

### 6.2 动效设计

#### 6.2.3 动效原则
- **自然**: 模拟真实物理运动
- **快速**: 动效时间控制在300ms内
- **有意义**: 动效服务于功能目的
- **一致**: 相同元素使用相同动效

#### 6.2.2 动效库
```css
/* 缓动函数 */
:root {
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* 常用动画 */
.fade-in {
  animation: fadeIn 0.3s var(--ease-out);
}

.slide-up {
  animation: slideUp 0.3s var(--ease-out);
}

.scale-in {
  animation: scaleIn 0.2s var(--ease-out);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
```

### 6.3 响应式设计

#### 6.3.1 断点系统
```css
:root {
  /* 响应式断点 */
  --breakpoint-sm: 640px;   /* 手机横屏 */
  --breakpoint-md: 768px;   /* 平板竖屏 */
  --breakpoint-lg: 1024px;  /* 平板横屏/小笔记本 */
  --breakpoint-xl: 1280px;  /* 桌面显示器 */
  --breakpoint-2xl: 1536px; /* 大屏显示器 */
}
```

#### 6.3.2 布局策略
- **移动优先**: 从小屏开始设计
- **渐进增强**: 大屏添加更多功能
- **弹性布局**: 使用Flexbox和Grid
- **相对单位**: 使用rem和百分比

---

## 7. 实施指南

### 7.1 开发规范

#### 7.1.1 CSS架构
```scss
// SCSS文件结构
src/styles/
├── abstracts/
│   ├── _variables.scss    // 变量定义
│   ├── _mixins.scss      // 混合宏
│   └── _functions.scss   // 函数
├── base/
│   ├── _reset.scss       // 重置样式
│   ├── _typography.scss  // 字体样式
│   └── _utilities.scss   // 工具类
├── components/
│   ├── _buttons.scss     // 按钮组件
│   ├── _forms.scss       // 表单组件
│   └── _cards.scss       // 卡片组件
├── layout/
│   ├── _header.scss      // 头部布局
│   ├── _footer.scss      // 底部布局
│   └── _grid.scss        // 网格系统
└── main.scss            // 主入口文件
```

#### 7.1.2 命名规范
```css
/* BEM命名规范 */
.block {}                    /* 块 */
.block__element {}           /* 元素 */
.block--modifier {}          /* 修饰符 */
.block__element--modifier {} /* 元素修饰符 */

/* 示例 */
.car-card {}                 /* 车辆卡片块 */
.car-card__image {}          /* 车辆图片元素 */
.car-card__title {}          /* 车辆标题元素 */
.car-card--featured {}       /* 特色车辆修饰符 */
.car-card__price--discount {} /* 折扣价格修饰符 */
```

### 7.2 组件开发

#### 7.2.1 React组件规范
```typescript
// 组件文件结构
components/
├── Button/
│   ├── Button.tsx          // 主组件
│   ├── Button.stories.tsx  // Storybook故事
│   ├── Button.test.tsx     // 单元测试
│   ├── Button.module.scss  // 样式文件
│   └── index.ts           // 导出文件
```

#### 7.2.2 组件模板
```typescript
// 组件模板
import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  className,
  onClick,
  ...props
}) => {
  const buttonClasses = classNames(
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    {
      [styles['button--disabled']]: disabled,
      [styles['button--loading']]: loading,
    },
    className
  );

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className={styles.spinner} />}
      {children}
    </button>
  );
};
```

### 7.3 质量保证

#### 7.3.1 代码检查
```json
// .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "rules": {
    "react/prop-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "prefer-const": "error",
    "no-unused-vars": "error"
  }
}
```

#### 7.3.2 样式检查
```json
// .stylelintrc.json
{
  "extends": [
    "stylelint-config-standard-scss",
    "stylelint-config-prettier"
  ],
  "rules": {
    "selector-class-pattern": "^[a-z][a-zA-Z0-9]*(__[a-z][a-zA-Z0-9]*)?(--[a-z][a-zA-Z0-9]*)?$",
    "declaration-block-trailing-semicolon": "always",
    "indentation": 2
  }
}
```

---

## 8. 维护更新

### 8.1 版本管理

#### 8.1.1 语义化版本
- **主版本号**: 不兼容的API修改
- **次版本号**: 向下兼容的功能性新增
- **修订号**: 向下兼容的问题修正

#### 8.1.2 更新日志
```markdown
# 更新日志

## [1.2.0] - 2024-01-15

### 新增
- 新增车辆对比功能组件
- 添加深色模式支持
- 新增无障碍访问改进

### 修改
- 优化按钮组件性能
- 更新色彩对比度标准
- 改进移动端触摸体验

### 修复
- 修复表单验证问题
- 解决Safari兼容性问题
- 修复高分辨率屏幕显示问题
```

### 8.2 文档维护

#### 8.2.1 文档结构
```
docs/
├── getting-started/        # 快速开始
├── design-principles/      # 设计原则
├── components/            # 组件文档
├── patterns/              # 设计模式
├── resources/             # 设计资源
└── changelog/             # 更新日志
```

#### 8.2.2 组件文档模板
```markdown
# 组件名称

## 概述
组件的简要描述和用途。

## 何时使用
- 使用场景1
- 使用场景2

## 何时不使用
- 不适用场景1
- 不适用场景2

## 示例
[代码示例和效果展示]

## API
[属性和方法说明]

## 可访问性
[无障碍访问说明]

## 相关组件
[相关组件链接]
```

### 8.3 反馈收集

#### 8.3.1 反馈渠道
- **GitHub Issues**: 技术问题和功能请求
- **设计评审**: 定期设计系统评审会议
- **用户调研**: 用户体验调研和测试
- **团队反馈**: 内部团队使用反馈

#### 8.3.2 改进流程
1. **收集反馈**: 多渠道收集使用反馈
2. **评估优先级**: 根据影响范围和紧急程度排序
3. **设计方案**: 制定改进方案和实施计划
4. **测试验证**: 进行设计验证和用户测试
5. **发布更新**: 发布新版本并更新文档

---

## 📚 相关文档

- [UI/UX设计指南](./ui-ux-design-guide.md)
- [组件库文档](./component-library.md)
- [用户体验流程](./user-experience-flows.md)
- [技术架构文档](./technical-architecture.md)
- [API文档](./api-documentation.md)

---

## 🤝 贡献指南

### 如何贡献

1. **Fork项目**: 创建项目分支
2. **创建分支**: 为新功能创建特性分支
3. **提交更改**: 遵循提交信息规范
4. **发起PR**: 详细描述更改内容
5. **代码审查**: 等待团队审查和反馈

### 提交规范

```
type(scope): description

[optional body]

[optional footer]
```

**类型**:
- `feat`: 新功能
- `fix`: 修复问题
- `docs`: 文档更新
- `style`: 样式更新
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

---

*Faith Auto设计系统 - 让设计更一致，开发更高效* 🚗✨ 
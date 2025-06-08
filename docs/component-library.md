# Faith Auto 组件库文档

## 1. 组件库概述

Faith Auto组件库基于React和Tailwind CSS构建，提供一套完整的、可复用的UI组件，确保整个应用的设计一致性和开发效率。

### 1.1 技术栈
- **React 18**: 组件化开发框架
- **TypeScript**: 类型安全
- **Tailwind CSS**: 实用优先的CSS框架
- **Radix UI**: 无障碍的基础组件
- **Lucide React**: 图标库

### 1.2 组件分类
- **基础组件**: Button, Input, Select, Checkbox等
- **布局组件**: Header, Footer, Layout, Container等
- **业务组件**: CarCard, CarSearchForm, Hero等
- **表单组件**: 各种表单输入组件
- **反馈组件**: Toast, Modal, Loading等

## 2. 基础组件

### 2.1 Button 按钮组件

#### 组件规范
```typescript
interface ButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'default' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}
```

#### 样式变体
```css
/* Default Button */
.btn-default {
  background: #00BFA5;
  color: #FFFFFF;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-default:hover {
  background: #00A693;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Outline Button */
.btn-outline {
  background: transparent;
  color: #00BFA5;
  border: 2px solid #00BFA5;
  padding: 10px 22px;
  border-radius: 6px;
  font-weight: 500;
}

.btn-outline:hover {
  background: #00BFA5;
  color: #FFFFFF;
}

/* Ghost Button */
.btn-ghost {
  background: transparent;
  color: #546E7A;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 500;
}

.btn-ghost:hover {
  background: rgba(0, 191, 165, 0.1);
  color: #00BFA5;
}
```

#### 使用示例
```tsx
// 主要按钮
<Button variant="default" size="lg">
  立即申请
</Button>

// 次要按钮
<Button variant="outline">
  了解更多
</Button>

// 加载状态
<Button loading disabled>
  提交中...
</Button>
```

### 2.2 Input 输入框组件

#### 组件规范
```typescript
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'number';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  icon?: React.ReactNode;
}
```

#### 样式规范
```css
.input-field {
  width: 100%;
  border: 2px solid #E0E0E0;
  border-radius: 6px;
  padding: 12px 16px;
  font-size: 16px;
  background: #FFFFFF;
  transition: all 0.2s ease;
}

.input-field:focus {
  outline: none;
  border-color: #00BFA5;
  box-shadow: 0 0 0 3px rgba(0, 191, 165, 0.1);
}

.input-field.error {
  border-color: #F44336;
  box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
}

.input-field:disabled {
  background: #F5F5F5;
  color: #9E9E9E;
  cursor: not-allowed;
}
```

#### 使用示例
```tsx
// 基础输入框
<Input 
  placeholder="请输入邮箱地址"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

// 带图标的输入框
<Input 
  placeholder="搜索车辆"
  icon={<SearchIcon />}
/>

// 错误状态
<Input 
  placeholder="请输入姓名"
  error="姓名不能为空"
  required
/>
```

### 2.3 Select 选择框组件

#### 组件规范
```typescript
interface SelectProps {
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}
```

#### 样式规范
```css
.select-trigger {
  width: 100%;
  border: 2px solid #E0E0E0;
  border-radius: 6px;
  padding: 12px 16px;
  background: #FFFFFF;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.select-trigger:focus {
  border-color: #00BFA5;
  box-shadow: 0 0 0 3px rgba(0, 191, 165, 0.1);
}

.select-content {
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
}

.select-item {
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.select-item:hover {
  background: #F5F5F5;
}

.select-item.selected {
  background: rgba(0, 191, 165, 0.1);
  color: #00BFA5;
}
```

### 2.4 Checkbox 复选框组件

#### 组件规范
```typescript
interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  error?: string;
}
```

#### 样式规范
```css
.checkbox-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.checkbox-input {
  width: 20px;
  height: 20px;
  border: 2px solid #E0E0E0;
  border-radius: 4px;
  background: #FFFFFF;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.checkbox-input:checked {
  background: #00BFA5;
  border-color: #00BFA5;
}

.checkbox-input:checked::after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
}

.checkbox-label {
  color: #263238;
  font-size: 14px;
  line-height: 1.5;
  cursor: pointer;
}
```

## 3. 布局组件

### 3.1 Header 头部组件

#### 组件功能
- 品牌Logo展示
- 主导航菜单
- 位置选择器
- 用户操作按钮
- 移动端响应式菜单

#### 样式规范
```css
.header {
  background: #FFFFFF;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  height: 64px;
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: #263238;
  text-decoration: none;
}

.nav-menu {
  display: flex;
  gap: 32px;
}

.nav-item {
  color: #546E7A;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s ease;
  text-decoration: none;
}

.nav-item:hover {
  color: #00BFA5;
  background: rgba(0, 191, 165, 0.1);
}

.mobile-menu-button {
  display: none;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: #546E7A;
  cursor: pointer;
}

@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  
  .mobile-menu-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
```

### 3.2 Footer 底部组件

#### 组件功能
- 公司信息
- 快速链接
- 联系方式
- 社交媒体链接
- 版权信息

#### 样式规范
```css
.footer {
  background: #263238;
  color: #FFFFFF;
  padding: 48px 0 24px;
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
  margin-bottom: 32px;
}

.footer-section h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #FFFFFF;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links a {
  color: #B0BEC5;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: #00BFA5;
}

.footer-bottom {
  border-top: 1px solid #37474F;
  padding-top: 24px;
  text-align: center;
  color: #90A4AE;
  font-size: 14px;
}
```

### 3.3 Container 容器组件

#### 组件规范
```typescript
interface ContainerProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
  children: React.ReactNode;
  className?: string;
}
```

#### 样式规范
```css
.container {
  width: 100%;
  margin: 0 auto;
}

.container.sm { max-width: 640px; }
.container.md { max-width: 768px; }
.container.lg { max-width: 1024px; }
.container.xl { max-width: 1280px; }
.container.2xl { max-width: 1536px; }
.container.full { max-width: 100%; }

.container.padded {
  padding-left: 16px;
  padding-right: 16px;
}

@media (min-width: 640px) {
  .container.padded {
    padding-left: 24px;
    padding-right: 24px;
  }
}

@media (min-width: 1024px) {
  .container.padded {
    padding-left: 32px;
    padding-right: 32px;
  }
}
```

## 4. 业务组件

### 4.1 CarCard 车辆卡片组件

#### 组件规范
```typescript
interface CarCardProps {
  car: {
    id: string;
    make: string;
    model: string;
    year: number;
    price: number;
    image: string;
    fuelType: string;
    transmission: string;
    seats: number;
  };
  onClick?: (carId: string) => void;
}
```

#### 样式规范
```css
.car-card {
  background: #FFFFFF;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.car-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.car-image {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  background-color: #F5F5F5;
}

.car-content {
  padding: 20px;
}

.car-title {
  font-size: 18px;
  font-weight: 600;
  color: #263238;
  margin-bottom: 8px;
}

.car-price {
  font-size: 24px;
  font-weight: 700;
  color: #00BFA5;
  margin-bottom: 12px;
}

.car-features {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.car-feature {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #546E7A;
}

.car-cta {
  width: 100%;
  background: #00BFA5;
  color: #FFFFFF;
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

.car-cta:hover {
  background: #00A693;
}
```

### 4.2 CarSearchForm 车辆搜索表单

#### 组件功能
- 位置选择
- 车身类型筛选
- 燃料类型筛选
- 座位数筛选
- 搜索提交

#### 样式规范
```css
.search-form {
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 32px;
  margin: -60px auto 0;
  position: relative;
  z-index: 10;
  max-width: 1000px;
}

.search-form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.search-form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.search-form-label {
  font-size: 14px;
  font-weight: 500;
  color: #263238;
}

.search-form-button {
  width: 100%;
  background: #00BFA5;
  color: #FFFFFF;
  border: none;
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.search-form-button:hover {
  background: #00A693;
}

@media (max-width: 768px) {
  .search-form {
    margin: -40px 16px 0;
    padding: 24px;
  }
  
  .search-form-grid {
    grid-template-columns: 1fr;
  }
}
```

### 4.3 Hero 英雄区域组件

#### 组件规范
```typescript
interface HeroProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage: string;
}
```

#### 样式规范
```css
.hero {
  position: relative;
  min-height: 500px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
  color: #FFFFFF;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 16px;
}

.hero-subtitle {
  font-size: 20px;
  line-height: 1.5;
  margin-bottom: 32px;
  max-width: 600px;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }
  
  .hero-subtitle {
    font-size: 18px;
  }
  
  .hero-buttons {
    flex-direction: column;
  }
}
```

## 5. 表单组件

### 5.1 多步骤表单组件

#### 组件规范
```typescript
interface MultiStepFormProps {
  steps: Array<{
    id: string;
    title: string;
    component: React.ComponentType;
    validation?: (data: any) => boolean;
  }>;
  onSubmit: (data: any) => void;
  onStepChange?: (step: number) => void;
}
```

#### 进度指示器样式
```css
.progress-indicator {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 32px;
}

.progress-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.progress-dot.completed {
  background: #00BFA5;
}

.progress-dot.current {
  background: #00BFA5;
  transform: scale(1.2);
}

.progress-dot.pending {
  background: #E0E0E0;
}
```

### 5.2 表单验证组件

#### 验证规则
```typescript
interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

interface FieldValidation {
  [fieldName: string]: ValidationRule[];
}
```

#### 错误显示样式
```css
.field-error {
  color: #F44336;
  font-size: 14px;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.field-error-icon {
  width: 16px;
  height: 16px;
  color: #F44336;
}

.field-success {
  color: #4CAF50;
  font-size: 14px;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}
```

## 6. 反馈组件

### 6.1 Toast 提示组件

#### 组件规范
```typescript
interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose?: () => void;
}
```

#### 样式规范
```css
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 300px;
  max-width: 400px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: slideIn 0.3s ease;
}

.toast.success {
  background: #4CAF50;
  color: #FFFFFF;
}

.toast.error {
  background: #F44336;
  color: #FFFFFF;
}

.toast.warning {
  background: #FF9800;
  color: #FFFFFF;
}

.toast.info {
  background: #2196F3;
  color: #FFFFFF;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

### 6.2 Loading 加载组件

#### 组件规范
```typescript
interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  overlay?: boolean;
  text?: string;
}
```

#### 样式规范
```css
.loading-spinner {
  display: inline-block;
  border: 2px solid #E0E0E0;
  border-top: 2px solid #00BFA5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-spinner.sm {
  width: 16px;
  height: 16px;
}

.loading-spinner.md {
  width: 24px;
  height: 24px;
}

.loading-spinner.lg {
  width: 32px;
  height: 32px;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

## 7. 组件使用指南

### 7.1 组件导入
```typescript
// 基础组件
import { Button, Input, Select, Checkbox } from '@/components/ui';

// 布局组件
import { Header, Footer, Container } from '@/components/layout';

// 业务组件
import { CarCard, CarSearchForm, Hero } from '@/components/business';
```

### 7.2 主题定制
```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#00BFA5',
        accent: '#00A693',
        gray: {
          50: '#F5F7FA',
          100: '#ECEFF1',
          // ... 其他灰色
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    }
  }
}
```

### 7.3 组件测试
```typescript
// CarCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { CarCard } from './CarCard';

const mockCar = {
  id: '1',
  make: 'Toyota',
  model: 'Camry',
  year: 2023,
  price: 450,
  image: '/car-image.jpg',
  fuelType: 'Hybrid',
  transmission: 'Automatic',
  seats: 5
};

test('renders car information correctly', () => {
  render(<CarCard car={mockCar} />);
  
  expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
  expect(screen.getByText('$450/week')).toBeInTheDocument();
  expect(screen.getByText('Hybrid')).toBeInTheDocument();
});

test('calls onClick when card is clicked', () => {
  const handleClick = jest.fn();
  render(<CarCard car={mockCar} onClick={handleClick} />);
  
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledWith('1');
});
```

## 8. 性能优化

### 8.1 代码分割
```typescript
// 懒加载组件
const CarDetail = lazy(() => import('./pages/CarDetail'));
const Enquiry = lazy(() => import('./pages/Enquiry'));

// 使用Suspense包装
<Suspense fallback={<Loading />}>
  <CarDetail />
</Suspense>
```

### 8.2 图片优化
```typescript
// 响应式图片组件
interface ResponsiveImageProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  className
}) => {
  return (
    <img
      src={src}
      alt={alt}
      sizes={sizes}
      className={className}
      loading="lazy"
    />
  );
};
```

### 8.3 内存优化
```typescript
// 使用React.memo优化组件渲染
const CarCard = React.memo<CarCardProps>(({ car, onClick }) => {
  // 组件实现
}, (prevProps, nextProps) => {
  return prevProps.car.id === nextProps.car.id;
});

// 使用useMemo优化计算
const filteredCars = useMemo(() => {
  return cars.filter(car => 
    car.fuelType === selectedFuelType &&
    car.seats >= minSeats
  );
}, [cars, selectedFuelType, minSeats]);
```

---

*本组件库文档将持续更新，确保组件的一致性和可维护性。* 
好的，我把详细的设计规范和组件样式拆分到 `references/design-system.md` 文件中。

---

## references/design-system.md

```markdown
# TOS 设计系统

## 视觉规范

### 色彩规范

**主色调**
- `#42b7ae` (高级绿) —— 主要按钮、关键文字、图标高亮

**辅助色**
- 成功/正向：`#52c41a`
- 警告/提醒：`#faad14`
- 报错/删除：`#f5222d`

**文字色**
- 主要文字：`#333333`
- 次要文字：`#666666`
- 置灰文字：`#999999`

**背景色**
- 页面背景：`#f5f7fa`
- 卡片背景：`#ffffff`
- 悬停背景：`#fafafa`
- 选中背景：`#e6f7f6`

### 颜色使用限制

1. **一套主色**：每页只使用 `#42b7ae` 作为唯一主色
2. **功能色仅表语义**：绿/橙/红仅用于状态标签和反馈元素，不作为装饰色使用
3. **大面积区域保持中性色**：表格行、卡片背景等使用白色或浅灰
4. **用间距和字重替代颜色区分层级**
5. **颜色不为装饰服务**
6. **控制颜色数量**：单页除主色、功能色、中性色外，不新增紫色、蓝色、粉色等高饱和装饰色
7. **控制主色面积**：主色只用于主按钮、当前态、关键链接、聚焦边框和少量图标高亮，避免大面积铺底
8. **控制功能色面积**：彩色状态标签应小尺寸、低密度出现；非状态信息优先使用灰阶标签
9. **禁止花哨背景**：不使用多色渐变、彩色大块背景、装饰色块、复杂纹理或强烈投影
10. **低对比舒适感**：页面背景、筛选区、表格、卡片优先使用白色、浅灰、细边框和轻阴影

### 清爽度检查

生成页面前后必须检查以下项：

- 首屏不能出现 3 种以上非中性色同时抢占视觉注意力
- 主要操作按钮数量要克制，同一区域优先只有一个主按钮
- 彩色标签只表达状态或风险，不用于普通分类装饰
- 信息层级优先通过留白、字号、字重、边框和分组建立
- 页面整体观感应清爽、干净、舒服，避免拥挤、杂乱、过度强调

### 圆角规范

| 元素 | 圆角 |
|------|------|
| 大卡片/弹窗 | 20px |
| 按钮/输入框 | 8px |
| 小标签 | 4px |

### 阴影规范

| 元素 | 阴影 |
|------|------|
| 卡片 | `0 4px 20px rgba(0, 0, 0, 0.02)` |
| 弹窗 | `0 20px 60px rgba(0, 0, 0, 0.2)` |
| 悬停 | `0 4px 6px -1px rgba(0, 0, 0, 0.05)` |

### 间距规范

| 类型 | 值 |
|------|-----|
| 基础间距 | 20px |
| 内间距 | 16px |
| 紧凑间距 | 8px |
| 页面外边距 | 20px |

### 字体规范

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

---

## 组件样式库

### 1. 卡片组件 (.tos-card)

```css
.tos-card {
    border-radius: 20px;
    background: #fff;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

.tos-card__title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 16px;
}

.tos-card__content {
    color: #666;
}

.tos-card--compact {
    padding: 16px;
}

.tos-card--hover:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
    transition: box-shadow 0.2s;
}
```

**约束**：
- 卡片内边距优先 20px，紧凑场景使用 16px
- 卡片之间间距 16px 或 20px
- 卡片标题 16px + 600 字重

---

### 2. 按钮组件

**主按钮 (.btn-primary)**
```css
.btn-primary {
    background-color: #42b7ae;
    color: #fff;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: opacity 0.2s;
}

.btn-primary:hover {
    opacity: 0.8;
}

.btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
```

**次按钮 (.btn-secondary)**
```css
.btn-secondary {
    background-color: #fff;
    color: #666;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-secondary:hover {
    background-color: #f5f7fa;
    border-color: #d1d5db;
}

.btn-secondary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
```

**文本按钮 (.btn-text)**
```css
.btn-text {
    background: none;
    border: none;
    color: #42b7ae;
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 8px;
}

.btn-text:hover {
    background-color: rgba(66, 183, 174, 0.08);
}

.btn-text-danger {
    color: #f5222d;
}

.btn-text-danger:hover {
    background-color: rgba(245, 34, 45, 0.08);
}
```

**约束**：
- 按钮统一圆角 8px
- 主按钮悬停透明度 0.8，不使用颜色变化
- 禁用状态统一 opacity: 0.5
- 按钮高度统一 36px

---

### 3. 表单组件

**输入框 (.form-input)**
```css
.form-input {
    width: 100%;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 14px;
    transition: all 0.2s;
    background: #fff;
}

.form-input:hover {
    border-color: #d1d5db;
}

.form-input:focus {
    outline: none;
    border-color: #42b7ae;
    box-shadow: 0 0 0 2px rgba(66, 183, 174, 0.2);
}

.form-input:disabled {
    background-color: #f5f7fa;
    cursor: not-allowed;
}
```

**文本域 (.form-textarea)**
```css
.form-textarea {
    width: 100%;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 14px;
    min-height: 80px;
    transition: all 0.2s;
    resize: vertical;
}

.form-textarea:focus {
    outline: none;
    border-color: #42b7ae;
    box-shadow: 0 0 0 2px rgba(66, 183, 174, 0.2);
}
```

**表单标签 (.form-label)**
```css
.form-label {
    font-size: 12px;
    font-weight: 500;
    color: #4b5563;
    margin-bottom: 4px;
    display: block;
}

.form-label .required {
    color: #f5222d;
    margin-left: 2px;
}
```

**表单错误 (.form-error)**
```css
.form-error {
    font-size: 11px;
    color: #f5222d;
    margin-top: 4px;
}

.form-input--error {
    border-color: #f5222d;
}

.form-input--error:focus {
    box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2);
}
```

**选择器 (.form-select)**
```css
.form-select {
    width: 100%;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 14px;
    background-color: #fff;
    cursor: pointer;
}

.form-select:focus {
    outline: none;
    border-color: #42b7ae;
    box-shadow: 0 0 0 2px rgba(66, 183, 174, 0.2);
}
```

**约束**：
- 输入框圆角 8px
- 聚焦时边框色 #42b7ae + 外发光 2px
- 标签字号 12px，字重 500
- 必填项使用红色星号

---

### 4. 表格组件

```css
.tos-table {
    width: 100%;
    border-collapse: collapse;
}

.tos-table th {
    padding: 12px 16px;
    text-align: left;
    font-size: 13px;
    font-weight: 500;
    color: #666;
    border-bottom: 1px solid #f0f0f0;
}

.tos-table td {
    padding: 12px 16px;
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #f5f5f5;
}

.tos-table tr:hover {
    background-color: #fafafa;
}

.tos-table tr--selected {
    background-color: #e6f7f6;
}

/* 紧凑表格 */
.tos-table--compact th,
.tos-table--compact td {
    padding: 8px 12px;
}

/* 带边框表格 */
.tos-table--bordered {
    border: 1px solid #f0f0f0;
    border-radius: 12px;
    overflow: hidden;
}

.tos-table--bordered th,
.tos-table--bordered td {
    border-right: 1px solid #f0f0f0;
}

.tos-table--bordered th:last-child,
.tos-table--bordered td:last-child {
    border-right: none;
}
```

**约束**：
- 表头文字 #666，正文 #333
- 行悬停背景 #fafafa
- 选中行背景 #e6f7f6
- 分割线使用浅色 #f0f0f0 / #f5f5f5

---

### 5. 标签/徽章组件

```css
.tag {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.5;
}

.tag-success {
    background-color: #f0faf0;
    color: #52c41a;
}

.tag-warning {
    background-color: #fff7e6;
    color: #faad14;
}

.tag-error {
    background-color: #fff1f0;
    color: #f5222d;
}

.tag-default {
    background-color: #f5f5f5;
    color: #666;
}

.tag-primary {
    background-color: #e6f7f6;
    color: #42b7ae;
}

/* 带圆点的标签 */
.tag-with-dot {
    display: inline-flex;
    align-items: center;
    gap: 4px;
}

.tag-with-dot::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: currentColor;
}
```

**约束**：
- 圆角 4px
- 背景使用浅色（opacity < 0.15），不使用纯色背景
- 文字使用对应功能色
- 仅用于状态标识，不用于装饰

---

### 6. 链接组件

```css
.tos-link {
    color: #42b7ae;
    text-decoration: underline;
    cursor: pointer;
    transition: color 0.2s;
}

.tos-link:hover {
    color: #2a8a82;
}

.tos-link--muted {
    color: #666;
    text-decoration: none;
}

.tos-link--muted:hover {
    color: #42b7ae;
    text-decoration: underline;
}

.tos-link--danger {
    color: #f5222d;
}

.tos-link--danger:hover {
    color: #cf1322;
}
```

---

### 7. 弹窗组件

```css
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.modal-container {
    background: #fff;
    border-radius: 20px;
    width: 90%;
    max-width: 520px;
    max-height: 85vh;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    animation: slideUp 0.25s ease;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.modal-header {
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h3 {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin: 0;
}

.modal-close {
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    border-radius: 8px;
    cursor: pointer;
    color: #999;
    transition: all 0.2s;
}

.modal-close:hover {
    background: #f5f5f5;
    color: #666;
}

.modal-body {
    padding: 20px;
    overflow-y: auto;
}

.modal-footer {
    padding: 12px 20px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}

/* 大弹窗 */
.modal-container--large {
    max-width: 800px;
}

/* 小弹窗 */
.modal-container--small {
    max-width: 400px;
}
```

**约束**：
- 圆角 20px
- 遮罩背景 rgba(0,0,0,0.5)
- 弹窗动画：fade + slideUp
- 底部按钮右对齐，间距 12px

---

### 8. 空状态组件

```css
.empty-state {
    text-align: center;
    padding: 48px 20px;
}

.empty-state__icon {
    font-size: 48px;
    color: #d9d9d9;
    margin-bottom: 16px;
}

.empty-state__title {
    font-size: 14px;
    color: #999;
    margin-bottom: 8px;
}

.empty-state__description {
    font-size: 12px;
    color: #bbb;
    margin-bottom: 16px;
}

.empty-state__action {
    margin-top: 8px;
}
```

**约束**：
- 图标使用浅灰色 #d9d9d9
- 标题 #999，描述 #bbb
- 内边距至少 48px

---

### 9. 加载状态/骨架屏

```css
/* 加载动画 */
@keyframes skeleton-loading {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

.skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 4px;
}

/* 骨架屏卡片 */
.skeleton-card {
    background: #fff;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

.skeleton-line {
    height: 14px;
    background: #f0f0f0;
    border-radius: 4px;
    margin-bottom: 12px;
}

.skeleton-line--sm {
    width: 60%;
    height: 12px;
}

.skeleton-line--lg {
    width: 90%;
    height: 16px;
}

/* 加载中图标 */
.spinner {
    width: 20px;
    height: 20px;
    border: 2px solid #e5e7eb;
    border-top-color: #42b7ae;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}
```

**约束**：
- 骨架屏使用灰色渐变
- 加载动画平滑连续
- 禁止使用纯色 loading 占位

---

### 10. 分页组件

```css
.pagination {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: flex-end;
    margin-top: 16px;
}

.pagination__item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    padding: 0 8px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-size: 13px;
    color: #666;
    background: #fff;
    cursor: pointer;
    transition: all 0.2s;
}

.pagination__item:hover:not(.pagination__item--active) {
    background-color: #f5f7fa;
    border-color: #d1d5db;
}

.pagination__item--active {
    background-color: #42b7ae;
    border-color: #42b7ae;
    color: #fff;
}

.pagination__item:disabled,
.pagination__item--disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.pagination__prev,
.pagination__next {
    min-width: 32px;
}

.pagination__ellipsis {
    padding: 0 8px;
    color: #999;
}
```

**约束**：
- 分页靠右对齐
- 激活页使用主色背景
- 圆角 6px

---

### 11. 面包屑导航

```css
.breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    margin-bottom: 16px;
}

.breadcrumb__item {
    color: #999;
    text-decoration: none;
}

.breadcrumb__item:hover {
    color: #42b7ae;
}

.breadcrumb__item--active {
    color: #333;
    font-weight: 500;
}

.breadcrumb__separator {
    color: #ccc;
    font-size: 12px;
}
```

---

### 12. 抽屉组件（侧边滑出）

```css
.drawer-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    animation: fadeIn 0.2s ease;
}

.drawer-container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 480px;
    max-width: 90vw;
    background: #fff;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    animation: slideInRight 0.25s ease;
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0);
    }
}

.drawer-header {
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.drawer-body {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
}

.drawer-footer {
    padding: 12px 20px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}
```

---

### 13. 提示消息组件

```css
/* Toast/Message 提示 */
.message {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    z-index: 1100;
    animation: messageFadeIn 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

@keyframes messageFadeIn {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
}

.message-success {
    background-color: #f0faf0;
    color: #52c41a;
    border: 1px solid #b7eb8f;
}

.message-warning {
    background-color: #fff7e6;
    color: #faad14;
    border: 1px solid #ffe58f;
}

.message-error {
    background-color: #fff1f0;
    color: #f5222d;
    border: 1px solid #ffccc7;
}

.message-info {
    background-color: #e6f7f6;
    color: #42b7ae;
    border: 1px solid #b5f5ec;
}
```

---

### 14. 进度条

```css
.progress {
    background-color: #f0f0f0;
    border-radius: 4px;
    overflow: hidden;
    height: 8px;
}

.progress__bar {
    background-color: #42b7ae;
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s ease;
}

.progress--success .progress__bar {
    background-color: #52c41a;
}

.progress--warning .progress__bar {
    background-color: #faad14;
}

.progress--error .progress__bar {
    background-color: #f5222d;
}
```

---

### 15. 开关组件

```css
.switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.switch__slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.3s;
    border-radius: 24px;
}

.switch__slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
}

.switch input:checked + .switch__slider {
    background-color: #42b7ae;
}

.switch input:checked + .switch__slider:before {
    transform: translateX(20px);
}
```

---

## 布局规范

### 响应式断点

| 断点 | 宽度 | 布局调整 |
|------|------|----------|
| 桌面 | ≥1280px | 两栏并排 |
| 平板 | 768px - 1279px | 两栏上下堆叠 |
| 移动 | <768px | 单栏 + 汉堡菜单 |

### 常用布局类

```css
/* 容器 */
.container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
}

/* 两栏布局 */
.layout-two-columns {
    display: flex;
    gap: 20px;
}

.layout-two-columns__sidebar {
    width: 30%;
    flex-shrink: 0;
}

.layout-two-columns__main {
    flex: 1;
}

@media (max-width: 768px) {
    .layout-two-columns {
        flex-direction: column;
    }
    .layout-two-columns__sidebar {
        width: 100%;
    }
}
```

---

## 交互状态规范

### 按钮状态

| 状态 | 样式 |
|------|------|
| 默认 | 主色填充/灰色边框 |
| 悬停 | opacity: 0.8 |
| 禁用 | opacity: 0.5; cursor: not-allowed |

### 链接状态

| 状态 | 样式 |
|------|------|
| 默认 | 颜色 #42b7ae，有下划线 |
| 悬停 | 颜色 #2a8a82 |

### 表格交互

| 状态 | 样式 |
|------|------|
| 悬停行 | 背景色 #fafafa |
| 选中行 | 背景色 #e6f7f6 |

### 表单交互

| 状态 | 样式 |
|------|------|
| 输入框悬停 | 边框颜色 #d1d5db |
| 输入框聚焦 | 边框 #42b7ae + 外发光 2px |

---

## 交付物清单

一个完整的原型交付通常包含：

### 1. 核心页面
- 列表页（含搜索/筛选）
- 详情页（含各类状态展示）
- 表单页（创建/编辑）

### 2. 状态页面
- 加载状态：Skeleton 骨架屏
- 空状态：暂无数据的提示
- 失败状态：错误提示页
- 404/403：异常页面

### 3. 交互浮层
- 弹窗（Modal）
- 抽屉（Drawer）
- 确认框（Confirm）
- 提示框（Message）
```

---

这个 `design-system.md` 文件放在 `references/` 目录下，Agent 在需要时会自动读取。需要我继续帮你生成 `references/page-templates.md` 吗？

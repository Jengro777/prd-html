# TOS 设计系统

本规范用于 TOS 产品线的后台、运营、商品、订单、数据看板和工具型页面。目标是清爽、克制、专业、可长期使用。

## 1. 设计原则

- **工具优先**：第一屏直接给用户可操作内容，不做营销式 hero。
- **少即是稳**：优先使用白底、浅灰背景、细边框和清晰留白，避免装饰性元素抢占注意力。
- **组件成熟**：优先使用 Ant Design Vue 组件，自定义样式只做 TOS 品牌化和业务布局补充。
- **信息密度稳定**：后台页面不要过空，也不要把每个小信息都做成卡片。
- **状态有语义**：功能色只表达状态、风险和反馈，不做普通装饰。

## 2. 色彩

### 基础色

| 类型 | 色值 | 用途 |
| --- | --- | --- |
| 主色 | `#42b7ae` | 主按钮、当前态、关键链接、聚焦边框 |
| 主色浅底 | `#e6f7f6` | 选中背景、弱提示背景 |
| 页面背景 | `#f5f7fa` | 页面底色 |
| 卡片背景 | `#ffffff` | 内容承载 |
| 悬停背景 | `#fafafa` | 表格行、次按钮悬停 |
| 边框 | `#e5e7eb` | 输入框、卡片、表格 |
| 弱边框 | `#f0f2f5` | 分割线、卡片内分组 |

### 文字色

| 类型 | 色值 |
| --- | --- |
| 主文字 | `#333333` |
| 次文字 | `#666666` |
| 辅助文字 | `#999999` |
| 禁用文字 | `#bfbfbf` |

### 功能色

| 类型 | 色值 | 背景 |
| --- | --- | --- |
| 成功 | `#52c41a` | `#f0faf0` |
| 警告 | `#faad14` | `#fff7e6` |
| 错误 | `#f5222d` | `#fff1f0` |

### 禁止项

- 禁止使用紫色、蓝色、粉色、橙棕色等作为装饰主色。
- 禁止多色渐变、大面积彩色背景、装饰色块、复杂纹理。
- 禁止为了区分模块而给每个模块配置不同颜色。

## 3. 圆角、阴影、间距

### 圆角

| 元素 | 圆角 |
| --- | --- |
| 页面卡片、弹窗、抽屉 | 12px |
| 按钮、输入框、选择器、上传框 | 8px |
| 标签、徽标、分页项 | 4px |
| 头像、圆形图标按钮 | 50% |

不要把普通按钮、标签、卡片做成胶囊形。圆角应服务于秩序，不服务于装饰。

### 阴影

| 场景 | 阴影 |
| --- | --- |
| 普通卡片 | `0 1px 2px rgba(15, 23, 42, 0.03)` |
| 悬浮卡片 | `0 4px 16px rgba(15, 23, 42, 0.04)` |
| 弹窗/抽屉 | `0 20px 60px rgba(15, 23, 42, 0.18)` |

默认优先使用边框而不是阴影。一个页面不应充满浮动感。

### 间距

| 类型 | 值 |
| --- | --- |
| 页面外边距 | 20px |
| 卡片内边距 | 20px |
| 区块间距 | 20px |
| 表单项间距 | 16px |
| 紧凑间距 | 8px |

## 4. 字体

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

| 场景 | 字号 | 字重 |
| --- | --- | --- |
| 页面标题 | 20px | 600 |
| 卡片标题 | 16px | 600 |
| 表单/表格正文 | 14px | 400 |
| 标签/辅助说明 | 12px | 400/500 |

不要用超大标题包装后台功能页。标题应帮助扫描，而不是制造视觉噪音。

## 5. 组件规范

### 卡片 `.tos-card`

```css
.tos-card {
    background: #fff;
    border: 1px solid #f0f2f5;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.03);
}

.tos-card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
}

.tos-card__title {
    margin: 0;
    color: #333;
    font-size: 16px;
    font-weight: 600;
}

.tos-card__desc {
    margin-top: 4px;
    color: #999;
    font-size: 12px;
}
```

卡片用于承载一组业务内容。不要把每个字段、每行数据、每个提示都做成卡片。

### 按钮

优先使用 Ant Design Vue 的 `a-button`。需要自定义时使用：

```css
.tos-btn-primary {
    height: 36px;
    padding: 0 16px;
    border: 1px solid #42b7ae;
    border-radius: 8px;
    background: #42b7ae;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
}

.tos-btn-primary:hover {
    border-color: #339b94;
    background: #339b94;
}

.tos-btn-secondary {
    height: 36px;
    padding: 0 16px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: #fff;
    color: #666;
    font-size: 14px;
}

.tos-btn-secondary:hover {
    border-color: #d1d5db;
    background: #fafafa;
}
```

同一区域只放一个主按钮。批量操作、筛选重置、取消等使用次按钮或文本按钮。

### 表单

```css
.tos-form-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px 20px;
}

.tos-form-grid--single {
    grid-template-columns: 1fr;
}

.tos-form-help {
    margin-top: 4px;
    color: #999;
    font-size: 12px;
    line-height: 1.5;
}

@media (max-width: 768px) {
    .tos-form-grid {
        grid-template-columns: 1fr;
    }
}
```

长表单按业务分组。只读字段使用浅灰背景，不要伪装成可编辑输入框。

### 表格

```css
.tos-table-wrap {
    overflow-x: auto;
}

.tos-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.tos-table th {
    padding: 12px 16px;
    background: #fafafa;
    border-bottom: 1px solid #f0f2f5;
    color: #666;
    font-size: 13px;
    font-weight: 500;
    text-align: left;
}

.tos-table td {
    padding: 12px 16px;
    border-bottom: 1px solid #f5f5f5;
    color: #333;
    font-size: 14px;
}

.tos-table tr:hover td {
    background: #fafafa;
}
```

操作列靠右，危险操作必须弱化并配确认。超长文本用省略或弹层查看。

### 标签

```css
.tos-tag {
    display: inline-flex;
    align-items: center;
    height: 22px;
    padding: 0 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
}

.tos-tag--default {
    background: #f5f5f5;
    color: #666;
}

.tos-tag--primary {
    background: #e6f7f6;
    color: #42b7ae;
}

.tos-tag--success {
    background: #f0faf0;
    color: #52c41a;
}

.tos-tag--warning {
    background: #fff7e6;
    color: #faad14;
}

.tos-tag--error {
    background: #fff1f0;
    color: #f5222d;
}
```

普通分类使用灰色标签，状态才使用功能色。

### 上传区

```css
.tos-upload {
    display: flex;
    min-height: 128px;
    align-items: center;
    justify-content: center;
    border: 1px dashed #d9dee8;
    border-radius: 8px;
    background: #fbfcfd;
    color: #666;
    text-align: center;
}

.tos-upload:hover {
    border-color: #42b7ae;
    background: rgba(66, 183, 174, 0.06);
}
```

上传区应明确支持格式、尺寸、数量限制。不要使用夸张的大图标或大面积彩色背景。

### 指标与图表

```css
.tos-metric-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 20px;
}

.tos-stat {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 16px;
    border: 1px solid #f0f2f5;
    border-radius: 12px;
    background: #fff;
}

.tos-stat__label {
    color: #999;
    font-size: 12px;
}

.tos-stat__value {
    margin-top: 4px;
    color: #1f2937;
    font-size: 22px;
    font-weight: 600;
    line-height: 1.2;
}

.tos-stat__icon {
    display: inline-flex;
    width: 36px;
    height: 36px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background: #e6f7f6;
    color: #42b7ae;
}

.tos-chart-placeholder {
    display: flex;
    min-height: 280px;
    align-items: center;
    justify-content: center;
    border: 1px dashed #d9dee8;
    border-radius: 8px;
    background: #fbfcfd;
    color: #999;
}

@media (max-width: 960px) {
    .tos-metric-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 640px) {
    .tos-metric-grid {
        grid-template-columns: 1fr;
    }
}
```

指标卡只放核心指标，不写大段解释。图表区域保持白底、浅边框，图表颜色不要超过业务需要。

### 底部操作栏

```css
.tos-bottom-bar {
    position: sticky;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 20px;
    padding: 12px 20px;
    border-top: 1px solid #f0f2f5;
    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(10px);
}
```

底部操作栏用于长表单提交。不要遮挡最后一个字段，小屏下按钮应保持可点击且不溢出。

## 6. 页面模式

### 内容区宽度（按页面类型选用）

内容区提供两种容器，根据页面类型智能选择，不要一刀切用同一种宽度：

- **`.tos-page`（默认，限宽居中）**：`max-width: 1440px; margin: 0 auto; padding: 20px;`。用于阅读/交互型页面——表单页、详情页、设置/配置页、长文与结果展示。内容不横向铺满，保证行宽可读。
- **`.tos-page--full`（撑满）**：`max-width: none; margin: 0; padding: 20px;`，不设最大宽度、不居中。用于数据密集型页面——列表页、流水/明细对账、资金看板、工作台结果区等。内容吃满主区域宽度，让表格和指标尽量横向铺开。

> 规则：列表、看板、明细、结果区一律用 `.tos-page--full`；表单、详情、配置、阅读页用默认 `.tos-page`。页面骨架中按此给 `<main>` 叠加 class，例如 `<main class="tos-page tos-page--full">`。

### 列表页

- 顶部：标题 + 简短说明 + 主要操作。
- 筛选：一行内放常用条件，更多条件放展开区。
- 表格：主信息靠左，状态中间，操作靠右。
- 分页：右下角。
- 内容区：使用 `.tos-page--full`，表格横向铺满主区域。

### 表单页

- 使用 `a-form` 和 `a-form-item`。
- 分组标题 16px/600，组间距 20px。
- 底部操作栏固定或跟随内容，但不要遮挡字段。
- 内容区：使用默认 `.tos-page` 限宽居中，保证行宽可读。

### 看板页

- 指标卡不超过 4 个一行。
- 图表区域用白底卡片和浅边框。
- 不使用多色装饰背景，图表颜色数量克制。
- 内容区：使用 `.tos-page--full`，指标与图表横向铺开。

### 工作台/工具页

- 左侧输入、右侧结果或上方输入、下方结果。
- 空态、加载、失败、成功必须有明确反馈。
- 结果区支持复制、导出、重试等自然操作。
- 内容区：结果/数据区使用 `.tos-page--full`；若以表单输入为主，则用默认 `.tos-page`。

## 7. 最终检查清单

- 页面是否只使用一套主色 `#42b7ae`。
- 是否优先使用 Ant Design Vue 组件。
- 是否没有卡片套卡片和过度阴影。
- 主按钮是否唯一突出。
- 表格、表单、标签是否统一圆角和字号。
- 390px 宽度下是否没有横向滚动。
- 页面文案是否短、准、业务化。

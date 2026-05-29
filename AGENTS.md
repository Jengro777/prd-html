## 项目概述

TOS 产品设计过程中生成的纯HTML静态页面规范。旨在统一产品经理输出的原型风格，提高评审和沟通效率，确保原型在视觉和交互上的一致性。
整体风格简约,少量颜色搭配,符合年轻人的审美。

## 设计目标

- **高保真度**：原型应尽可能接近最终产品的视觉效果
- **快速构建**：利用组件库和工具类CSS，减少重复样式代码编写
- **统一规范**：确保所有PM产出的原型具有一致的视觉语言和交互反馈

## 核心技术栈

| 技术 | 用途 | 引入方式 |
|------|------|----------|
| HTML5 | 页面结构 | 语义化标签 |
| CSS3 | 样式设计 | 内联样式表 |
| Vue3 | 轻量交互逻辑 | CDN引入 |
| Ant Design Vue | UI组件库 | CDN样式 |
| Tailwind CSS | 原子化样式框架 | CDN引入 |

## 设计原则与视觉规范

### 设计语言

遵循 **现代化商务设计** 风格，融合部分 Material Design 的动效与层次感。

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

**颜色使用限制**

参考 Ant Design、Material Design 等行业设计规范中的色彩约束：

- **一套主色**：每页只使用 1 个主色（`#42b7ae`）用于核心交互（按钮、链接、关键高亮），不多品牌色混搭
- **功能色仅表语义**：绿色表示成功、红色表示错误、橙色表示警告，仅用于状态标签和反馈元素，不作为装饰色使用
- **大面积区域保持中性色**：表格行、卡片背景、侧栏等大面积区域使用白色或浅灰（`#fff` / `#f5f7fa` / `#fafafa`），不用彩色填充
- **用间距和字重替代颜色区分层级**：标题用字号和字重（bold/medium），区块用间距和阴影分割，避免靠多种颜色做视觉区分（参考 Apple HIG 和 Material Design 的分层思路）
- **颜色不为装饰服务**：颜色必须有明确的语义或功能，禁止仅为了"好看"给非交互元素上色（参考 Atlassian Design System 的 "Use color meaningfully, not decoratively"）

### 圆角规范

- **大卡片/弹窗**：`20px`
- **按钮/输入框**：`8px`
- **小标签**：`4px`

### 阴影规范

- **轻阴影**：`0 4px 20px rgba(0, 0, 0, 0.02)`（用于卡片）

### 间距规范

- **基础间距**：`20px`
- **内间距**：`16px`
- **紧凑间距**：`8px`

### 字体规范

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

## 页面结构规范

### 文件组织

每个原型页面应为一个独立的 `.html` 文件。

### 基础模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>页面名称 - TOS原型</title>
    
    <!-- 统一使用CDN引入资源 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.24.0/antd.min.css">
    <script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.js"></script>
    
    <style>
        /* 自定义覆盖样式 */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background-color: #f5f7fa; }
        
        /* BEM命名规范示例 */
        .tos-card { 
            border-radius: 20px; 
            background: #fff; 
            padding: 20px; 
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02); 
        }
        .tos-card__title { 
            font-size: 16px; 
            color: #333; 
            margin-bottom: 16px; 
        }
        .tos-card__content {
            color: #666;
        }
        .tos-card--compact {
            padding: 16px;
        }
    </style>
</head>
<body>
    <div id="app">
        <!-- 页面内容写在这里 -->
    </div>
    
    <script>
        const { createApp, ref, reactive } = Vue;
        const app = createApp({
            setup() {
                // 模拟数据示例
                const tableData = ref([
                    { id: 1, name: '示例数据1', status: '进行中' },
                    { id: 2, name: '示例数据2', status: '已完成' }
                ]);
                
                const showModal = ref(false);
                
                return { 
                    tableData,
                    showModal
                };
            }
        });
        app.mount('#app');
    </script>
</body>
</html>
```

### 代码书写规范

**HTML规范**
- 使用语义化标签：`<header>`, `<main>`, `<aside>`, `<footer>`, `<nav>`, `<section>`
- 保持合理的文档结构，h1-h6层级分明
- 为交互元素添加适当的 role 和 aria 属性

**CSS规范**
- **优先使用 Tailwind** 的原子类名进行布局
  ```html
  <div class="flex items-center justify-between p-4">
    <span class="text-lg font-bold">标题</span>
    <button class="px-4 py-2 bg-blue-500 text-white rounded">按钮</button>
  </div>
  ```
- **复杂组件采用 BEM** 命名规范
  ```css
  .search-panel { }
  .search-panel__input { }
  .search-panel__button { }
  .search-panel--collapsed { }
  ```

**JavaScript规范**
- 仅用于模拟数据展示（表格数据渲染、弹窗开关）
- 不涉及复杂的业务逻辑请求
- 使用 ref 和 reactive 管理响应式数据

## 交互与反馈规范

### 按钮状态

| 状态 | 样式 |
|------|------|
| 默认 | 主色填充/灰色边框 |
| 悬停 (hover) | 加深颜色或添加浅色遮罩 (opacity: 0.8) |
| 禁用 | opacity: 0.5; cursor: not-allowed; |

### 链接状态

- **默认**：有下划线，颜色 #42b7ae
- **悬停**：颜色变深 (#2a8a82)

### 表格交互

- **悬停行**：背景色 #fafafa
- **选中行**：背景色 #e6f7f6

### 表单交互

- **输入框悬停**：边框颜色 #42b7ae
- **输入框聚焦**：边框 #42b7ae + 发光效果
  ```css
  box-shadow: 0 0 0 2px rgba(66, 183, 174, 0.2);
  ```

### 模拟数据处理

- 列表和表格数据建议硬编码在 Vue 的 `setup` 中
- 翻页组件仅作为 UI 展示，按钮无需绑定实际跳转逻辑
- 空状态使用 Ant Design 的 Empty 组件

## 资源与CDN

所有静态资源必须通过公共CDN加载，禁止引用本地资源。

### 固定CDN链接

```html
<!-- Tailwind CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">

<!-- Ant Design CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.24.0/antd.min.css">

<!-- Vue 3 -->
<script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.js"></script>

<!-- Ant Design Icons (可选) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/ant-design-icons/4.7.0/index.umd.min.js"></script>

<!-- Google Fonts (可选) -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

## 常用组件示例

### 卡片组件

```html
<div class="tos-card">
  <div class="tos-card__title flex items-center justify-between">
    <span>卡片标题</span>
    <span class="text-sm text-gray-500">2026-03-13</span>
  </div>
  <div class="tos-card__content">
    卡片内容区域
  </div>
</div>
```

### 表格组件

```html
<div class="bg-white rounded-2xl p-5 shadow-sm">
  <table class="w-full">
    <thead class="text-left text-gray-600 border-b">
      <tr>
        <th class="pb-3">姓名</th>
        <th class="pb-3">状态</th>
        <th class="pb-3">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in tableData" class="border-b last:border-0 hover:bg-gray-50">
        <td class="py-3">{{ item.name }}</td>
        <td class="py-3">
          <span class="px-2 py-1 text-xs rounded-full" 
                :class="item.status === '已完成' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'">
            {{ item.status }}
          </span>
        </td>
        <td class="py-3">
          <button class="text-blue-500 hover:text-blue-700 mr-3">编辑</button>
          <button class="text-red-500 hover:text-red-700">删除</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### 弹窗组件

```html
<!-- 弹窗触发按钮 -->
<button @click="showModal = true" class="px-4 py-2 bg-blue-500 text-white rounded-lg">
  打开弹窗
</button>

<!-- 弹窗遮罩层 -->
<div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div class="bg-white rounded-2xl p-6 w-96 shadow-xl">
    <h3 class="text-lg font-bold mb-4">提示</h3>
    <p class="text-gray-600 mb-6">确认执行此操作吗？</p>
    <div class="flex justify-end gap-3">
      <button @click="showModal = false" class="px-4 py-2 border rounded-lg hover:bg-gray-50">
        取消
      </button>
      <button @click="showModal = false" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        确认
      </button>
    </div>
  </div>
</div>
```

## 浏览器兼容性

- **Chrome** (最新版) —— 开发调试基准
- **Edge** (最新版)

## 原型交付物清单

一个完整的原型交付通常包含：

### 1. 核心页面

- 列表页（含搜索/筛选）
- 详情页（含各类状态展示）
- 表单页（创建/编辑）

### 2. 状态页面

- **加载状态**：Skeleton 骨架屏
- **空状态**：暂无数据的提示
- **失败状态**：错误提示页
- **404/403**：异常页面

### 3. 交互浮层

- 弹窗（Modal）
- 抽屉（Drawer）
- 确认框（Confirm）
- 提示框（Message）

### 4. 文件命名规范

```
项目名_页面名称_版本号.html
示例：tos_用户列表_v1.0.html
```

## 常见问题处理

### 样式显示异常

1. 检查 CDN 链接是否可访问
2. 清除浏览器缓存 (Ctrl + Shift + Delete)
3. 检查自定义样式是否有语法错误

### Vue 数据不更新

1. 确认使用了 ref/reactive 定义响应式数据
2. 检查模板中是否正确绑定了数据
3. 查看控制台是否有报错信息

### 响应式适配问题

1. 确认 head 中包含 viewport meta 标签
2. 使用 Tailwind 的响应式前缀（md:、lg:）

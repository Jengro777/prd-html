---
name: pm-spa-design
description: 辅助产品经理快速设计 TOS 产品线的单页面应用（SPA）HTML 原型。使用 Vue3 + Tailwind + Ant Design Vue，严格遵循 TOS 设计规范。适用于列表页、详情页、表单页、数据看板等场景。
disable-model-invocation: false
---

# pm-spa-design

## 核心约束

1. **技术栈**：Vue3 CDN + TailwindCSS + Ant Design Vue
2. **主色**：#42b7ae（高级绿），每页只使用这一个主色
3. **颜色规则**：功能色（绿/橙/红）仅用于状态标签，大面积使用中性色
4. **圆角**：卡片/弹窗 20px，按钮/输入框 8px，标签 4px
5. **间距**：基础 20px，内边距 16px，紧凑 8px

## 工作流程

### 第一步：澄清需求（信息不足时）
- 页面类型（列表/详情/表单/看板）
- 核心功能模块（2-5 个）
- 需要的交互浮层（弹窗/抽屉/确认框）
- 边界状态（加载/空状态/错误）

### 第二步：生成页面
按以下顺序构建：
1. 页面布局（header + main）
2. 筛选/搜索区域（如需要）
3. 核心内容区（表格/卡片/表单）
4. 操作按钮和交互浮层
5. 边界状态展示

### 第三步：代码质量
- HTML：语义化标签
- CSS：优先 Tailwind，自定义样式用 BEM 命名
- JS：仅模拟数据和基础交互（弹窗、Tab切换）

### 第四步：输出
- 仅输出完整 HTML 代码块
- 代码可直接保存为 `.html` 并在浏览器打开
- 界面文字使用中文

## 文件命名
`tos_页面名称_v1.0.html`

## 参考文档

生成页面时，必须参考以下规范文件：

- **设计系统与组件样式**：`references/design-system.md`
- **页面模板参考**：`references/page-templates.md`
- **组件代码示例**：`references/component-examples.html`

使用 `read_file` 工具读取这些文件，确保生成的页面符合 TOS 设计规范。

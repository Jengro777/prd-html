# pm-spa-design

## 描述

辅助产品经理快速设计 TOS 产品线的单页面应用（SPA）HTML 原型。严格遵循 TOS 设计规范，输出高保真、风格统一的可交互页面，提升评审和沟通效率。

## 适用场景

- 产品经理需要快速产出符合 TOS 品牌规范的原型页面
- 列表页、详情页、表单页、数据看板等常见页面类型
- 包含弹窗、抽屉、确认框等交互浮层的页面
- 需要展示加载、空状态、错误状态等边界情况的页面

## 核心技术栈

| 技术 | 用途 | CDN |
|------|------|-----|
| HTML5 | 页面结构 | - |
| Tailwind CSS | 原子化样式 | https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css |
| Ant Design Vue | UI组件库 | https://cdnjs.cloudflare.com/ajax/libs/antd/4.24.0/antd.min.css |
| Vue 3 | 交互逻辑 | https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.js |

## 视觉规范速查

### 主色调
- 主色：#42b7ae（高级绿）—— 主要按钮、链接、图标高亮

### 功能色
- 成功：#52c41a
- 警告：#faad14
- 错误/删除：#f5222d

### 文字色
- 主要文字：#333333
- 次要文字：#666666
- 置灰文字：#999999

### 圆角
- 大卡片/弹窗：20px
- 按钮/输入框：8px
- 小标签：4px

### 阴影
- 卡片阴影：0 4px 20px rgba(0, 0, 0, 0.02)

### 间距
- 基础间距：20px
- 内间距：16px
- 紧凑间距：8px

## 颜色使用限制（重要）

1. 一套主色：每页只使用 #42b7ae 作为唯一主色
2. 功能色仅表语义：绿/橙/红仅用于状态标签和反馈元素
3. 大面积保持中性色：使用 #fff / #f5f7fa / #fafafa
4. 用间距和字重替代颜色区分层级
5. 颜色不为装饰服务

## 基础模板

每次生成页面必须以此模板为基础：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>页面名称 - TOS原型</title>
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.24.0/antd.min.css">
    <script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.js"></script>
    
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background-color: #f5f7fa; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        
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
        .tos-card--compact {
            padding: 16px;
        }
        
        .tos-link {
            color: #42b7ae;
            text-decoration: underline;
        }
        .tos-link:hover {
            color: #2a8a82;
        }
        
        input:focus, textarea:focus, select:focus {
            outline: none;
            border-color: #42b7ae !important;
            box-shadow: 0 0 0 2px rgba(66, 183, 174, 0.2) !important;
        }
        
        .btn-primary:hover {
            opacity: 0.8;
        }
        button:disabled, .btn-disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .tos-table-row:hover {
            background-color: #fafafa;
        }
        .tos-table-row--selected {
            background-color: #e6f7f6;
        }
    </style>
</head>
<body>
    <div id="app">
        <!-- 页面内容 -->
    </div>
    
    <script>
        const { createApp, ref, reactive, computed } = Vue;
        const app = createApp({
            setup() {
                // 响应式数据定义
                // 模拟数据定义
                
                return {
                    // 暴露给模板的数据和方法
                };
            }
        });
        app.mount('#app');
    </script>
</body>
</html>
```

## 工作流程

### 第一步：澄清需求（如信息不足）

向用户确认：
- 页面类型（列表/详情/表单/看板/其他）
- 核心功能模块（2～5个）
- 需要的交互浮层（弹窗/抽屉/确认框）
- 边界状态需求（加载/空状态/错误）

### 第二步：生成页面

按以下顺序构建：
1. 页面布局结构
2. 筛选/搜索区域（如需要）
3. 核心内容区域（表格/卡片列表/表单）
4. 操作按钮和交互浮层
5. 边界状态（空状态、加载骨架屏）

### 第三步：代码质量要求

HTML：使用语义化标签，保持合理的标题层级
CSS：优先使用 Tailwind 原子类，自定义样式使用 BEM 命名
JavaScript：仅用于模拟数据和基础交互，使用 ref 管理状态

### 第四步：输出格式

- 仅输出一个完整的 HTML 代码块
- 代码可直接保存为 .html 并在浏览器打开
- 界面文字使用中文
- 生成后主动询问是否需要调整

## 文件命名规范

tos_页面名称_v1.0.html

示例：tos_用户列表_v1.0.html、tos_创建工单_v1.0.html

## 示例对话

用户：帮我设计一个用户列表页

技能输出：
[生成完整的 HTML 代码块]

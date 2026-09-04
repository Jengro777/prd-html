# TOS 页面模板参考

模板只提供结构和组件组合方式。生成页面时应结合业务内容调整字段、列、状态和交互，不要机械复制占位文案。

## 通用页面骨架

内容区 `<main>` 按页面类型选用容器，详见 `design-system.md` 第 6 节「内容区宽度」：

- 表单、详情、配置、阅读页：`<main class="tos-page">`（限宽居中）。
- 列表、明细/对账、看板、工作台结果区：`<main class="tos-page tos-page--full">`（横向撑满）。

```html
<div id="app">
    <div class="tos-shell">
        <header class="tos-header">
            <div class="tos-brand">
                <div class="tos-brand__icon">
                    <i class="fas fa-layer-group"></i>
                </div>
                <div class="tos-brand__title">页面名称</div>
            </div>
            <div class="tos-actions">
                <a-button>次操作</a-button>
                <a-button type="primary">主操作</a-button>
            </div>
        </header>

        <main class="tos-page">
            <section class="tos-page-title">
                <div>
                    <h1>页面标题</h1>
                    <p>一句话说明当前页面对象和范围。</p>
                </div>
                <div class="tos-actions">
                    <a-button>导入</a-button>
                    <a-button type="primary">新建</a-button>
                </div>
            </section>

            <!-- 页面主体 -->
        </main>
    </div>
</div>
```

## 1. 列表页模板

适用于商品、订单、用户、渠道、素材等列表管理。

```html
<section class="tos-card">
    <div class="tos-card__header">
        <div>
            <h2 class="tos-card__title">筛选查询</h2>
            <div class="tos-card__desc">常用条件平铺，低频条件放到更多筛选。</div>
        </div>
        <a-button @click="resetFilters">重置</a-button>
    </div>

    <a-form layout="vertical">
        <div class="tos-form-grid">
            <a-form-item label="关键词">
                <a-input v-model:value="filters.keyword" placeholder="搜索名称、编号" allow-clear />
            </a-form-item>
            <a-form-item label="状态">
                <a-select v-model:value="filters.status" placeholder="全部状态" allow-clear>
                    <a-select-option value="enabled">启用</a-select-option>
                    <a-select-option value="disabled">停用</a-select-option>
                </a-select>
            </a-form-item>
        </div>
        <div class="tos-actions">
            <a-button @click="resetFilters">重置</a-button>
            <a-button type="primary" @click="handleSearch">查询</a-button>
        </div>
    </a-form>
</section>

<section class="tos-card">
    <div class="tos-card__header">
        <div>
            <h2 class="tos-card__title">数据列表</h2>
            <div class="tos-card__desc">共 {{ filteredList.length }} 条数据</div>
        </div>
        <a-button type="primary" @click="openCreate">新建数据</a-button>
    </div>

    <div class="tos-table-wrap">
        <table class="tos-table">
            <thead>
                <tr>
                    <th>名称</th>
                    <th>分类</th>
                    <th>更新时间</th>
                    <th>状态</th>
                    <th class="text-right">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in pagedList" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.category }}</td>
                    <td>{{ item.updatedAt }}</td>
                    <td>
                        <span class="tos-tag" :class="item.status === '启用' ? 'tos-tag--success' : 'tos-tag--default'">
                            {{ item.status }}
                        </span>
                    </td>
                    <td class="text-right">
                        <a-button type="link" size="small" @click="openEdit(item)">编辑</a-button>
                        <a-popconfirm title="确认删除这条数据？" @confirm="removeItem(item)">
                            <a-button type="link" danger size="small">删除</a-button>
                        </a-popconfirm>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="tos-actions mt-4">
        <a-pagination v-model:current="page.current" :page-size="page.size" :total="filteredList.length" show-size-changer />
    </div>
</section>
```

## 2. 表单页模板

适用于创建、编辑、发布、配置类页面。

```html
<section class="tos-card">
    <div class="tos-card__header">
        <div>
            <h2 class="tos-card__title">基础信息</h2>
            <div class="tos-card__desc">填写发布所需的核心信息。</div>
        </div>
    </div>

    <a-form layout="vertical" :model="form">
        <div class="tos-form-grid">
            <a-form-item label="名称" required>
                <a-input v-model:value="form.name" placeholder="请输入名称" />
            </a-form-item>
            <a-form-item label="分类" required>
                <a-select v-model:value="form.category" placeholder="请选择分类">
                    <a-select-option value="digital">数码产品</a-select-option>
                    <a-select-option value="home">家居生活</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="价格" required>
                <a-input-number class="w-full" v-model:value="form.price" :min="0" addon-after="CNY" />
            </a-form-item>
            <a-form-item label="状态">
                <a-radio-group v-model:value="form.status">
                    <a-radio value="draft">草稿</a-radio>
                    <a-radio value="online">上架</a-radio>
                </a-radio-group>
            </a-form-item>
        </div>
        <a-form-item label="描述">
            <a-textarea v-model:value="form.description" :rows="4" placeholder="请输入描述" />
            <div class="tos-form-help">描述应短、准、业务化，不写营销空话。</div>
        </a-form-item>
    </a-form>
</section>

<section class="tos-card">
    <div class="tos-card__header">
        <h2 class="tos-card__title">高级配置</h2>
    </div>
    <a-collapse ghost>
        <a-collapse-panel key="sku" header="SKU 配置">
            <div class="tos-form-grid">
                <a-form-item label="库存">
                    <a-input-number class="w-full" v-model:value="form.stock" :min="0" />
                </a-form-item>
                <a-form-item label="发货方式">
                    <a-select v-model:value="form.delivery" placeholder="请选择">
                        <a-select-option value="express">快递</a-select-option>
                        <a-select-option value="pickup">自提</a-select-option>
                    </a-select>
                </a-form-item>
            </div>
        </a-collapse-panel>
    </a-collapse>
</section>

<div class="tos-bottom-bar">
    <a-button>取消</a-button>
    <a-button type="primary" @click="submitForm">提交</a-button>
</div>
```

## 3. 详情页模板

适用于只读详情、审核详情、操作记录。

```html
<section class="tos-card">
    <div class="tos-card__header">
        <div>
            <h2 class="tos-card__title">{{ detail.name }}</h2>
            <div class="tos-card__desc">编号：{{ detail.code }}</div>
        </div>
        <div class="tos-actions">
            <span class="tos-tag tos-tag--success">{{ detail.status }}</span>
            <a-button type="primary" @click="openEdit">编辑</a-button>
        </div>
    </div>

    <a-descriptions :column="2" bordered size="middle">
        <a-descriptions-item label="分类">{{ detail.category }}</a-descriptions-item>
        <a-descriptions-item label="负责人">{{ detail.owner }}</a-descriptions-item>
        <a-descriptions-item label="创建时间">{{ detail.createdAt }}</a-descriptions-item>
        <a-descriptions-item label="更新时间">{{ detail.updatedAt }}</a-descriptions-item>
    </a-descriptions>
</section>

<section class="tos-card">
    <div class="tos-card__header">
        <h2 class="tos-card__title">操作记录</h2>
    </div>
    <a-timeline>
        <a-timeline-item v-for="log in logs" :key="log.id">
            {{ log.time }} {{ log.action }}
        </a-timeline-item>
    </a-timeline>
</section>
```

## 4. 看板页模板

适用于数据概览和运营监控。指标卡最多一屏 4 个，图表保持白底和浅边框。

```html
<section class="tos-metric-grid">
    <div class="tos-stat" v-for="metric in metrics" :key="metric.name">
        <div>
            <div class="tos-stat__label">{{ metric.name }}</div>
            <div class="tos-stat__value">{{ metric.value }}</div>
        </div>
        <div class="tos-stat__icon">
            <i :class="metric.icon"></i>
        </div>
    </div>
</section>

<section class="tos-grid mt-5">
    <div class="tos-col-8">
        <div class="tos-card">
            <div class="tos-card__header">
                <h2 class="tos-card__title">趋势分析</h2>
                <a-segmented v-model:value="range" :options="['7天', '30天', '90天']" />
            </div>
            <div class="tos-chart-placeholder">图表区域</div>
        </div>
    </div>
    <div class="tos-col-4">
        <div class="tos-card">
            <div class="tos-card__header">
                <h2 class="tos-card__title">品类占比</h2>
            </div>
            <div class="tos-chart-placeholder">图表区域</div>
        </div>
    </div>
</section>
```

## 5. 工具页模板

适用于 AI 生成、批量导入、格式转换、校验工具等。

```html
<section class="tos-grid">
    <div class="tos-col-4">
        <div class="tos-card">
            <div class="tos-card__header">
                <div>
                    <h2 class="tos-card__title">输入素材</h2>
                    <div class="tos-card__desc">上传文件或粘贴文本。</div>
                </div>
            </div>
            <div class="tos-upload">
                <div>
                    <i class="fas fa-cloud-upload-alt"></i>
                    <div class="tos-upload__title">拖拽上传或点击选择</div>
                    <div class="tos-upload__desc">支持 JPG、PNG、XLSX、CSV</div>
                </div>
            </div>
            <a-form layout="vertical" class="mt-4">
                <a-form-item label="补充说明">
                    <a-textarea v-model:value="inputText" :rows="8" placeholder="请输入补充信息" />
                </a-form-item>
            </a-form>
        </div>
    </div>

    <div class="tos-col-8">
        <div class="tos-card">
            <div class="tos-card__header">
                <div>
                    <h2 class="tos-card__title">生成结果</h2>
                    <div class="tos-card__desc">结果生成后可编辑、复制或导出。</div>
                </div>
                <div class="tos-actions">
                    <a-button>重置</a-button>
                    <a-button type="primary" :loading="loading" @click="runTask">开始生成</a-button>
                </div>
            </div>

            <a-skeleton v-if="loading" active :paragraph="{ rows: 6 }" />
            <div v-else-if="!result" class="tos-empty">
                <i class="fas fa-inbox"></i>
                <div>暂无结果</div>
            </div>
            <div v-else>
                <a-alert type="success" show-icon message="生成完成" class="mb-4" />
                <a-textarea v-model:value="result" :rows="12" />
            </div>
        </div>
    </div>
</section>
```

## 6. 弹窗与抽屉

```html
<a-modal v-model:open="formVisible" title="编辑信息" width="640px" @ok="submitForm">
    <a-form layout="vertical" :model="form">
        <div class="tos-form-grid">
            <a-form-item label="名称" required>
                <a-input v-model:value="form.name" />
            </a-form-item>
            <a-form-item label="状态">
                <a-select v-model:value="form.status">
                    <a-select-option value="enabled">启用</a-select-option>
                    <a-select-option value="disabled">停用</a-select-option>
                </a-select>
            </a-form-item>
        </div>
    </a-form>
</a-modal>

<a-drawer v-model:open="drawerVisible" title="详情" width="520">
    <a-descriptions :column="1" bordered>
        <a-descriptions-item label="名称">{{ detail.name }}</a-descriptions-item>
        <a-descriptions-item label="状态">{{ detail.status }}</a-descriptions-item>
    </a-descriptions>
</a-drawer>
```

## 7. Vue 数据骨架

```javascript
const { createApp, ref, reactive, computed } = Vue;

createApp({
    setup() {
        const filters = reactive({
            keyword: "",
            status: undefined,
        });

        const page = reactive({
            current: 1,
            size: 10,
        });

        const dataList = ref([
            { id: 1, name: "示例数据", category: "默认分类", status: "启用", updatedAt: "2026-05-29" },
        ]);

        const filteredList = computed(() => {
            return dataList.value.filter((item) => {
                const matchKeyword = !filters.keyword || item.name.includes(filters.keyword);
                const matchStatus = !filters.status || item.status === filters.status;
                return matchKeyword && matchStatus;
            });
        });

        const pagedList = computed(() => {
            const start = (page.current - 1) * page.size;
            return filteredList.value.slice(start, start + page.size);
        });

        const resetFilters = () => {
            filters.keyword = "";
            filters.status = undefined;
            page.current = 1;
        };

        const handleSearch = () => {
            page.current = 1;
        };

        return {
            filters,
            page,
            dataList,
            filteredList,
            pagedList,
            resetFilters,
            handleSearch,
        };
    },
})
    .use(antd)
    .mount("#app");
```

## 8. H5 移动端页面模板

H5 页面用于会员端/消费者端。核心内容区限制 414px 宽度模拟手机屏幕。**每个 H5 页面必须包含左侧固定导航菜单**，方便在桌面浏览器中切换查看多个 H5 页面。

### 核心布局

```
┌──────────┐                    ┌──────────────┐
│ 左侧菜单  │                    │              │
│ fixed    │  ← 自然间距 →      │  H5 414px    │
│ left:0   │                    │  margin:auto │
│ 200px    │                    │              │
└──────────┘                    └──────────────┘
```

### 布局骨架

```html
<body>
<!-- 左侧导航：fixed 在最左边缘，仅用于桌面浏览器切换 H5 页面 -->
<aside class="sidebar" id="sidebar">
    <!-- 端切换：方便在会员端/运营端等不同端之间跳转 -->
    <select class="sidebar__end-select" onchange="if(this.value)location.href=this.value">
        <option value="">会员端</option>
        <option value="运营端/运营-xxx.html">运营端</option>
    </select>
    <div class="sidebar__head">
        <div class="sidebar__logo"><i class="fas fa-wallet"></i></div>
        <span class="sidebar__title">会员中心</span>
    </div>
    <nav class="sidebar__nav">
        <div class="sidebar__group-title">功能分组</div>
        <a class="sidebar__item sidebar__item--active" href="page1.html"><i class="fas fa-home"></i> 页面一</a>
        <a class="sidebar__item" href="page2.html"><i class="fas fa-list"></i> 页面二</a>
        <a class="sidebar__item" href="page3.html"><i class="fas fa-cog"></i> 页面三</a>
    </nav>
</aside>

<!-- H5 内容容器：414px 居中 -->
<div class="h5-container">
    <div class="h5-header">
        <button class="h5-header__menu" onclick="document.getElementById('sidebar').style.display='block';this.style.display='none'">☰</button>
        <span class="h5-header__title">页面标题</span>
    </div>
    <div class="h5-page">
        <!-- 页面内容 -->
    </div>
</div>
</body>
```

### 必需的 CSS

```css
body { background: #f5f7fa; font-family: -apple-system, BlinkMacSystemFont, sans-serif; color: #333; }
.sidebar { width: 200px; background: #fff; border-right: 1px solid #f0f2f5; position: fixed; left: 0; top: 0; bottom: 0; display: flex; flex-direction: column; z-index: 10; }
.sidebar__head { padding: 20px 16px 16px; border-bottom: 1px solid #f0f2f5; display: flex; align-items: center; gap: 10px; }
.sidebar__logo { width: 34px; height: 34px; border-radius: 8px; background: #42b7ae; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 15px; }
.sidebar__title { font-size: 15px; font-weight: 700; }
/* 端切换 select：TOS 规范样式 */
.sidebar__end-select { width: calc(100% - 24px); height: 32px; margin: 8px 12px 0; padding: 0 26px 0 10px; border: 1px solid #e5e7eb; border-radius: 8px; background: #fff; font-size: 13px; color: #333; outline: none; cursor: pointer; font-family: inherit; appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><path d='M2 4l3 3 3-3' fill='none' stroke='%23999' stroke-width='1.5' stroke-linecap='round'/></svg>"); background-repeat: no-repeat; background-position: right 8px center; }
.sidebar__end-select:focus { border-color: #42b7ae; box-shadow: 0 0 0 2px rgba(66,183,174,.16); }
.sidebar__nav { flex: 1; padding: 8px 0; overflow-y: auto; }
.sidebar__group-title { padding: 12px 14px 4px; font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; }
.sidebar__item { display: flex; align-items: center; gap: 8px; padding: 9px 14px; font-size: 13px; color: #666; text-decoration: none; border-left: 3px solid transparent; transition: all 0.12s; }
.sidebar__item:hover { background: #f5f5f5; color: #333; }
.sidebar__item--active { color: #42b7ae; font-weight: 600; background: #e6f7f6; border-left-color: #42b7ae; }
.h5-container { width: 414px; margin: 0 auto; min-height: 100vh; background: #f5f7fa; }
.h5-header { position: sticky; top: 0; z-index: 20; display: flex; align-items: center; gap: 12px; height: 48px; padding: 0 16px; background: #fff; border-bottom: 1px solid #e5e7eb; }
.h5-header__menu { width: 32px; height: 32px; display: none; align-items: center; justify-content: center; font-size: 20px; cursor: pointer; background: none; border: none; }
.h5-header__title { flex: 1; font-size: 17px; font-weight: 600; text-align: center; }
.h5-page { padding: 16px; }
@media (max-width: 680px) { .sidebar { display: none; } .h5-header__menu { display: flex; } .h5-container { width: 100%; } }
```

### 规则要点

1. **左侧菜单是纯页面导航**，仅用 `<a href="...">` 跳转切换 H5 页面，不含任何业务逻辑。
2. **每个 H5 页面必须包含相同的侧边栏**，仅当前页对应菜单项标记 `sidebar__item--active`。
3. **侧边栏顶部必须有端切换 select**，方便在会员端、运营端等不同端之间跳转。使用 `<select class="sidebar__end-select">` + `onchange` 跳转，选项为各端入口页路径，当前端设为空 value（选中不跳转）。运营端等其他端页面也同样放置此 select，只是当前端选项不同。
4. **桌面端**（>680px）：侧边栏 `position:fixed; left:0` 始终可见，H5 容器 `margin:0 auto` 居中。
5. **移动端**（≤680px）：侧边栏隐藏，☰ 按钮唤出，H5 容器 `width:100%`。
6. **body 不要设 `display:flex; justify-content:center`**，侧边栏用 fixed 定位，H5 容器用 margin auto 居中，自然留出间距。
7. H5 页面内所有组件类名使用 `h5-*` 前缀，与运营端 `tos-*` 区分。
8. 底部固定操作栏 `position:fixed; bottom:0`，宽度 414px，移动端 100%。

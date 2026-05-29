# TOS 页面模板参考

模板只提供结构和组件组合方式。生成页面时应结合业务内容调整字段、列、状态和交互，不要机械复制占位文案。

## 通用页面骨架

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

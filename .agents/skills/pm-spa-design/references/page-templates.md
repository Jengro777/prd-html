好的，继续生成 `references/page-templates.md` 文件。

---

## references/page-templates.md

```markdown
# TOS 页面模板参考

本文档提供常见页面类型的 HTML 结构模板，生成页面时应参考这些模板的结构和组件使用方式。

---

## 1. 列表页模板

适用场景：用户列表、商品列表、订单列表等需要展示多条数据的页面。

### 结构说明

```
┌─────────────────────────────────────────────────────────────┐
│  页面标题 + 描述                                              │
├─────────────────────────────────────────────────────────────┤
│  搜索/筛选区域                                               │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌──────────────┐      │
│  │ 搜索框   │ │ 筛选下拉 │ │ 状态筛选 │ │ + 新增按钮    │      │
│  └─────────┘ └─────────┘ └─────────┘ └──────────────┘      │
├─────────────────────────────────────────────────────────────┤
│  表格区域                                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 列头 │ 列头 │ 列头 │ 列头 │ 列头 │ 操作            │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ 数据 │ 数据 │ 数据 │ 数据 │ 数据 │ 编辑/删除        │   │
│  │ 数据 │ 数据 │ 数据 │ 数据 │ 数据 │ 编辑/删除        │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  分页组件                                                    │
└─────────────────────────────────────────────────────────────┘
```

### 代码模板

```html
<div class="max-w-7xl mx-auto p-5">
    <!-- 页面标题 -->
    <div class="mb-5">
        <h1 class="text-xl font-bold text-gray-800">页面标题</h1>
        <p class="text-sm text-gray-500 mt-1">页面描述，共 {{ dataList.length }} 条数据</p>
    </div>
    
    <!-- 搜索和筛选区域 -->
    <div class="tos-card mb-5">
        <div class="flex flex-wrap gap-3">
            <input type="text" v-model="searchKeyword" placeholder="搜索关键词" class="form-input w-64">
            <select v-model="filterStatus" class="form-select w-32">
                <option value="">全部状态</option>
                <option value="active">启用</option>
                <option value="inactive">禁用</option>
            </select>
            <button @click="handleSearch" class="btn-primary">搜索</button>
            <button @click="handleReset" class="btn-secondary">重置</button>
            <button @click="handleAdd" class="btn-primary ml-auto">+ 新增</button>
        </div>
    </div>
    
    <!-- 表格区域 -->
    <div class="tos-card">
        <table class="tos-table">
            <thead>
                <tr>
                    <th>列1</th>
                    <th>列2</th>
                    <th>列3</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in filteredList" :key="item.id">
                    <td>{{ item.field1 }}</td>
                    <td>{{ item.field2 }}</td>
                    <td>{{ item.field3 }}</td>
                    <td>
                        <span class="tag" :class="item.status === '启用' ? 'tag-success' : 'tag-default'">
                            {{ item.status }}
                        </span>
                    </td>
                    <td>
                        <a href="javascript:;" @click="handleEdit(item)" class="tos-link mr-3">编辑</a>
                        <a href="javascript:;" @click="handleDelete(item)" class="tos-link--danger">删除</a>
                    </td>
                </tr>
                <tr v-if="filteredList.length === 0">
                    <td colspan="5" class="text-center py-8 text-gray-400">暂无数据</td>
                </tr>
            </tbody>
        </table>
        
        <!-- 分页 -->
        <div class="pagination">
            <button class="pagination__item pagination__prev" :disabled="currentPage === 1" @click="prevPage">上一页</button>
            <button v-for="page in visiblePages" :key="page" class="pagination__item" :class="{ 'pagination__item--active': currentPage === page }" @click="goToPage(page)">{{ page }}</button>
            <button class="pagination__item pagination__next" :disabled="currentPage === totalPages" @click="nextPage">下一页</button>
        </div>
    </div>
</div>
```

### Vue 数据示例

```javascript
const { createApp, ref, computed } = Vue;

createApp({
    setup() {
        const dataList = ref([
            { id: 1, field1: '数据1', field2: '描述1', field3: '类别1', status: '启用' },
            { id: 2, field1: '数据2', field2: '描述2', field3: '类别2', status: '禁用' }
        ]);
        
        const searchKeyword = ref('');
        const filterStatus = ref('');
        const currentPage = ref(1);
        const pageSize = ref(10);
        
        const filteredList = computed(() => {
            let result = dataList.value;
            if (searchKeyword.value) {
                result = result.filter(item => item.field1.includes(searchKeyword.value));
            }
            if (filterStatus.value) {
                result = result.filter(item => item.status === filterStatus.value);
            }
            const start = (currentPage.value - 1) * pageSize.value;
            return result.slice(start, start + pageSize.value);
        });
        
        const totalPages = computed(() => Math.ceil(dataList.value.length / pageSize.value));
        
        const handleSearch = () => { currentPage.value = 1; };
        const handleReset = () => { searchKeyword.value = ''; filterStatus.value = ''; currentPage.value = 1; };
        const handleAdd = () => { /* 打开新增弹窗 */ };
        const handleEdit = (item) => { /* 打开编辑弹窗 */ };
        const handleDelete = (item) => { /* 确认删除 */ };
        
        const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
        const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };
        const goToPage = (page) => { currentPage.value = page; };
        
        return { dataList, searchKeyword, filterStatus, currentPage, filteredList, totalPages, handleSearch, handleReset, handleAdd, handleEdit, handleDelete, prevPage, nextPage, goToPage };
    }
}).mount('#app');
```

---

## 2. 表单页模板

适用场景：创建商品、编辑用户、发布文章等需要填写表单的页面。

### 结构说明

```
┌─────────────────────────────────────────────────────────────┐
│  页面标题 + 面包屑导航                                        │
├─────────────────────────────────────────────────────────────┤
│  表单区域（卡片内）                                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  基础信息                                            │   │
│  │  ┌─────────────┐ ┌─────────────┐                   │   │
│  │  │ 字段1       │ │ 字段2       │                   │   │
│  │  └─────────────┘ └─────────────┘                   │   │
│  │  ┌─────────────────────────────────────┐           │   │
│  │  │ 字段3（跨列）                         │           │   │
│  │  └─────────────────────────────────────┘           │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │  高级信息（可折叠）                                   │   │
│  │  ...                                                │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  底部操作栏（提交/取消）                                      │
└─────────────────────────────────────────────────────────────┘
```

### 代码模板

```html
<div class="max-w-4xl mx-auto p-5">
    <!-- 面包屑导航 -->
    <div class="breadcrumb">
        <a href="#" class="breadcrumb__item">首页</a>
        <span class="breadcrumb__separator">/</span>
        <a href="#" class="breadcrumb__item">模块名称</a>
        <span class="breadcrumb__separator">/</span>
        <span class="breadcrumb__item--active">新建/编辑</span>
    </div>
    
    <!-- 页面标题 -->
    <div class="mb-5">
        <h1 class="text-xl font-bold text-gray-800">{{ isEdit ? '编辑' : '新建' }}页面标题</h1>
        <p class="text-sm text-gray-500 mt-1">请填写以下信息</p>
    </div>
    
    <!-- 表单卡片 -->
    <div class="tos-card">
        <!-- 基础信息区块 -->
        <div class="mb-6">
            <div class="tos-card__title">基础信息</div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="form-label">字段1 <span class="required">*</span></label>
                    <input type="text" v-model="form.field1" class="form-input" placeholder="请输入字段1">
                    <div v-if="errors.field1" class="form-error">{{ errors.field1 }}</div>
                </div>
                <div>
                    <label class="form-label">字段2</label>
                    <select v-model="form.field2" class="form-select">
                        <option value="">请选择</option>
                        <option value="option1">选项1</option>
                        <option value="option2">选项2</option>
                    </select>
                </div>
                <div class="md:col-span-2">
                    <label class="form-label">字段3（描述）</label>
                    <textarea v-model="form.field3" class="form-textarea" rows="4" placeholder="请输入详细描述"></textarea>
                </div>
            </div>
        </div>
        
        <!-- 分割线 -->
        <div class="border-t border-gray-100 my-4"></div>
        
        <!-- 高级信息区块（可折叠） -->
        <div>
            <div class="collapse-header" @click="toggleCollapse">
                <div class="tos-card__title mb-0">高级信息</div>
                <i class="fas fa-chevron-right" :class="{ 'rotate-90': !isCollapsed }"></i>
            </div>
            <div v-show="!isCollapsed" class="collapse-content">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="form-label">高级字段1</label>
                        <input type="text" v-model="form.advanced1" class="form-input">
                    </div>
                    <div>
                        <label class="form-label">高级字段2</label>
                        <input type="text" v-model="form.advanced2" class="form-input">
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- 底部操作栏 -->
    <div class="flex justify-end gap-3 mt-5">
        <button @click="handleCancel" class="btn-secondary">取消</button>
        <button @click="handleSubmit" class="btn-primary">提交</button>
    </div>
</div>
```

### Vue 数据示例

```javascript
const { createApp, ref, reactive } = Vue;

createApp({
    setup() {
        const isEdit = ref(false);
        const isCollapsed = ref(true);
        
        const form = reactive({
            field1: '',
            field2: '',
            field3: '',
            advanced1: '',
            advanced2: ''
        });
        
        const errors = reactive({
            field1: ''
        });
        
        const validate = () => {
            let valid = true;
            if (!form.field1) {
                errors.field1 = '请输入字段1';
                valid = false;
            } else {
                errors.field1 = '';
            }
            return valid;
        };
        
        const handleSubmit = () => {
            if (!validate()) return;
            console.log('提交表单:', form);
            // 提交逻辑
        };
        
        const handleCancel = () => {
            // 返回上一页或关闭
        };
        
        const toggleCollapse = () => {
            isCollapsed.value = !isCollapsed.value;
        };
        
        return { isEdit, isCollapsed, form, errors, handleSubmit, handleCancel, toggleCollapse };
    }
}).mount('#app');
```

---

## 3. 详情页模板

适用场景：用户详情、订单详情、商品详情等展示单条完整数据的页面。

### 结构说明

```
┌─────────────────────────────────────────────────────────────┐
│  页面标题 + 操作按钮（编辑/删除/返回）                          │
├─────────────────────────────────────────────────────────────┤
│  信息卡片                                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  基础信息                                            │   │
│  │  • 字段1: 值1    • 字段2: 值2    • 字段3: 值3        │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  详细信息                                            │   │
│  │  • 字段4: 值4    • 字段5: 值5    • 字段6: 值6        │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  关联数据区域（如订单列表、评论列表等）                         │
└─────────────────────────────────────────────────────────────┘
```

### 代码模板

```html
<div class="max-w-5xl mx-auto p-5">
    <!-- 页面头部 -->
    <div class="flex justify-between items-center mb-5">
        <div>
            <div class="breadcrumb mb-2">
                <a href="#" class="breadcrumb__item">首页</a>
                <span class="breadcrumb__separator">/</span>
                <a href="#" class="breadcrumb__item">模块名称</a>
                <span class="breadcrumb__separator">/</span>
                <span class="breadcrumb__item--active">详情</span>
            </div>
            <h1 class="text-xl font-bold text-gray-800">{{ detail.title || '详情页面' }}</h1>
            <p class="text-sm text-gray-500 mt-1">ID: {{ detail.id }}</p>
        </div>
        <div class="flex gap-3">
            <button @click="handleEdit" class="btn-secondary">
                <i class="fas fa-edit mr-1"></i> 编辑
            </button>
            <button @click="handleDelete" class="btn-text btn-text-danger">
                <i class="fas fa-trash mr-1"></i> 删除
            </button>
        </div>
    </div>
    
    <!-- 基础信息卡片 -->
    <div class="tos-card mb-5">
        <div class="tos-card__title flex items-center gap-2">
            <i class="fas fa-info-circle text-[#42b7ae]"></i> 基础信息
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex">
                <div class="w-24 text-sm text-gray-500">字段1：</div>
                <div class="flex-1 text-sm text-gray-800">{{ detail.field1 || '-' }}</div>
            </div>
            <div class="flex">
                <div class="w-24 text-sm text-gray-500">字段2：</div>
                <div class="flex-1 text-sm text-gray-800">{{ detail.field2 || '-' }}</div>
            </div>
            <div class="flex">
                <div class="w-24 text-sm text-gray-500">字段3：</div>
                <div class="flex-1 text-sm text-gray-800">{{ detail.field3 || '-' }}</div>
            </div>
            <div class="flex">
                <div class="w-24 text-sm text-gray-500">状态：</div>
                <div class="flex-1">
                    <span class="tag" :class="detail.status === '启用' ? 'tag-success' : 'tag-default'">
                        {{ detail.status || '-' }}
                    </span>
                </div>
            </div>
        </div>
    </div>
    
    <!-- 详细信息卡片 -->
    <div class="tos-card mb-5">
        <div class="tos-card__title flex items-center gap-2">
            <i class="fas fa-list-ul text-[#42b7ae]"></i> 详细信息
        </div>
        <div class="space-y-3">
            <div>
                <div class="text-sm text-gray-500 mb-1">描述：</div>
                <div class="text-sm text-gray-800 bg-gray-50 p-3 rounded-lg">{{ detail.description || '-' }}</div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex">
                    <div class="w-28 text-sm text-gray-500">创建时间：</div>
                    <div class="flex-1 text-sm text-gray-800">{{ detail.createdAt || '-' }}</div>
                </div>
                <div class="flex">
                    <div class="w-28 text-sm text-gray-500">更新时间：</div>
                    <div class="flex-1 text-sm text-gray-800">{{ detail.updatedAt || '-' }}</div>
                </div>
                <div class="flex">
                    <div class="w-28 text-sm text-gray-500">创建人：</div>
                    <div class="flex-1 text-sm text-gray-800">{{ detail.createdBy || '-' }}</div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- 关联数据区域（如评论/日志列表） -->
    <div class="tos-card">
        <div class="tos-card__title flex justify-between items-center">
            <span>关联记录</span>
            <a href="#" class="tos-link text-sm">查看更多 <i class="fas fa-arrow-right ml-1"></i></a>
        </div>
        
        <!-- 使用表格展示关联数据 -->
        <table class="tos-table">
            <thead>
                <tr>
                    <th>时间</th>
                    <th>操作人</th>
                    <th>操作内容</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="log in relatedLogs" :key="log.id">
                    <td>{{ log.time }}</td>
                    <td>{{ log.user }}</td>
                    <td>{{ log.action }}</td>
                </tr>
                <tr v-if="relatedLogs.length === 0">
                    <td colspan="3" class="text-center py-8 text-gray-400">暂无关联记录</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
```

### Vue 数据示例

```javascript
const { createApp, ref, onMounted } = Vue;

createApp({
    setup() {
        const detail = ref({});
        const relatedLogs = ref([]);
        
        const fetchDetail = async () => {
            // 模拟获取数据
            detail.value = {
                id: '123456',
                title: '示例标题',
                field1: '值1',
                field2: '值2',
                field3: '值3',
                status: '启用',
                description: '这是详细描述内容',
                createdAt: '2026-05-29 10:00:00',
                updatedAt: '2026-05-29 14:30:00',
                createdBy: '张三'
            };
            
            relatedLogs.value = [
                { id: 1, time: '2026-05-29 14:30:00', user: '张三', action: '更新了状态' },
                { id: 2, time: '2026-05-29 10:00:00', user: '李四', action: '创建了记录' }
            ];
        };
        
        const handleEdit = () => {
            console.log('编辑');
        };
        
        const handleDelete = () => {
            console.log('删除');
        };
        
        onMounted(() => {
            fetchDetail();
        });
        
        return { detail, relatedLogs, handleEdit, handleDelete };
    }
}).mount('#app');
```

---

## 4. 看板/仪表盘模板

适用场景：数据统计、KPI 展示、图表面板等需要展示多个数据卡片和分析结果的页面。

### 结构说明

```
┌─────────────────────────────────────────────────────────────┐
│  页面标题 + 时间筛选                                          │
├─────────────────────────────────────────────────────────────┤
│  统计卡片行（4列）                                            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ 指标1     │ │ 指标2     │ │ 指标3     │ │ 指标4     │       │
│  │ 数值      │ │ 数值      │ │ 数值      │ │ 数值      │       │
│  │ 趋势      │ │ 趋势      │ │ 趋势      │ │ 趋势      │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
├─────────────────────────────────────────────────────────────┤
│  主图表区域（2列）                                            │
│  ┌────────────────────────┬────────────────────────┐       │
│  │                        │                        │       │
│  │      图表1              │       图表2             │       │
│  │                        │                        │       │
│  └────────────────────────┴────────────────────────┘       │
├─────────────────────────────────────────────────────────────┤
│  数据列表区域                                                 │
└─────────────────────────────────────────────────────────────┘
```

### 代码模板

```html
<div class="p-5">
    <!-- 页面标题 -->
    <div class="flex justify-between items-center mb-5">
        <div>
            <h1 class="text-xl font-bold text-gray-800">数据仪表盘</h1>
            <p class="text-sm text-gray-500 mt-1">实时数据概览</p>
        </div>
        <select v-model="timeRange" class="form-select w-32">
            <option value="today">今日</option>
            <option value="week">本周</option>
            <option value="month">本月</option>
        </select>
    </div>
    
    <!-- KPI 卡片行 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
        <div class="tos-card" v-for="kpi in kpiList" :key="kpi.name">
            <div class="flex justify-between items-start">
                <div>
                    <p class="text-sm text-gray-500">{{ kpi.name }}</p>
                    <p class="text-2xl font-bold text-gray-800 mt-1">{{ kpi.value }}</p>
                    <p class="text-xs mt-2" :class="kpi.trend > 0 ? 'text-green-500' : 'text-red-500'">
                        <i :class="kpi.trend > 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
                        {{ Math.abs(kpi.trend) }}% 较昨日
                    </p>
                </div>
                <div class="w-10 h-10 rounded-full bg-[#e6f7f6] flex items-center justify-center">
                    <i :class="kpi.icon" class="text-[#42b7ae] text-lg"></i>
                </div>
            </div>
        </div>
    </div>
    
    <!-- 图表区域（占位） -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <div class="tos-card">
            <div class="tos-card__title">销售趋势</div>
            <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div class="text-center">
                    <i class="fas fa-chart-line text-3xl text-gray-300 mb-2"></i>
                    <p class="text-sm text-gray-400">图表占位区域</p>
                    <p class="text-xs text-gray-400">建议集成 ECharts 等图表库</p>
                </div>
            </div>
        </div>
        <div class="tos-card">
            <div class="tos-card__title">品类分布</div>
            <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div class="text-center">
                    <i class="fas fa-chart-pie text-3xl text-gray-300 mb-2"></i>
                    <p class="text-sm text-gray-400">图表占位区域</p>
                    <p class="text-xs text-gray-400">建议集成 ECharts 等图表库</p>
                </div>
            </div>
        </div>
    </div>
    
    <!-- 最新订单列表 -->
    <div class="tos-card">
        <div class="tos-card__title flex justify-between items-center">
            <span>最新订单</span>
            <a href="#" class="tos-link text-sm">查看全部 <i class="fas fa-arrow-right ml-1"></i></a>
        </div>
        <table class="tos-table">
            <thead>
                <tr>
                    <th>订单号</th>
                    <th>客户</th>
                    <th>金额</th>
                    <th>状态</th>
                    <th>时间</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in recentOrders" :key="order.id">
                    <td>{{ order.id }}</td>
                    <td>{{ order.customer }}</td>
                    <td>¥{{ order.amount }}</td>
                    <td><span class="tag" :class="getStatusClass(order.status)">{{ order.status }}</span></td>
                    <td>{{ order.time }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
```

### Vue 数据示例

```javascript
const { createApp, ref } = Vue;

createApp({
    setup() {
        const timeRange = ref('week');
        
        const kpiList = ref([
            { name: '总销售额', value: '¥128,430', trend: 12.5, icon: 'fas fa-chart-simple' },
            { name: '订单量', value: '1,284', trend: 8.2, icon: 'fas fa-shopping-cart' },
            { name: '用户数', value: '3,842', trend: -2.1, icon: 'fas fa-users' },
            { name: '转化率', value: '24.8%', trend: 3.6, icon: 'fas fa-percent' }
        ]);
        
        const recentOrders = ref([
            { id: 'ORD-001', customer: '张明', amount: 299, status: '已完成', time: '2026-05-29' },
            { id: 'ORD-002', customer: '李芳', amount: 159, status: '进行中', time: '2026-05-29' },
            { id: 'ORD-003', customer: '王强', amount: 89, status: '待支付', time: '2026-05-28' }
        ]);
        
        const getStatusClass = (status) => {
            const map = { '已完成': 'tag-success', '进行中': 'tag-warning', '待支付': 'tag-default' };
            return map[status] || 'tag-default';
        };
        
        return { timeRange, kpiList, recentOrders, getStatusClass };
    }
}).mount('#app');
```

---

## 5. 弹窗模板

### 确认弹窗

```html
<div v-if="confirmVisible" class="modal-overlay" @click.self="confirmVisible = false">
    <div class="modal-container modal-container--small">
        <div class="modal-header">
            <h3>确认操作</h3>
            <button class="modal-close" @click="confirmVisible = false">×</button>
        </div>
        <div class="modal-body text-center">
            <i class="fas fa-exclamation-triangle text-2xl text-warning mb-3"></i>
            <p>确定要执行此操作吗？</p>
            <p class="text-xs text-gray-400 mt-1">此操作不可撤销</p>
        </div>
        <div class="modal-footer">
            <button class="btn-secondary" @click="confirmVisible = false">取消</button>
            <button class="btn-primary" @click="handleConfirm">确认</button>
        </div>
    </div>
</div>
```

### 表单弹窗

```html
<div v-if="formVisible" class="modal-overlay" @click.self="formVisible = false">
    <div class="modal-container">
        <div class="modal-header">
            <h3>{{ modalTitle }}</h3>
            <button class="modal-close" @click="formVisible = false">×</button>
        </div>
        <div class="modal-body">
            <div class="space-y-4">
                <div>
                    <label class="form-label">字段1</label>
                    <input type="text" v-model="formData.field1" class="form-input">
                </div>
                <div>
                    <label class="form-label">字段2</label>
                    <select v-model="formData.field2" class="form-select">
                        <option value="">请选择</option>
                        <option value="1">选项1</option>
                        <option value="2">选项2</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn-secondary" @click="formVisible = false">取消</button>
            <button class="btn-primary" @click="submitForm">提交</button>
        </div>
    </div>
</div>
```

---

## 6. 骨架屏加载模板

```html
<!-- 列表页骨架屏 -->
<div v-if="loading" class="tos-card">
    <div class="skeleton-card">
        <div class="skeleton-line skeleton-line--lg mb-4"></div>
        <div class="skeleton-line" v-for="i in 5" :key="i"></div>
    </div>
</div>

<!-- 卡片骨架屏 -->
<div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
    <div v-for="i in 4" :key="i" class="tos-card">
        <div class="skeleton-line w-24 h-4 mb-3"></div>
        <div class="skeleton-line w-16 h-8 mb-2"></div>
        <div class="skeleton-line w-20 h-3"></div>
    </div>
</div>
```

---

## 7. 空状态模板

```html
<div class="empty-state">
    <div class="empty-state__icon">
        <i class="fas fa-inbox"></i>
    </div>
    <div class="empty-state__title">暂无数据</div>
    <div class="empty-state__description">当前列表为空，请点击下方按钮添加</div>
    <div class="empty-state__action">
        <button class="btn-primary">+ 新增数据</button>
    </div>
</div>
```

---

## 页面组件引入清单

生成页面时，按需引入以下组件和样式：

| 页面类型 | 必需组件 | 可选组件 |
|----------|----------|----------|
| 列表页 | 卡片、表格、分页、按钮、表单输入 | 弹窗、标签 |
| 表单页 | 卡片、表单输入、按钮、折叠面板 | 弹窗、选择器 |
| 详情页 | 卡片、按钮、标签 | 面包屑、表格 |
| 看板页 | 卡片、按钮、表格 | 图表占位、标签 |

---

## 响应式适配

所有页面模板默认适配移动端：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

使用 Tailwind 响应式前缀：
- `md:` → 平板及以上
- `lg:` → 桌面及以上
- 无前缀 → 移动端默认样式
```

---

这是 `references/page-templates.md` 文件。需要我继续生成 `references/component-examples.html` 吗？

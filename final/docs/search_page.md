# 搜索页面（search.html）文档

## 1. 创新特点

1. 实时搜索体验
   - 输入即搜索功能
   - 搜索建议智能提示
   - 历史搜索记录

2. 高级筛选功能
   - 多维度筛选条件
   - 自定义排序选项
   - 价格区间选择

3. 结果展示优化
   - 瀑布流布局
   - 懒加载优化
   - 动态加载更多

4. 交互体验提升
   - 搜索框自动聚焦
   - 加载状态反馈
   - 空结果优化提示

## 2. 核心功能实现

### 2.1 搜索框组件

#### 实现思路
搜索框需要支持实时搜索、搜索建议和历史记录功能。使用防抖处理输入事件,通过本地存储管理搜索历史。

```html
<!-- 搜索框组件实现 -->
<div class="search-container">
    <!-- 搜索输入框 -->
    <el-input
        ref="searchInput"
        v-model="searchQuery"
        placeholder="搜索目的地/攻略/酒店"
        @input="handleInput"
        @keyup.enter.native="handleSearch"
        clearable>
        <template #prefix>
            <i class="el-icon-search"></i>
        </template>
    </el-input>
    
    <!-- 搜索建议下拉框 -->
    <div class="search-suggestions" v-show="showSuggestions">
        <!-- 搜索历史 -->
        <div class="search-history" v-if="searchHistory.length">
            <div class="history-header">
                <span>搜索历史</span>
                <el-button type="text" @click="clearHistory">
                    清空历史
                </el-button>
            </div>
            <div class="history-list">
                <div v-for="item in searchHistory" 
                     :key="item"
                     class="history-item"
                     @click="useHistoryItem(item)">
                    <i class="el-icon-time"></i>
                    <span>{{ item }}</span>
                </div>
            </div>
        </div>
        
        <!-- 搜索建议 -->
        <div class="suggestions-list" v-if="suggestions.length">
            <div v-for="item in suggestions" 
                 :key="item.id"
                 class="suggestion-item"
                 @click="useSuggestion(item)">
                <i :class="item.icon"></i>
                <div class="suggestion-content">
                    <div class="suggestion-title">{{ item.title }}</div>
                    <div class="suggestion-desc">{{ item.description }}</div>
                </div>
            </div>
        </div>
    </div>
</div>
```

```css
/* 搜索框样式实现 */
.search-container {
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
}

/* 搜索建议框样式 */
.search-suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

/* 搜索历史样式 */
.search-history {
    padding: 12px 0;
    border-bottom: 1px solid #eee;
}

.history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    margin-bottom: 8px;
}

.history-item {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.history-item:hover {
    background-color: #f5f7fa;
}

/* 搜索建议项样式 */
.suggestion-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.suggestion-item:hover {
    background-color: #f5f7fa;
}

.suggestion-content {
    margin-left: 12px;
}

.suggestion-title {
    font-size: 14px;
    color: #303133;
}

.suggestion-desc {
    font-size: 12px;
    color: #909399;
    margin-top: 4px;
}
```

```javascript
// 搜索框逻辑实现
export default {
    data() {
        return {
            searchQuery: '',
            showSuggestions: false,
            searchHistory: [],
            suggestions: [],
            // 防抖定时器
            searchTimer: null
        }
    },
    
    created() {
        // 从本地存储加载搜索历史
        this.loadSearchHistory()
    },
    
    mounted() {
        // 自动聚焦搜索框
        this.$refs.searchInput.focus()
        // 添加点击外部关闭建议框事件
        document.addEventListener('click', this.handleClickOutside)
    },
    
    methods: {
        // 处理输入事件（防抖）
        handleInput() {
            if (this.searchTimer) {
                clearTimeout(this.searchTimer)
            }
            
            this.searchTimer = setTimeout(() => {
                if (this.searchQuery.trim()) {
                    this.fetchSuggestions()
                }
                this.showSuggestions = true
            }, 300)
        },
        
        // 获取搜索建议
        async fetchSuggestions() {
            try {
                const response = await this.searchService.getSuggestions(this.searchQuery)
                this.suggestions = response.data
            } catch (error) {
                console.error('获取搜索建议失败:', error)
                this.$message.error('获取搜索建议失败')
            }
        },
        
        // 使用历史记录项
        useHistoryItem(item) {
            this.searchQuery = item
            this.handleSearch()
        },
        
        // 使用搜索建议
        useSuggestion(item) {
            this.searchQuery = item.title
            this.handleSearch()
        },
        
        // 执行搜索
        handleSearch() {
            if (!this.searchQuery.trim()) return
            
            // 保存到搜索历史
            this.saveToHistory(this.searchQuery)
            // 关闭建议框
            this.showSuggestions = false
            // 触发搜索事件
            this.$emit('search', this.searchQuery)
        },
        
        // 加载搜索历史
        loadSearchHistory() {
            const history = localStorage.getItem('searchHistory')
            this.searchHistory = history ? JSON.parse(history) : []
        },
        
        // 保存搜索历史
        saveToHistory(query) {
            const index = this.searchHistory.indexOf(query)
            if (index > -1) {
                this.searchHistory.splice(index, 1)
            }
            this.searchHistory.unshift(query)
            // 限制历史记录数量
            if (this.searchHistory.length > 10) {
                this.searchHistory.pop()
            }
            // 保存到本地存储
            localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
        },
        
        // 清空搜索历史
        clearHistory() {
            this.searchHistory = []
            localStorage.removeItem('searchHistory')
        },
        
        // 处理点击外部事件
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.showSuggestions = false
            }
        }
    },
    
    beforeDestroy() {
        // 移除事件监听
        document.removeEventListener('click', this.handleClickOutside)
    }
}
```

### 2.2 搜索结果组件

#### 实现思路
搜索结果采用瀑布流布局展示,支持无限滚动加载。使用虚拟滚动优化大量数据的渲染性能。

```html
<!-- 搜索结果组件实现 -->
<div class="search-results">
    <!-- 筛选器 -->
    <div class="filter-section">
        <el-form :inline="true" :model="filterForm">
            <!-- 分类筛选 -->
            <el-form-item label="分类">
                <el-select v-model="filterForm.category" 
                          placeholder="选择分类"
                          @change="handleFilter">
                    <el-option v-for="item in categories"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            
            <!-- 排序方式 -->
            <el-form-item label="排序">
                <el-select v-model="filterForm.sort"
                          placeholder="排序方式"
                          @change="handleFilter">
                    <el-option v-for="item in sortOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            
            <!-- 价格区间 -->
            <el-form-item label="价格">
                <el-slider v-model="filterForm.priceRange"
                          range
                          :min="0"
                          :max="10000"
                          @change="handleFilter">
                </el-slider>
            </el-form-item>
        </el-form>
    </div>
    
    <!-- 结果列表 -->
    <div class="results-container" 
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
        <!-- 瀑布流布局 -->
        <div class="waterfall-wrapper">
            <div v-for="item in searchResults"
                 :key="item.id"
                 class="result-item"
                 :style="{ height: item.height + 'px' }">
                <div class="item-content">
                    <!-- 图片懒加载 -->
                    <el-image :src="item.image"
                             :lazy="true"
                             fit="cover">
                        <template #placeholder>
                            <div class="image-placeholder">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </template>
                    </el-image>
                    
                    <div class="item-info">
                        <h3 class="item-title">{{ item.title }}</h3>
                        <p class="item-desc">{{ item.description }}</p>
                        <div class="item-meta">
                            <span class="price">¥{{ item.price }}</span>
                            <span class="rating">
                                <i class="el-icon-star-on"></i>
                                {{ item.rating }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 加载状态 -->
        <div class="loading-status">
            <el-spinner v-if="loading"></el-spinner>
            <p v-else-if="noMore">没有更多数据了</p>
        </div>
    </div>
</div>
```

```css
/* 搜索结果样式 */
.search-results {
    padding: 20px;
}

/* 筛选器样式 */
.filter-section {
    margin-bottom: 20px;
    padding: 16px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

/* 瀑布流布局 */
.waterfall-wrapper {
    column-count: 4;
    column-gap: 20px;
}

@media screen and (max-width: 1200px) {
    .waterfall-wrapper {
        column-count: 3;
    }
}

@media screen and (max-width: 992px) {
    .waterfall-wrapper {
        column-count: 2;
    }
}

@media screen and (max-width: 768px) {
    .waterfall-wrapper {
        column-count: 1;
    }
}

/* 结果项样式 */
.result-item {
    break-inside: avoid;
    margin-bottom: 20px;
}

.item-content {
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
}

.item-content:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.item-info {
    padding: 16px;
}

.item-title {
    font-size: 16px;
    color: #303133;
    margin: 0 0 8px;
}

.item-desc {
    font-size: 14px;
    color: #606266;
    margin: 0 0 12px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.item-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.price {
    color: #f56c6c;
    font-size: 18px;
    font-weight: bold;
}

.rating {
    color: #e6a23c;
}

/* 加载状态样式 */
.loading-status {
    text-align: center;
    padding: 20px 0;
    color: #909399;
}
```

```javascript
// 搜索结果逻辑实现
export default {
    data() {
        return {
            // 筛选表单
            filterForm: {
                category: '',
                sort: 'default',
                priceRange: [0, 10000]
            },
            // 分类选项
            categories: [
                { label: '全部', value: '' },
                { label: '景点', value: 'attraction' },
                { label: '酒店', value: 'hotel' },
                { label: '美食', value: 'food' }
            ],
            // 排序选项
            sortOptions: [
                { label: '默认排序', value: 'default' },
                { label: '价格从低到高', value: 'price-asc' },
                { label: '价格从高到低', value: 'price-desc' },
                { label: '评分从高到低', value: 'rating-desc' }
            ],
            // 搜索结果
            searchResults: [],
            // 分页参数
            page: 1,
            pageSize: 20,
            // 状态标记
            loading: false,
            noMore: false
        }
    },
    
    methods: {
        // 处理筛选条件变化
        handleFilter() {
            this.page = 1
            this.searchResults = []
            this.noMore = false
            this.fetchResults()
        },
        
        // 加载更多数据
        async loadMore() {
            if (this.loading || this.noMore) return
            
            this.loading = true
            try {
                const params = {
                    page: this.page,
                    pageSize: this.pageSize,
                    ...this.filterForm
                }
                
                const response = await this.searchService.getResults(params)
                const { data, total } = response
                
                // 添加随机高度实现瀑布流
                data.forEach(item => {
                    item.height = Math.floor(Math.random() * 100) + 200
                })
                
                this.searchResults.push(...data)
                this.page++
                
                // 判断是否还有更多数据
                if (this.searchResults.length >= total) {
                    this.noMore = true
                }
            } catch (error) {
                console.error('加载搜索结果失败:', error)
                this.$message.error('加载失败，请重试')
            } finally {
                this.loading = false
            }
        },
        
        // 初始化瀑布流布局
        initWaterfall() {
            // 监听窗口大小变化
            window.addEventListener('resize', this.handleResize)
        },
        
        // 处理窗口大小变化
        handleResize() {
            // 重新计算布局
            this.$nextTick(() => {
                // 触发重排
                this.searchResults = [...this.searchResults]
            })
        }
    },
    
    mounted() {
        this.initWaterfall()
        this.fetchResults()
    },
    
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize)
    }
}
```

[继续编写其他功能模块的实现...] 
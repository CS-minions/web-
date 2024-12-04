Vue.use(ELEMENT);

new Vue({
    el: '#searchApp',
    data() {
        return {
            searchQuery: '',
            searchSuggestions: [],
            showSuggestions: false,
            loading: false,
            currentPage: 1,
            pageSize: 10,
            totalResults: 0,
            sortBy: 'relevance',
            filters: {
                type: 'all',
                rating: 0,
                priceRange: [0, 10000],
                facilities: []
            },
            facilityOptions: [
                { value: 'wifi', label: '免费WiFi' },
                { value: 'parking', label: '停车场' },
                { value: 'restaurant', label: '餐厅' },
                { value: 'pool', label: '游泳池' },
                { value: 'gym', label: '健身房' },
                { value: 'spa', label: 'SPA' }
            ],
            hotSearches: [
                '故宫博物院',
                '五星级酒店',
                '美食攻略',
                '亲子游玩',
                '周边游',
                '特色民宿'
            ],
            userLocation: null,
            weatherInfo: null,
            recommendations: [],
            searchHistory: [],
            favorites: [],
            results: [],
            crowdData: {
                1: { level: 'low', wait: '5分钟' },
                4: { level: 'medium', wait: '15分钟' },
                6: { level: 'high', wait: '30分钟' }
            },
            specialEvents: [
                {
                    id: 1,
                    title: '故宫夜游',
                    date: '2023-12-31',
                    description: '体验不一样的紫禁城夜景',
                    price: 200,
                    limitedQuota: true
                }
            ],
            searchChart: null,
            mockData: [
                {
                    id: 1,
                    type: 'destination',
                    title: '北京故宫',
                    description: '中国明清两代的皇家宫殿，世界上现存规模最大、保存最完整的木质结构古建筑之一。',
                    image: 'https://images.unsplash.com/photo-1680537012007-35f071696b4f?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    rating: 4.8,
                    tags: ['文化遗产', '古建筑', '博物馆'],
                    price: null,
                    location: { lat: 39.9163, lng: 116.3972 }
                },
                {
                    id: 2,
                    type: 'hotel',
                    title: '北京丽思卡尔顿酒店',
                    description: '位于北京金融街的奢华五星级酒店，提供顶级住宿体验和完善的配套设施。',
                    image: 'https://images.unsplash.com/photo-1455587734955-081b22074882',
                    rating: 4.9,
                    tags: ['奢华', '商务', '五星级'],
                    price: 2888,
                    location: { lat: 39.9054, lng: 116.3586 },
                    facilities: ['wifi', 'parking', 'restaurant', 'pool', 'gym', 'spa']
                },
                {
                    id: 4,
                    type: 'destination',
                    title: '颐和园',
                    description: '中国清代的皇家园林，是保存最完整的皇家行宫御苑，被誉为"皇家园林博物馆"。',
                    image: 'https://images.unsplash.com/photo-1680175529560-c251b911e1e9?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    rating: 4.7,
                    tags: ['园林', '文化遗产', '自然风光'],
                    price: null,
                    location: { lat: 39.9988, lng: 116.2751 }
                },
                {
                    id: 5,
                    type: 'hotel',
                    title: '北京瑰丽酒店',
                    description: '位于北京市中心的现代奢华酒店，融合传统与现代设计元素。',
                    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
                    rating: 4.8,
                    tags: ['奢华', '设计', '五星级'],
                    price: 2388,
                    location: { lat: 39.9146, lng: 116.4081 },
                    facilities: ['wifi', 'parking', 'restaurant', 'pool', 'gym', 'spa']
                },
                {
                    id: 6,
                    type: 'destination',
                    title: '长城',
                    description: '世界文化遗产，是中国古代伟大的防御工程，也是世界上最长的城墙。',
                    image: 'https://plus.unsplash.com/premium_photo-1664304492320-8359efcaad38?q=80&w=3866&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    rating: 4.9,
                    tags: ['世界遗产', '历史', '自然风光'],
                    price: null,
                    location: { lat: 40.4319, lng: 116.5704 }
                },
                {
                    id: 21,
                    type: 'destination',
                    title: '上海外滩',
                    description: '上海最著名的地标之一，汇集了各种风格的建筑群，是欣赏黄浦江夜景的最佳地点。',
                    image: 'https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    rating: 4.8,
                    tags: ['地标', '建筑', '景'],
                    price: null,
                    location: { lat: 31.2304, lng: 121.4737 }
                },
                {
                    id: 22,
                    type: 'hotel',
                    title: '上海和平饭店',
                    description: '位于外滩的传奇酒店，是上海近代建筑的典范，拥有近百年历史。',
                    image: 'https://media.gettyimages.com/id/2150094840/photo/u-s-secretary-of-state-antony-blinken-visits-shanghai.jpg?s=2048x2048&w=gi&k=20&c=15CHqqcYpwVgyCyoaKvD6mjuxPxse-kOXOfLHtI_iMQ=',
                    rating: 4.9,
                    tags: ['历史', '奢华', '地标'],
                    price: 2688,
                    location: { lat: 31.2336, lng: 121.4875 },
                    facilities: ['wifi', 'parking', 'restaurant', 'pool', 'gym']
                },
                {
                    id: 24,
                    type: 'destination',
                    title: '兵马俑博物馆',
                    description: '世界第八大奇迹，秦始皇陵兵马俑博物馆展示了气势恢宏的古代军阵。',
                    image: 'https://images.unsplash.com/photo-1601024445121-e294d1c73b37',
                    rating: 4.9,
                    tags: ['文化遗产', '历史', '博物馆'],
                    price: null,
                    location: { lat: 34.3844, lng: 109.2783 }
                },
                {
                    id: 25,
                    type: 'hotel',
                    title: '西安盛美利亚酒店',
                    description: '位于大雁塔附近的奢华酒店，融合现代设计与唐代文化元素。',
                    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
                    rating: 4.7,
                    tags: ['奢华', '文化', '五星级'],
                    price: 1588,
                    location: { lat: 34.2268, lng: 108.9471 },
                    facilities: ['wifi', 'parking', 'restaurant', 'pool', 'gym', 'spa']
                },
                {
                    id: 27,
                    type: 'destination',
                    title: '成都大熊猫繁育研究基地',
                    description: '世界著名的大熊猫保护和研究机构，可以近距离观察大熊猫的日常生活。',
                    image: 'https://images.unsplash.com/photo-1593069567131-53a0614dde1d',
                    rating: 4.8,
                    tags: ['自然', '动物', '科普'],
                    price: null,
                    location: { lat: 30.7333, lng: 104.1417 }
                },
                {
                    id: 28,
                    type: 'hotel',
                    title: '成都温江皇冠假日酒店',
                    description: '坐落于温江区的豪华度假酒店，环境优美，服务一流。',
                    image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974',
                    rating: 4.6,
                    tags: ['度假', '商务', '五星级'],
                    price: 988,
                    location: { lat: 30.6832, lng: 103.8666 },
                    facilities: ['wifi', 'parking', 'restaurant', 'pool', 'gym']
                },
                {
                    id: 30,
                    type: 'destination',
                    title: '广州塔',
                    description: '广州地标建筑，又称小蛮腰，是世界第二高的塔式建筑。',
                    image: 'https://images.unsplash.com/photo-1577196582926-0c288d14db00',
                    rating: 4.7,
                    tags: ['地标', '现代', '夜景'],
                    price: null,
                    location: { lat: 23.1066, lng: 113.3214 }
                },
                {
                    id: 31,
                    type: 'hotel',
                    title: '广州文华东方酒店',
                    description: '位于珠江新城的顶级奢华酒店，尽览珠江美景。',
                    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
                    rating: 4.8,
                    tags: ['奢华', '商务', '江景'],
                    price: 2188,
                    location: { lat: 23.1193, lng: 113.3207 },
                    facilities: ['wifi', 'parking', 'restaurant', 'pool', 'gym', 'spa']
                },
                {
                    id: 33,
                    type: 'destination',
                    title: '西湖',
                    description: '中国十大风景名胜之一，湖光山色，美不胜收。',
                    image: 'https://images.unsplash.com/photo-1599631600624-27b8e72cc8c3',
                    rating: 4.9,
                    tags: ['自然', '文化', '景区'],
                    price: null,
                    location: { lat: 30.2587, lng: 120.1445 }
                },
                {
                    id: 34,
                    type: 'hotel',
                    title: '杭州柏悦酒店',
                    description: '位于钱江新城的奢华酒店，将现代奢华与江南韵味完美融合。',
                    image: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972',
                    rating: 4.8,
                    tags: ['奢华', '江景', '设计'],
                    price: 2388,
                    location: { lat: 30.2589, lng: 120.2052 },
                    facilities: ['wifi', 'parking', 'restaurant', 'pool', 'gym', 'spa']
                }
            ]
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalResults / this.pageSize);
        },
        resultsWithDistance() {
            if (!this.userLocation) return this.results;
            return this.results.map(item => ({
                ...item,
                distance: this.calculateDistance(this.userLocation, item.location)
            }));
        },
        weatherSuggestions() {
            if (!this.weatherInfo) return null;
            return this.generateWeatherSuggestions(this.weatherInfo);
        }
    },
    methods: {
        // 检查是否收藏
        isFavorite(itemId) {
            const favorites = JSON.parse(localStorage.getItem('userFavorites') || '[]');
            return favorites.some(item => item.id === itemId);
        },

        // 从历史记录中移除
        removeFromHistory(query) {
            this.searchHistory = this.searchHistory.filter(item => item !== query);
            localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
        },

        // 保存搜索历史
        saveSearchHistory(query) {
            if (!query) return;
            const history = new Set([query, ...this.searchHistory]);
            this.searchHistory = Array.from(history).slice(0, 10);
            localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
        },

        // 收藏功能
        toggleFavorite(item) {
            let favorites = JSON.parse(localStorage.getItem('userFavorites') || '[]');
            const index = favorites.findIndex(f => f.id === item.id);
            
            if (index === -1) {
                favorites.push({
                    ...item,
                    favoriteTime: new Date().toISOString(),
                    fromPage: 'search'
                });
                this.$message.success('已添加到收藏');
            } else {
                favorites.splice(index, 1);
                this.$message.success('已取消收藏');
            }
            localStorage.setItem('userFavorites', JSON.stringify(favorites));
            this.favorites = favorites; // 更新本地数据
        },

        // 获取实时人流量
        getCrowdLevel(itemId) {
            return this.crowdData[itemId] || { level: 'unknown', wait: '未知' };
        },

        // 检查特别活动
        checkSpecialEvents(itemId) {
            return this.specialEvents.filter(event => event.itemId === itemId);
        },

        // 处理搜索
        handleSearch() {
            if (!this.searchQuery.trim()) {
                this.$message.warning('请输入搜索内容');
                return;
            }
            
            this.loading = true;
            this.currentPage = 1;
            this.showSuggestions = false;
            
            // 保存搜索历史
            this.saveSearchHistory(this.searchQuery);
            
            // 模拟API请求
            setTimeout(() => {
                let filteredResults = this.mockData.filter(item => {
                    // 基本筛选逻辑
                    if (this.filters.type !== 'all' && item.type !== this.filters.type) return false;
                    if (this.searchQuery && !this.matchSearchQuery(item, this.searchQuery)) return false;
                    if (this.filters.rating > 0 && item.rating < this.filters.rating) return false;
                    
                    // 价格区间筛选
                    if (item.price !== null) {
                        if (item.price < this.filters.priceRange[0] || 
                            item.price > this.filters.priceRange[1]) return false;
                    }
                    
                    // 设施筛选
                    if (this.filters.facilities.length > 0 && item.type === 'hotel') {
                        if (!this.matchFacilities(item, this.filters.facilities)) return false;
                    }

                    return true;
                });

                // 排序处理
                filteredResults = this.sortResults(filteredResults);

                this.results = filteredResults;
                this.totalResults = filteredResults.length;
                this.loading = false;
                
                // 更新统计图表
                this.updateSearchStats();
                
                // 生成推荐
                this.generateRecommendations();
            }, 300);
        },

        // 清空搜索
        clearSearch() {
            this.searchQuery = '';
            this.showSuggestions = false;
            this.searchSuggestions = [];
        },

        // 处理输入变化
        handleInput() {
            this.getSuggestions(this.searchQuery);
        },

        // 选择建议
        selectSuggestion(suggestion) {
            this.searchQuery = suggestion;
            this.showSuggestions = false;
            this.handleSearch();
        },

        // 获取搜索建议
        getSuggestions(query) {
            if (!query) {
                this.searchSuggestions = [];
                this.showSuggestions = false;
                return;
            }

            const searchText = query.toLowerCase();
            const suggestions = new Set();

            // 从历史记录中获取建议
            this.searchHistory.forEach(history => {
                if (history.toLowerCase().includes(searchText)) {
                    suggestions.add(history);
                }
            });

            // 从热门搜索中获取建议
            this.hotSearches.forEach(hot => {
                if (hot.toLowerCase().includes(searchText)) {
                    suggestions.add(hot);
                }
            });

            // 从数据中获取建议
            this.mockData.forEach(item => {
                if (item.title.toLowerCase().includes(searchText)) {
                    suggestions.add(item.title);
                }
                item.tags.forEach(tag => {
                    if (tag.toLowerCase().includes(searchText)) {
                        suggestions.add(tag);
                    }
                });
            });

            this.searchSuggestions = Array.from(suggestions).slice(0, 8);
            this.showSuggestions = this.searchSuggestions.length > 0;
        },

        // 搜索文本匹配
        matchSearchQuery(item, query) {
            const searchText = query.toLowerCase();
            return (
                item.title.toLowerCase().includes(searchText) ||
                item.description.toLowerCase().includes(searchText) ||
                item.tags.some(tag => tag.toLowerCase().includes(searchText))
            );
        },

        // 设施匹配
        matchFacilities(item, facilities) {
            return facilities.every(facility => 
                item.facilities && item.facilities.includes(facility)
            );
        },

        // 结果排序
        sortResults(results) {
            return results.sort((a, b) => {
                switch (this.sortBy) {
                    case 'rating':
                        return b.rating - a.rating;
                    case 'price-asc':
                        if (a.price === null) return 1;
                        if (b.price === null) return -1;
                        return a.price - b.price;
                    case 'price-desc':
                        if (a.price === null) return 1;
                        if (b.price === null) return -1;
                        return b.price - a.price;
                    case 'distance':
                        if (!this.userLocation) return 0;
                        return this.calculateDistance(this.userLocation, a.location) -
                               this.calculateDistance(this.userLocation, b.location);
                    default:
                        return 0;
                }
            });
        },

        // 计算距离
        calculateDistance(point1, point2) {
            if (!point1 || !point2) return Infinity;
            const R = 6371; // 地球半径（公里）
            const dLat = this.toRad(point2.lat - point1.lat);
            const dLon = this.toRad(point2.lng - point1.lng);
            const lat1 = this.toRad(point1.lat);
            const lat2 = this.toRad(point2.lat);

            const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            return R * c;
        },

        toRad(value) {
            return value * Math.PI / 180;
        },

        // 生成天气建议
        generateWeatherSuggestions(weather) {
            const suggestions = [];
            if (weather.rain > 50) {
                suggestions.push('建议选择室内景点');
            }
            if (weather.temperature > 30) {
                suggestions.push('注意防暑，建议携带遮阳伞');
            }
            return suggestions;
        },

        // 生成推荐
        generateRecommendations() {
            const recommendations = this.mockData.filter(item => {
                // 实现推荐算法
                return true;
            }).slice(0, 5);
            this.recommendations = recommendations;
        },

        // 获取类型文本
        getTypeText(type) {
            switch (type) {
                case 'destination':
                    return '地的';
                case 'hotel':
                    return '酒店';
                case 'guide':
                    return '攻略';
                default:
                    return '其他';
            }
        },

        // 获取类型样式
        getTypeClass(type) {
            return type;
        },

        // 处理分页
        handlePageChange(page) {
            if (page < 1 || page > this.totalPages) return;
            this.currentPage = page;
            this.handleSearch();
        },

        // 处理窗口大��变化
        handleResize() {
            if (this.searchChart) {
                this.searchChart.resize();
            }
        },

        // 初始化搜索统计图表
        initSearchStats() {
            this.searchChart = echarts.init(document.getElementById('searchStats'));
            this.updateSearchStats();
        },

        // 更新搜索统计图表
        updateSearchStats() {
            if (!this.searchChart) return;

            const typeStats = {
                destination: 0,
                hotel: 0,
                guide: 0
            };

            this.results.forEach(item => {
                if (typeStats.hasOwnProperty(item.type)) {
                    typeStats[item.type]++;
                }
            });

            const option = {
                title: {
                    text: '搜索结果统计',
                    left: 'center',
                    textStyle: {
                        fontSize: 14
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['目的地', '酒店', '攻略']
                },
                series: [
                    {
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: typeStats.destination, name: '目的地' },
                            { value: typeStats.hotel, name: '酒店' },
                            { value: typeStats.guide, name: '攻略' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ],
                color: ['#409EFF', '#67C23A', '#E6A23C']
            };

            this.searchChart.setOption(option);
        },

        // 处理搜索框失焦
        handleSearchBlur() {
            // 延迟隐藏建议框，以便点击建议项可以触发
            setTimeout(() => {
                this.showSuggestions = false;
            }, 200);
        }
    },
    watch: {
        // 监听搜索输入
        searchQuery(val) {
            this.handleInput();
        },
        // 监听筛选条件变化
        filters: {
            deep: true,
            handler() {
                this.handleSearch();
            }
        },
        // 监听排序方式变化
        sortBy() {
            this.handleSearch();
        }
    },
    mounted() {
        // 获取用户位置
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                },
                error => {
                    console.error('获取位置失败:', error);
                }
            );
        }

        // 加载搜索历史
        const history = localStorage.getItem('searchHistory');
        if (history) {
            this.searchHistory = JSON.parse(history);
        }

        // 加载收藏夹
        const favorites = localStorage.getItem('userFavorites');
        if (favorites) {
            this.favorites = JSON.parse(favorites);
        }

        // 从URL获取搜索参数
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        if (query) {
            this.searchQuery = decodeURIComponent(query);
            this.handleSearch();
        }

        // 初始化图表
        this.$nextTick(() => {
            this.initSearchStats();
        });

        // 添加窗口大小变化监听
        window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
        // 移除窗口大小变化监听
        window.removeEventListener('resize', this.handleResize);
        // 销毁图表实例
        if (this.searchChart) {
            this.searchChart.dispose();
        }
    }
}); 
Vue.use(ELEMENT);

new Vue({
    el: '#app',
    data() {
        return {
            // 基础数据
            currentPath: 'home',
            isLoggedIn: false,
            username: '',
            userAvatar: '',
            currentUser: null,
            searchText: '',
            newsletterEmail: '',
            searchResults: [],
            destinations: [
                { value: '北京', link: 'pages/destination.html?id=1' },
                { value: '上海', link: 'pages/destination.html?id=2' },
                { value: '西安', link: 'pages/destination.html?id=3' },
                { value: '成都', link: 'pages/destination.html?id=4' }
            ],
            
            // 数据统计
            statistics: [
                {
                    id: 1,
                    icon: 'fas fa-map-marked-alt',
                    number: '1000',
                    label: '旅游目的地'
                },
                {
                    id: 2,
                    icon: 'fas fa-users',
                    number: '50000',
                    label: '注册用户'
                },
                {
                    id: 3,
                    icon: 'fas fa-route',
                    number: '2000',
                    label: '精选路线'
                },
                {
                    id: 4,
                    icon: 'fas fa-hotel',
                    number: '3000',
                    label: '合作酒店'
                }
            ],
            
            // 目的地数据
            featuredDestinations: [
                {
                    id: 1,
                    name: '北京',
                    description: '探索中国首都的历史文化',
                    image: 'https://picsum.photos/id/1033/800/600',
                    rating: 4.8,
                    visitCount: '12,345'
                },
                {
                    id: 2,
                    name: '上海',
                    description: '感受现代都市的繁华魅力',
                    image: 'https://picsum.photos/id/1042/800/600',
                    rating: 4.7,
                    visitCount: '10,234'
                },
                {
                    id: 3,
                    name: '西安',
                    description: '穿越千年古都时光',
                    image: 'https://picsum.photos/id/1052/800/600',
                    rating: 4.6,
                    visitCount: '8,765'
                },
                {
                    id: 4,
                    name: '成都',
                    description: '休闲慢生活的天堂',
                    image: 'https://picsum.photos/id/1047/800/600',
                    rating: 4.9,
                    visitCount: '9,876'
                }
            ],

            // 季节推荐数据
            seasonalRecommends: [
                {
                    id: 1,
                    title: '春季赏花',
                    description: '最佳赏花地推荐',
                    image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800'
                },
                {
                    id: 2,
                    title: '夏日清凉',
                    description: '避暑胜地推荐',
                    image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800'
                },
                {
                    id: 3,
                    title: '秋色宜人',
                    description: '最美赏秋地点',
                    image: 'https://images.unsplash.com/photo-1507371341162-763b5e419408?w=800'
                },
                {
                    id: 4,
                    title: '冬季温泉',
                    description: '温泉度假胜地',
                    image: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=800'
                }
            ],

            // 特色体验数据
            features: [
                {
                    id: 1,
                    icon: 'fas fa-mountain',
                    title: '自然探索',
                    description: '探索壮丽山川，感受大自然的鬼斧神工'
                },
                {
                    id: 2,
                    icon: 'fas fa-utensils',
                    title: '美食之旅',
                    description: '品尝地道美食，体验舌尖上的中国'
                },
                {
                    id: 3,
                    icon: 'fas fa-landmark',
                    title: '文化体验',
                    description: '探访历史古迹，感受传统文化魅力'
                }
            ],

            // 添加导航菜单配置
            menuItems: [
                {
                    key: 'home',
                    icon: 'fas fa-home',
                    text: '首页',
                    path: 'index.html'
                },
                {
                    key: 'guide',
                    icon: 'fas fa-map-marked-alt',
                    text: '旅游攻略',
                    path: 'pages/travel-guide.html'
                },
                {
                    key: 'booking',
                    icon: 'fas fa-calendar-check',
                    text: '预定',
                    path: 'pages/booking.html'
                }
            ],

            // 添加用户菜单配置
            userMenuItems: [
                {
                    key: 'profile',
                    icon: 'fas fa-user-circle',
                    text: '个人中心',
                    path: 'pages/user-center.html'
                },
                {
                    key: 'orders',
                    icon: 'fas fa-shopping-bag',
                    text: '我的订单',
                    path: 'pages/user-center.html?tab=orders'
                },
                {
                    key: 'favorites',
                    icon: 'fas fa-heart',
                    text: '我的收藏',
                    path: 'pages/user-center.html?tab=favorites'
                }
            ]
        }
    },
    methods: {
        // 处理搜索
        handleSearch() {
            if (this.searchText.trim()) {
                window.location.href = `pages/search.html?q=${encodeURIComponent(this.searchText.trim())}`;
            }
        },
        
        // 订阅功能
        subscribeNewsletter() {
            if (!this.newsletterEmail) {
                this.$message.warning('请输入邮箱地址');
                return;
            }
            if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(this.newsletterEmail)) {
                this.$message.error('请输入有效的邮箱地址');
                return;
            }
            this.$message.success('订阅成功感谢您的关注');
            this.newsletterEmail = '';
        },
        
        // 统一的登录状态检查方法
        checkLoginStatus() {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const userInfo = localStorage.getItem('userInfo');
            
            if (isLoggedIn && userInfo) {
                const user = JSON.parse(userInfo);
                this.isLoggedIn = true;
                this.username = user.username;
                this.userAvatar = user.avatar || 'assets/default-avatar.png';
            } else {
                this.isLoggedIn = false;
                this.username = '';
                this.userAvatar = '';
            }
        },
        
        // 导航理方法
        handleMenuClick(key) {
            console.log('点击菜单项:', key);
            // 首先检查是否是用户菜单项
            let menuItem = this.userMenuItems.find(item => item.key === key);
            if (!menuItem) {
                // 如果不是用户菜单项，则查找主导航菜单项
                menuItem = this.menuItems.find(item => item.key === key);
            }
            
            if (menuItem) {
                console.log('找到菜单项:', menuItem);
                // 用户菜单项都需要登录
                if (menuItem.key === 'profile' || menuItem.key === 'orders' || menuItem.key === 'favorites') {
                    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                    const userInfo = localStorage.getItem('userInfo');
                    
                    if (!isLoggedIn || !userInfo) {
                        this.$message.warning('请先登录');
                        localStorage.setItem('redirectPath', menuItem.path);
                        window.location.href = 'pages/login.html';
                        return;
                    }
                }
                
                // 获取当前页面的路径信息
                const currentPath = window.location.pathname;
                console.log('当前路径:', currentPath);
                
                // 构建目标路径
                let targetPath = menuItem.path;
                
                // 如果是用户中心相关的页面，添加对应的tab参数
                if (menuItem.key === 'orders' || menuItem.key === 'favorites') {
                    const baseUrl = targetPath.split('?')[0];
                    targetPath = `${baseUrl}?tab=${menuItem.key}`;
                }
                
                // 根据当前位置调整路径
                if (currentPath.includes('/pages/')) {
                    // 如果当前在pages目录下，需要添加../
                    targetPath = '../' + targetPath;
                } else if (!targetPath.startsWith('pages/') && targetPath !== 'index.html') {
                    // 如果在根目录，且目标不是index.html，需要添加pages/
                    targetPath = 'pages/' + targetPath;
                }
                
                console.log('跳转到:', targetPath);
                window.location.href = targetPath;
            }
        },
        
        // 登出方法
        logout() {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userInfo');
            this.isLoggedIn = false;
            this.username = '';
            this.userAvatar = '';
            this.$message.success('已退出登录');
            window.location.href = 'index.html';
        },
        
        // 目的地相关
        viewDestination(dest) {
            window.location.href = `pages/destination.html?id=${dest.id}`;
        },
        
        // 季节推荐相关
        viewSeasonal(item) {
            window.location.href = `pages/seasonal.html?id=${item.id}`;
        },

        // 滚动处理
        handleScroll() {
            const header = document.querySelector('.header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // 处理视差滚动
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector('.hero-section');
            if (heroSection && scrolled < window.innerHeight) {
                const scale = 1 + (scrolled * 0.0003);
                document.querySelector('.dynamic-bg').style.transform = `scale(${scale})`;
                const opacity = 1 - (scrolled / (window.innerHeight * 0.6));
                document.querySelector('.hero-content').style.opacity = Math.max(opacity, 0);
            }
        },

        // 图片处理
        handleImageLoad(e) {
            e.target.classList.add('image-loaded');
        },

        handleImageError(e) {
            const defaultImage = 'assets/images/default-placeholder.jpg';
            e.target.src = defaultImage;
        },

        // 修改登录按钮点击处理
        handleLogin() {
            window.location.href = 'pages/login.html';
        },

        handleCategorySelect(category) {
            // ...
        },

        // 搜索建议
        querySearchAsync(queryString, cb) {
            const results = queryString ? this.destinations.filter(item => {
                return item.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1
            }) : [];
            
            // 模拟异步请求
            setTimeout(() => {
                cb(results);
            }, 200);
        },

        // 选择搜索建议
        handleSelect(item) {
            window.location.href = item.link;
        }
    },
    mounted() {
        // 在页面加载时检查登录状态
        this.checkLoginStatus();
        
        // 添加登录状态变化监听
        window.addEventListener('storage', (e) => {
            if (e.key === 'isLoggedIn' || e.key === 'userInfo') {
                this.checkLoginStatus();
            }
        });

        // 设置当前路径
        const path = window.location.pathname;
        if (path.includes('travel-guide')) {
            this.currentPath = 'guide';
        } else if (path.includes('destinations')) {
            this.currentPath = 'destination';
        }
        
        // 添加滚监听
        window.addEventListener('scroll', this.handleScroll);
    },
    
    beforeDestroy() {
        // 移除滚动监听
        window.removeEventListener('scroll', this.handleScroll);
    }
}); 
Vue.use(ELEMENT);

new Vue({
    el: '#app',
    data() {
        return {
            currentSection: 'home',
            isLoggedIn: false,
            currentUser: null,
            
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
                    label: '��意用户'
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

            // 订阅相关
            newsletterEmail: ''
        }
    },
    methods: {
        showSection(key) {
            this.currentSection = key;
            switch(key) {
                case 'guides':
                    window.location.href = 'pages/guides.html';
                    break;
                case 'booking':
                    window.location.href = 'pages/booking.html';
                    break;
            }
        },
        
        // 订阅方法
        subscribeNewsletter() {
            if (!this.newsletterEmail) {
                this.$message.warning('请输入邮箱地址');
                return;
            }
            if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(this.newsletterEmail)) {
                this.$message.error('请输入有效的邮箱地址');
                return;
            }
            this.$message.success('订阅成功！感谢您的关注');
            this.newsletterEmail = '';
        },

        // 滚动效果
        handleScroll() {
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector('.hero-section');
            
            if (heroSection && scrolled < window.innerHeight) {
                const scale = 1 + (scrolled * 0.0003);
                document.querySelector('.dynamic-bg').style.transform = `scale(${scale})`;
                
                const opacity = 1 - (scrolled / (window.innerHeight * 0.6));
                document.querySelector('.hero-content').style.opacity = Math.max(opacity, 0);
            }
        },

        // 目的地卡片点击
        viewDestination(dest) {
            window.location.href = `pages/destination.html?id=${dest.id}`;
        },
        
        // 季节推荐点击
        viewSeasonal(item) {
            window.location.href = `pages/seasonal.html?id=${item.id}`;
        }
    },
    mounted() {
        // 检查登录状态
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const currentUser = localStorage.getItem('currentUser');
        if (isLoggedIn && currentUser) {
            this.isLoggedIn = true;
            this.currentUser = JSON.parse(currentUser);
        }
        
        // 添加滚动监听
        window.addEventListener('scroll', this.handleScroll);
        
        // 添加滚动提示点击事件
        const scrollHint = document.querySelector('.scroll-hint');
        if (scrollHint) {
            scrollHint.addEventListener('click', () => {
                window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
            });
        }
    },
    beforeDestroy() {
        // 移除滚动监听
        window.removeEventListener('scroll', this.handleScroll);
    }
}); 
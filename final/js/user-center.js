Vue.use(ELEMENT);

new Vue({
    el: '#userCenter',
    data() {
        return {
            activeMenu: 'profile',
            isProfileEditing: false,
            userInfo: {
                username: '',
                email: '',
                phone: '',
                avatar: ''
            },
            orders: [],
            favorites: [],
            history: [],
            isFavoritesLoading: false,
            selectedFavorites: [],
            isOrdersLoading: false,
            selectedOrders: [],
            isHistoryLoading: false
        };
    },

    created() {
        console.log('用户中心页面初始化');
        // 检查登录状态
        const loginResult = this.checkLoginStatus();
        console.log('登录状态检查结果:', loginResult);
        
        // 从URL参数中获取tab
        const urlParams = new URLSearchParams(window.location.search);
        const tab = urlParams.get('tab');
        console.log('URL中的tab参数:', tab);
        
        if (tab && ['profile', 'orders', 'favorites', 'history'].includes(tab)) {
            console.log('切换到标签页:', tab);
            this.activeMenu = tab;
        }

        // 加载数据
        this.loadUserData();
    },

    methods: {
        checkLoginStatus() {
            console.log('正在检查登录状态...');
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const userInfo = localStorage.getItem('userInfo');
            console.log('登录状态:', isLoggedIn);
            console.log('用户信息:', userInfo);
            
            if (!isLoggedIn || !userInfo) {
                console.log('用户未登录，准备跳转到登录页面');
                this.$message.error('请先登录');
                setTimeout(() => {
                    window.location.href = './login.html';
                }, 1500);
                return false;
            }

            // 加载用户信息
            const user = JSON.parse(userInfo);
            this.userInfo = {
                username: user.username,
                email: user.email || '',
                phone: user.phone || '',
                avatar: user.avatar || 'assets/default-avatar.png'
            };
            console.log('已加载用户信息:', this.userInfo);
            return true;
        },

        loadUserData() {
            console.log('开始加载用户数据，当前标签页:', this.activeMenu);
            if (!this.checkLoginStatus()) return;
            
            // 根据当前标签页加载相应数据
            switch (this.activeMenu) {
                case 'orders':
                    this.loadOrders();
                    break;
                case 'favorites':
                    this.loadFavorites();
                    break;
                case 'history':
                    this.loadHistory();
                    break;
            }
        },

        // 处理菜单切换
        handleMenuSelect(key) {
            console.log('菜单切换:', key);
            this.activeMenu = key;
            this.loadUserData();
            
            // 更新URL，但不刷新页面
            const url = new URL(window.location.href);
            url.searchParams.set('tab', key);
            window.history.pushState({}, '', url);
            console.log('URL已更新:', url.toString());
        },

        loadOrders() {
            console.log('加载订单数据...');
            this.isOrdersLoading = true;
            // 从 localStorage 获取订单数据
            const savedOrders = localStorage.getItem('userOrders');
            console.log('已保存的订单数据:', savedOrders);
            if (savedOrders) {
                this.orders = JSON.parse(savedOrders);
            } else {
                this.orders = []; // 如果没有订单数据，设置为空数组
            }
            console.log('当前订单数据:', this.orders);
            this.isOrdersLoading = false;
        },

        loadFavorites() {
            this.isFavoritesLoading = true;
            const favorites = JSON.parse(localStorage.getItem('userFavorites') || '[]');
            this.favorites = favorites.map(item => ({
                ...item,
                typeText: this.getTypeText(item.type),
                dateText: this.formatDate(item.favoriteTime),
                sourceText: this.getSourceText(item.fromPage)
            }));
            this.isFavoritesLoading = false;
        },

        loadHistory() {
            console.log('加载历史数据...');
            this.isHistoryLoading = true;
            // 从 localStorage 获取浏览历史
            const savedHistory = localStorage.getItem('userHistory');
            console.log('已保存的历史数据:', savedHistory);
            if (savedHistory) {
                this.history = JSON.parse(savedHistory);
            } else {
                this.history = []; // 如果没有历史数据，设置为空数组
            }
            console.log('当前历史数据:', this.history);
            this.isHistoryLoading = false;
        },

        // 返回首页
        goToHome() {
            console.log('返回首页');
            window.location.href = '../index.html';
        },

        // 退出登录
        logout() {
            console.log('执行退出登录');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userInfo');
            this.$message.success('已退出登录');
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1500);
        },

        // 个人资料相关方法
        startEditProfile() {
            console.log('开始编辑个人资料');
            this.isProfileEditing = true;
        },

        saveProfile() {
            console.log('保存个人资料');
            // 保存用户信息
            const userInfo = {
                ...JSON.parse(localStorage.getItem('userInfo')),
                ...this.userInfo
            };
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            console.log('已保存的用户信息:', userInfo);
            
            this.$message.success('保存成功');
            this.isProfileEditing = false;
        },

        cancelProfileEdit() {
            console.log('取消编辑个人资料');
            this.isProfileEditing = false;
            this.checkLoginStatus(); // 重新加载用户信息
        },

        // 订单相关方法
        handleTableSelectionChange(selection) {
            console.log('表格选择变化:', selection);
            if (this.activeMenu === 'orders') {
                this.selectedOrders = selection.map(order => order.id);
            } else if (this.activeMenu === 'favorites') {
                this.selectedFavorites = selection.map(favorite => favorite.id);
            }
            console.log('已选择的项目:', this.activeMenu === 'orders' ? this.selectedOrders : this.selectedFavorites);
        },

        deleteSelectedOrders() {
            console.log('删除选中的订单:', this.selectedOrders);
            if (this.selectedOrders.length === 0) {
                this.$message.warning('请选择要删除的订单');
                return;
            }

            this.$confirm('确定要删除选中的订单吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 过滤掉被选中的订单
                this.orders = this.orders.filter(order => !this.selectedOrders.includes(order.id));
                // 更新localStorage
                localStorage.setItem('userOrders', JSON.stringify(this.orders));
                this.$message.success('删除成功');
                this.selectedOrders = [];
                console.log('订单删除后的数据:', this.orders);
            }).catch(() => {});
        },

        viewOrder(order) {
            console.log('查看订单详情:', order);
            this.$alert(`
                <div class="order-details">
                    <h3>订单详情</h3>
                    <p><strong>订单号：</strong>${order.id}</p>
                    <p><strong>下单时间：</strong>${order.date}</p>
                    <p><strong>订单金额：</strong>¥${order.amount}</p>
                    <p><strong>订单状态：</strong>${order.status}</p>
                </div>
            `, '订单详情', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: '确定'
            });
        },

        cancelOrder(order) {
            console.log('取消订单:', order);
            this.$confirm('确定要取消该订单吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                order.status = '已取消';
                localStorage.setItem('userOrders', JSON.stringify(this.orders));
                this.$message.success('订单已取消');
                console.log('订单已更新:', order);
            }).catch(() => {});
        },

        // 收藏相关方法
        handleFavoritesOperation(type) {
            if (type === 'remove') {
                this.$confirm('确定删除选中的收藏内容吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let favorites = JSON.parse(localStorage.getItem('userFavorites') || '[]');
                    const selectedIds = this.selectedFavorites.map(f => f.id);
                    favorites = favorites.filter(f => !selectedIds.includes(f.id));
                    localStorage.setItem('userFavorites', JSON.stringify(favorites));
                    this.loadFavorites();
                    this.$message.success('已删除选中的收藏');
                }).catch(() => {});
            }
        },

        viewFavorite(item) {
            // 根据不同类型跳转到相应页面
            const pageMap = {
                destination: 'destination.html',
                hotel: 'hotel.html',
                guide: 'travel-guide.html'
            };
            const page = pageMap[item.type] || 'index.html';
            window.location.href = `${page}?id=${item.id}`;
        },

        removeFavorite(item) {
            this.$confirm('确定取消收藏该内容吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let favorites = JSON.parse(localStorage.getItem('userFavorites') || '[]');
                favorites = favorites.filter(f => f.id !== item.id);
                localStorage.setItem('userFavorites', JSON.stringify(favorites));
                this.loadFavorites();
                this.$message.success('已取消收藏');
            }).catch(() => {});
        },

        // 历史记录相关方法
        viewHistory(item) {
            console.log('查看历史记录:', item);
            window.location.href = item.url || '#';
        },

        clearHistory() {
            console.log('清空历史记录');
            this.$confirm('确定要清空浏览历史吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.history = [];
                localStorage.setItem('userHistory', '[]');
                this.$message.success('浏览历史已清空');
                console.log('历史记录已清空');
            }).catch(() => {});
        },

        // 获取类型文本
        getTypeText(type) {
            const typeMap = {
                destination: '目的地',
                hotel: '酒店',
                guide: '攻略'
            };
            return typeMap[type] || '其他';
        },

        // 格式化日期
        formatDate(dateStr) {
            const date = new Date(dateStr);
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        },

        // 获取来源页面文本
        getSourceText(fromPage) {
            const sourceMap = {
                'travel-guide': '旅游攻略',
                'search': '搜索页面',
                'destination': '目的地',
                'hotel': '酒店详情'
            };
            return sourceMap[fromPage] || '其他页面';
        }
    },
    mounted() {
        this.loadFavorites();
    }
}); 
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
        this.checkLoginStatus();
        this.loadOrders();
        this.loadFavorites();
        this.loadHistory();
    },

    methods: {
        checkLoginStatus() {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const userInfo = localStorage.getItem('userInfo');
            
            if (!isLoggedIn || !userInfo) {
                this.$message.error('请先登录');
                window.location.href = './login.html';
                return;
            }

            // 加载用户信息
            const user = JSON.parse(userInfo);
            this.userInfo = {
                username: user.username,
                email: user.email || '',
                phone: user.phone || '',
                avatar: user.avatar
            };
        },

        loadOrders() {
            this.isOrdersLoading = true;
            // 从 localStorage 获取订单数据
            const savedOrders = localStorage.getItem('userOrders');
            if (savedOrders) {
                this.orders = JSON.parse(savedOrders);
            }
            this.isOrdersLoading = false;
        },

        loadFavorites() {
            this.isFavoritesLoading = true;
            try {
                const favorites = JSON.parse(localStorage.getItem('userFavorites') || '[]');
                this.favorites = favorites.map(favorite => ({
                    ...favorite,
                    typeText: this.getFavoriteTypeText(favorite.type),
                    dateText: this.formatDateTime(favorite.date)
                }));
            } catch (error) {
                console.error('加载收藏失败:', error);
                this.$message.error('加载收藏失败');
            } finally {
                this.isFavoritesLoading = false;
            }
        },

        handleMenuSelect(key) {
            this.activeMenu = key;
        },

        goToHome() {
            window.location.href = '../index.html';
        },

        startEditProfile() {
            this.isProfileEditing = true;
        },

        saveProfile() {
            // 保存用户信息
            const userInfo = {
                ...JSON.parse(localStorage.getItem('userInfo')),
                ...this.userInfo
            };
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            
            this.$message.success('保存成功');
            this.isProfileEditing = false;
        },

        cancelProfileEdit() {
            this.isProfileEditing = false;
            this.checkLoginStatus(); // 重新加载用户信息
        },

        // 添加订单相关方法
        viewOrder(order) {
            let detailsHtml = '';
            
            switch (order.type) {
                case 'hotel':
                    detailsHtml = `
                        <p><strong>酒店名称：</strong>${order.name}</p>
                        <p><strong>入住日期：</strong>${order.checkIn}</p>
                        <p><strong>退房日期：</strong>${order.checkOut}</p>
                        <p><strong>房型：</strong>${order.details.details.roomType}</p>
                    `;
                    break;
                case 'transport':
                    detailsHtml = `
                        <p><strong>出发城市：</strong>${order.departCity}</p>
                        <p><strong>目的城市：</strong>${order.arriveCity}</p>
                        <p><strong>出发日期：</strong>${order.departDate}</p>
                        <p><strong>交通方式：</strong>${order.details.details.type}</p>
                    `;
                    break;
                case 'ticket':
                    detailsHtml = `
                        <p><strong>景点名称：</strong>${order.scenicName}</p>
                        <p><strong>游玩日期：</strong>${order.visitDate}</p>
                        <p><strong>票型：</strong>${order.details.details.type}</p>
                        <p><strong>数量：</strong>${order.details.details.count}张</p>
                    `;
                    break;
            }

            this.$alert(`
                <div class="order-details">
                    <h3>订单详情</h3>
                    <p><strong>订单号：</strong>${order.id}</p>
                    <p><strong>下单时间：</strong>${new Date(order.date).toLocaleString()}</p>
                    <p><strong>订单金额：</strong>¥${order.amount}</p>
                    <p><strong>订单状态：</strong>${order.status}</p>
                    <h4>预订信息</h4>
                    ${detailsHtml}
                </div>
            `, '订单详情', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: '确定'
            });
        },

        deleteSelectedOrders() {
            if (this.selectedOrders.length === 0) {
                this.$message.warning('请选择要删除的订单');
                return;
            }

            this.$confirm('确定要删除选中的订单吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.orders = this.orders.filter(order => !this.selectedOrders.includes(order.id));
                localStorage.setItem('userOrders', JSON.stringify(this.orders));
                this.$message.success('删除成功');
                this.selectedOrders = [];
            }).catch(() => {});
        },

        handleTableSelectionChange(selection) {
            if (this.activeMenu === 'orders') {
                this.selectedOrders = selection.map(order => order.id);
            } else if (this.activeMenu === 'favorites') {
                this.selectedFavorites = selection.map(favorite => favorite.id);
            }
        },

        formatDateTime(time) {
            if (!time) return '';
            return new Date(time).toLocaleString();
        },

        // 添加收藏相关的删除方法
        handleFavoritesOperation(type) {
            if (type === 'remove') {
                if (this.selectedFavorites.length === 0) {
                    this.$message.warning('请选择要删除的收藏');
                    return;
                }

                this.$confirm('确定要删除选中的收藏吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.favorites = this.favorites.filter(favorite => !this.selectedFavorites.includes(favorite.id));
                    localStorage.setItem('userFavorites', JSON.stringify(this.favorites));
                    this.$message.success('删除成功');
                    this.selectedFavorites = [];
                }).catch(() => {});
            }
        },

        // 取消订单
        cancelOrder(order) {
            this.$confirm('确定要取消该订单吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                order.status = '已取消';
                localStorage.setItem('userOrders', JSON.stringify(this.orders));
                this.$message.success('订单已取消');
            }).catch(() => {});
        },

        // 查看收藏
        viewFavorite(favorite) {
            window.location.href = favorite.url;
        },

        // 移除收藏
        removeFavorite(favorite) {
            this.$confirm('确定要取消收藏吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let favorites = JSON.parse(localStorage.getItem('userFavorites') || '[]');
                favorites = favorites.filter(f => f.id !== favorite.id);
                localStorage.setItem('userFavorites', JSON.stringify(favorites));
                
                // 更新显示
                this.loadFavorites();
                this.$message.success('已取消收藏');
            }).catch(() => {});
        },

        // 查看历史记录
        viewHistory(item) {
            window.location.href = item.url;
        },

        // 清空历史记录
        clearHistory() {
            this.$confirm('确定要清空浏览历史吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.history = [];
                localStorage.setItem('browsingHistory', '[]');
                this.$message.success('浏览历史已清空');
            }).catch(() => {});
        },

        // 加载浏览历史
        loadHistory() {
            this.isHistoryLoading = true;
            const savedHistory = localStorage.getItem('browsingHistory');
            if (savedHistory) {
                this.history = JSON.parse(savedHistory);
            }
            this.isHistoryLoading = false;
        },

        // 获取收藏类型文本
        getFavoriteTypeText(type) {
            const types = {
                guide: '旅游攻略',
                hotel: '酒店',
                scenic: '景点',
                article: '文章'
            };
            return types[type] || type;
        }
    }
}); 
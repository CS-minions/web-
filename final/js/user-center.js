Vue.use(ELEMENT);

new Vue({
    el: '#userCenter',
    data() {
        return {
            activeMenu: 'profile',
            isEditing: false,
            userInfo: {
                username: '',
                email: '',
                phone: '',
                avatar: ''
            },
            orders: [],
            favorites: [],
            history: [],
            favoritesLoading: false,
            selectedFavorites: [],
            ordersLoading: false,
            selectedOrders: []
        };
    },
    created() {
        this.checkLoginStatus();
        this.loadOrders();
        this.loadFavorites();
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
            this.ordersLoading = true;
            // 从 localStorage 获取订单数据
            const savedOrders = localStorage.getItem('userOrders');
            if (savedOrders) {
                this.orders = JSON.parse(savedOrders);
            } else {
                // 初始化示例数据（仅在第一次时）
                this.orders = [
                    {
                        id: '20240120001',
                        date: '2024-01-20',
                        title: '北京故宫门票',
                        amount: 299,
                        status: '已支付',
                        details: {
                            ticketType: '成人票',
                            quantity: 2,
                            visitDate: '2024-02-01',
                            contact: '张三',
                            phone: '13800138000'
                        }
                    },
                    {
                        id: '20240119001',
                        date: '2024-01-19',
                        title: '西湖游船票',
                        amount: 599,
                        status: '待支付',
                        details: {
                            ticketType: '家庭套票',
                            quantity: 1,
                            visitDate: '2024-02-02',
                            contact: '李四',
                            phone: '13900139000'
                        }
                    }
                ];
                this.saveOrders();
            }
            this.ordersLoading = false;
        },

        loadFavorites() {
            this.favoritesLoading = true;
            // 从 localStorage 获取收藏数据
            const savedFavorites = localStorage.getItem('userFavorites');
            if (savedFavorites) {
                this.favorites = JSON.parse(savedFavorites);
            }
            this.favoritesLoading = false;
        },

        handleSelect(key) {
            this.activeMenu = key;
        },

        goToHome() {
            window.location.href = '../index.html';
        },

        editProfile() {
            this.isEditing = true;
        },

        saveProfile() {
            // 保存用户信息
            const userInfo = {
                ...JSON.parse(localStorage.getItem('userInfo')),
                ...this.userInfo
            };
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            
            this.$message.success('保存成功');
            this.isEditing = false;
        },

        cancelEdit() {
            this.isEditing = false;
            this.checkLoginStatus(); // 重新加载用户信息
        },

        viewOrder(order) {
            this.$alert(`
                <div class="order-details">
                    <h3>订单详情</h3>
                    <p><strong>订单号：</strong>${order.id}</p>
                    <p><strong>下单时间：</strong>${order.date}</p>
                    <p><strong>商品名称：</strong>${order.title}</p>
                    <p><strong>订单金额：</strong>¥${order.amount}</p>
                    <p><strong>订单状态：</strong>${order.status}</p>
                    <h4>预订信息</h4>
                    <p><strong>票型：</strong>${order.details.ticketType}</p>
                    <p><strong>数量：</strong>${order.details.quantity}张</p>
                    <p><strong>游玩日期：</strong>${order.details.visitDate}</p>
                    <p><strong>联系人：</strong>${order.details.contact}</p>
                    <p><strong>联系电话：</strong>${order.details.phone}</p>
                </div>
            `, '订单详情', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: '确定',
                callback: () => {}
            });
        },

        viewFavorite(item) {
            this.$message.info(`查看收藏：${item.title}`);
        },

        removeFavorite(item) {
            this.$confirm('确定要取消收藏吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const index = this.favorites.indexOf(item);
                this.favorites.splice(index, 1);
                this.$message.success('已取消收藏');
            }).catch(() => {});
        },

        viewHistory(item) {
            this.$message.info(`查看历史记录：${item.title}`);
        },

        clearHistory() {
            this.$confirm('确定要清空浏览历史吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.history = [];
                this.$message.success('已清空浏览历史');
            }).catch(() => {});
        },

        // 加载收藏数据
        loadFavorites() {
            this.favoritesLoading = true;
            // 从 localStorage 获取收藏数据
            const savedFavorites = localStorage.getItem('userFavorites');
            if (savedFavorites) {
                this.favorites = JSON.parse(savedFavorites);
            }
            this.favoritesLoading = false;
        },

        // 添加收藏
        addToFavorites(item) {
            if (!this.favorites.some(f => f.id === item.id)) {
                this.favorites.unshift({
                    ...item,
                    addTime: new Date().toISOString()
                });
                this.saveFavorites();
                this.$message.success('添加收藏成功');
            } else {
                this.$message.warning('已经收藏过了');
            }
        },

        // 移除收藏
        removeFavorite(item) {
            this.$confirm('确定要取消收藏吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const index = this.favorites.findIndex(f => f.id === item.id);
                if (index > -1) {
                    this.favorites.splice(index, 1);
                    this.saveFavorites();
                    this.$message.success('已取消收藏');
                }
            }).catch(() => {});
        },

        // 保存收藏到 localStorage
        saveFavorites() {
            localStorage.setItem('userFavorites', JSON.stringify(this.favorites));
        },

        // 查看收藏详情
        viewFavorite(item) {
            // 记录浏览历史
            this.addToHistory({
                id: item.id,
                title: item.title,
                description: `查看收藏的${item.title}`,
                time: new Date().toLocaleString()
            });
            
            // 跳转到详情页
            window.location.href = `./detail.html?id=${item.id}&type=${item.type}`;
        },

        // 批量管理收藏
        handleBatchOperation(type) {
            if (type === 'remove') {
                if (this.selectedFavorites.length === 0) {
                    this.$message.warning('请先选择要删除的收藏');
                    return;
                }
                this.$confirm(`确定要删除选中的 ${this.selectedFavorites.length} 个收藏吗？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.favorites = this.favorites.filter(item => 
                        !this.selectedFavorites.includes(item.id)
                    );
                    this.saveFavorites();
                    this.selectedFavorites = [];
                    this.$message.success('批量删除成功');
                }).catch(() => {});
            }
        },

        // 处理表格选择变化
        handleSelectionChange(selection) {
            this.selectedFavorites = selection.map(item => item.id);
        },

        // 格式化时间
        formatTime(time) {
            if (!time) return '';
            return new Date(time).toLocaleString();
        },

        // 取消订单
        cancelOrder(order) {
            if (order.status === '已支付') {
                this.$message.warning('已支付的订单不能取消');
                return;
            }

            this.$confirm('确定要取消该订单吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const index = this.orders.findIndex(o => o.id === order.id);
                if (index > -1) {
                    this.orders.splice(index, 1);
                    this.saveOrders(); // 保存到 localStorage
                    this.$message.success('订单已取消');
                }
            }).catch(() => {});
        },

        // 批量删除订单
        handleBatchDeleteOrders() {
            if (this.selectedOrders.length === 0) {
                this.$message.warning('请先选择要删除的订单');
                return;
            }

            this.$confirm(`确定要删除选中的 ${this.selectedOrders.length} 个订单吗？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.orders = this.orders.filter(order => 
                    !this.selectedOrders.includes(order.id)
                );
                this.saveOrders(); // 保存到 localStorage
                this.selectedOrders = [];
                this.$message.success('批量删除成功');
            }).catch(() => {});
        },

        // 保存订单到 localStorage
        saveOrders() {
            localStorage.setItem('userOrders', JSON.stringify(this.orders));
        },

        // 处理订单表格选择变化
        handleOrderSelectionChange(selection) {
            this.selectedOrders = selection.map(order => order.id);
        }
    }
}); 
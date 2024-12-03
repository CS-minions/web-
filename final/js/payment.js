Vue.use(ELEMENT);

new Vue({
    el: '#payment',
    data() {
        return {
            order: null,
            paymentMethod: 'wechat',
            remainingTime: 0,
            timer: null,
            loading: false,
            currentStep: 1
        };
    },

    computed: {
        getPaymentMethodName() {
            return this.paymentMethod === 'wechat' ? '微信' : '支付宝';
        },
        
        paymentStep() {
            if (this.loading) return 2;
            if (!this.order) return 0;
            if (this.remainingTime <= 0) return 0;
            return 1;
        }
    },

    created() {
        // 获取待支付订单
        const pendingOrder = localStorage.getItem('pendingOrder');
        if (!pendingOrder) {
            this.$message.error('订单信息不存在');
            setTimeout(() => {
                window.location.href = 'booking.html';
            }, 1500);
            return;
        }

        this.order = JSON.parse(pendingOrder);
        this.paymentMethod = this.order.payment.method;

        // 计算剩余支付时间
        const expireTime = new Date(this.order.payment.expireTime).getTime();
        this.remainingTime = Math.max(0, Math.floor((expireTime - Date.now()) / 1000));

        // 启动倒计时
        this.startTimer();
    },

    methods: {
        // 格式化剩余时间
        formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        },

        // 启动倒计时
        startTimer() {
            if (this.timer) {
                clearInterval(this.timer);
            }

            this.timer = setInterval(() => {
                if (this.remainingTime > 0) {
                    this.remainingTime--;
                } else {
                    clearInterval(this.timer);
                    this.$message.error('支付超时，订单已取消');
                    setTimeout(() => {
                        window.location.href = 'booking.html';
                    }, 1500);
                }
            }, 1000);
        },

        // 切换支付方式
        handlePaymentChange(method) {
            this.paymentMethod = method;
            this.order.payment.qrcode = method === 'wechat'
                ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=weixin://wxpay/bizpayurl?pr=${this.order.orderId}_${this.order.amount}`
                : `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://qr.alipay.com/${this.order.orderId}_${this.order.amount}`;
        },

        // 取消支付
        cancelPayment() {
            this.$confirm('确定要取消支付吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 更新订单状态
                let orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
                const orderIndex = orders.findIndex(o => o.id === this.order.orderId);
                if (orderIndex !== -1) {
                    orders[orderIndex].status = '已取消';
                    localStorage.setItem('userOrders', JSON.stringify(orders));
                }

                // 清除待支付订单
                localStorage.removeItem('pendingOrder');

                this.$message.success('订单已取消');
                setTimeout(() => {
                    window.location.href = 'booking.html';
                }, 1500);
            }).catch(() => {});
        },

        // 检查支付状态
        checkPaymentStatus() {
            this.loading = true;
            this.currentStep = 2;
            
            // 模拟支付成功
            setTimeout(() => {
                try {
                    // 更新订单状态
                    let orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
                    const orderIndex = orders.findIndex(o => o.id === this.order.orderId);
                    
                    if (orderIndex === -1) {
                        throw new Error('订单不存在');
                    }

                    // 更新订单状态和支付信息
                    orders[orderIndex] = {
                        ...orders[orderIndex],
                        status: '已支付',
                        paymentInfo: {
                            method: this.paymentMethod,
                            time: new Date().toISOString(),
                            amount: this.order.amount,
                            transactionId: 'TXN' + Date.now() + Math.floor(Math.random() * 1000)
                        }
                    };

                    // 保存更新后的订单
                    localStorage.setItem('userOrders', JSON.stringify(orders));

                    // 清除待支付订单
                    localStorage.removeItem('pendingOrder');

                    this.currentStep = 3;
                    this.$message.success('支付成功！正在跳转到订单详情...');
                    setTimeout(() => {
                        window.location.href = 'user-center.html#orders';
                    }, 1500);
                } catch (error) {
                    this.$message.error('支付确认失败：' + error.message);
                    console.error('支付确认错误:', error);
                    this.currentStep = 1;
                } finally {
                    this.loading = false;
                }
            }, 1000);
        }
    },

    beforeDestroy() {
        // 清除定时器
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
}); 
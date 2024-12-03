Vue.use(ELEMENT);

new Vue({
    el: '#payment',
    data() {
        return {
            order: null,
            loading: false,
            paymentMethod: 'wechat',
            qrCodeVisible: false,
            countdown: 300, // 5分钟支付倒计时
            timer: null,
            qrCodeInstance: null // 添加 QRCode 实例
        };
    },
    computed: {
        countdownFormat() {
            const minutes = Math.floor(this.countdown / 60);
            const seconds = this.countdown % 60;
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    },
    methods: {
        loadOrder() {
            const urlParams = new URLSearchParams(window.location.search);
            const orderId = urlParams.get('orderId');
            
            if (!orderId) {
                this.$message.error('订单信息不存在');
                setTimeout(() => {
                    window.location.href = 'booking.html';
                }, 1500);
                return;
            }

            // 从本地存储获取订单信息
            const orderStr = localStorage.getItem('currentOrder');
            if (!orderStr) {
                this.$message.error('未找到订单信息');
                return;
            }

            this.order = JSON.parse(orderStr);
        },
        
        handlePayment() {
            this.loading = true;
            this.qrCodeVisible = true;
            
            // 开始倒计时
            this.startCountdown();
            
            // 生成二维码
            this.$nextTick(() => {
                if (this.qrCodeInstance) {
                    this.qrCodeInstance.clear();
                    this.qrCodeInstance.makeCode(this.getPaymentData());
                } else {
                    const qrContainer = document.getElementById('paymentQrCode');
                    qrContainer.innerHTML = ''; // 清空容器
                    this.qrCodeInstance = new QRCode(qrContainer, {
                        text: this.getPaymentData(),
                        width: 200,
                        height: 200,
                        colorDark: "#000000",
                        colorLight: "#ffffff",
                        correctLevel: QRCode.CorrectLevel.H
                    });
                }
            });
            
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        },
        
        startCountdown() {
            this.timer = setInterval(() => {
                if (this.countdown > 0) {
                    this.countdown--;
                } else {
                    clearInterval(this.timer);
                    this.$message.error('支付超时，请重新下单');
                    setTimeout(() => {
                        window.location.href = 'booking.html';
                    }, 1500);
                }
            }, 1000);
        },
        
        simulatePaymentSuccess() {
            clearInterval(this.timer);
            this.qrCodeVisible = false;
            
            // 更新订单状态
            this.order.status = 'paid';
            this.order.payTime = new Date().toISOString();
            
            // 更新本地存储中的订单信息
            localStorage.setItem('currentOrder', JSON.stringify(this.order));
            
            // 更新订单历史
            let orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
            const index = orderHistory.findIndex(o => o.orderId === this.order.orderId);
            if (index !== -1) {
                orderHistory[index] = this.order;
                localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
            }
            
            this.$message.success('支付成功！正在跳转到订单确认页面...');
            
            setTimeout(() => {
                window.location.href = 'order-confirmation.html';
            }, 1500);
        },
        
        getPaymentData() {
            // 生成支付数据
            const payData = {
                orderId: this.order.orderId,
                amount: this.order.totalAmount,
                type: this.paymentMethod,
                time: new Date().toISOString()
            };
            return JSON.stringify(payData);
        }
    },
    mounted() {
        this.loadOrder();
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
}); 
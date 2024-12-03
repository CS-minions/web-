Vue.use(ELEMENT);

new Vue({
    el: '#payment',
    data() {
        return {
            orderId: '',
            orderDetails: {
                name: '',
                amount: 0
            },
            paymentMethod: 'wechat',
            loading: false
        };
    },
    created() {
        const urlParams = new URLSearchParams(window.location.search);
        this.orderId = urlParams.get('orderId');
        this.getOrderDetails();
    },
    methods: {
        getOrderDetails() {
            const currentOrder = localStorage.getItem('currentOrder');
            if (currentOrder) {
                try {
                    const order = JSON.parse(currentOrder);
                    this.orderDetails = {
                        name: order.details.name,
                        amount: order.amount
                    };
                } catch (error) {
                    this.$message.error('获取订单信息失败');
                    console.error('解析订单信息失败：', error);
                }
            }
        },
        handlePayment() {
            this.loading = true;
            this.$message({
                message: '正在处理支付...',
                type: 'info'
            });

            setTimeout(() => {
                this.loading = false;
                this.$message({
                    message: '支付成功！',
                    type: 'success'
                });

                setTimeout(() => {
                    window.location.href = `order-confirmation.html?orderId=${this.orderId}`;
                }, 500);
            }, 1500);
        },
        cancelPayment() {
            this.$confirm('确定要取消支付吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                window.location.href = 'index.html';
            }).catch(() => {});
        },
        goToHome() {
            window.location.href = 'index.html';
        }
    }
}); 
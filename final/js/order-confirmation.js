Vue.use(ELEMENT);

new Vue({
    el: '#confirmation',
    data() {
        return {
            orderId: '',
            amount: 0,
            payTime: new Date().toLocaleString()
        };
    },
    created() {
        // 从 URL 获取订单 ID
        const urlParams = new URLSearchParams(window.location.search);
        this.orderId = urlParams.get('orderId');
        this.getOrderDetails();
    },
    methods: {
        getOrderDetails() {
            // 从本地存储获取订单信息
            const currentOrder = localStorage.getItem('currentOrder');
            if (currentOrder) {
                try {
                    const order = JSON.parse(currentOrder);
                    this.amount = order.amount;
                } catch (error) {
                    this.$message.error('获取订单信息失败');
                    console.error('解析订单信息失败：', error);
                }
            }
        },
        viewOrder() {
            window.location.href = 'user-center.html';
        },
        goToHome() {
            window.location.href = 'index.html';
        }
    }
}); 
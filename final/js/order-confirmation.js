Vue.use(ELEMENT);

new Vue({
    el: '#orderConfirmation',
    data() {
        return {
            order: null,
            hotels: [
                { id: 1, name: '海景大酒店' },
                { id: 2, name: '山水度假酒店' },
                { id: 3, name: '城市精品酒店' }
            ],
            roomTypes: {
                standard: '标准间',
                deluxe: '豪华间',
                suite: '套房'
            },
            qrCodeInstance: null
        };
    },
    methods: {
        loadOrder() {
            const orderStr = localStorage.getItem('currentOrder');
            if (!orderStr) {
                this.$message.error('未找到订单信息');
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 1500);
                return;
            }
            this.order = JSON.parse(orderStr);
        },
        
        getHotelName(hotelId) {
            const hotel = this.hotels.find(h => h.id === hotelId);
            return hotel ? hotel.name : '未知酒店';
        },
        
        getRoomTypeName(type) {
            return this.roomTypes[type] || '未知房型';
        },
        
        goToHome() {
            window.location.href = '../index.html';
        },
        
        generateOrderQRCode() {
            this.$nextTick(() => {
                const qrContainer = document.getElementById('orderQrCode');
                if (qrContainer) {
                    qrContainer.innerHTML = ''; // 清空容器
                    this.qrCodeInstance = new QRCode(qrContainer, {
                        text: JSON.stringify({
                            orderId: this.order.orderId,
                            time: this.order.createTime
                        }),
                        width: 150,
                        height: 150,
                        colorDark: "#000000",
                        colorLight: "#ffffff",
                        correctLevel: QRCode.CorrectLevel.H
                    });
                }
            });
        }
    },
    mounted() {
        this.loadOrder();
        this.$nextTick(() => {
            if (this.order) {
                this.generateOrderQRCode();
            }
        });
    }
}); 
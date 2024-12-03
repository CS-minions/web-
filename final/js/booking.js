Vue.use(ELEMENT);

new Vue({
    el: '#booking',
    data() {
        return {
            bookingType: 'hotel',
            bookingForm: {
                // 酒店预订字段
                name: '',
                checkIn: '',
                checkOut: '',
                roomType: '',

                // 交通预订字段
                departCity: '',
                arriveCity: '',
                departDate: '',
                transportType: '',

                // 门票预订字段
                scenicName: '',
                visitDate: '',
                ticketType: '',
                ticketCount: 1,

                // 通用字段
                paymentMethod: 'wechat'
            },
            isLoggedIn: false,

            // 日期选择器配置
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            priceDetails: {
                hotel: {
                    single: { price: 299, name: '单人间' },
                    double: { price: 399, name: '双人间' },
                    suite: { price: 599, name: '套房' }
                },
                transport: {
                    train: { price: 200, name: '火车' },
                    plane: { price: 800, name: '飞机' },
                    bus: { price: 100, name: '大巴' }
                },
                ticket: {
                    adult: { price: 100, name: '成人票' },
                    child: { price: 50, name: '儿童票' },
                    student: { price: 80, name: '学生票' }
                }
            },
            loading: false,  // 添加加载状态
            bookingRules: {  // 改
                name: [
                    { required: true, message: '请输入酒店名称', trigger: 'blur' }
                ],
                // ... 其他验证规则
            }
        };
    },

    created() {
        this.checkLoginStatus();
    },

    computed: {
        currentPrice() {
            return this.calculateAmount();
        },

        priceText() {
            const amount = this.currentPrice;
            switch (this.bookingType) {
                case 'hotel':
                    const days = this.calculateDays(this.bookingForm.checkIn, this.bookingForm.checkOut);
                    return `￥${amount} (${days}晚)`;
                case 'transport':
                    return `￥${amount}`;
                case 'ticket':
                    return `￥${amount} (${this.bookingForm.ticketCount}张)`;
                default:
                    return `￥${amount}`;
            }
        }
    },

    watch: {
        'bookingForm.checkIn'(val) {
            if (val && this.bookingForm.checkOut && new Date(val) >= new Date(this.bookingForm.checkOut)) {
                this.bookingForm.checkOut = '';
            }
        }
    },

    methods: {
        checkLoginStatus() {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            if (!isLoggedIn) {
                this.$message.error('请先登录');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
                return;
            }
            this.isLoggedIn = true;
        },

        handleBooking() {
            if (!this.validateForm()) {
                return;
            }

            this.loading = true;
            
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
                const orderDetails = this.formatOrderDetails(this.bookingForm);
                
                // 创建订单对象
                const order = {
                    id: this.generateOrderId(),
                    type: this.bookingType,
                    ...this.bookingForm,
                    ...orderDetails,
                    status: '待支付',
                    date: new Date().toISOString(),
                    amount: this.calculateAmount(),
                    userId: userInfo.id,
                    username: userInfo.username,
                    contact: {
                        name: userInfo.username,
                        phone: userInfo.phone || '',
                        email: userInfo.email || ''
                    }
                };

                // 先保存订单到用户订单列表
                this.saveOrder(order);
                
                const pendingOrder = {
                    orderId: order.id,
                    amount: order.amount,
                    title: orderDetails.title,
                    type: this.bookingType,
                    details: {
                        ...orderDetails.details,
                        paymentMethod: this.bookingForm.paymentMethod,
                        status: '待支付'
                    },
                    payment: {
                        method: this.bookingForm.paymentMethod,
                        qrcode: this.bookingForm.paymentMethod === 'wechat' 
                            ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=weixin://wxpay/bizpayurl?pr=${order.id}_${this.calculateAmount()}`
                            : `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://qr.alipay.com/${order.id}_${this.calculateAmount()}`,
                        amount: this.calculateAmount(),
                        currency: 'CNY',
                        description: orderDetails.title,
                        expireTime: new Date(Date.now() + 15 * 60 * 1000).toISOString()
                    }
                };

                // 调试信息
                console.log('订单信息：', {
                    orderId: pendingOrder.orderId,
                    amount: pendingOrder.amount,
                    title: pendingOrder.title,
                    type: pendingOrder.type
                });
                
                // 保存前验证订单信息完整性
                if (!pendingOrder.orderId) {
                    throw new Error('订单ID不存在');
                }
                if (!pendingOrder.amount) {
                    throw new Error('订单金额不存在');
                }
                if (!pendingOrder.title) {
                    throw new Error('订单标题不存在');
                }
                if (!pendingOrder.type) {
                    throw new Error('订单类型不存在');
                }

                // 保存当前待支付订单
                localStorage.setItem('pendingOrder', JSON.stringify(pendingOrder));

                // 验证是否保存成功
                const savedOrder = localStorage.getItem('pendingOrder');
                if (!savedOrder) {
                    throw new Error('订单保存失败');
                }

                this.$message.success('订单创建成功，正在跳转到支付页面...');
                
                setTimeout(() => {
                    window.location.href = 'payment.html';
                }, 1500);
            } catch (error) {
                this.$message.error('预订失败：' + error.message);
                console.error('预订错误:', error);
            } finally {
                this.loading = false;
            }
        },

        validateForm() {
            switch (this.bookingType) {
                case 'hotel':
                    if (!this.bookingForm.name || !this.bookingForm.roomType) {
                        this.$message.warning('请填写完整的酒店预订信息');
                        return false;
                    }
                    if (this.bookingForm.checkOut <= this.bookingForm.checkIn) {
                        this.$message.warning('退房日期必须晚于入住日期');
                        return false;
                    }
                    break;
                case 'transport':
                    if (!this.bookingForm.departCity || !this.bookingForm.arriveCity || !this.bookingForm.departDate || !this.bookingForm.transportType) {
                        this.$message.warning('请填写完整的交通预订信息');
                        return false;
                    }
                    break;
                case 'ticket':
                    if (!this.bookingForm.scenicName || !this.bookingForm.visitDate || !this.bookingForm.ticketType) {
                        this.$message.warning('请填写完整的门票预订信息');
                        return false;
                    }
                    break;
            }
            return true;
        },

        calculateAmount() {
            switch (this.bookingType) {
                case 'hotel':
                    const roomPrice = this.priceDetails.hotel[this.bookingForm.roomType]?.price || 0;
                    const days = this.calculateDays(this.bookingForm.checkIn, this.bookingForm.checkOut);
                    return roomPrice * days;

                case 'transport':
                    return this.priceDetails.transport[this.bookingForm.transportType]?.price || 0;

                case 'ticket':
                    const ticketPrice = this.priceDetails.ticket[this.bookingForm.ticketType]?.price || 0;
                    return ticketPrice * this.bookingForm.ticketCount;

                default:
                    return 0;
            }
        },

        calculateDays(start, end) {
            if (!start || !end) return 1;
            const startDate = new Date(start + 'T00:00:00Z');
            const endDate = new Date(end + 'T00:00:00Z');
            return Math.max(1, Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)));
        },

        // 添加订单详情格式化
        formatOrderDetails(order) {
            const details = {
                title: '',
                details: {}
            };

            switch (this.bookingType) {
                case 'hotel':
                    details.title = `${order.name} - ${this.getRoomTypeName(order.roomType)}`;
                    details.details = {
                        checkIn: order.checkIn,
                        checkOut: order.checkOut,
                        roomType: this.getRoomTypeName(order.roomType),
                        days: this.calculateDays(order.checkIn, order.checkOut),
                        price: this.priceDetails.hotel[order.roomType].price
                    };
                    break;

                case 'transport':
                    details.title = `${order.departCity} → ${order.arriveCity}`;
                    details.details = {
                        date: order.departDate,
                        type: this.getTransportTypeName(order.transportType),
                        departure: order.departCity,
                        arrival: order.arriveCity,
                        price: this.priceDetails.transport[order.transportType].price
                    };
                    break;

                case 'ticket':
                    details.title = order.scenicName;
                    details.details = {
                        date: order.visitDate,
                        type: this.getTicketTypeName(order.ticketType),
                        count: order.ticketCount,
                        unitPrice: this.priceDetails.ticket[order.ticketType].price
                    };
                    break;
            }

            return details;
        },

        getRoomTypeName(type) {
            const types = { single: '单人间', double: '双人间', suite: '套房' };
            return types[type] || type;
        },

        getTransportTypeName(type) {
            const types = { train: '火车', plane: '飞机', bus: '大巴' };
            return types[type] || type;
        },

        getTicketTypeName(type) {
            const types = { adult: '成人票', child: '儿童票', student: '学生票' };
            return types[type] || type;
        },

        saveOrder(order) {
            let orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
            orders.unshift(order);
            localStorage.setItem('userOrders', JSON.stringify(orders));
        },

        resetBookingForm() {
            this.$confirm('确定要重置表单吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.bookingForm = {
                    name: '',
                    checkIn: '',
                    checkOut: '',
                    roomType: '',
                    departCity: '',
                    arriveCity: '',
                    departDate: '',
                    transportType: '',
                    scenicName: '',
                    visitDate: '',
                    ticketType: '',
                    ticketCount: 1,
                    paymentMethod: 'wechat'
                };
                this.$message.success('表单已重置');
            }).catch(() => {});
        },

        generateOrderId() {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            const type = this.bookingType.charAt(0).toUpperCase();
            
            return `${type}${year}${month}${day}${random}`;
        }
    }
}); 
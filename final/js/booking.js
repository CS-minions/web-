Vue.use(ELEMENT);

new Vue({
    el: '#booking',
    data() {
        return {
            loading: false,
            bookingType: 'hotel',
            bookingForm: {
                name: '',
                checkIn: '',
                checkOut: '',
                roomType: '',
                visitDate: '',
                ticketType: '',
                quantity: 1,
                transportType: '',
                departure: '',
                destination: '',
                departureDate: '',
                paymentMethod: 'wechat'
            },
            rules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                checkIn: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                checkOut: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                roomType: [
                    { required: true, message: '请选择房间类型', trigger: 'change' }
                ]
            },
            priceInfo: {
                hotel: {
                    single: 300,
                    double: 500,
                    suite: 800
                },
                ticket: {
                    adult: 100,
                    child: 50,
                    student: 80
                },
                transport: {
                    train: 200,
                    plane: 800,
                    bus: 100
                }
            },
            popularDestinations: [
                { name: '北京', hotels: ['长城饭店', '王府井大饭店', '国际饭店'] },
                { name: '上海', hotels: ['和平饭店', '外滩华尔道夫', '半岛酒店'] },
                { name: '广州', hotels: ['白天鹅宾馆', '花园酒店', '中国大酒店'] }
            ],
            weatherInfo: null
        };
    },
    computed: {
        totalAmount() {
            let amount = 0;
            switch(this.bookingType) {
                case 'hotel':
                    if (this.bookingForm.roomType) {
                        const nights = this.calculateNights();
                        amount = this.priceInfo.hotel[this.bookingForm.roomType] * nights;
                    }
                    break;
                case 'ticket':
                    if (this.bookingForm.ticketType) {
                        amount = this.priceInfo.ticket[this.bookingForm.ticketType] * this.bookingForm.quantity;
                    }
                    break;
                case 'transport':
                    if (this.bookingForm.transportType) {
                        amount = this.priceInfo.transport[this.bookingForm.transportType];
                    }
                    break;
            }
            return amount;
        }
    },
    watch: {
        'bookingForm.departure'(newVal) {
            if (newVal) {
                this.fetchWeatherInfo(newVal);
            }
        }
    },
    methods: {
        calculateNights() {
            if (!this.bookingForm.checkIn || !this.bookingForm.checkOut) return 0;
            const checkIn = new Date(this.bookingForm.checkIn);
            const checkOut = new Date(this.bookingForm.checkOut);
            return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        },
        async handleBooking() {
            try {
                await this.$refs.bookingForm.validate();
                
                this.loading = true;
                this.$message({
                    message: '正在处理您的预订...',
                    type: 'info'
                });

                const order = {
                    id: Date.now(),
                    type: this.bookingType,
                    details: { ...this.bookingForm },
                    amount: this.totalAmount,
                    status: '待支付',
                    createTime: new Date().toLocaleString()
                };

                // 存储订单信息
                localStorage.setItem('currentOrder', JSON.stringify(order));

                // 添加到订单历史
                let bookingHistory = JSON.parse(localStorage.getItem('bookingHistory') || '[]');
                bookingHistory.push(order);
                localStorage.setItem('bookingHistory', JSON.stringify(bookingHistory));

                setTimeout(() => {
                    this.$message.success('预订信息提交成功！');
                    setTimeout(() => {
                        window.location.href = `payment.html?orderId=${order.id}`;
                    }, 500);
                }, 1500);

            } catch (error) {
                this.$message.error('表单验证失败，请检查输入！');
                console.error('预订错误：', error);
            } finally {
                this.loading = false;
            }
        },
        resetBookingForm() {
            this.$refs.bookingForm.resetFields();
            this.$message({
                message: '表单已重置',
                type: 'info'
            });
        },
        async fetchWeatherInfo(city) {
            try {
                // 模拟天气API调用
                const weather = await new Promise(resolve => {
                    setTimeout(() => {
                        resolve({
                            temperature: Math.floor(Math.random() * 20 + 10),
                            condition: ['晴朗', '多云', '小雨'][Math.floor(Math.random() * 3)]
                        });
                    }, 500);
                });
                
                this.weatherInfo = weather;
                this.$notify({
                    title: '目的地天气',
                    message: `${city}当前温度${weather.temperature}℃，天气${weather.condition}`,
                    type: 'info',
                    duration: 3000
                });
            } catch (error) {
                console.error('获取天气信息失败：', error);
            }
        },
        suggestHotels(city) {
            const destination = this.popularDestinations.find(d => d.name === city);
            if (destination) {
                return destination.hotels;
            }
            return [];
        },
        handleHotelSelect(hotel) {
            this.bookingForm.name = hotel;
            this.$message.success(`已选择${hotel}`);
        }
    },
    mounted() {
        // 检查登录状态
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            this.$alert('请先登录后再进行预订', '提示', {
                confirmButtonText: '去登录',
                callback: action => {
                    window.location.href = 'login.html';
                }
            });
        }
    }
}); 
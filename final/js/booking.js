Vue.use(ELEMENT);

new Vue({
    el: '#booking',
    data() {
        // 日期验证规则
        const validateEndDate = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请选择离店日期'));
            } else if (!this.bookingForm.startDate) {
                callback(new Error('请先选择入住日期'));
            } else if (value < this.bookingForm.startDate) {
                callback(new Error('离店日期不能早于入住日期'));
            } else {
                callback();
            }
        };

        return {
            // 酒店数据
            hotels: [
                {
                    id: 1,
                    name: '海景大酒店',
                    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500',
                    rating: 5,
                    location: '三亚湾海滨路88号',
                    tag: '热门',
                    features: [
                        { icon: 'fas fa-wifi', text: '免费WiFi' },
                        { icon: 'fas fa-parking', text: '免费停车' },
                        { icon: 'fas fa-swimming-pool', text: '泳池' }
                    ]
                },
                {
                    id: 2,
                    name: '山水度假酒店',
                    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500',
                    rating: 4,
                    location: '丽江古城区香格里大道',
                    tag: '优惠',
                    features: [
                        { icon: 'fas fa-spa', text: 'SPA' },
                        { icon: 'fas fa-utensils', text: '餐厅' },
                        { icon: 'fas fa-mountain', text: '景观房' }
                    ]
                },
                {
                    id: 3,
                    name: '城市精品酒店',
                    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500',
                    rating: 5,
                    location: '市中心商务区',
                    tag: '新开业',
                    features: [
                        { icon: 'fas fa-wifi', text: '5G WiFi' },
                        { icon: 'fas fa-dumbbell', text: '健身房' },
                        { icon: 'fas fa-business-time', text: '商务中心' }
                    ]
                }
            ],
            
            // 表单数据
            bookingForm: {
                hotelId: '',
                roomType: '',
                startDate: '',
                endDate: '',
                adults: 1,
                children: 0,
                breakfast: false,
                pickup: false,
                insurance: false,
                contactName: '',
                contactPhone: '',
                contactEmail: ''
            },
            
            // 房型数据
            prices: {
                hotel: {
                    standard: {
                        price: 299,
                        name: '标准间',
                        desc: '双床|25㎡|2人',
                        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500',
                        amenities: [
                            { icon: 'fas fa-wifi', text: '免费WiFi' },
                            { icon: 'fas fa-tv', text: '液晶电视' },
                            { icon: 'fas fa-shower', text: '24h热水' }
                        ]
                    },
                    deluxe: {
                        price: 499,
                        name: '豪华间',
                        desc: '大床|35㎡|2人',
                        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500',
                        amenities: [
                            { icon: 'fas fa-wifi', text: '免费WiFi' },
                            { icon: 'fas fa-tv', text: '智能电视' },
                            { icon: 'fas fa-bath', text: '浴缸' }
                        ]
                    },
                    suite: {
                        price: 899,
                        name: '套房',
                        desc: '套间|50㎡|4人',
                        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500',
                        amenities: [
                            { icon: 'fas fa-couch', text: '会客厅' },
                            { icon: 'fas fa-coffee', text: '咖啡机' },
                            { icon: 'fas fa-concierge-bell', text: '管家服务' }
                        ]
                    }
                }
            },
            
            loading: false,
            swiper: null,
            
            // 表单验证规则
            rules: {
                startDate: [
                    { required: true, message: '请选择入住日期', trigger: 'change' }
                ],
                endDate: [
                    { validator: validateEndDate, trigger: 'change' }
                ],
                contactName: [
                    { required: true, message: '请输入联系人姓名', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ],
                contactPhone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
                ],
                contactEmail: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                ]
            },
            
            // 日期选择器配置
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            }
        };
    },
    
    computed: {
        roomSubtotal() {
            if (!this.bookingForm.roomType) return 0;
            return this.prices.hotel[this.bookingForm.roomType].price * this.calculateNights();
        },
        
        breakfastTotal() {
            if (!this.bookingForm.breakfast) return 0;
            return 68 * this.bookingForm.adults * this.calculateNights();
        },
        
        insuranceTotal() {
            if (!this.bookingForm.insurance) return 0;
            return 50 * (this.bookingForm.adults + this.bookingForm.children);
        },
        
        totalPrice() {
            let total = this.roomSubtotal + this.breakfastTotal + this.insuranceTotal;
            if (this.bookingForm.pickup) total += 120;
            return total;
        },
        
        isFormValid() {
            return this.bookingForm.roomType && 
                   this.bookingForm.startDate && 
                   this.bookingForm.endDate;
        }
    },
    
    methods: {
        initSwiper() {
            this.swiper = new Swiper('.swiper-container', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2
                    },
                    1024: {
                        slidesPerView: 3
                    }
                }
            });
        },
        
        selectHotel(hotel) {
            this.bookingForm.hotelId = hotel.id;
            this.$message.success(`已选择${hotel.name}`);
        },
        
        selectRoom(type) {
            this.bookingForm.roomType = type;
        },
        
        handleStartDateChange(val) {
            if (val > this.bookingForm.endDate) {
                this.bookingForm.endDate = '';
            }
            this.$nextTick(() => {
                if (this.$refs.endDate) {
                    this.$refs.endDate.focus();
                }
            });
        },
        
        calculateNights() {
            if (!this.bookingForm.startDate || !this.bookingForm.endDate) return 0;
            const start = new Date(this.bookingForm.startDate);
            const end = new Date(this.bookingForm.endDate);
            return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        },
        
        async submitBooking() {
            if (!this.checkLoginStatus()) return;
            
            try {
                await this.$refs.bookingForm.validate();
                this.loading = true;
                
                const order = {
                    orderId: 'ORDER' + Date.now(),
                    createTime: new Date().toISOString(),
                    status: 'pending',
                    totalAmount: this.totalPrice,
                    ...this.bookingForm,
                    nights: this.calculateNights()
                };

                localStorage.setItem('currentOrder', JSON.stringify(order));
                
                let orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
                orderHistory.unshift(order);
                localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

                this.$message.success('订单创建成功，正在跳转到支付页面...');
                
                setTimeout(() => {
                    window.location.href = `payment.html?orderId=${order.orderId}`;
                }, 1000);
                
            } catch (error) {
                this.$message.error('请完善预订信息');
            } finally {
                this.loading = false;
            }
        },
        
        checkLoginStatus() {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            if (!isLoggedIn) {
                this.$alert('请先登录后再进行预订', '提示', {
                    confirmButtonText: '去登录',
                    callback: action => {
                        window.location.href = 'login.html';
                    }
                });
                return false;
            }
            return true;
        },
        
        resetForm() {
            this.$refs.bookingForm.resetFields();
            this.bookingForm.breakfast = false;
            this.bookingForm.pickup = false;
            this.bookingForm.insurance = false;
            this.$message.info('表单已重置');
        },
        
        loadUserInfo() {
            try {
                const userInfo = JSON.parse(localStorage.getItem('currentUser') || '{}');
                if (userInfo) {
                    this.bookingForm.contactName = userInfo.username || '';
                    this.bookingForm.contactPhone = userInfo.phone || '';
                    this.bookingForm.contactEmail = userInfo.email || '';
                }
            } catch (error) {
                console.error('加载用户信息错误:', error);
            }
        }
    },
    
    mounted() {
        this.initSwiper();
        if (this.checkLoginStatus()) {
            this.loadUserInfo();
        }
    },
    
    beforeDestroy() {
        if (this.swiper) {
            this.swiper.destroy();
        }
    }
}); 
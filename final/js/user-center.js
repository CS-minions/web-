Vue.use(ELEMENT);

new Vue({
    el: '#userCenter',
    data() {
        return {
            userInfo: {
                username: '',
                email: 'example@email.com',
                registerTime: '2024-01-01'
            },
            orders: [
                {
                    id: '20240120001',
                    date: '2024-01-20',
                    amount: 299,
                    status: '已支付'
                },
                {
                    id: '20240119001',
                    date: '2024-01-19',
                    amount: 599,
                    status: '待支付'
                }
            ]
        };
    },
    created() {
        this.checkLogin();
        this.loadUserInfo();
    },
    methods: {
        checkLogin() {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            if (!isLoggedIn) {
                this.$message.error('请先登录');
                window.location.href = 'login.html';
                return;
            }
        },
        loadUserInfo() {
            const currentUser = localStorage.getItem('currentUser');
            if (currentUser) {
                const userData = JSON.parse(currentUser);
                this.userInfo.username = userData.username;
            }
        },
        goToHome() {
            window.location.href = 'index.html';
        }
    }
}); 
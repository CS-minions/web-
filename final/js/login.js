Vue.use(ELEMENT);

// 初始化粒子效果
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#409EFF' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#409EFF',
            opacity: 0.4,
            width: 1
        },
        move: { enable: true, speed: 3 }
    }
});

new Vue({
    el: '#login',
    data() {
        return {
            loginForm: {
                username: '',
                password: '',
                remember: false
            },
            loading: false,
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                ]
            }
        };
    },
    mounted() {
        // 检查是否有记住的登录信息
        const rememberedUser = localStorage.getItem('rememberedUser');
        if (rememberedUser) {
            const userInfo = JSON.parse(rememberedUser);
            this.loginForm.username = userInfo.username;
            this.loginForm.password = userInfo.password;
            this.loginForm.remember = true;
        }
    },
    methods: {
        handleLogin() {
            this.submitForm('loginForm');
        },
        handleRegister() {
            window.location.href = 'register.html';
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    
                    // 模拟登录请求
                    setTimeout(() => {
                        // 处理"记住我"功能
                        if (this.loginForm.remember) {
                            localStorage.setItem('rememberedUser', JSON.stringify({
                                username: this.loginForm.username,
                                password: this.loginForm.password
                            }));
                        } else {
                            localStorage.removeItem('rememberedUser');
                        }

                        // 统一使用 userInfo 存储用户信息
                        const userData = {
                            username: this.loginForm.username,
                            email: 'example@email.com',
                            registerTime: '2024-01-01',
                            avatar: '../assets/default-avatar.png'
                        };

                        // 存储登录状态
                        localStorage.setItem('isLoggedIn', 'true');
                        localStorage.setItem('userInfo', JSON.stringify(userData));

                        this.$message.success('登录成功！');
                        this.loading = false;

                        // 检查是否有重定向路径
                        const redirectPath = localStorage.getItem('redirectPath');
                        if (redirectPath) {
                            localStorage.removeItem('redirectPath');
                            // 确保路径正确
                            if (redirectPath.startsWith('pages/')) {
                                window.location.href = './' + redirectPath.substring(6);
                            } else {
                                window.location.href = '../' + redirectPath;
                            }
                        } else {
                            window.location.href = '../index.html';
                        }
                    }, 1000);
                }
            });
        },
        // 登录成功后的处理
        handleLoginSuccess(userData) {
            // 保存登录状态和用户信息
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userInfo', JSON.stringify(userData));

            this.$message.success('登录成功');

            // 检查是否有重定向路径
            const redirectPath = localStorage.getItem('redirectPath');
            if (redirectPath) {
                localStorage.removeItem('redirectPath');
                // 确保路径正确
                if (redirectPath.startsWith('pages/')) {
                    window.location.href = './' + redirectPath.substring(6);
                } else {
                    window.location.href = '../' + redirectPath;
                }
            } else {
                window.location.href = '../index.html';
            }
        }
    }
}); 
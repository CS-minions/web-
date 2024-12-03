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

                        // 存储登录状态
                        localStorage.setItem('isLoggedIn', 'true');
                        localStorage.setItem('currentUser', JSON.stringify({
                            username: this.loginForm.username
                        }));

                        this.$message({
                            message: '登录成功！',
                            type: 'success'
                        });

                        this.loading = false;

                        // 跳转到首页
                        setTimeout(() => {
                            window.location.href = '../index.html';
                        }, 500);
                    }, 1000);
                } else {
                    return false;
                }
            });
        },
        goToRegister() {
            window.location.href = 'register.html';
        }
    }
}); 
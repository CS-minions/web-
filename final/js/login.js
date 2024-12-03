Vue.use(ELEMENT);

// 初始化粒子效果
particlesJS.load('particles-js', '../assets/particles-config.json');

new Vue({
    el: '#login',
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            },
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
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 模拟登录请求
                    this.$message({
                        message: '登录中...',
                        type: 'info'
                    });

                    setTimeout(() => {
                        // 存储登录状态
                        localStorage.setItem('isLoggedIn', 'true');
                        localStorage.setItem('currentUser', JSON.stringify({
                            username: this.loginForm.username
                        }));

                        this.$message({
                            message: '登录成功！',
                            type: 'success'
                        });

                        // 跳转到首页
                        setTimeout(() => {
                            window.location.href = 'index.html';
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
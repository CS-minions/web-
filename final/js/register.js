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
    el: '#register',
    data() {
        // 确认密码的验证规则
        const validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.registerForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        
        return {
            registerForm: {
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
                phone: '',
                agreement: false
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
                ],
                confirmPassword: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: validatePass2, trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
                ],
                agreement: [
                    { validator: (rule, value, callback) => {
                        if (!value) {
                            callback(new Error('请阅读并同意用户协议'));
                        } else {
                            callback();
                        }
                    }, trigger: 'change' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (!this.registerForm.agreement) {
                        this.$message.warning('请阅读并同意用户协议');
                        return false;
                    }
                    
                    this.loading = true;
                    
                    // 模拟注册请求
                    setTimeout(() => {
                        this.$message({
                            message: '注册成功！',
                            type: 'success'
                        });
                        
                        this.loading = false;
                        
                        // 跳转到登录页
                        setTimeout(() => {
                            window.location.href = 'login.html';
                        }, 500);
                    }, 1000);
                } else {
                    return false;
                }
            });
        },
        goToLogin() {
            window.location.href = 'login.html';
        }
    }
}); 
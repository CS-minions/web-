Vue.use(ELEMENT);

// 初始化粒子效果
particlesJS.load('particles-js', '../assets/particles-config.json');

new Vue({
    el: '#register',
    data() {
        // 自定义密码验证规则
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.registerForm.confirmPassword !== '') {
                    this.$refs.registerForm.validateField('confirmPassword');
                }
                callback();
            }
        };
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
                email: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                confirmPassword: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 模拟注册请求
                    this.$message({
                        message: '注册中...',
                        type: 'info'
                    });

                    setTimeout(() => {
                        this.$message({
                            message: '注册成功！',
                            type: 'success'
                        });

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
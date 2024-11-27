$(document).ready(function() {
    // 手机号正则表达式
    var deg = /^[0-9]{11}$/;

    // 点击验证按钮
    $('#verify-phone').click(function() {
        var phone = $('#phone').val().trim();  // 获取手机号
        if (phone === '') {
            $('.tip1').show();  // 显示请输入手机号提示
            $('.tip3').hide();  // 隐藏手机号格式错误提示
            $('.tip-right').hide();  // 隐藏手机号格式正确提示
            return false;
        } else if (!phone.match(deg)) {
            $('.tip3').show();  // 显示手机号格式错误提示
            $('.tip-right').hide();  // 隐藏手机号格式正确提示
            return false;
        }

        // 验证通过后，显示验证码输入框
        $('#verification-code').show();
        $('#verify-code').show();
        $('.tip-right').show();  // 显示手机号格式正确提示
        alert('手机号验证成功！请输入验证码');
        return false;
    });

    // 验证验证码
    $('#verify-code').click(function() {
        var verificationCode = $('#verification-code').val().trim();
        if (verificationCode === '') {
            alert('请输入验证码');
            return false;
        }

        // 验证通过后，跳转到下一步
        window.location.href = 'sign-up-two.html';
    });

    // 表单提交前的验证
    $('form').on('submit', function(e) {
        e.preventDefault();  // 阻止默认提交
        var phone = $('#phone').val().trim();
        if (phone === '') {
            $('.tip1').show();  // 显示请输入手机号提示
            return false;
        } else if (!phone.match(deg)) {
            $('.tip3').show();  // 显示手机号格式错误提示
            return false;
        }

        // 其他表单验证通过后，进行表单提交
        // 可根据实际需求修改
        alert('手机号验证成功，提交表单');
        this.submit();  // 提交表单
    });
});

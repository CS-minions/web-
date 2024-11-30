$(document).ready(function() {
    // 提交按钮点击事件
    $('#feedbackForm').on('submit', function(e) {
        e.preventDefault(); // 阻止表单默认提交
        
        var feedback = $('#feedback').val().trim();
        var phone = $('#phone').val().trim();
        var file = $('input[type="file"]').val();
        
        // 清空之前的错误提示
        $('.error-message').remove();

        // 表单验证
        if (feedback === '') {
            showError('#feedback', '请填写您的反馈！');
            return;
        }

        // 如果填写了手机号，检查格式
        if (phone && !/^1[3-9]\d{9}$/.test(phone)) {
            showError('#phone', '请输入有效的手机号');
            return;
        }

        // 提交成功提示并跳转到主页面
        alert('感谢您的反馈！我们会尽快处理您的问题。');
        window.location.href = '../index.html';

        // 重置表单
        $('#feedbackForm')[0].reset();
    });

    // 输入框获取焦点时，移除错误提示
    $('textarea, input[type="tel"]').on('focus', function() {
        $(this).removeClass('border-red-500');
        $(this).next('.error-message').remove(); // 移除错误提示
    });
    
    // 错误提示函数
    function showError(inputSelector, message) {
        $(inputSelector).addClass('border-red-500'); // 给输入框加红色边框
        $(inputSelector).after('<div class="error-message text-red-500 text-sm">' + message + '</div>'); // 在输入框下方显示错误信息
    }

    // 关闭按钮点击事件
    $('#closeButton').on('click', function() {
        window.location.href = '../index.html'; // 跳转到主页面
    });
});

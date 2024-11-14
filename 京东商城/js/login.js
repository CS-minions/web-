$(document).ready(function(){




/*
$() : 获取document元素
$('.mid2').hide();  隐藏元素
$(this).hide() - 隐藏当前元素
$("p").hide() - 隐藏所有段落
$(".test").hide() - 隐藏所有 class="test" 的所有元素
$("#test").hide() - 隐藏所有 id="test" 的元素

*/
$('.mid2').hide();          //手机&二维码
// $('.mid').hide();
$('.midd').hide();
$('.tipp').hide();



//二维码
/*
		jQuery 动画 - animate() 方法
		jQuery animate() 方法用于创建自定义动画。
		语法：
			$(selector).animate({params},speed,callback);
			必需的 params 参数定义形成动画的 CSS 属性。
			可选的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。
			可选的 callback 参数是动画完成后所执行的函数名称。

		stop() 方法停止当前正在运行的动画。
	*/
// 当鼠标悬停在 .mid-top 元素上时触发的事件处理函数
$('.mid-top').hover(function () {
    // 停止当前正在进行的动画并让 .mid1 元素向左移动至 left: 19px 处，动画时长为 400 毫秒
    $('.mid1').stop().animate({ 'left': '19px' }, 400);
    // 停止当前正在进行的动画并显示 .mid2 元素，并使用 400 毫秒的时间渐现
    $('.mid2').stop().show(400);
}, 
function () {
    // 当鼠标离开 .mid-top 元素时触发的事件处理函数
	
    // 停止当前正在进行的动画并让 .mid1 元素向右移动至 left: 84px 处，动画时长为 400 毫秒
    $('.mid1').stop().animate({ 'left': '84px' }, 400);
    
    // 停止当前正在进行的动画并隐藏 .mid2 元素，并使用 400 毫秒的时间渐隐
    $('.mid2').stop().hide(400);
});

/*
实现了点击 .login-all>ul>li 元素时的事件处理，根据点击的元素添加或移除 redd 类，
并根据索引显示或隐藏对应的 .login-all>div 元素。
同时，还提供了两个函数 getred 和 getgray，用于设置元素的边框样式为红色和灰色。
*/
// 点击 .login-all>ul>li 元素时的事件处理
$('.login-all>ul>li').click(function () {
	// 为当前点击的元素添加 'redd' 类，移除所有兄弟元素的 'redd' 类
	$(this).addClass('redd').siblings().removeClass('redd');
	
	// 获取当前点击元素的索引和兄弟元素的索引
	var index = $(this).index();
	var index1 = $(this).siblings().index();
	
	// 根据索引显示对应的 .login-all>div 元素
	$('.login-all>div').eq(index).show();
	$('.login-all>div').eq(index1).hide();
});

// 设置元素边框为红色的函数
function getred(a) {
	$(a).css('border', '1px solid red');
}

// 设置元素边框为灰色的函数
function getgray(a) {
	$(a).css('border', '1px solid #bdbdbd');
}



// 当点击按钮时触发的事件处理函数
$('button').click(function () {
	var flag = true; // 默认标识符为 true
	
	// 判断输入框 inp1 和 inp2 的值是否为空
	if ($('.inp1').val() == '' && $('.inp2').val() == '') {
		// 隐藏其他提示信息，显示提示信息 tip1
		//Siblings ()是jQuery内置的一个方法，用来寻找所选元素的所有兄弟姐妹
		$('.tip1').siblings('.tipp').hide();
		$('.tip1').show();
		// 设置输入框边框为红色
		getred('.inp1'); 
		getred('.inp2');
		flag = false; // 标识符设为 false
	} else if ($('.inp1').val() == '') {
		// 隐藏其他提示信息，显示提示信息 tip2
		//siblings() 方法返回被选元素的所有同级元素。
		//Siblings ()是jQuery内置的一个方法，用来寻找所选元素的所有兄弟姐妹
		$('.tip2').siblings('.tipp').hide();
		$('.tip2').show();
		// 设置输入框 inp1 的边框为红色，输入框 inp2 的边框为灰色
		getred('.inp1'); 
		getgray('.inp2');
		flag = false; // 标识符设为 false
	} else if ($('.inp2').val() == '') {
		// 隐藏其他提示信息，显示提示信息 tip3
		$('.tip3').siblings('.tipp').hide();
		$('.tip3').show();
		// 设置输入框 inp2 的边框为红色，输入框 inp1 的边框为灰色
		getred('.inp2'); 
		getgray('.inp1');
		flag = false; // 标识符设为 false
	}
	
	return flag; // 返回标识符
});
// 当点击页面中的任意位置时触发的事件处理函数
$('html').click(function () {
    // 隐藏所有类名为 tipp 的元素
    $('.tipp').hide();
});

// 当类名为 midd 的元素中的 input 元素获得焦点时触发的事件处理函数
$('.midd input').focus(function () {
    // 将获得焦点的 input 元素的边框颜色设置为灰色
    $(this).css('border', '1px solid #e4393c');
});

$('.midd input').blur(function () {
    // 将获得焦点的 input 元素的边框颜色设置为灰色
	$(this).css('border', '1px solid #bdbdbd');
});
});
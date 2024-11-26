$('.myjd div').hide(); 				//我的京东
$('.coll>ol').hide();				//企业采购
$('.cutt div').hide();				//客户服务
$('.online div').hide();			//网站导航
$('.user>div').hide();  			//用户
$('.db div').hide();				//地址

/*
这段代码实现了点击左右按钮时，在 .mid>ol 元素上进行图片切换的功能。
通过控制 num 变量来记录当前显示的图片索引，
然后根据点击左右按钮来增加或减少 num 变量的值，并通过动画效果切换图片。

*/
//用户下的轮播
var num = 0; // 初始化图片索引为 0
// 点击左侧按钮切换图片
$('.choose .left').click(function () {
	num--; // 减少索引
	if (num == -1) num = 0; // 限制索引不小于 0
	$('.mid>ol').stop().animate({ 'left': -152 * num + 'px' }, 500); // 切换图片动画
});

// 点击右侧按钮切换图片
$('.choose .right').click(function () {
	num++; // 增加索引
	if (num == 4) num = 3; // 限制索引不大于 3
	$('.mid>ol').stop().animate({ 'left': -152 * num + 'px' }, 500); // 切换图片动画
});

//manu
// 这段代码处理了位于 header>ul>li 下的列表项的悬停事件。
$('header>ul>li').hover(function () {
	// 在鼠标悬停时，检查第一个子元素的 HTML 内容是否不为空
	if ($(this).children().eq(0).html() != '') {
		// 添加 'bgwhite' 类，并显示第一个子元素
		$(this).addClass('bgwhite');
		$(this).children().eq(0).show();
	}
}, function () {
	// 在鼠标移出时，检查第一个子元素的 HTML 内容是否不为空
	if ($(this).children().eq(0).html() != '') {
		// 移除 'bgwhite' 类，并隐藏第一个子元素
		$(this).removeClass('bgwhite');
		$(this).children().eq(0).hide();
	}
});

// 这段代码处理了位于 .db .up dd 内的元素的点击事件。
$('.db .up dd').click(function () {
	// 将 .db>.place 的 HTML 内容设置为被点击元素的 HTML 内容
	$('.db>.place').html($(this).html());
});



/*
	实现了一个简单的图片轮播功能，并且在鼠标悬停时可以切换轮播图片和对应的小圆点效果，增强了用户体验。
*/
//轮播小圆点
// $('.big>li').hide();
// 隐藏所有轮播图片
$('.go1>img').hide();
// 显示第一张轮播图片
$('.go1>img').eq(0).show();

// 初始化轮播计数器和定时器变量
var num1 = -1;
var timer;

// 定义轮播函数
function go1() {
	// 设定定时器，每隔2秒执行一次
	timer = setInterval(function () {
		// 计数器递增
		num1++;
		// 当计数器达到8时重置为0，实现循环轮播
		if (num1 == 8) num1 = 0;
		// 淡出上一张图片，淡入当前轮播图片
		$('.go1>img').eq(num1 - 1).fadeOut();
		$('.go1>img').eq(num1).fadeIn();
		// 调整小圆点的透明度，显示当前对应的小圆点
		$('.small>li').eq(num1).siblings().css('opacity', '0.4');
		$('.small>li').eq(num1).css('opacity', '1');
		// 调整大图下方的轮播信息透明度，显示当前对应的信息
		$('.big>li').eq(num1).siblings().css('opacity', '0');
		$('.big>li').eq(num1).css('opacity', '0.3');
	}, 2000);
}

// 初始调用轮播函数
go1();

// 鼠标悬停在轮播区域时执行的事件
$('.go1').hover(function () {
	// 清除定时器，停止轮播
	clearInterval(timer);
	// 鼠标悬停在小圆点上时的事件
	$('.go1 li').hover(function () {
		// 获取当前小圆点的索引
		var index = $(this).index();
		// 调整小圆点的透明度，显示当前对应的小圆点
		$('.small>li').eq(index).siblings().css('opacity', '0.4');
		$('.small>li').eq(index).css('opacity', '1');
		// 调整小圆点的显示效果
		$(this).siblings().css('opacity', '0');
		$(this).css('opacity', '0.3');
		// 切换显示对应的轮播图片
		$('.go1>img').eq(index).siblings('img').fadeOut();
		$('.go1>img').eq(index).fadeIn();
	}, function () { })
}, function () {
	// 鼠标移出轮播区域时恢复轮播定时器
	go1();
})

// 左箭头点击事件
$('.go1-left').click(function () {
	// 计数器递减
	num1--;
	// 如果计数器减到-2，则重置为7，实现循环轮播
	if (num1 == -2) num1 = 7;
	// 切换显示对应的轮播图片
	$('.go1>img').eq(num1).siblings('img').fadeOut();
	$('.go1>img').eq(num1).fadeIn();
	// 调整小圆点的透明度，显示当前对应的小圆点
	$('.small>li').eq(num1).siblings().css('opacity', '0.4');
	$('.small>li').eq(num1).css('opacity', '1');
	// 调整大图下方的轮播信息透明度，显示当前对应的信息
	$('.big>li').eq(num1).siblings().css('opacity', '0');
	$('.big>li').eq(num1).css('opacity', '0.3');
});

/*
	添加了左右箭头点击事件，实现了点击切换轮播图片的功能，
	并对鼠标悬停在箭头上的效果进行了定义。同时，初始化了第二个轮播区域的显示和隐藏逻辑。
*/
// 右箭头点击事件
$('.go1-right').click(function () {
	// 计数器递增
	num1++;
	// 如果计数器达到8，则重置为0，实现循环轮播
	if (num1 == 8) num1 = 0;
	// 切换显示对应的轮播图片
	$('.go1>img').eq(num1).siblings('img').fadeOut();
	$('.go1>img').eq(num1).fadeIn();
	// 调整小圆点的透明度，显示当前对应的小圆点
	$('.small>li').eq(num1).siblings().css('opacity', '0.4');
	$('.small>li').eq(num1).css('opacity', '1');
	// 调整大图下方的轮播信息透明度，显示当前对应的信息
	$('.big>li').eq(num1).siblings().css('opacity', '0');
	$('.big>li').eq(num1).css('opacity', '0.3');
});

// 鼠标悬停在左右箭头上的效果
$('.go1 span').hover(function () {
	$(this).css('background', 'rgba(0,0,0,0.6)');
}, function () {
	$(this).css('background', 'rgba(0,0,0,0.2)');
});

// 鼠标悬停在另一个轮播区域的箭头上的效果
$('.go2 span').hover(function () {
	$(this).css('background', 'rgba(0,0,0,0.6)');
}, function () {
	$(this).css('background', 'rgba(0,0,0,0.2)');
});

// 初始化隐藏第二个轮播区域的所有内容
$('.go2 div').hide();
// 显示第二个轮播区域的第二个div内容
$('.go2 div').eq(1).show();
// 隐藏第二个轮播区域的所有span标签
$('.go2 span').hide();


// 初始化第二个轮播区域的计数器和定时器变量
var n = 0;
var timer1;

// 定义第二个轮播函数
function go2() {
	// 设定定时器，每隔10秒执行一次
	timer1 = setInterval(function () {
		// 计数器递增
		n++;
		// 当计数器达到3时重置为0，实现循环轮播
		if (n == 3) n = 0;
		// 淡出上一张图片，淡入当前轮播图片
		$('.go2>div').eq(n).siblings('div').fadeOut();
		$('.go2>div').eq(n).fadeIn();
	}, 10000);
}

// 初始调用第二个轮播函数
go2();

// 鼠标进入第二个轮播区域时执行的事件
$('.go2').mouseenter(function () {
	// 清除第二个轮播定时器，停止轮播
	clearInterval(timer1);
	// 显示第二个轮播区域的箭头
	$('.go2 span').show();
});

// 鼠标离开第二个轮播区域时执行的事件
$('.go2').mouseleave(function () {
	// 隐藏第二个轮播区域的箭头
	$('.go2 span').hide();
	// 恢复第二个轮播定时器，继续轮播
	go2();
});

// 左箭头点击事件
$('.go2-left').click(function () {
	// 计数器递减
	n--;
	// 如果计数器减到-1，则重置为2，实现循环轮播
	if (n == -1) n = 2;
	// 切换显示对应的轮播图片
	$('.go2>div').eq(n).siblings('div').fadeOut();
	$('.go2>div').eq(n).fadeIn();
});

// 右箭头点击事件
$('.go2-right').click(function () {
	// 计数器递增
	n++;
	// 如果计数器达到3，则重置为0，实现循环轮播
	if (n == 3) n = 0;
	// 切换显示对应的轮播图片
	$('.go2>div').eq(n).siblings('div').fadeOut();
	$('.go2>div').eq(n).fadeIn();
});



/*
	此代码遍历图像文件名（arr）数组，并将每个span元素的背景图像设置在.one类中的li元素内。
	每个背景图像URL都是基于数组中的文件名构建的，并应用额外的CSS样式来调整背景大小。
*/
// 隐藏所有class为two的元素
//$('.two').hide();

// 图片数组
var arr = ['1.png', '3.png', '5.png', '7.png', '9.png', '11.png', '13.png', '15.png', '17.png', '19.png', '21.png', '23.png'];

// 循环遍历数组
for (var i = 0; i < arr.length; i++) {
	// 设置每个li元素下子元素span的背景图片
	$('.one li').eq(i).children('span')
		.css('background', 'url(images/index/' + arr[i] + ')')
		.css('background-size', '24px 24px'); // 设置背景图片大小为24px x 24px
}


//banner title
/*
	在鼠标悬停在 .banner>ul>li 元素上时显示对应的 .title 元素，并在鼠标移出时隐藏该 .title 元素。
*/
// 隐藏所有class为title的元素
$('.title').hide();

// 定义变量k
var k;

// 鼠标悬停在.banner>ul>li元素上时执行的事件
$('.banner>ul>li').hover(function () {
	// 获取当前li元素的索引
	k = $(this).index();
	// 隐藏除了当前索引对应的.title元素之外的所有.title元素，显示当前索引对应的.title元素
	$('.title').eq(k).siblings('.title').hide();
	$('.title').eq(k).show();
}, function () {
	// 鼠标移出时隐藏当前索引对应的.title元素
	$('.title').eq(k).hide();
});


//middle
/*
这段代码实现了一个轮播图的基本功能：
	- 点击左右按钮可以切换图片，左侧按钮点击时图片向左移动，右侧按钮点击时图片向右移动。
	- 使用了变量 m 来记录当前显示的图片索引。
	- 当 m 达到临界值时（0和3），会进行特殊处理，即将 ul 元素的 left 属性设置为对应的位置。
	- hover 方法用于鼠标悬停在 span 元素上时改变背景色。
*/

// 定义变量m并初始化为0
var m = 0;

// 点击事件处理函数：左侧按钮
$('.mid-left').click(function () {
	m--; // m减1
	if (m == -1) { // 如果m减到-1
		m = 3; // 将m设为3
		$('.middle>ul').css({ 'left': '-812' * m + 'px' }) // 设置ul的left属性
		m = 2; // 将m设为2
	};
	$('.middle ul').stop().animate({ 'left': '-812' * m + 'px' }, 1000); // 动画效果移动ul的left属性
});

// 点击事件处理函数：右侧按钮
$('.mid-right').click(function () {
	m++; // m加1
	if (m == 4) { // 如果m加到4
		m = 0; // 将m设为0
		$('.middle>ul').css({ 'left': '-812' * m + 'px' }) // 设置ul的left属性
		m = 1; // 将m设为1
	};
	$('.middle>ul').stop().animate({ 'left': '-812' * m + 'px' }, 1000); // 动画效果移动ul的left属性
});

// 鼠标悬停事件处理函数：span元素
$('.middle>span').hover(function () {
	$(this).css('background', 'rgba(0,0,0,0.6)'); // 鼠标悬停时设置背景色
}, function () {
	$(this).css('background', 'rgba(0,0,0,0.2)'); // 鼠标移出时设置背景色
});




//secondkill 第二个轮播
/*
这段代码实现了一个自动轮播的功能：
每隔1秒自动切换一次图片。
使用变量 killnum 记录当前显示的图片索引，当 killnum 达到临界值3时重置为0。
根据 killnum 的值来设置图片的显示位置和指示器的样式。
*/
// 定义变量killnum并初始化为0
var killnum = 0;

// 每隔1秒执行一次的定时器
var time2 = setInterval(function () {
	killnum++; // killnum加1
	if (killnum == 3) { // 如果killnum达到3
		killnum = 0; // 将killnum设为0
		$('.behind>ul').css('left', -178 * killnum + 'px'); // 设置ul的left属性
		killnum = 1; // 将killnum设为1
	}
	if (killnum == 0 || killnum == 2) { // 如果killnum为0或2
		$('.behind>ol').children().eq(0).css('background', 'red'); // 设置第一个li的背景色
		$('.behind>ol').children().eq(1).css('background', '#a1a1a1'); // 设置第二个li的背景色
	} else { // 如果killnum为1
		$('.behind>ol').children().eq(0).css('background', '#a1a1a1'); // 设置第一个li的背景色
		$('.behind>ol').children().eq(1).css('background', 'red'); // 设置第二个li的背景色
	}
	$('.behind>ul').animate({ 'left': -178 * killnum + 'px' }, 500); // 动画效果移动ul的left属性
}, 1000);




//发现好货
var tt = 0; // 初始化变量 tt 为 0，用于跟踪水平位置调整。
var time2; // 声明变量 time2 用于存储定时器的引用。

function toto() {
	time2 = setInterval(function () { // 设置间隔函数，并将其赋给 time2。
		tt++; // tt 每次增加 1。
		if (tt >= 1200) { tt = 0; } // 如果 tt 达到或超过 1200，将其重置为 0。
		$('.lun>ul').css('left', -1 * tt + 'px'); // 更新 .lun>ul 元素的 CSS 左侧属性，实现滚动效果。
	}, 10); // 每 10 毫秒执行一次。
}

toto(); // 立即调用 toto 函数以启动滚动。

$('.good2').hover(function () { // 定义 .good2 元素的悬停行为。
	clearInterval(time2); // 当鼠标悬停在 .good2 上时，清除定时器（停止滚动）。
}, function () {
	toto(); // 当鼠标离开 .good2 时，重新调用 toto 函数（恢复滚动）。
});

//固定栏
$('.fix1').hide(); // 隐藏 .fix1 元素。
$(window).scroll(function (event) { // 绑定滚动事件处理函数。
	if ($(window).scrollTop() >= 500) { // 如果滚动距离大于等于 500 像素。
		$('.fix1').slideDown(); // 下拉显示 .fix1 元素。
	} else {
		$('.fix1').slideUp(); // 向上收起隐藏 .fix1 元素。
	}
});


$('.fix3 li').eq(1).hover(function () { // 当鼠标悬停在 .fix3 下的第二个 li 元素时执行以下函数。
	$(this).css('background', 'url("images/index/aa.png")'); // 设置背景为指定图片。
	$(this).css('background-size', '56px 56px'); // 设置背景大小为 56px x 56px。
}, function () { // 当鼠标移出时执行以下函数。
	$(this).css('background', 'url("images/index/aaa.gif")'); // 设置背景为另一张指定动态图片。
	$(this).css('background-size', '56px 56px'); // 设置背景大小为 56px x 56px。
});

$('.fix3 li').eq(7).hide(); // 隐藏 .fix3 下的第八个 li 元素。
$(window).scroll(function (event) { // 绑定滚动事件处理函数。
	if ($(window).scrollTop() >= 1200) { // 如果滚动距离大于等于 1200 像素。
		$('.fix3 li').eq(7).slideDown(); // 下拉显示 .fix3 下的第八个 li 元素。
	} else {
		$('.fix3 li').eq(7).slideUp(); // 向上收起隐藏 .fix3 下的第八个 li 元素。
	}
});

$('.fix3 li').eq(7).click(function () { // 给 .fix3 下的第八个 li 元素绑定点击事件。
	$('html,body').animate({ 'scrollTop': 0 }); // 平滑滚动到页面顶部。
});

//侧边栏

var secondkill = $('.secondkill').offset().top; // 获取类名为 .secondkill 的元素距离页面顶部的偏移量。
var newyear = $('.newyear').offset().top; // 获取类名为 .newyear 的元素距离页面顶部的偏移量。
var good = $('.good').offset().top; // 获取类名为 .good 的元素距离页面顶部的偏移量。

$('.fix3 li').click(function () { // 给 .fix3 下的列表项绑定点击事件。
	var index = $(this).index(); // 获取被点击列表项的索引。
	if (index == 0) { // 如果点击的是第一个列表项。
		$('html,body').animate({ 'scrollTop': secondkill - 100 }); // 平滑滚动到 .secondkill 元素的位置减去 100 像素。
	} else if (index == 1) { // 如果点击的是第二个列表项。
		$('html,body').animate({ 'scrollTop': newyear - 100 }); // 平滑滚动到 .newyear 元素的位置减去 100 像素。
	} else if (index == 2) { // 如果点击的是第三个列表项。
		$('html,body').animate({ 'scrollTop': good - 100 }); // 平滑滚动到 .good 元素的位置减去 100 像素。
	}
});


setInterval(function () { // 每隔一秒执行以下函数。
	var Time = new Date(); // 获取当前时间。
	var key = new Date('2024,12,31'); // 设置目标日期为 2024 年 12 月 31 日。
	var now = Time.getTime(); // 获取当前时间的毫秒数。
	var center = key.getTime() - now; // 计算离目标日期的剩余毫秒数。
	var hours = parseInt(center / 3600000); // 计算剩余小时数。
	var minutes = parseInt((center % 3600000) / 60000); // 计算剩余分钟数。
	var seconds = parseInt(((center % 3600000) % 60000) / 1000); // 计算剩余秒数。
	$('.hours').html(hours); // 将剩余小时数显示在对应元素中。
	$('.minutes').html(minutes); // 将剩余分钟数显示在对应元素中。
	$('.seconds').html(seconds); // 将剩余秒数显示在对应元素中。
}, 1000); // 每隔一秒执行一次。

// 操作过程：
// 引入或者加载jquey模块
import {} from "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.js";

const $login = $('.login'); //登录前显示
const $admin = $('.admin'); //登录成功显示的
const $btn = $('.admin a'); //退出


//通过本地存储的值判断是否登录成
if (window.localStorage.getItem('loginname')) {
    $admin.show();
    $login.hide();
    $('.admin span').html(window.localStorage.getItem('loginname'));
}

//点击退出按钮，让本地存储清空。
$btn.on('click', function() {
    $admin.hide();
    $login.show();
    window.localStorage.removeItem('loginname'); //删除本地存储
});



// 轮播图
const $piclist = $('.lunbo ul li'); //九张图
const $btnlist = $('.lunbo ol li'); //九个圆圈
const $lunbo = $('.lunbo'); //外面大盒子
const $leftarrow = $('#leftarrow'); //左箭头
const $rightarrow = $('#rightarrow'); //右箭头


let $index = 0; //存储索引

let $timer = null; //设置定时器返回值

$btnlist.on('mouseover', function() {
    $index = $(this).index();
    lunbo();
});


// 点击箭头切换

$rightarrow.on('click', function() {
    $index++;
    if ($index > $piclist.length - 1) {
        $index = 0;
    }
    lunbo();
})

$leftarrow.on('click', function() {
    $index--;
    if ($index < 0) {
        $index = $piclist.length - 1;
    }
    lunbo();
})


// 重复代码，用函数封装切换过程
function lunbo() {
    $btnlist.eq($index).addClass('active').siblings('ol li').removeClass('active');
    $piclist.eq($index).stop(true).animate({
        opacity: 1
    }).siblings('ul li').stop(true).animate({
        opacity: 0
    })
}


// 自动轮播
$timer = setInterval(function() {
    $rightarrow.click();
}, 3000)


// 鼠标移入大盒子定时器关闭，轮播暂停，鼠标离开定时器开启，轮播继续
$lunbo.hover(function() {
    clearInterval($timer);
}, function() {
    $timer = setInterval(function() {
        $rightarrow.click();
    }, 3000)
})


// 疯狂抢购Tap切换
const $Tap = $('.indexTabNav .tapul li');
const $Item = $('.indexTabCon .item');

let $timer1 = null;
$Tap.on('mouseover', function() {
    $timer1 = setTimeout(() => {
        $(this).addClass('active').siblings($Tap).removeClass('active');
        $Item.eq($(this).index()).addClass('show').siblings($Item).removeClass('show');
    }, 100);
});


$Tap.on('mouseout', function() {
    clearTimeout($timer1);
});
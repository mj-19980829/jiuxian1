//1.引入jquery模块
import {} from 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.js';

//2.在详情页面获取商品的sid - 列表传入一个sid到详情页。
let $sid = location.search.substring(1).split('=')[1];

// 如果sid不存在，默认sid为1
if (!$sid) {
    $sid = 1;
}



const $spic = $('#spic'); //小图
const $smallpic = $('#spic img'); //小图里面的图片
const $bpic = $('#bpic'); //小图
const $loadtitle = $('.title'); //标题loadpcp
const $loadpcp = $('.price'); //价格
const $list = $('#list ul'); //存放小图
const $sf = $('#sf');
const $bf = $('#bf');
const $goodsinfo = $('.goodsinfo');
let $liwidth = 0; //li的宽度
let $lilenth = 0; //所有li的个数


//2.将当前的sid传给后端，后端返回sid对应的数据给前端。
$.ajax({
    url: 'http://10.31.165.15/jiuxian/php/getsid.php',
    data: {
        datasid: $sid
    },
    dataType: 'json'
}).done(function(data) {
    $smallpic.attr('src', data.picurl);
    $bpic.attr('src', data.picurl)
    $loadtitle.html(data.title);
    $loadpcp.html(data.price);

    //渲染放大镜下面的小图
    let $picarr = data.piclisturl.split(','); //数组
    let $strHtml = '';
    $.each($picarr, function(index, value) {
        $strHtml += ` 
                <li>
                    <img src="${value}"/>    
                </li>
            `;
        $list.html($strHtml);
    });

    $lilenth = $('#list ul li').length;
    if ($lilenth < 6) {
        $('#right').css('color', '#fff');
    }

    $liwidth = $('#list ul li').eq(0).outerWidth(true); //存储一个li的宽度
});
//3.放大镜效果。
//3.1.鼠标移入小图，显示小放和大放
$spic.hover(function() {
    $sf.css('visibility', 'visible');
    $bf.css('visibility', 'visible');
    //3.2.计算小放的尺寸和比例
    $sf.width($spic.outerWidth() * $bf.outerWidth() / $bpic.outerWidth());
    $sf.height($spic.outerHeight() * $bf.outerHeight() / $bpic.outerHeight());
    let $bili = $bpic.outerWidth() / $spic.outerWidth(); //比例
    //3.3.鼠标在小图里面移动，小放跟随鼠标
    $spic.on('mousemove', function(ev) {
        let $leftvalue = ev.pageX - $goodsinfo.offset().left - $sf.outerWidth() / 2;
        let $topvalue = ev.pageY - $goodsinfo.offset().top - $sf.outerHeight() / 2;
        if ($leftvalue < 0) {
            $leftvalue = 0;
        } else if ($leftvalue >= $spic.outerWidth() - $sf.outerWidth()) {
            $leftvalue = $spic.outerWidth() - $sf.outerWidth();
        }

        if ($topvalue < 0) {
            $topvalue = 0;
        } else if ($topvalue >= $spic.outerHeight() - $sf.outerHeight()) {
            $topvalue = $spic.outerHeight() - $sf.outerHeight();
        }

        $sf.css({
            left: $leftvalue,
            top: $topvalue
        });

        $bpic.css({
            left: -$bili * $leftvalue,
            top: -$bili * $topvalue
        });
    });
}, function() {
    $sf.css('visibility', 'hidden');
    $bf.css('visibility', 'hidden');
});

const $listul = $('#list ul');
$listul.on('mouseover', 'li', function() {
    let $url = $(this).find('img').attr('src');

    $smallpic.attr('src', $url);
    $bpic.attr('src', $url);
});



let $num = 6;
$('#right').on('click', function() {
    if ($lilenth > $num) {
        $num++;
        $('#left').css('color', '#333');
        if ($num === $lilenth) {
            $('#right').css('color', '#fff');
        }
    }
    $listul.animate({
        left: -$liwidth * ($num - 6)
    });
});
$('#left').on('click', function() {
    if ($num > 6) {
        $num--;
        $('#right').css('color', '#333');
        if ($num === 6) {
            $('#left').css('color', '#fff');
        }
    }
    $listul.animate({
        left: -$liwidth * ($num - 6)
    });
});

let $arrsid = [];
let $arrnum = [];


function getLocalStorage() {
    if (localStorage.getItem('localsid') && localStorage.getItem('localnum')) {
        $arrsid = localStorage.getItem('localsid').split(',');
        $arrnum = localStorage.getItem('localnum').split(',');
    } else {
        $arrsid = [];
        $arrnum = [];
    }
}


const $btn = $('.bt button');
const $count = $('.bx-end input');
const $icoup = $('.num .ico1');
const $icodown = $('.num .ico2');
const $bt2 = $('.bx-bot .bt2');
const $zzc = $('.zzc');
$btn.on('click', function() {
    getLocalStorage()
    $bt2.css('display', 'block');
    $zzc.css('display', 'block');
    if ($arrsid.includes($sid)) {
        let $index = $arrsid.indexOf($sid);
        $arrnum[$index] = parseInt($arrnum[$index]) + parseInt($count.val());
        localStorage.setItem('localnum', $arrnum);
    } else {
        $arrsid.push($sid);
        localStorage.setItem('localsid', $arrsid);
        $arrnum.push($count.val());
        localStorage.setItem('localnum', $arrnum);
    }
    // alert(1111);
});



// ----------------------------


// 头部
const $search = $('.searchHome .search-form')
$search.on('focus', function() {
    $search.removeAttr('placeholder');
})

// 底部
const $form = $('.ftRight-form');
const $span = $('.ftRight-form span');
const $input = $('.ftRight-form input');
$form.on('click', function() {
    $span.css('display', 'none');
    $input.focus();
});



const $numinput = $('.num input');
const $ico1 = $('.num .ico1');
const $ico2 = $('.num .ico2');
let $innum = Number($numinput.val());

$ico1.on('click', function() {
    $numinput.val(++$innum);
});


$ico2.on('click', function() {
    $numinput.val(--$innum);
    if ($innum <= 1) {
        $innum = 1;
        $numinput.val($innum);
    }
});


$numinput.on('input', function() {
    let $reg = /^\d+$/; //行首行尾匹配一个或者多个数字
    if (!$reg.test($(this).val())) {
        $(this).val(1); //如果不满足条件，值为1
    }
});
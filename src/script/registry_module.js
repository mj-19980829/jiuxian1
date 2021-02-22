// 表单验证
import {} from "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.js";
// 获取元素
const $registry = $('#registry'); //form表单
const $telnum = $('.telnum'); //手机号
const $yzm = $('.yzm'); //验证码
const $password = $('.password'); //密码
const $repassword = $('.repassword'); //确认密码
const $oSpan = $('form span');


let $telnumflag = true;
let $yzmflag = true;
let $passwordflag = true;
let $repasswordflag = true;

$registry.on('submit', function() {
    if ($telnum.val() === $telnum.html()) {
        $oSpan.eq(0).html('手机号不能为空')
        $oSpan.eq(0).css('color', '#fff');
        $telnumflag = false;
    }
    if ($yzm.val() === $yzm.html()) {
        $oSpan.eq(1).html('请输入验证码');
        $oSpan.eq(1).css('color', '#fff');
        $yzmflag = false;
    }
    if ($password.val() === $password.html()) {
        $oSpan.eq(2).html('请输入密码');
        $oSpan.eq(2).css('color', '#fff');
        $passwordflag = false;
    }
    if ($repassword.val() === $repassword.html()) {
        $oSpan.eq(3).html('请再次输入密码');
        $oSpan.eq(3).css('color', '#fff');
        $repasswordflag = false;
    }
    if (!$telnumflag || !$yzmflag || !$passwordflag || !$repasswordflag) {
        return false;
    }
})

// 验证手机号
// 得到焦点
$telnum.on('focus', function() {
    $oSpan.eq(0).html('请输入11位手机号');
    $oSpan.eq(0).css({
        color: '#fff',
        background: '#ccc',
    })
})

// 失去焦点
$telnum.on('blur', function() {
    if ($(this).val() !== $(this).html()) {
        let $reg = /^1[3578]\d{9}$/;
        if ($reg.test($telnum.val())) {
            $oSpan.eq(0).html('√');
            $oSpan.eq(0).css({
                color: '#fff',
                width: '22px',
                background: 'green'
            });
            $telnumflag = true;
        } else {
            $oSpan.eq(0).html('手机号码格式有误');
            $oSpan.eq(0).css('color', 'red');
            $telnumflag = false;
        }
    } else {
        $oSpan.eq(0).html('手机号码不能为空');
        $oSpan.eq(0).css('color', 'red');
        $telnumflag = false;
    }
})


// 验证码验证
// 得到焦点
$yzm.on('focus', function() {
    $oSpan.eq(1).html('请输入四位字母验证码');
    $oSpan.eq(1).css({
        color: '#fff',
        background: '#ccc',
    })
})


// 失去焦点
$yzm.on('blur', function() {
    if ($(this).val() !== $(this).html()) {
        let $reg = /^[A-Za-z0-9]{4}$/;
        if ($reg.test($yzm.val())) {
            $oSpan.eq(1).html('√');
            $oSpan.eq(1).css({
                color: '#fff',
                background: 'green',
                width: '22px'
            });
            $yzmflag = true;
        } else {
            $oSpan.eq(1).html('验证码输入有误');
            $oSpan.eq(1).css('color', 'red');
            $yzmflag = false;
        }
    } else {
        $oSpan.eq(1).html('验证码不能为空');
        $oSpan.eq(1).css('color', 'red');
        $yzmflag = false;
    }
})


// 密码验证
// 得到焦点
$password.on('input', function() {
    if ($(this).val().length >= 8 || $(this).val().length <= 20) {
        let $reg1 = /\d+/;
        let $reg2 = /[a-z]+/;
        let $reg3 = /[A-Z]+/;
        let $reg4 = /[\W\_]+/;

        let $strkind = 0;
        if ($reg1.test($(this).val())) {
            $strkind++;
        }
        if ($reg2.test($(this).val())) {
            $strkind++;
        }
        if ($reg3.test($(this).val())) {
            $strkind++;
        }
        if ($reg4.test($(this).val())) {
            $strkind++;
        }
        switch ($strkind) {
            case 1:
                $oSpan.eq(2).html('弱');
                $oSpan.eq(2).css({
                    color: '#fff',
                    width: '22px',
                    background: 'red'
                });
                $passwordflag = false;
                break;
            case 2:
            case 3:
                $oSpan.eq(2).html('中');
                $oSpan.eq(2).css({
                    color: '#fff',
                    width: '22px',
                    background: 'orange'
                });
                $passwordflag = true;
                break;
            case 4:
                $oSpan.eq(2).html('强');
                $oSpan.eq(2).css({
                    color: '#fff',
                    width: '22px',
                    background: 'green'
                });
                $passwordflag = true;
                break;
        }
    } else {
        $oSpan.eq(2).html('密码长度有误');
        $oSpan.eq(2).css({
            color: 'red',
            width: '22px'
        });
        $passwordflag = false;
    }
})

// 失去焦点
$password.on('blur', function() {
    if ($(this).val() !== $(this).html()) {
        if ($passwordflag) {
            $oSpan.eq(2).html('√');
            $oSpan.eq(2).css({
                color: '#fff',
                width: '22px'
            })
            $passwordflag = true;
        }
    } else {
        $oSpan.eq(2).html('密码不能为空');
        $oSpan.eq(2).css({
            color: 'red',
            background: '#ccc'
        });
        $passwordflag = false;
    }
});




// 确认密码
$repassword.on('focus', function() {
    $oSpan.eq(3).html('二次密码需要相同');
    $oSpan.eq(3).css({
        color: '#fff',
        background: '#ccc'
    })
});



// 确认密码得到焦点
$repassword.on('input', function() {
    if ($(this).val().length >= 8 || $(this).val().length <= 20) {
        let $reg1 = /\d+/;
        let $reg2 = /[a-z]+/;
        let $reg3 = /[A-Z]+/;
        let $reg4 = /[\W\_]+/;
        let $strkind = 0;
        if ($reg1.test($(this).val())) {
            $strkind++;
        }
        if ($reg2.test($(this).val())) {
            $strkind++;
        }
        if ($reg3.test($(this).val())) {
            $strkind++;
        }
        if ($reg4.test($(this).val())) {
            $strkind++;
        }
    } else {
        $oSpan.eq(3).html('密码长度有误');
        $oSpan.eq(3).css('color', '#fff');
        $passwordflag = false;
    }
})

// 失去焦点

$repassword.on('blur', function() {
    if ($(this).val() !== $(this).html() && $(this).val() === $password.val()) {
        if ($passwordflag) {
            $oSpan.eq(3).html('√');
            $oSpan.eq(3).css({
                color: '#fff',
                width: '22px',
                background: 'green'
            })
            $passwordflag = true;
        }

    } else {
        $oSpan.eq(3).html('密码错误');
        $oSpan.eq(3).css({
            color: 'red',
            width: 'auto',
            background: '#ccc'
        })
        $passwordflag = false;
    }
});


let $flag = true;


$telnum.on('blur', function() {
    $.ajax({
        type: 'post',
        url: 'http://10.31.165.15/jiuxian/php/reg.php',
        data: {
            telnum: $telnum.val()
        }
    }).done(function(data) {
        if (data === 'true') {
            $oSpan.eq(0).html('此手机号已被注册');
            $oSpan.eq(0).css({
                width: 'auto',
                color: 'red',
                background: '#ccc'
            });
            $flag = false;
        } else if (data === 'false') {
            $oSpan.eq(0).html('√');
            $oSpan.eq(0).css({
                background: 'green'
            });
            $flag = true;
        }
    });
});


$registry.on('submit', function() {
    if (!$flag) {
        return false;
    }
});
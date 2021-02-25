// 操作过程：
// 引入或者加载jquey模块
import {} from "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.js";




const $btn = $('.btn');
const $telnum = $('.telnum');
const $password = $('.password');
const $spana = $('.p1 span');
const $spanb = $('.p2 span');
$btn.on('click', function() {
    // alert(1)
    $.ajax({
        type: 'post',
        url: 'http://10.31.165.15/jiuxian/php/login.php',
        data: {
            telnum: $telnum.val(),
            password: $password.val()
        }
    }).done(function(data) {
        if (data === 'true') {
            window.localStorage.setItem('loginname', $telnum.val());
            location.href = './index1.html';
        } else {
            alert('用户名或者密码错误');
            $password.val('');
        }
    })
});


$telnum.on('blur', function() {
    $spana.html('√');
    $spana.css('color', 'green');
})

$password.on('blur', function() {
    $spanb.html('√');
    $spanb.css('color', 'green');
})
<?php
include "conn.php";

if(isset($_POST['telnum'])){
    $telnum = $_POST['telnum'];
    $result=$conn->query("SELECT * FROM registry1 WHERE telnum = '$telnum'");
    if($result->fetch_assoc()){
        echo 'true';
    }else{
        echo 'false';
    }
}

if(isset($_POST['submit'])){
    $telnum=$_POST['telnum'];
    $yzm=$_POST['yzm'];
    $password=sha1($_POST['password']);
    $repassword=sha1($_POST['repassword']);

    echo '$telnum';

    $conn->query("insert registry1 values(null,'$telnum','$yzm','$password','$repassword')");

    header('location:http://10.31.165.15/jiuxian/src/login.html');

}
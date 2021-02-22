<?php
//准备list页面的数据
//1.连接数据库
include "conn.php";


//2.查询渲染数据
$result=$conn->query("select * from taobaogoods"); //获取所有的数据
$num = $result->num_rows; //记录集的总条数   40

$pagesize = 15; //单个页面展示的数据条数 自定义每页的条数

$pagenum = ceil($num / $pagesize); //获取页数，一定选择向上取整。 3页

//获取前端的传来的页码，根据页码查询对应的数据，返回给前端。
if (isset($_GET['page'])) {//判断前端传入的页面是否存在，
    $pagevalue = $_GET['page'];//获取页面
} else {
    $pagevalue = 1;//默认为1
}

$page = ($pagevalue - 1) * $pagesize; 
$sql1 = "select * from taobaogoods limit $page,$pagesize";
$res = $conn->query($sql1);

$arr = array();
for ($i = 0; $i < $res->num_rows; $i++) {
    $arr[$i] = $res->fetch_assoc();
}
//输出复杂接口
class pagedata{

}
$page = new pagedata();//实例化对象
$page->pagesize =  $pagenum; //将页数传递给实例对象
$page->pagecontent = $arr;//将数据传递给实例对象
echo json_encode($page);//接口返回总的页数和当页对应的数据。




<?php
include './mysql.php';

$password = $_GET['password'];
$id = $_GET['id'];

$sql = "update manager set m_password = '$password' where m_id = $id";
$res = mysql_query($sql);//执行SQL => 结果

print_r("修改密码完毕!");
?>
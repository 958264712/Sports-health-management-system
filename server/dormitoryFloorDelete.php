<?php
include './mysql.php';
$id = $_GET['id'];
$sql = "delete from tenant where t_id = ${id} ";
$res = mysql_query($sql);
print_r("删除成功！");

?>
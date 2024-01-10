<?php
include './mysql.php';
$id = $_GET['id'];
$sql = "select * from  manager where m_id = $id ";
$res = mysql_query($sql);
	$row=mysql_fetch_assoc($res);
	print_r(json_encode($row));
?>
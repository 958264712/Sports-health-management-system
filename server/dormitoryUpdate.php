<?php
	include './mysql.php';
	$id=$_GET["id"];
	$sql="select * from floor inner join dormitory where d_id=$id";
	$res=mysql_query($sql);
	$row=mysql_fetch_assoc($res);
	print_r(json_encode($row));
?>
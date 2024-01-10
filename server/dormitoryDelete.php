<?php
	include "./mysql.php";
	$id=$_GET['id'];
	$sql="delete from dormitory where d_id=$id";
	$res=mysql_query($sql);
	
?>
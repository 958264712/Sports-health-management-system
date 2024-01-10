<?php
	include './mysql.php';
	$id=$_POST["id"];
	$address=$_POST["address"];
	$rent=$_POST["rent"];
	$status=$_POST["status"];
	$floor=$_POST["floor"];
	$type=$_POST["type"];

	$sql="insert into dormitory value(null,'$address','$type','$rent','$status','$floor')";
	$res=mysql_query($sql);
?>
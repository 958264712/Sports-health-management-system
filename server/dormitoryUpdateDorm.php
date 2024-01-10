<?php
	include "./mysql.php";
	$id=$_POST["id"];
	$address=$_POST["address"];
	$rent=$_POST["rent"];
	$status=$_POST["status"];
	$floor=$_POST["floor"];
	$type=$_POST["type"];

	$sql="update dormitory set d_address='$address',d_type='$type',d_rent='$rent',d_status='$status',d_floor='$floor' where d_id=$id";
	$res=mysql_query($sql);
	print_r($res);
?>
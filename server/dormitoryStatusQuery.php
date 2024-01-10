<?php
	include './mysql.php';
	$status=$_GET['status'];
	$sql="select * from dormitory inner join floor where dormitory.d_floor=floor.Id and d_status='$status'";
	$res=mysql_query($sql);
	$arr=array();
	while($row=mysql_fetch_assoc($res)){
		array_push($arr,$row);
	}
	print_r(json_encode($arr));
?>
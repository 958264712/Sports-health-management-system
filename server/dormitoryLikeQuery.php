<?php
	include './mysql.php';
	$name=$_GET["name"];
	
	$sql="select * from floor inner join dormitory where dormitory.d_floor=floor.id and dormitory.d_address  like '%$name%' ";

	$res=mysql_query($sql);
	$arr=array();
	while($row = mysql_fetch_assoc($res)){
		array_push($arr,$row);
	}
	print_r(json_encode($arr));
?>
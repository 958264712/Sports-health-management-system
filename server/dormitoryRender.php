<?php
	include "./mysql.php";
	$sql="select * from floor inner join dormitory where dormitory.d_floor=floor.id";
	$res=mysql_query($sql);
	$arr=array();
	while($row = mysql_fetch_assoc($res)){
		array_push($arr,$row);
	}
		print_r(json_encode($arr));
	
?>
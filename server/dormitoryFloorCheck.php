<?php
	include './mysql.php';
	$Id=$_GET["Id"];
	$sql="select * from floor inner join tenant where tenant.t_floor=floor.Id and floor.Id  = $Id ";
	$res=mysql_query($sql);
	$arr=array();
	while($row = mysql_fetch_assoc($res)){
		array_push($arr,$row);
	}
	print_r(json_encode($arr));
?>
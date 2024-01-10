
<?php
	include "./mysql.php";
	$id=$_POST["id"];
	$address=$_POST["address"];
	$name=$_POST["name"];
	$phone=$_POST["phone"];
	$gender=$_POST["gender"];
	$age=$_POST["age"];
	$floor=$_POST["floor"];
	$ifPet=$_POST["ifPet"];

	$sql="update tenant set t_address='$address',t_name='$name',t_ifPet='$ifPet',t_phone='$phone',t_floor='$floor',t_age=$age,t_gender='$gender' where t_id=$id";
	$res=mysql_query($sql);
	print_r($res);
?>
<?php
	include "./mysql.php";
	$id=$_POST["id"];
	$username=$_POST["username"];
	$name=$_POST["name"];
	$phone=$_POST["phone"];
	$gender=$_POST["gender"];
	$age=$_POST["age"];

	$sql="update manager set m_name='$name',m_phone='$phone',m_username='$username',m_age=$age,m_gender='$gender'where m_id=$id";
	$res=mysql_query($sql);
	print_r($res);
?>
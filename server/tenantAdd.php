<?php
include './mysql.php';

$username = $_POST['username'];
$phone = $_POST['phone'];
$age = $_POST['age'];
$gender = $_POST['gender'];
$ifPet = $_POST['ifPet'];
$address = $_POST['address'];
$name = $_POST['name'];
$sql = "insert into tenant value (null,'$username','$phone',$age,'$gender','$ifPet','$address','$name')";
$res = mysql_query($sql);

print_r("添加成功!");


?>

<?php
    include "./mysql.php";
    $username = $_GET["username"];
    $password = $_GET["password"];

    $sql = "select * from  manager where m_username = '$username' and m_password = '$password'";
    $res = mysql_query($sql);
    $row = mysql_fetch_assoc($res);
    if(!$row){
        print_r('账号或密码错误');
    }else{
        print_r(json_encode($row));
    }
?>
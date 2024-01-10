// cookieLogin()
// function cookieLogin(){
//     let login = getCookie("login")
//     if(login != 1){
//         // console.log(login);
//         location.href = "../html/login.html"
//         return
//     }
// }
// 获取图片
function userImg(){
    let mImg=document.querySelector('.rightMenu img')
    // 获取每一个管理员的img的路径
    mImg.setAttribute("src",JSON.parse(sessionStorage.getItem("loginUserinfo")).m_img)
   
   
}
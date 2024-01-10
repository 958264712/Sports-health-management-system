let time = document.querySelector(".leftMenu span")
function timer(){
    setInterval(function(){
        document.close
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() +1
        let day = date.getDate()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()
        time.innerHTML = year + '-' + month + '-' + day + "-" + hours + ':' + minutes + ":" + seconds
    },0)
}
timer()
renderusername()
//用户名渲染
function renderusername(){
    const username = document.querySelector('.rightMenu span')
    let userInfo = JSON.parse(sessionStorage.getItem('loginUserinfo'))
    username.innerHTML = `${userInfo.m_name}`
}

function logout(){
    //清除登陆
    delCookie("login")
    sessionStorage.removeItem("loginUserinfo")
    location.href = "../html/login.html"
}



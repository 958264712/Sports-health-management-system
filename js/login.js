let tipe = document.querySelector(".tips")
// 发送验证码
check()

function check() {
    Ajax({
        url: "http://localhost/dormitory-management-system/server/check.php",
        success(res) {
            let checkCode = document.querySelector(".code")
            checkCode.innerHTML = res
            // sessionStorage存储验证码
            sessionStorage.setItem("checkCode", res)
        }
    })
}

//实现登录
login()

function login() {

    let form = document.querySelector('form')
    // 获取cookie
    let cookie = localStorage.getItem("checked")
    // 进行上一次是否记住密码
    if (cookie === 'true') {
        document.getElementById("checked").setAttribute("checked", true)
        let username = JSON.parse(localStorage.getItem("loginusername"))
        document.querySelector("#username").value = username.m_username
        document.querySelector("#password").value = username.m_password
    }

    form.addEventListener("submit", (e) => {
        e = e || window.event
        //阻止表单提交
        e.preventDefault()
        let username = document.querySelector("#username").value
        let password = document.querySelector("#password").value
        // let code = document.querySelector("#checkCode").value
        let checkCode = sessionStorage.getItem("checkCode")
        // if (code.trim() != checkCode.trim()) {
        //     tipe.innerHTML = "验证码错误"
        //     return
        // }
        Ajax({
            url: "http://localhost/dormitory-management-system/server/login.php",
            data: {
                username,
                password
            },
            success(res) {
                if (res.trim() === '账号或密码错误'.trim()) {
                    tipe.innerHTML = '账号或密码错误！'
                    // alert(res)
                } else {

                    sessionStorage.setItem("loginUserinfo", res)
                    localStorage.setItem("loginusername", res)
                    setCookie('login', 1)
                    location.href = "../html/home.html"
                }
            }
        })
    })
}
// 实现记住密码
function remember() {
    let checked = document.getElementById("checked")
    if (checked.checked) {
        localStorage.setItem("checked", true)
    } else {
        localStorage.setItem("checked", false)
    }
}
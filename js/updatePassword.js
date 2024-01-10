function updatePasswordDo() {
    let userInfo = sessionStorage.getItem("loginUserinfo");
    userInfo = JSON.parse(userInfo)

    const password1 = document.getElementById("password1").value
    const password2 = document.getElementById("password2").value
    const password3 = document.getElementById("password3").value

    // 判断输入密码是否与登入一致
    if (password1 != userInfo.m_password) return window.alert("输入的原密码错误！");

    if (password2 !== password3) return window.alert("两次输入的密码不一致");

    // 处理发送请求的数据
    let password = password2
    let id = userInfo.m_id;

    Ajax({

        url: "http://localhost/dormitory-management-system/server/updatePassword.php",
        data: {
            password,
            id
        },
        success(res) {

            document.getElementById("password1").value = ""
            document.getElementById("password2").value = ""
            document.getElementById("password3").value = ""

            userInfo.m_password = password
            sessionStorage.setItem("loginUserinfo", JSON.stringify(userInfo))
            // console.log(JSON.stringify(userInfo));

            location.href = '../html/login.html'
        }
    })
}

function deleteUpdate() {
    let body = document.querySelector("#changermanager tbody")
    let cImg = document.querySelector('#changeImg')
    cImg.style.backgroundImage = `url(${JSON.parse(sessionStorage.getItem("loginUserinfo")).m_img})`
    body.addEventListener("click", function (e) {
        //解决兼容问题
        e = e || window.event;
        //删除操作
        if (e.target.dataset.o == 'del') {
            //防止误删

            const flag = window.confirm("你确定要删除吗？")
            // console.log(1111);
            if (flag) {
                Ajax({
                    url: "http://localhost/dormitory-management-system/server/dormitoryFloorDelete.php",
                    data: {
                        id: e.target.dataset.id
                    },
                    success(res) {
                        location.reload();
                    }

                })
            }
        }
        // 修改操作
        if (e.target.dataset.o == 'update') {
            //先编辑，再修改
            //编辑就是获取点击那个id那个楼层的信息
            Ajax({
                url: "http://localhost/dormitory-management-system/server/managerChangeInfo.php",
                data: {
                    id: e.target.dataset.id
                },
                success(res) {
                    res = JSON.parse(res)
                    let id = document.getElementById("cahngeId")
                    let username = document.getElementById("changeUsername")
                    let phone = document.getElementById("changePhone")
                    let age = document.getElementById("changeAge")
                    let gender = document.getElementById("changeGender")
                    let name = document.getElementById("changeName")
                    username.value = res.m_username
                    age.value = res.m_age
                    name.value = res.m_name
                    id.value = res.m_id
                    phone.value = res.m_phone
                    gender.value = res.m_gender
                }
            })
        }
    })
}
// 封装一个修改个人信息表
function changeInfo() {
    let id = document.getElementById("cahngeId").value
    let username = document.getElementById("changeUsername").value
    let phone = document.getElementById("changePhone").value
    let age = document.getElementById("changeAge").value
    let gender = document.getElementById("changeGender").value
    let name = document.getElementById("changeName").value
    Ajax({
        url: "http://localhost/dormitory-management-system/server/managerUpdate.php",
        type: "POST",
        data: {
            id,
            name,
            username,
            phone,
            age,
            gender,
        },
        success(res) {

            location.href = "../html/login.html"
        }
    })
}
// 封装一个渲染数据的函数
function renderManagerAdd(result, index) {
    // 获取tbody
    const tbody = document.querySelector(".table tbody")
    // 将tbody的内容清空
    tbody.innerHTML = ""
    result.forEach((item) => {
        index++
        let str = `
		<tr>
			<td scope="row">${index}</td>
			<td>${item.m_username}</td>
			<td>${item.m_name}</td>
			<td>${item.m_gender}</td>
			<td>${item.m_age}</td>
			<td>${item.m_phone}</td>
			<td>
                <button type="button" class="btn btn-danger btn-sm" >
                权限不够，不可修改
                </button>
            </td>
	  	</tr>
		`
        if (item.m_id == JSON.parse(sessionStorage.getItem("loginUserinfo")).m_id) {
            str = `
            <tr>
                <td scope="row">${index}</td>
                <td>${item.m_username}</td>
                <td>${item.m_name}</td>
                <td>${item.m_gender}</td>
                <td>${item.m_age}</td>
                <td>${item.m_phone}</td>
                <td>
                    <button type="button" id='queryManager' class="btn btn-warning btn-sm"  data-bs-toggle="modal"
                    data-bs-target='#managerUpdate' data-o='update' data-id='${item.m_id}'>修改</button>
                    <button type="button" id='deleteManager' class="btn btn-danger btn-sm"   
                     data-o='del' data-id='${item.m_id}'>删除</button>
                </td>
              </tr>
            `
        }
        tbody.innerHTML += str;
    })
}

function renderManager() {
    Ajax({
        url: 'http://localhost/dormitory-management-system/server/changeManger.php',
        success(res) {
            // 存放全部管理
            sessionStorage.setItem("allManagerinfo", res)
            // 将res转成我们可以看的懂的数据
            res = JSON.parse(res)
            // 设置页数，总页数
            sessionStorage.setItem("pagecurrent", 1)
            const pagecount = Math.ceil(res.length / 10);
            sessionStorage.setItem("pagecount", pagecount)
            // 最开始分割成10条数据一份
            let result = res.slice(0, 10)
            let index = 0
            renderManagerAdd(result, index)
        }
    })
}

// 实现首页
function firstPage() {
    // 获取全部的数据
    let result = JSON.parse(sessionStorage.getItem("allManagerinfo"))

    // 设置当前页为第一页
    sessionStorage.setItem("pagecurrent", 1)

    skip.value = 1
    result = result.slice(0, 10)
    let index = 0
    renderManagerAdd(result, index)
}
// 实现上一页
function upPage() {
    let skip = document.getElementById("skip")
    skip.value--

    // 获取当前页
    let pagecurrent = sessionStorage.getItem("pagecurrent") - 1
    let result = JSON.parse(sessionStorage.getItem("allManagerinfo"))
    if (pagecurrent < 1) {
        pagecurrent = 1
        skip.value = pagecurrent
    }
    // 存储当前页
    sessionStorage.setItem("pagecurrent", pagecurrent)
    result = result.slice((pagecurrent - 1) * 10, pagecurrent * 10)
    let index=(pagecurrent-1)*10
            renderManagerAdd(result,index)

}
// 实现下一页
function downPage() {
    let skip = document.getElementById("skip")
    // console.log(skip);
    let pagecurrent = +sessionStorage.getItem("pagecurrent") + 1
    let allManagerinfo = JSON.parse(sessionStorage.getItem("allManagerinfo"))
    let pagecount = +sessionStorage.getItem("pagecount")
    if (pagecurrent > pagecount) pagecurrent = pagecount
    if (skip.value == pagecount) {
        return skip.value = pagecount
    }
    skip.value++
    sessionStorage.setItem("pagecurrent", pagecurrent)
    let result = allManagerinfo.slice((pagecurrent - 1) * 10, pagecurrent * 10)
    let index=(pagecurrent-1)*10
            renderManagerAdd(result,index)
    skip = sessionStorage.getItem("pagecurrent")

}
// 实现尾页
function lastPage() {
    let skip = document.getElementById("skip")
    let pagecount = +sessionStorage.getItem("pagecount");
    skip.value = pagecount
    sessionStorage.setItem("pagecurrent", pagecount)
    skip = sessionStorage.getItem("pagecurrent")
    let result = JSON.parse(sessionStorage.getItem("allManagerinfo"));
    result = result.slice((pagecount - 1) * 10)
    let index=(pagecount-1)*10
    renderManagerAdd(result,index)
}
// 实现跳转功能
function skipPage() {
    // 获取值
    let skip = document.getElementById("skip")
    let pageCount = +sessionStorage.getItem("pagecount");
    let pageCurrent = +sessionStorage.getItem("pagecurrent");
    let result = JSON.parse(sessionStorage.getItem("allManagerinfo"));
    let index;
    // 判断不能为空
    if (+skip.value >= pageCount ) {
		result = result.slice((pageCount - 1) * 10)
		pageCurrent=sessionStorage.setItem("pageCurrent", pageCount)
		skip.value=pageCount
        index =(pageCount-1)* 10
	}else if(+skip.value <= pageCurrent){
		result = result.slice((pageCurrent - 1) * 10, pageCurrent * 10)
		skip.value=pageCurrent
		index =(pageCurrent-1)* 10
	}  else {
		result = result.slice((skip.value - 1) * 10, skip.value * 10)
		pageCurrent=sessionStorage.setItem("pageCurrent", skip.value)
       index=(pageCount-1)* 10;
	}
    renderManagerAdd(result,index)
}
userImg()
deleteUpdate()
renderManager()
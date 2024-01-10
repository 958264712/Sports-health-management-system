function dormitoryFloor() {
    Ajax({
        url: "http://localhost/dormitory-management-system/server/tenantRender.php",
        success(res) {
            //获取tbody标签
            sessionStorage.setItem("allTenantNews", res);
            res = JSON.parse(res)
            sessionStorage.setItem("pageCurrent", 1)
            let pageCurrent = +sessionStorage.getItem("pageCurrent")
            const pageCount = Math.ceil(res.length / 10);
            sessionStorage.setItem("pageCount", pageCount)
            // 最开始分割成10条数据一份
            let result = res.slice((pageCurrent-1), (pageCurrent*10))
            let index=0
            getdormitoryFloor(result,index)
        }

    })
}

function getdormitoryFloor(result,index) {
    const tbody = document.querySelector("tbody")
    //将获取到的所有信息存储到sessionStorage里面
    tbody.innerHTML = ""
    result.forEach(item => {
        index++
        let str = `
        <tr>
        <td>${index}</td>
        <td>${item.t_name}</td>
        <td>${item.t_phone}</td>
        <td>${item.t_age}</td>
        <td>${item.t_gender}</td>
        <td>${item.t_ifPet}</td>
        <td>${item.t_address}</td>
        <td>${item.f_name}</td>
        <td>
        <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#floorUpdate" ' data-o='update' data-id='${item.t_id}'>修改</button>
        <button type="button" class="btn btn-danger btn-sm" data-o='del' data-id='${item.t_id}'>删除</button>
        </td>
    </tr>
        `
        tbody.innerHTML += str;
    })

}
//实现删除
function deleteUpdate() {
    const tbody = document.querySelector("tbody")
    tbody.addEventListener("click", function (e) {
        //解决兼容问题
        e = e || window.event;

        //删除操作
        if (e.target.dataset.o == 'del') {
            //防止误删

            const flag = window.confirm("你确定要删除吗？")
            // console.log(1111);
            if (flag) {
                Ajax({
                    url: "http://localhost/dormitory-management-system/server/tenantDelete.php",
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
                url: "http://localhost/dormitory-management-system/server/tenantQuery.php",
                data: {
                    id: e.target.dataset.id
                },
                success(res) {
                    res = JSON.parse(res)
                    let id = document.getElementById("updateTenantId")
                    let username = document.getElementById("updateFloorUsername")
                    let phone = document.getElementById("updateFloorPhone")
                    let age = document.getElementById("updateFloorAge")
                    let gender = document.getElementById("updateFloorGender")
                    let inpor = document.getElementById("updateFloorInpor")
                    let address = document.getElementById("updateFloorAddress")
                    let name = document.getElementById("updateFloorName")
                    username.value = res.t_name
                    id.value = res.t_id
                    phone.value = res.t_phone
                    gender.value = res.t_gender
                    age.value = res.t_age
                    inpor.value = res.t_ifPet
                    address.value = res.t_address
                    name.value = res.t_floor
                }
            })
        }
    })
}
//实现添加楼层
function addFloorInfo() {
    let username = document.getElementById("addFloorUsername").value;
    let phone = +document.getElementById("addFloorPhone").value;
    let age = document.getElementById("addFloorAge").value;
    let ifPet = document.getElementById("addFloorIfpet").value
    let address = document.getElementById("addFloorAddress").value;
    let name = document.getElementById("addFloorName").value;
    let gender = document.querySelectorAll(".addFloorGender")
    if (gender[0].checked) {
        gender = '男'
    } else {
        gender = "女"
    };
    //输入2-5个中文
    const name_reg = /^[\u4e00-\u9fa5]{2,5}$/
    //电话号码正则
    const photot_reg = /^1[34578]\d{9}$/
    //输入1-125纯数字
    const age_reg = /(^[1][0-2][0-5]$)|(^[1-9][0-9]$)|(^100&)|(^[1-9]$)$/
    const address_reg = /^[1-6]\d{2}$/

    //非空判断
    if (!username || !phone || !age || !ifPet || !address || !name) return window.alert("请输入完整的数据")
    if (!name_reg.test(username)) return alert('姓名格式错误，请输入正确的格式!')
    if (!photot_reg.test(phone)) return alert("手机号格式错误，请输入正确的格式!")
    if (!age_reg.test(age)) return alert("年龄格式错误，请输入正确的格式!")
    if (ifPet != "是" && ifPet != "否") return alert('只能填是或者否!')
    if (!address_reg.test(address)) return alert('房间号格式错误，请输入正确的格式！')
    Ajax({
        url: "http://localhost/dormitory-management-system/server/tenantAdd.php",
        type: "POST",
        data: {
            username,
            phone,
            age,
            gender,
            ifPet,
            address,
            name
        },
        success(res) {
            location.reload()
        }
    })
}
// 实现修改信息功能
function updateTenantInfo() {
    // 获取模态框中的全部value值
    let id = document.getElementById("updateTenantId").value
    let name = document.getElementById("updateFloorUsername").value
    let phone = document.getElementById("updateFloorPhone").value
    let age = document.getElementById("updateFloorAge").value
    let gender = document.getElementById("updateFloorGender").value
    let inpor = document.getElementById("updateFloorInpor").value
    let address = document.getElementById("updateFloorAddress").value
    let floor = document.getElementById("updateFloorName").value
    Ajax({
        url: "http://localhost/dormitory-management-system/server/tenantUpdateDorm.php",
        // 状态改为post
        type: "POST",
        // 提交数据
        data: {
            id,
            name,
            address,
            phone,
            age,
            gender,
            ifPet: inpor,
            floor
        },
        success(res) {
            // console.log(res);
            // 刷新页面
            location.reload()
        }
    })
}
// 实现首页
function firstPage() {
    // 获取全部的数据
    let result = JSON.parse(sessionStorage.getItem("allTenantNews"))
    // 设置当前页为第一页
    skip.value = 1
    sessionStorage.setItem("pageCurrent", 1)
    let index=0
    result = result.slice(0, 10)
    getdormitoryFloor(result,index)

}
// 实现上一页
function upPage() {
    let skip = document.getElementById("skip")
    // 获取当前页
    skip.value--
    let pageCurrent = sessionStorage.getItem("pageCurrent") - 1
    let result = JSON.parse(sessionStorage.getItem("allTenantNews"))
    if (pageCurrent <= 1) {
        pageCurrent = 1;
        skip.value = pageCurrent
    }
    // 存储当前页
    sessionStorage.setItem("pageCurrent", pageCurrent)
    result = result.slice((pageCurrent - 1) * 10, pageCurrent * 10)
    let index;
    index =(pageCurrent-1)*10
    getdormitoryFloor(result,index)
}
// 实现下一页
function downPage() {
    // 获取跳转
    let skip = document.getElementById("skip")
    let pageCurrent = +sessionStorage.getItem("pageCurrent") + 1
    let allStudentInfo = JSON.parse(sessionStorage.getItem("allTenantNews"))
    let pageCount = +sessionStorage.getItem("pageCount")
    // 将skip的value值进行改变
    if (pageCurrent > pageCount) pageCurrent = pageCount
    if (skip.value == pageCount) {
        return skip.value = pageCount
    }
    skip.value++
    sessionStorage.setItem("pageCurrent", pageCurrent)
    // 进行页面跳转
    let result = allStudentInfo.slice((pageCurrent - 1) * 10, pageCurrent * 10)
    let index;
    index =(pageCurrent-1)*10
    getdormitoryFloor(result,index)

}
// 实现尾页
function lastPage() {
    let skip = document.getElementById("skip");

    let pageCount = +sessionStorage.getItem("pageCount");
    sessionStorage.setItem("pageCurrent", pageCount)
    skip.value = pageCount
    let result = JSON.parse(sessionStorage.getItem("allTenantNews"));
    result = result.slice((pageCount - 1) * 10)
    let index;
    index =(pageCount-1)* 10
    getdormitoryFloor(result,index)
}
// 实现跳转功能
function skipPage() {
    // 获取值

    let skip = document.getElementById("skip");
    let pageCount = +sessionStorage.getItem("pageCount");
    let pageCurrent = +sessionStorage.getItem("pageCurrent");
    let result = JSON.parse(sessionStorage.getItem("allTenantNews"));
    let index;
    // 判断不能为空
    if (!skip.value.trim().length) return alert("请输入需要跳转的页数！！")
    // 跳转页数
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
    getdormitoryFloor(result,index)
}
deleteUpdate()
userImg()
dormitoryFloor();
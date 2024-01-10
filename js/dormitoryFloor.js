
getdormitoryFloor();
function getdormitoryFloor() {
    Ajax({
        url: "http://localhost/dormitory-management-system/server/dormitoryFloor.php",
        success(res) {
            //获取tbody标签
            const tbody = document.querySelector("tbody")
            tbody.innerHTML=""
            //将获取到的所有信息存储到sessionStorage里面
            sessionStorage.setItem("allFloorNews", res);
            res = JSON.parse(res)
            //一页显示8条
            let result = res.slice(0, 8)
            /* 显示数据的位置 */
            /* 在添加数据之前,现将数据给清空一遍 */
            tbody.innerHTML = ""
            //渲染数据
            result.forEach(item => {
            
                let str = `
        <tr>
        <td>${item.Id}</td>
        <td>${item.f_name}</td>
        <td>
        <button type="button" class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#floorCheck" onclick='dormFloorCheck()' id='dprmFloorAll' data-o='check' data-id='${item.Id}'>查看楼层全部宿舍</button></td>
        
    </tr>
        `
                tbody.innerHTML += str;
            })
        }
    })
}
//实现删除

function deleteUpdate() {
    let body = document.querySelector("#floorCheck tbody")
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
                url: "http://localhost/dormitory-management-system/server/dormitoryFloorQuery.php",
                data: {
                    id: e.target.dataset.id
                },
                success(res) {
                    res = JSON.parse(res)
                    let id = document.getElementById("updateFloorId")
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
    let phone = document.getElementById("addFloorPhone").value;
    let age = document.getElementById("addFloorAge").value;
    let ifPet = document.getElementById("addFloorIfpet").value;
    let address = document.getElementById("addFloorAddress").value;
    let name = document.getElementById("addFloorName").value;
    let gender = document.querySelectorAll(".addFloorGender")
    if (gender[0].checked) {
        gender = '男'
    } else {
        gender = "女"
    };
    //非空判断
    if (!username || !phone || !age || !ifPet || !address || !name) return window.alert("请输入完整的数据")
    Ajax({
        url: "http://localhost/dormitory-management-system/server/dormitoryFloorAdd.php",
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
/* 修改楼层信息 */
function updateFloorInfo() {
    let id = document.getElementById("updateFloorId").value
    let name = document.getElementById("updateFloorUsername").value
    let phone = document.getElementById("updateFloorPhone").value
    let age = document.getElementById("updateFloorAge").value
    let gender = document.getElementById("updateFloorGender").value
    let inpor = document.getElementById("updateFloorInpor").value
    let address = document.getElementById("updateFloorAddress").value
    let floor = document.getElementById("updateFloorName").value
    Ajax({
        url: "http://localhost/dormitory-management-system/server/floorUpdate.php",
        type: "POST",
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
            location.reload();
        }
    })
}

/* 首页 */
function firstPage() {
    //设置当前页为第一页
    sessionStorage.setItem("pageCu", 1)
    //获取所有的楼层信息
    let result = JSON.parse(sessionStorage.getItem("allFloorNews"))
    /* 一页数据显示8条 */
    result = result.slice(0, 8)
    /* 调用,并渲染数据 */
    let index =0
    renderFloorInfo(result,index)
}
// 上一页
function upPage() {
    // 当前页-1 , 要获取当前页
    let pageCurrent = +sessionStorage.getItem("pageCu") - 1
    //获取所有的楼层信息
    let allStudentInfo = JSON.parse(sessionStorage.getItem("allFloorNews"))

    //如果当前<1,那么当前页就是第一页
    if (pageCurrent < 1) {
        pageCurrent = 1;
    }
    //存储当前页
    sessionStorage.setItem("pageCu", pageCurrent)
    let result = allStudentInfo.slice((pageCurrent - 1) * 8, pageCurrent * 8)
    //渲染数据
    let index =(pageCurrent-1)* 8
    renderFloorInfo(result,index)
}
/* 下一页 */
function downPage() {
    // 当前页-1 , 要获取当前页
    let pageCurrent = +sessionStorage.getItem("pageCu") + 1
    //获取所有的楼层信息
    let allStudentInfo = JSON.parse(sessionStorage.getItem("allFloorNews"))
    //获取最后一页
    let pageCount = +sessionStorage.getItem("pageCo")
    //如果当前大于最后一页,那么当前页就是等于最后一页
    if (pageCurrent > pageCount) {
        pageCurrent = pageCount;
    }
    //存储当前页
    sessionStorage.setItem("pageCu", pageCurrent)
    let result = allStudentInfo.slice((pageCurrent - 1) * 8, pageCurrent * 8)
    //渲染数据
	let index =(pageCurrent-1)* 8
    renderFloorInfo(result,index)
}
/* 尾页 */
function lastPage() {
    //获取最后的一页
    let pageCount = +sessionStorage.getItem("pageCo")
    //当前页就是尾页
    sessionStorage.setItem("pageCu", pageCount)
    //所有的学生信息
    let allStudentInfo = JSON.parse(sessionStorage.getItem("allFloorNews"))
    let result = allStudentInfo.slice((pageCount - 1) * 8);
    /* 调用并渲染数据 */
    let index =(pageCount-1)* 8
    renderFloorInfo(result,index)
}

function dormFloorCheck(e) {
    e = window.event || e
    // 首先获取tbady,清空tbody中的内容
    let body = document.querySelector("#floorCheck tbody")
    body.innerHTML = ""
    // 获取点击的那一行的Id，进行Ajax
    // let dormFloorCheck=document.getElementById("dormFloorCheck")
    // dormFloorCheck.dataset.id=e.target.dataset.id;
    let Id =  e.target.dataset.id

    Ajax({
        url: "http://localhost/dormitory-management-system/server/dormitoryFloorCheck.php",
        data: {
            Id
        },
        success(res) {
            sessionStorage.setItem("allFloorNews", res)
            sessionStorage.setItem("pageCo", Math.ceil(JSON.parse(res).length / 8))
            let result = JSON.parse(res).slice(0, 8)
            let index=0
			renderFloorInfo(result,index)
        }
    })
}
/* 渲染的数据 */
function renderFloorInfo(result,index) {
    let body = document.querySelector("#floorCheck tbody")
    body.innerHTML = ""
    result.forEach(item => {
        index++
        let str = `
        <tr>
        <td>${index}</td>
        <td>${item.t_address}</td>
        <td>${item.t_name}</td>
        <td>${item.t_phone}</td>
        <td>${item.t_age}</td>
        <td>${item.t_gender}</td>
        <td>${item.t_ifPet}</td>
        <td>
            <button type="button" class="btn btn-warning btn-sm"     data-bs-toggle="modal" data-bs-target="#floorUpdate"  data-o='update' data-id='${item.t_id}'>修改</button>
            <button type="button" class="btn btn-danger btn-sm" data-o='del' data-id='${item.t_id}'>删除</button>
            </td>
        </tr>
        `
        body.innerHTML += str;
    })
}
deleteUpdate()
userImg();

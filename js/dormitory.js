async function getDormAdd() {
	// 进行Ajax代码将数据渲染出来

	let da = await new Promise((resolve) => {
		Ajax({
			url: "http://localhost/dormitory-management-system/server/dormitoryRender.php",
			success(res) {
				resolve(res)
			}
		})
	})

	// 将数据存入allDormInfo中
	await sessionStorage.setItem("allDormInfo", da)
	// 将res转成我们可以看的懂的数据
	res = JSON.parse(da)
	// 设置页数，总页数
	sessionStorage.setItem("pageCurrent", 1)
	let skip = document.getElementById("skip")
	skip.value=1
	const pageCount = Math.ceil(res.length / 10);
	sessionStorage.setItem("pageCount", pageCount)
	// 最开始分割成10条数据一份
	let result = res.slice(0, 10)
	let index=0
	renderDormAdd(result,index)
}

function deleteOrUpdate() {
	const tbody = document.querySelector("tbody")
	tbody.addEventListener("click", function (e) {
		e = e || window.event;
		// 进行删除按钮的判断
		if (e.target.dataset.o == "del") {
			// 进行判断
			const flag = confirm("您确定要删除这条信息吗？")
			if (flag) {
				
					Ajax({
						url: "http://localhost/dormitory-management-system/server/dormitoryDelete.php",
						data: {
							id: e.target.dataset.id
						},
						success(res) {
							// 刷新页面
							location.reload()
						}
					})
			}
		}

		// 进行修改的页面判断
		if (e.target.dataset.o == "update") {
			// 点击修改按钮弹出模态框，通过id将信息 显示出来
				Ajax({
				url: "http://localhost/dormitory-management-system/server/dormitoryUpdate.php",
				data: {
					id: e.target.dataset.id
				},
				success(res) {
					// res进行转型
					res = JSON.parse(res)
					// 获取所有的value
					let updateDormId = document.getElementById("updateDormId")
					let updateDormAddress = document.getElementById("updateDormAddress")
					let updateDormType = document.getElementById("updateDormType")
					let updateDormRent = document.getElementById("updateDormRent")
					let updateDormStatus = document.getElementById("updateDormStatus")
					let updateDormFloor = document.getElementById("updateDormFloor")
					// 将相应的内容附上value中
					updateDormId.value = res.d_id
					updateDormAddress.value = res.d_address
					updateDormType.value = res.d_type
					updateDormRent.value = res.d_rent
					updateDormStatus.value = res.d_status
					updateDormFloor.value = res.d_floor
				}
			})
		}
	})
}

// 实现修改信息功能
function updateDormInfo() {
	// 获取模态框中的全部value值
	let id = document.getElementById("updateDormId").value
	let address = document.getElementById("updateDormAddress").value
	let type = document.getElementById("updateDormType").value
	let rent = document.getElementById("updateDormRent").value
	let status = document.getElementById("updateDormStatus").value
	let floor = document.getElementById("updateDormFloor").value
	Ajax({
		url: "http://localhost/dormitory-management-system/server/dormitoryUpdateDorm.php",
		// 状态改为post
		type: "POST",
		// 提交数据
		data: {
			id,
			address,
			type,
			rent,
			status,
			floor
		},
		success(res) {
			// console.log(res);
			// 刷新页面
			location.reload()
		}
	})
}

// 实现添加信息功能
function addDormInfo() {
	let address = document.getElementById("addDormAddress").value
	let type = document.getElementById("addDormType").value
	let rent = document.getElementById("addDormRent").value
	let status = document.querySelectorAll(".addDormStatus")
	let floor = document.getElementById("addDormFloor").value
	if (status[0].checked) {
		status = '已满'
	} else {
		status = '未满'
	}
	if (!address || !type || !rent || !floor) return window.alert("请输入完整的数据")

	Ajax({
		url: "http://localhost/dormitory-management-system/server/dormitoryAdd.php",
		data: {
			address,
			type,
			rent,
			status,
			floor
		},
		type: "POST",
		success(res) {
			location.reload()
		}
	})
}

// 实现模糊查询
function getLike() {
	let nameLike = document.getElementById("nameLike").value
	if (nameLike.trim().length == 0) return window.alert("请输入内容！")
	Ajax({
		url: "http://localhost/dormitory-management-system/server/dormitoryLikeQuery.php",
		data: {
			name: nameLike
		},
		success(res) {
			sessionStorage.setItem("allDormInfo", res)
			sessionStorage.setItem("pageCount", Math.ceil(JSON.parse(res).length / 10))
			let result = JSON.parse(res).slice(0, 10)
			let index=0
			renderDormAdd(result,index)
		}
	})

}

// 实现首页
function firstPage() {
	// 获取全部的数据
	let result = JSON.parse(sessionStorage.getItem("allDormInfo"))

	// 设置当前页为第一页
	sessionStorage.setItem("pageCurrent", 1)

	skip.value = 1
	result = result.slice(0, 10)
	let index=0
	renderDormAdd(result,index)
}
// 实现上一页
function upPage() {
	let skip = document.getElementById("skip")
	skip.value--
	// 获取当前页
	let pageCurrent = sessionStorage.getItem("pageCurrent") - 1
	let result = JSON.parse(sessionStorage.getItem("allDormInfo"))
	if (pageCurrent < 1) {
		pageCurrent = 1
		skip.value = pageCurrent
	}
	// 存储当前页
	sessionStorage.setItem("pageCurrent", pageCurrent)
	result = result.slice((pageCurrent - 1) * 10, pageCurrent * 10)
    let index =(pageCurrent-1)* 10
	renderDormAdd(result,index)

}
// 实现下一页
function downPage() {
	let skip = document.getElementById("skip")
	// console.log(skip);
	let pageCurrent = +sessionStorage.getItem("pageCurrent") + 1
	let allStudentInfo = JSON.parse(sessionStorage.getItem("allDormInfo"))
	let pageCount = +sessionStorage.getItem("pageCount")
	if (pageCurrent > pageCount) pageCurrent = pageCount
	if (skip.value == pageCount) {
		return skip.value = pageCount
	}
	skip.value++
	sessionStorage.setItem("pageCurrent", pageCurrent)
	let result = allStudentInfo.slice((pageCurrent - 1) * 10, pageCurrent * 10)
	skip = sessionStorage.getItem("pageCurrent")
	let index =(pageCurrent-1)* 10
	renderDormAdd(result,index)

}
// 实现尾页
function lastPage() {
	let skip = document.getElementById("skip")
	let pageCount = +sessionStorage.getItem("pageCount");
	skip.value = pageCount
	sessionStorage.setItem("pageCurrent", pageCount)
	skip = sessionStorage.getItem("pageCurrent")
	let result = JSON.parse(sessionStorage.getItem("allDormInfo"));
	result = result.slice((pageCount - 1) * 10)
	let index =(pageCount-1)* 10
	renderDormAdd(result,index)
}
// 实现跳转功能
function skipPage() {
	// 获取值
	let skip = document.getElementById("skip");
	let pageCount = +sessionStorage.getItem("pageCount");
	let pageCurrent = +sessionStorage.getItem("pageCurrent");
	let result = JSON.parse(sessionStorage.getItem("allDormInfo"));
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
	} else {
		result = result.slice((skip.value - 1) * 10, skip.value * 10)
		pageCurrent=sessionStorage.setItem("pageCurrent", skip.value)
		index =(+skip.value-1)* 10
	}
    renderDormAdd(result,index)
}
// 查询 房间状态
function dormStatus() {
	let status = document.getElementById("dormStatus").value
	if (status == '') return getDormAdd()
	// 获取AJax
	Ajax({
		url: "http://localhost/dormitory-management-system/server/dormitoryStatusQuery.php",
		data: {
			status
		},
		success(res) {
			sessionStorage.setItem("allDormInfo", res)
			sessionStorage.setItem("pageCount", Math.ceil(JSON.parse(res).length / 10))
			let result = JSON.parse(res).slice(0, 10)
			let index=0
			renderDormAdd(result,index)
		}
	})
}
// 查询 房间状态
function dormType() {
	let type = document.getElementById("dormType").value
	if (type == '') return getDormAdd()
	// 获取AJax
	Ajax({
		url: "http://localhost/dormitory-management-system/server/dormitoryTypeQuery.php",
		data: {
			type
		},
		success(res) {
			sessionStorage.setItem("allDormInfo", res)
			sessionStorage.setItem("pageCount", Math.ceil(JSON.parse(res).length / 10))
			let result = JSON.parse(res).slice(0, 10)
			let index=0
			renderDormAdd(result,index)
		}
	})
}
// 封装一个渲染数据的函数
function renderDormAdd(result,index) {
	// 获取tbody
	const tbody = document.querySelector(".table tbody")
	// 将tbody的内容清空
	tbody.innerHTML = ""
	result.forEach(item => {
		index++
		let str = `
		<tr>
			<td scope="row">${index}</td>
			<td>${item.d_address}</td>
			<td>${item.d_type}</td>
			<td>${item.d_rent}</td>
			<td>${item.d_status}</td>
			<td>${item.f_name}</td>
			<td>
				<button type="button" class="btn btn-warning btn-sm" 
			data-bs-toggle="modal" data-bs-target="#dormUpdate" data-o='update' data-id='${item.d_id}'>修改</button>
				<button type="button" class="btn btn-danger btn-sm" data-o='del' data-id='${item.d_id}'>删除</button>
			</td>
	  	</tr>
		`
		tbody.innerHTML += str;
	})

}
deleteOrUpdate()
getDormAdd()
userImg()
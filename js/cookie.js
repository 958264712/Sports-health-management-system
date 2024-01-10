//设置cookie
function setCookie(key ,value, expires){
    let date = new Date()
    let dd = date - 8 * 60 * 60 *1000 + expires * 1000
    let time = new Date(dd)
    document.cookie = `${key} = ${value};expires=${expires?time:''}`
}

//获取cookie
function getCookie(key1){
    let cookie = document.cookie
    cookie = cookie.split('; ')
    let val =''
    for (key in cookie) {
        let k =cookie[key].split("=")[0]
        let v = cookie[key].split("=")[1]
        if(key1 == k){
            val = v
        }
    }
    return val
}


//删除cookie
function delCookie(key){
    setCookie(key,'',-1)
}

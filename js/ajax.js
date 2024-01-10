/* 接受参数,参数是一个对象 就是otpions */
function Ajax(options){
    /* 如果URL不传,那么这个ajax就没有办法发送了 */
    if(!options.url){
        throw new Error("不能没有URL,不然ajax发给谁?")
    }

    /* 参数默认值 */
    let defaultInfo = {
        type:"GET",  //请求的方式,默认值为get
        url:"",     //氢气的URL
        async:true, //是否异步
        data:"",//请求的参数
        success:function(){}, //当请求数据成功,执行这个函数
        dataType:"string" //string,json
    }
    /* 将options的赋值给defaultInfo */
    for(let key in options){
        defaultInfo[key] = options[key]
    }
    /* 
        校验数据的合法性
    */
    // 校验type
    if(!(defaultInfo.type.toUpperCase() === "GET" || defaultInfo.type.toUpperCase() === "POST")){
        throw new Error("请求类型不合法规范")
    }
    // 校验async
    // console.log(typeof defaultInfo.async);
    if(typeof defaultInfo.async !== "boolean"){
        throw new Error("请输入true表示异步,输入false表示同步")
    }
    //校验data username=wenyuan&password=123456&age=18&gender=man
    if(!(typeof defaultInfo.data === 'string' && /^(\w+=\w+&?)*$/.test(defaultInfo.data) || Object.prototype.toString.call(defaultInfo.data) === '[object Object]')){
        throw new Error("输入的数据格式不正确")
    }
    //如果传入的数据格式是对象,转换成查询字符串
    let str = ''
    if(Object.prototype.toString.call(defaultInfo.data) === '[object Object]'){
        // {username:"wenyuan",password:'123456'}
        // "username=wenyuan&password=123456"
        for(let key in defaultInfo.data){
            // console.log(key,defaultInfo.data[key]);
            str += `${key}=${defaultInfo.data[key]}&`
        }
        //-负数表示末尾向前
        defaultInfo.data = str.slice(0,-1);
    }
    //校验期望服务器响应数据类型
    if(!(defaultInfo.dataType === 'json' || defaultInfo.dataType === 'string')){
        throw new Error("期望的数据类型为字符串或者是JSON")
    }
    //校验响应成功的数据那个函数
    if(Object.prototype.toString.call(defaultInfo.success) !== '[object Function]'){
        throw new Error("响应的是一个函数...")
    }


    /* 发送请求 */
    let xhr;
    if(new XMLHttpRequest()){
        xhr = new XMLHttpRequest();
    }else{
        //处理兼容行
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }

    //打开链接,准备发送请求
    if(defaultInfo.type.toUpperCase() === 'GET'){
        //get请求
        xhr.open(defaultInfo.type,defaultInfo.url+"?"+defaultInfo.data,defaultInfo.async)
        xhr.send();
    }else{
        //post请求
        xhr.open(defaultInfo.type,defaultInfo.url,defaultInfo.async)
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded")
        xhr.send(defaultInfo.data)
    }

    //获取数据
    xhr.onreadystatechange = function(){
        if(xhr.readyState ===  4 && /2\d{2}/.test(xhr.status)){
            if(defaultInfo.dataType === 'json'){
                defaultInfo.success(JSON.parse(xhr.responseText))
            }else{
                defaultInfo.success(xhr.responseText)
            }
        }
    }
}
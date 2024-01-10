//公告栏滚动事件
ScrollImgLeft();
function ScrollImgLeft() {
    //初始化速度
    var speed = 40;
    //初始化一个变量为空 用来存放获取到的文本内容
    var MyMar = null;
    var scroll_begin = document.getElementById("scroll_begin");
    var scroll_end = document.getElementById("scroll_end");
    var scroll_div = document.getElementById("scroll_div");
    scroll_end.innerHTML = scroll_begin.innerHTML;
    //定义一个方法
    function Marquee() {
        if (scroll_end.offsetWidth - scroll_div.scrollLeft <= 0) {
            scroll_div.scrollLeft -= scroll_begin.offsetWidth;
        } else {
            scroll_div.scrollLeft++;
        }
    }
    MyMar = setInterval(Marquee, speed);
    //鼠标滑入这条公告栏的时候,清除上面的方法,让公告栏暂停
    scroll_div.onmouseover = function () {
        clearInterval(MyMar);
    }
    //鼠标滑出这条公告栏的时候,公告栏继续移动
    scroll_div.onmouseout = function () {
        MyMar = setInterval(Marquee, speed);
    }

}
userImg()

//轮播图
let boxImg = document.querySelector('.boxImages')
let warp = document.querySelector('.boxImages ul')
let boxLiImg = document.querySelectorAll('.boxImages ul li')
let boxol = document.querySelector('.boxImages ol')
// let conten = 0
// 添加圆点函数
setCircle();
function setCircle() {
    for (let i = 0; i < boxLiImg.length; i++) {
        const li = document.createElement('li')
        if (i == 0) {
            li.className = 'active'
            if(i == 0){
                li.classList.add('active')
            }
        }
        boxol.appendChild(li)
    }

}
//获取图片盒子宽度
let imgboxWidth = boxImg.offsetWidth
let ul = document.querySelector('.boxImages ul')

//克隆第一张和最后一张图片
cloneElemnt();
function cloneElemnt() {
    let firstImg = warp.firstElementChild.cloneNode(true)
    let lastImg = warp.lastElementChild.cloneNode(true)
    warp.appendChild(firstImg)
    warp.insertBefore(lastImg, warp.firstElementChild)
    warp.style.left = - imgboxWidth + 'px'
    index = 1
}

let lis = document.querySelectorAll('.boxImages ul li')
ul.style.width = imgboxWidth * lis.length + 'px'

//自动轮播
autoPlay()
function autoPlay(){
   timer = setInterval(() => {
       index++
       moveFn(warp,{left: -index * imgboxWidth}, moveEnd)
   }, 1600);
}

// //轮播结束

function moveEnd(){
    if(boxLiImg.length + 1 == index){
        index = 1
        warp.style.left = -index * imgboxWidth + 'px'
    }
    if(index == 0){
        index = boxLiImg.length
        warp.style.left = -index * imgboxWidth + 'px'
    }
    let lis = document.querySelectorAll('.boxImages ol li')
    //圆点移动
    for(let i = 0; i<lis.length;i++){
        lis[i].classList.remove('active')
    }
    lis[index - 1].classList.add("active")
    flag = true
}

//鼠标移入事件
boxImg.onmouseenter = function(){
    left.style.display = 'block'
    right_btn.style.display = 'block'
    clearInterval(timer)
    timer = null

}
//鼠标移出事件
boxImg.onmouseleave = function(){
    left.style.display = 'none'
    right_btn.style.display = 'none'
    autoPlay()
}

//点击事件封装函数
let left = document.querySelector('.hiddenLeftArrow')
let right_btn = document.querySelector('.hiddenRightArrow')
let flag = true
clickImg()
function clickImg(){
    boxImg.onclick = function(e){
        e = e || window.event
        
        if(e.target.className == "left"){
            if(!flag)return
        flag = false
            index ++;
            moveFn(warp,{left: -index * imgboxWidth},moveEnd)
        }
        //右箭头
        if(e.target.className == 'right'){
            if(!flag)return
            flag = false
            index--
            moveFn(warp,{left: -index * imgboxWidth},moveEnd)
        }
        // 点击小圆点
        if(e.target.className.indexOf('item') != -1){
            if(!flag)return
            flag = false
            index = +e.target.dataset.index + 1
            moveFn(warp,{left: -index * imgboxWidth}, moveEnd)
        }
    }
}

//解决切换选项卡bug

document.onvisibilitychange = function(){
    if(document.visibilityState == 'hidden'){
        clearInterval(timer)
    }
    if(document.visibilityState == 'visible'){
        autoPlay()
    }
}

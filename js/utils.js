function moveFn(ele, moveObj,fn) {
    let count = 0;
    for (let key in moveObj) {
        count ++;
        let type = key
        let target = moveObj[key]
        if (type == 'opacity') {
            target *= 100;
        }
        let timer = setInterval(() => {
            let current
            if (type == 'opacity') {
                current = window.getComputedStyle(ele)[type] * 100;
            } else {
                current = parseInt(window.getComputedStyle(ele)[type])
            }
            let step = (target - current) / 10
            step = step > 0 ? Math.ceil(step) : Math.floor(step)
            if (current == target) {
                clearInterval(timer)
                timer = null;
                count --
                if(count === 0){
                    fn();
                }
            } else {
                if (type === 'opacity') {
                    ele.style[type] = (current + step) / 100;
                } else {
                    ele.style[type] = current + step + "px";

                }
            }
        }, 16);
    }
}
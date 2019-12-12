//第一部分 初始化与监听事件  6行
var yyy = document.getElementById('xxx')
var context = yyy.getContext('2d')
var lineWidth = 5
var eraserEnabled = false
autoSetCanvasSize(yyy)
listenToUser(yyy)
//第二部分 pen、eraser、clear、download点击事件 18行
pen.onclick = function(){
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function(){
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
clear.onclick = function(){
    context.clearRect(0,0,yyy.width,yyy.height)
}
download.onclick = function(){
    var url = yyy.toDataURL('image/png')
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'My paintings'
    a.target = '_blank'
    a.click()
}
//第三部分 颜色点击与line的大小事件 7*4+2*2=32行
red.onclick = function(){
    context.fillStyle = "#ff6666"
    context.strokeStyle = "#ff6666"
    red.classList.add('active')
    gray.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}
gray.onclick = function(){
    context.fillStyle = "#cccccc"
    context.strokeStyle = "#cccccc"
    gray.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}
blue.onclick = function(){
    context.fillStyle = "#0099cc"
    context.strokeStyle = "#0099cc"
    blue.classList.add('active')
    gray.classList.remove('active')
    red.classList.remove('active')
    black.classList.remove('active')
}
black.onclick = function(){
    context.fillStyle = "black"
    context.strokeStyle = "black"
    black.classList.add('active')
    gray.classList.remove('active')
    blue.classList.remove('active')
    red.classList.remove('active')
}
thin.onclick = function(){
    lineWidth = 5
}
thick.onclick = function(){
    lineWidth = 10
}

//第四部分 自动设置canvas大小函数、设置canvas大小函数、画圆函数、画线函数与用户监听函数  25行
function autoSetCanvasSize(canvas){
    setCanvasSize()
    window.onresize = function(){
        setCanvasSize()
    }
    function setCanvasSize(){
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}
function drawCircle(x,y,raduis){
    context.beginPath()
    context.arc(x,y,raduis,0,Math.PI*2)
    context.fill()

}
function drawLine(x1,y1,x2,y2){
    context.beginPath()
    context.moveTo(x1,y1)
    context.lineWidth = lineWidth
    context.lineTo(x2,y2)
    context.stroke()
    context.closePath()
}




//第五部分  特性检测之触屏设备   26行
  
function listenToUser(canvas){
    var using = false
    var lastPoint = {
        x:undefined,
        y:undefined
    }
    if(document.body.ontouchstart !== undefined){
        canvas.ontouchstart = function(aaa){
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            using = true
            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10)
            }else{
                lastPoint = {
                    'x':x,
                    'y':y
                }
            }
        }
        canvas.ontouchmove = function(aaa){
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            if(!using){return}
            if(eraserEnabled){
                context.clearRect(x-5,y-5,10,10)
            }else{
                var newPoint = {
                    'x':x,
                    'y':y

                }
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                lastPoint = newPoint 
            }
        }
        canvas.ontouchend = function(){
            using = false
        }
    }else{
        //第六部分  特性检测之非触屏设备   24行
        canvas.onmousedown = function(aaa) {
        var x = aaa.clientX
        var y = aaa.clientY
        using = true
        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10)
        }else{
            lastPoint = {
            'x': x,
            'y': y
            }
        }
        }
        canvas.onmousemove = function(aaa){
            var x = aaa.clientX
            var y = aaa.clientY
            if (!using) {return}
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    'x': x,
                    'y': y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint 
            }
        }
 
        canvas.onmouseup = function(aaa){
            using = false
        }
    }





}



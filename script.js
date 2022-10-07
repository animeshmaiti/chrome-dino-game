document.addEventListener('DOMContentLoaded',()=>{
    const dino = document.querySelector('.dino')
    const grid = document.querySelector('.grid')
    const body = document.querySelector('body')
    const alert = document.getElementById('alert')
    let isJumping=false
    let gravity=0.9
    let isGameover = false

    function control(e){
        if (e.keyCode===32) {
            if (!isJumping) {
                isJumping=true
                jump()
                console.log('pressed')
            }
        }
    }
    document.addEventListener('keyup',control)

let position=0
function jump(){
    let count = 0
    let position=0
    let timeId = setInterval(function(){
        //move down
        if (count===15) {
            clearInterval(timeId)
            console.log('down')
            let downTimerId= setInterval(function(){
                if (count===0) {
                    clearInterval(downTimerId)
                    isJumping =false
                }
                position -=5
                count--
                position=position*gravity
                dino.style.bottom=position + 'px'
            },20)
        }

        //move up
        console.log('up')
        position +=30
        count++
        position = position * gravity
        dino.style.bottom = position +'px'
        console.log(dino.style.bottom)
    },20) 
}

function generateObstacles(){
    let randomTime =Math.random()*4000
    let obstaclePosition = 1000
    const obstacle = document.createElement('div')
    if(!isGameover) obstacle.classList.add('obstacle')
    grid.appendChild(obstacle)
    obstacle.style.left = obstaclePosition + 'px'

    let timerId =setInterval(function(){
        if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
            clearInterval(timerId)
            alert.innerHTML='Game over'
            isGameover = true
            //remove all children
            body.removeChild(body.firstChild)
            while (grid.firstChild) {
                grid.removeChild(grid.lastChild)
            }
        }
        obstaclePosition -= 10
        obstacle.style.left=obstaclePosition + 'px'
    },20)
    if(!isGameover) setTimeout(generateObstacles,randomTime)
}
generateObstacles()



})
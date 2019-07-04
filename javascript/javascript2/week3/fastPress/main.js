/* 
Game to be played by clicking S and L section
*/
const button = document.getElementById("clickme");
const input = document.querySelector('input.setTime');
const remainder = document.querySelector('p.remainder');
const display = document.querySelector('p.display');
const gameStarter = document.querySelector('button.gameStart');
const sectionFirst = document.querySelector('section.firstSec');
const sectionSecond = document.querySelector('section.secondSec');
const clickdisplay = document.querySelector('p.clickdisplay');
const countDisplay = document.querySelector('p.countDisplay');
const countTwoDisplay = document.querySelector('p.countTwoDisplay');
const secondClickDisplay = document.querySelector('p.secondClickDisplay');
const restartBtn = document.querySelector('button.restart');
let count = 0;
let countTwo = 0;
let timeout = false;
let start = false;
let canvas = document.getElementById('confetti');
let myCanvas = document.getElementById('myConfetti');
canvas.width = 640;
canvas.height = 480;
myCanvas.width =640;
myCanvas.height = 480;
clickdisplay.innerHTML = 'Press S ';
secondClickDisplay.innerHTML = 'Press L ';
gameStarter.addEventListener('click',function(){
    start = true;    
    startGame();
});
restartBtn.addEventListener('click', restartBtnEventHandler);
function startGame(){
    if(!timeout && start){
        if(input.value===''){
            remainder.innerHTML = 'Please set time to play the game!';
            timeout = true;
            start = false;
            return;
        }            
        else if(input.value > 30){
            remainder.innerHTML = 'Time set is too much set less than 30 seconds';
            return;
        }            
        else{        
            remainder.innerHTML = ''            
            sectionFirst.addEventListener('click', sectionFirstEventHandler);                      
            sectionSecond.addEventListener('click', sectionSecondEventHandler);                                                    
            setTimeout(()=>{
                remainder.innerHTML = ' Gameover!';
                if(count > countTwo){
                    countDisplay.innerHTML = 'You Win Congra!!!';                    
                    getConfetti(1); 
                    canvas.style.zIndex = -2; 
                    myCanvas.style.zIndex = 3;                                                     
                }else if(count<countTwo){
                    //restartBtn.removeEventListener('click',restartBtnEventHandler);
                    countTwoDisplay.innerHTML = 'You Win Congra!!!';
                    getConfetti(2);
                    myCanvas.style.zIndex = -3; 
                    canvas.style.zIndex = 2;
                }else{
                    remainder.innerHTML += 'No one Wins';
                }                
                input.value = '';
                timeout = true; 
                start = false;               
            },input.value*1000);
        } 
    }else{
        remainder.innerHTML = 'Please restart the game!'; 
        sectionFirst.removeEventListener('click',sectionFirstEventHandler);
        sectionSecond.removeEventListener('click', sectionSecondEventHandler);         
        return;
    }    
}

//let ctx = canvas.getContext('2d');
//let ctx2 = myCanvas.getContext('2d');
let pieces = [];
let numberOfPieces = 50;
let lastUpdateTime = Date.now();

function randomColor () {
    let colors = ['#f00', '#0f0', '#00f', '#0ff', '#f0f', '#ff0'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function update () {
    let now = Date.now(),
        dt = now - lastUpdateTime;   

    for (let i = pieces.length - 1; i >= 0; i--) {
        let p = pieces[i];

        if (p.y > canvas.height) {
            pieces.splice(i, 1);
            continue;
        }

        p.y += p.gravity * dt;
        p.rotation += p.rotationSpeed * dt;
    }


    while (pieces.length < numberOfPieces) {
        pieces.push(new Piece(Math.random() * canvas.width, -20));
    }

    lastUpdateTime = now;

    setTimeout(update, 1);
}

function draw (opt) { 
     //console.log(ctx); 
     if(opt === 1)
        ctx = canvas.getContext('2d');
    else
        ctx = myCanvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
          
    pieces.forEach(function (p) {
        ctx.save();
        
        ctx.fillStyle = p.color;
        
        ctx.translate(p.x + p.size / 2, p.y + p.size / 2);
        
        ctx.rotate(p.rotation);
        
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        
        ctx.restore();
    });     
    requestAnimationFrame(draw);    
}

function Piece (x, y) {
    this.x = x;
    this.y = y;
    this.size = (Math.random() * 0.5 + 0.75) * 15;
    this.gravity = (Math.random() * 0.5 + 0.75) * 0.1;
    this.rotation = (Math.PI * 2) * Math.random();
    this.rotationSpeed = (Math.PI * 2) * (Math.random() - 0.5) * 0.001;
    this.color = randomColor();
}

while (pieces.length < numberOfPieces) {
    pieces.push(new Piece(Math.random() * canvas.width, Math.random() * canvas.height));
}
function removeConfetti(){
    //canvas = '';
    canvas.style.zIndex = -5;
    //myCanvas = '';
    myCanvas.style.zIndex = -3;
}
function getConfetti(opt){  

    update();   
    
    if(opt===1){
        draw(1);
        myCanvas.style.zIndex = 3;
    } 
    else{
        draw(2);
        canvas.style.zIndex = 3;
    }
    
}
function sectionFirstEventHandler(){
    if(start){                        
        count += 1;
        clickdisplay.innerHTML = 'Press S <br>' + count;
         
    }              
      
}
function sectionSecondEventHandler(){
    if(start){ 
        countTwo += 1;
        secondClickDisplay.innerHTML = 'Press L <br>' + countTwo; 
    }                                   
}
function restartBtnEventHandler(){
    if(timeout){
        timeout= false;
        start = false;
        remainder.innerHTML = ''
        clickdisplay.innerHTML = 'Press S ';
        secondClickDisplay.innerHTML = 'Press L ';
        countDisplay.innerHTML = '';
        countTwoDisplay.innerHTML = '';
        count = 0;
        countTwo = 0;
        removeConfetti();
    }        
}


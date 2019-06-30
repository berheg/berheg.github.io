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
clickdisplay.innerHTML = 'Press S ';
secondClickDisplay.innerHTML = 'Press L ';
gameStarter.addEventListener('click',function(){
    start = true;    
    startGame();
});
restartBtn.addEventListener('click',function(){
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
    }        
});
function startGame(){
    if(!timeout){
        if(input.value==='')
            remainder.innerHTML = 'Please set time to play the game!';
        else{        
            remainder.innerHTML = ''
            
                sectionFirst.addEventListener('click',function() {
                    if(!timeout && start){
                        count += 1;
                        clickdisplay.innerHTML = 'Press S <br>' + count; 
                    }                     
                });
                sectionSecond.addEventListener('click',function(){ 
                    if(!timeout && start){                   
                        countTwo += 1;
                        secondClickDisplay.innerHTML = 'Press L <br>' + countTwo; 
                    }                
                });                       
            setTimeout(()=>{
                remainder.innerHTML = ' Gameover!';
                if(count > countTwo){
                    countDisplay.innerHTML = 'You Win Congra!!!';                    
                    //getConfetti(true);                                                       
                }else if(count<countTwo){
                    countTwoDisplay.innerHTML = 'You Win Congra!!!';
                    //getConfetti(false); 
                }else{
                    remainder.innerHTML += 'No one Wins';
                }                
                input.value = '';
                timeout = true;                
            },input.value*1000);
        } 
    }else{
        remainder.innerHTML = 'Please restart the game!';
    }    
}



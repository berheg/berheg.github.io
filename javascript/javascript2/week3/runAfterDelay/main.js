const pfirst = document.querySelector('p.first');
const psecond = document.querySelector('p.second');
const pthird = document.querySelector('p.third');
const pFourt = document.createElement('p');
const body = document.querySelector('body');
const div = document.querySelector('div');
const fastest = function(delay){
    pfirst.innerHTML = 'I am called inside a function and delayed '+ delay/1000 + 'seconds';
}
const faster = function(delay){
    psecond.innerHTML = 'I am called inside a function and delayed ' + delay/1000 + 'seconds' ;
}
const fast = function(delay){
    pthird.innerHTML = 'I am called inside a function and delayed ' + delay/1000 + 'seconds' ;
}
function runAfterDelay(delay,callback){
    setTimeout(() => {
        callback(delay);
    },delay);
}
runAfterDelay(3000,fastest);
runAfterDelay(5000,faster);
runAfterDelay(6000,fast);

let count = 0;
body.addEventListener('click',function() {
    pFourt.innerHTML = '';  
    count += 1; 
    clickCounter();
  });

function clickCounter(){
    setTimeout(() => {                        
        if(count===2){
            pFourt.innerHTML = 'Double Clicked!';
        } else
        count = 0;
     }, 500);
     div.appendChild(pFourt);  
}








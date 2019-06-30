const btn = document.querySelector('button');
const pfirst = document.querySelector('p.first');
const psecond = document.querySelector('p.second');
const pthird = document.querySelector('p.third');
const div = document.querySelector('div')

let count = 1;
setTimeout(() => {
    console.log('Called after 2.5 seconds');
    pthird.innerHTML = 'Called after 2.5 seconds';
  }, 2500);
  function setTimeForLogout(delay,stringToLog){
    let psix = document.createElement('p')
    setTimeout(() => {      
      console.log(stringToLog);
      psix.innerHTML = stringToLog;      
      div.appendChild(psix);    
  },delay);
}
setTimeForLogout(1000,'1 minute remainder after page loaded!');
  
btn.addEventListener('click', ()=>{setTimeForLogout(3500,'3.5 seconds after button is clicked')

  }); 
  const earth = function(){
      console.log('Earth');
      pfirst.innerHTML = 'Earth';
  }
  const saturn = function(){
      console.log('Saturn');
      psecond.innerHTML = 'Saturn';
  }
  function planetLogFunction(planet){
       planet();      
  }  
   planetLogFunction(earth);
   planetLogFunction(saturn);
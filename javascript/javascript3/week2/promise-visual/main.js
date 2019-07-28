
//position declared as object
const positions = {
    top: 20,
    botton: 300,
    left: 400,
    right: 20
  };   
  const target = {
    red: {
      x: positions.right - parseInt(redBox.style.left),
      y: positions.botton - parseInt(redBox.style.top)
    },
    blue: {
      x: positions.left - parseInt(blueBox.style.left),
      y: positions.botton - parseInt(blueBox.style.top)
    },
    green: {
      x: positions.left - parseInt(greenBox.style.left),
      y: positions.top - parseInt(greenBox.style.top)
    }
  };
function redBallMove(){
    return moveElement(redBox,target.red);  
}
 function blueBallMove(){
    
    return moveElement( blueBox,target.blue)
       
}
 function greenBallMove(){
    
    return moveElement(greenBox,target.green);
   
}

function translateAllAtOnce(){
    //all at once    
    Promise.all([redBallMove(),blueBallMove(),greenBallMove()])
    .then(() => {
      console.log("All circles have moved");
      
    });
    setTimeout(() => {
     //document.location.reload(false);
     location.replace("index.html");
    }, 2500); 
}
//translateAllAtOnce(); 
setInterval(translateAllAtOnce(), 1000);   
    
   
    
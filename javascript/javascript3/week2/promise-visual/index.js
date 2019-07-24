const positions = {
    top: 20,
    botton: 300,
    left: 400,
    right: 20
  };
  const btn = document.querySelector('button.pageChange');
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
function translateOneByOne() {
      //red circle move
    Promise
        return redBallMove()   
      .then(() => {
        //blue circle move
        console.log("red circle has been moved");
        return blueBallMove();
      })
      .then(() => {
        //green circle move
        console.log("blue circle has been moved");
        return greenBallMove();
      })
      .then(() => {
        console.log("green circle has been moved");
        setTimeout(() => {
          document.location.reload(true);
        }, 2500);
      });      
    }    
    setInterval(translateOneByOne(), 2500); ;
    
    
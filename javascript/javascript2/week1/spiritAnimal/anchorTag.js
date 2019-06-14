
btn.addEventListener("click", function(){
    const spiritAnimal = ["The flying rat","The dancing mouse","cat","The barking dog","fox","sheep","lion","tiger","camel","cow"];
    const randomIndex = parseInt(Math.random() * 10);          
    if(inputBox.value === ""){
        alert("Please insert your name on the input box and click the button");     
    }else{         
        alert(inputBox.value + "-" + spiritAnimal[randomIndex]); 
    }       
});
document.body.appendChild(btn);

const functionArray = [
    add(),subtract(),multiply()
]
function add(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
/*for(let fun of functionArray){
    console.log(fun(30.60));
}*/
const funConstant = function (){
    return 'I am a constant function!'
}
function normalFunction(){
    return 'I am normal function!'
}
console.log(funConstant());
console.log(normalFunction());
const funObject = {
    add: (a,b) => {return a+b}
}
console.log(funObject.add(30,20));
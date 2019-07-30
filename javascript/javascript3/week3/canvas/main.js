const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');

let x = 200;
let y = 200;
let dx = 4;
let dy = 4;
let radius = 30;
c.fillStyle = "#3370d4"; //blue
function animate(){
    requestAnimationFrame(animate);
    console.log('How long it loops');
    //c.clearRect(0, 0, innerWidth, innerHeight);
    c.beginPath();
    
    c.arc(x, y, radius, 0, Math.PI*2, false);
    c.fill();
    c.strokeStyle = 'blue';
    c.stroke();
    if(x + radius > innerWidth || x-radius < 0 ){
        dx = -dx;
    }
    if(y + radius > innerHeight || y-radius < 0 ){
        dy = -dy;
    }
    x +=dx;
    y +=dy;

}
animate();
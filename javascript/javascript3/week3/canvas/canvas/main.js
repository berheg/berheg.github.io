
const canvas = document.querySelector('canvas'); 
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2 
}
window.addEventListener("resize", function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;		
});
window.addEventListener("mousemove", function(e) {
  mouse.x = e.clientX;	
  mouse.y = e.clientY;	
});       
const colors = [
  {r: 255, g: 71, b: 71},
  {r: 0, g: 206, b: 237},
  {r: 255, g: 255, b: 255}
]; 
//Draw Arc or Circle
class Circle{
    constructor(x, y, dx, dy, r, ttl){
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.r = r;
      //this.startAngle = startAngle;
      //this.endAngle = endAngle;       
      this.randomColor = Math.floor(Math.random() * colors.length);
      this.opacity = 1;
      this.shouldRemove = false;
      this.timeToLive = ttl;               
    }
    update() {
      this.x += this.dx
      this.y += this.dy

      if (this.x + this.r >= canvas.width || this.x - this.r <= 0)
          this.dx = -this.dx

      if (this.y + this.r >= canvas.height || this.y - this.r <= 0)
          this.dy = -this.dy

      // Ensure that particles cannot be spawned past canvas boundaries
      this.x = Math.min(Math.max(this.x, 0 + this.r), canvas.width - this.r)
      this.y = Math.min(Math.max(this.y, 0 + this.r), canvas.height - this.r)

      c.beginPath()
      c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
      c.strokeStyle =
          'rgba(' +
          colors[this.randomColor].r +
          ',' +
          colors[this.randomColor].g +
          ',' +
          colors[this.randomColor].b +
          ',' +
          this.opacity +
          ')'
      c.fillStyle =
          'rgba(' +
          colors[this.randomColor].r +
          ',' +
          colors[this.randomColor].g +
          ',' +
          colors[this.randomColor].b +
          ',' +
          this.opacity +
          ')'
      c.stroke()
      c.closePath()

      this.opacity -= 1 / (this.timeToLive / 0.1)
      this.r -= this.r / (this.timeToLive / 0.1)

      if (this.r < 0) this.r = 0 

      this.timeToLive -= 0.1
  }


  remove() {
      // If timeToLive expires, return a true value.
      // This signifies that the particle should be removed from the scene.
      return this.timeToLive <= 0;
  }

 draw(){         
      
    c.clearRect(0, 0, innerWidth, innerHeight);      
    c.beginPath();
    c.fillStyle = "#3370d4";
    c.arc(this.x, this.y, this.r, this.startAngle, this.endAngle, false);
    c.fill();
    c.strokeStyle = this.fillColor;
    c.stroke();
  }   
}
function Explosion(x, y) {
    this.particles = [];	

    this.init = function() {
        for (let i = 1; i <= 1; i++) {
            const randomVelocity = {
                x: (Math.random() - 0.5) * 3.5,
                y: (Math.random() - 0.5) * 3.5,
            }
            this.particles.push(new Circle(x, y, randomVelocity.x, randomVelocity.y, 30, 8));				
        }
    }

    this.init();

  this.draw = function() {
    for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].update();	

        if (this.particles[i].remove() == true) {
            this.particles.splice(i, 1);	
        };
    }	
  }
}
let explosions = [];
function animate() {
  //window.requestAnimationFrame(animate);
  setInterval(() =>{
  c.fillStyle = "#1e1e1e";
  c.fillRect(0, 0, canvas.width, canvas.height);

  explosions.push(new Explosion(mouse.x, mouse.y));

  for (let i = 0; i < explosions.length; i++) {
      explosions[i].draw();
  }
},500);
}
animate();
let c1 = new Circle(50, 50, 20, 0, 2 * Math.PI);

c1.draw();

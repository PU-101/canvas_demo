var canvas=document.getElementById("box");
var ctx=canvas.getContext("2d");

var CANVAS_WIDTH = canvas.width;
var CANVAS_HEIGHT = canvas.height;

// 背景
// var bgImage = new Image();
// bgImage.onload = function(){
//   bgReady = true;
// }
// bgImage.src = 'images/bg.jpg';
var grd=ctx.createLinearGradient(0,0,0,CANVAS_HEIGHT);
grd.addColorStop(0,"black");
grd.addColorStop(1,"white");

ctx.fillStyle=grd;
ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

// 人物
var personImage = new Image();
personImage.onload = function(){
  personReady = true;
}
personImage.src = 'images/person.png';

var person = {
  speed: 50,
  position: {x: 0, y: 0},
  direction: {x: 0, y: 0}
}


// 处理玩家输入
var keysdown = {};
addEventListener('keydown', function(e){
  keysdown[e.keyCode]=true;
}, false);

addEventListener('keyup', function(e){
  delete keysdown[e.keyCode];
}, false);


// 重置
var reset = function(){
  person.position.x = CANVAS_WIDTH/2;
  person.position.y = CANVAS_HEIGHT/2;
}

// 更新对象
var move = function(distance){
  person.position.x += (distance*person.direction.x);
  person.position.y += (distance*person.direction.y);
};

var update = function(){
  if (!this.lastUpdate) {
    this.lastUpdate = Date.now();
  }
  var now = Date.now();
  var elapsed = (now - this.lastUpdate);
  this.lastUpdate = now;

  var distance = (person.speed/300)*elapsed;

  if (person.position.x > 0) {
      if (37 in keysdown) {
        person.direction = {x:-1,y:0};
        move(distance);
      }
  }

  if (person.position.x < CANVAS_WIDTH-personImage.width) {
    if (39 in keysdown) {
      person.direction = {x:1,y:0};
      move(distance);
    }
  }

  if (person.position.y > 0) {
    if (38 in keysdown) {
      person.direction = {x:0,y:-1};
      move(distance);
    }
  }

  if (person.position.y < CANVAS_HEIGHT-personImage.height) {
    if (40 in keysdown) {
      person.direction = {x:0,y:1};
      move(distance);
    }
  }

};

// 渲染对象
var render = function(){
  ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

  // if (bgReady)
  // {
  //   ctx.drawImage(bgImage,0,0,640,640,0,0,640,640);
  // }
  if (personReady)
  {
    ctx.drawImage(personImage,person.position.x,person.position.y);
  }

};

// 主循环
var main = function(){
  update();
  render();
};

reset();
setInterval(main, 1);
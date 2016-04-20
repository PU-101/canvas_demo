var canvas=document.getElementById("box");
var ctx=canvas.getContext("2d");

var CANVAS_WIDTH = canvas.width;
var CANVAS_HEIGHT = canvas.height;
var STEP = CANVAS_WIDTH/16;

// 地图
var mapData = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

// 背景
var bgImage = new Image();
bgImage.onload = function(){
  bgReady = true;
};
bgImage.src = "images/bg.jpg";


var createMap = function(){
  for (var r = 0; r < 16; r++) {
    for (var c = 0; c < 16; c++) {
      if (mapData[r][c] == 2) {
        ctx.fillStyle="red";
        ctx.fillRect(STEP*c, STEP*r, STEP, STEP);
      }
    }
  }
}


// 人物
var personImage = new Image();
personImage.onload = function(){
  personReady = true;
}
personImage.src = 'images/person.png';

var person = {
  speed: 50,
  direction: {x: 0, y: 0},
  positionMap: {r: 1, c: 5},
}

// 箱子
var boxImage = new Image();
boxImage.onload = function(){
  boxReady = true;
}
boxImage.src = 'images/box.png';

var box = {
  positionMap: {r: 5, c: 5},
}


// 转换为像素地址
var personPosition = {};
var boxPosition = {};
var convertToPosition = function(obj){
  return {x: (obj.positionMap.c * STEP), y: (obj.positionMap.r * STEP)};
};

// 处理玩家输入
var key = {};
addEventListener('keyup', function(e){
  key[e.keyCode] = true;
}, false);


// 重置
var reset = function(){
  person.positionMap.r = 1;
  person.positionMap.c = 5;
}

// 更新对象
var move = function(){
  new_c = person.positionMap.c + person.direction.x;
  new_r = person.positionMap.r + person.direction.y;
  if (mapData[new_r][new_c] == 0 || mapData[new_r][new_c] == 1) {
    person.positionMap.r = new_r;
    person.positionMap.c = new_c;
  }
};

var update = function(){

  if (person.positionMap.r > 0) {
    if (37 in key) {
      person.direction = {x: -1, y: 0};
      move();
      delete key[37];
    }
  }

  if (person.positionMap.c > 0) {
    if (38 in key) {
      person.direction = {x: 0, y: -1};
      move();
      delete key[38];
    }
  }
  
  if (person.positionMap.r < 15) {
    if (39 in key) {
      person.direction = {x: 1, y: 0};
      move();
      delete key[39];
    }
  }
  
  if (person.positionMap.c < 15) {
    if (40 in key) {
      person.direction = {x: 0, y: 1};
      move();
      delete key[40];
    }
  }
  
};

// 渲染对象
var render = function(){
  // ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
  if (bgReady && personReady && boxReady) {
    ctx.drawImage(bgImage,0,0);
    ctx.drawImage(personImage,0,0,110,110,personPosition.x,personPosition.y,STEP,STEP);
    ctx.drawImage(boxImage,0,0,38,38,boxPosition.x,boxPosition.y,STEP,STEP);
    createMap();
  }

};

// 主循环
var main = function(){
  personPosition = convertToPosition(person);
  boxPosition = convertToPosition(box);
  update();
  render();
};

reset();
setInterval(main, 1);
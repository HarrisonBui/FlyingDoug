/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

let Doug = __webpack_require__(2);
let Platform = __webpack_require__(4);
let Bone = __webpack_require__(1);


let Game = function(){
  this.numPlatforms = 6;
  this.platforms = [];
  this.platformWidth = 60;
  this.platformHeight = 10;
  this.numStars = 10;
  this.stars = [];
  this.bone = null;
  this.score = 0;
  this.Loop = null;
  this.doug = new Doug(this);
};

Game.prototype = {
  clr: function(){
    ctx.fillStyle = "#191970"
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.closePath();
    ctx.fill();
  },

  splash: function(){
    let img = new Image();

    img.onload = function(){
      ctx.drawImage(img, 1, 1);
    };
    img.src = "./assets/splash1.png";
  },

  createBone: function(){
    this.bone = new Bone();
  },

  renderBone: function(){
    ctx.drawImage(this.bone.image, 0, 0, 40, 31, this.bone.X, this.bone.Y, 40, 31);
  },

  updateBone: function(dY){
    if (this.bone.Y - 20 > height || this.bone.hit){
      this.bone.hit = false;
      this.bone.X = Math.random() * width;
      this.bone.Y = 0 - 20;
    }else {
      this.bone.Y += dY;
    }
  },

  createPlatforms: function(){
    let position = 0, type;

    for (let i = 0; i < this.numPlatforms; i++){
      type = Math.floor(Math.random() * 8);
      this.platforms[i] = new Platform(this, Math.random() *(width - this.platformWidth), position, type);
      if (position < height - this.platformHeight) {
        position += Math.floor(height / this.numPlatforms);
      }
    }
  },

  checkMove: function(){
    if (keyLeft){
      this.doug.moveLeft();
    }else if (keyRight){
      this.doug.moveRight();
    }
  },

  jump: function(){
    let dougContext = this.doug;
    let gameContext = this;

    if(dougContext.Y > height * 0.5){
      dougContext.setPos(dougContext.X, dougContext.Y - dougContext.jumpSpeed);
    }else {
      this.updateBone(dougContext.jumpSpeed * 0.5);

      this.platforms.forEach(function(platform, index) {
        platform.Y += dougContext.jumpSpeed;

        if(platform.Y > height){
          let type = Math.floor(Math.random() * 8);

          gameContext.platforms[index] = new Platform(gameContext, Math.random() * (width - gameContext.platformWidth), platform.Y - height, type);
        }
      });
    }

    dougContext.jumpSpeed --;

    if(dougContext.jumpSpeed === 0){
      dougContext.isJumping = false;
      dougContext.isFalling = true;
      dougContext.fallSpeed = 0;
    }
  },

  fall: function(){
    let dougContext = this.doug;

    if (dougContext.Y < height - dougContext.height) {
      dougContext.setPos(dougContext.X, dougContext.Y + dougContext.fallSpeed);
      dougContext.fallSpeed++;
    } else {
      dougContext.fallStop();
    }
  },

  checkPlatformCollision: function(){
    let gameRef = this;

    for (let i = 0; i < this.platforms.length; i++) {

      if (
          (gameRef.doug.isFalling) &&
          !(gameRef.doug.X + gameRef.doug.width < this.platforms[i].X ||
            gameRef.doug.X > this.platforms[i].X + this.platformWidth ||
            gameRef.doug.Y + gameRef.doug.height < this.platforms[i].Y ||
            gameRef.doug.Y > this.platforms[i].Y + this.platformHeight)

         ) {
            gameRef.onPlatformCollision(this.platforms[i].type);
            break;
           }
    }
   },

  onPlatformCollision: function(type){
    this.doug.fallStop();
    if (type === 0){
        this.doug.jumpSpeed = 40;
        // this.score += 50;
    }
  },

  checkBoneCollision: function(){
    if (
       !(this.doug.X > this.bone.X + 40 ||
       this.doug.X + this.doug.width < this.bone.X ||
       this.doug.Y > this.bone.Y + 31 ||
       this.doug.height + this.doug.Y < this.bone.Y)
      ) {
        if (this.bone.hit === false) {
          this.bone.hit = true;
          this.score += 1;
      }
    }
  },

  gameLoop: function(){

    this.checkMove();
    this.clr();
    this.renderBone();
    this.checkBoneCollision();


    if(this.doug.isJumping){
      this.jump();
    }

    if(this.doug.isFalling){
      this.fall();
    }

    this.doug.render();
    this.doug.wrap();

    this.platforms.forEach(function(platform){
      platform.render();
    });
    this.checkPlatformCollision();

    ctx.fillStyle = "White";
    ctx.font = "20px Courier New";
    ctx.fillText("BONES: " + this.score, 2, 15);

    if (!this.gameOver()){
      this.Loop = setTimeout(this.gameLoop.bind(this), 20);
    } else{
      setTimeout(this.splash.bind(this), 1000);
    }
  },

  startGame: function(){
    this.doug.reset();
    this.score = 0;
    this.doug.setPos(Math.floor((width - this.doug.width)/2), (height - this.doug.height)/2);
    this.createPlatforms();
    this.createBone();
    this.doug.jump();
    this.gameLoop();
  },

  gameOver: function(){
    if(this.doug.Y > height - this.doug.height){
      return true;
    } else {
      return false;
    }
  }
};

module.exports = Game;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

let Bone = function(){

  let newBone = {
    X: Math.random() * width,
    Y: Math.random() * height,
    hit: false,
    image: new Image()
  };

  newBone.image.src = ("./assets/bone1.png");
  return newBone;
};

module.exports = Bone;


/***/ }),
/* 2 */
/***/ (function(module, exports) {


let Doug = function (game) {
  this.image = new Image();
  this.image.src = "./assets/pug.png";
  this.width = 40;
  this.height = 50;
  this.X = 0;
  this.Y = 0;
  this.isJumping = false;
  this.isFalling = false;
  this.jumpSpeed = 0;
  this.fallSpeed = 0;
};

  Doug.prototype = {
    setPos: function (x, y) {
      this.X = x;
      this.Y = y;
    },
    render: function () {
      ctx.drawImage(this.image, 0, 0, this.width, this.height, this.X, this.Y, this.width, this.height);
    },
    jump: function () {
      if (this.isJumping === false && this.isFalling === false) {
        this.fallSpeed = 0;
        this.isJumping = true;
        this.jumpSpeed = 17;
      }
    },
    fallStop: function () {
      this.isFalling = false;
      this.fallSpeed = 0;
      this.jump();
    },
    moveLeft: function () {
      if (this.X > 0) {
        this.setPos(this.X - 10, this.Y);
      }
    },
    moveRight: function () {
      if (this.X < width - this.width) {
        this.setPos(this.X + 10, this.Y);
      }
    },

    wrap: function() {
      if (this.X > 500){
        this.X = 1;
      }
      else if (this.X < 0) {
        this.X = width;
      }
    },

    reset: function () {
      this.isJumping = false;
      this.isFalling = false;
      this.jumpSpeed = 0;
      this.fallSpeed = 0;
    }
  };

module.exports = Doug;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);

width = 500;
height = 500;
keyLeft = false;
keyRight = false;

window.addEventListener("keydown", checkKeyPressed, false);
window.addEventListener("keyup", checkKeyLifted, false);

gameCanvas = document.getElementById("game-canvas");

ctx = gameCanvas.getContext("2d");



let flyingDoug = new Game();
flyingDoug.splash();

function checkKeyPressed (event) {
    switch(event.keyCode) {
        case 37:
            keyLeft = true;
            break;
        case 39:
            keyRight = true;
            break;
        case 13:
            flyingDoug.startGame();
            break;
    }
}

function checkKeyLifted (event) {
  keyLeft = false;
  keyRight = false;
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

let Platform = function(game, x, y, type) {
  this.game = game;
  this.X = Math.floor(x);
  this.Y = y;
  this.type = type;
};

let randomColor = function(){
  let hexDigits = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 3; i++){
    color += hexDigits[Math.floor((Math.random() * 16))];
  }
  return color;
};

Platform.prototype.render = function(){
  if(this.type === 0){
    ctx.fillStyle = randomColor();
  }else{
    ctx.fillStyle = "#C0C0C0";
  }
  ctx.fillRect(this.X, this.Y, this.game.platformWidth, this.game.platformHeight);
  return this;
};

module.exports = Platform;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
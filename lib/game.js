let Doug = require('./doug.js');
let Platform = require('./platform.js');
let Bone = require('./bone.js');
let Star = require('./star.js');

let Game = function(){
  this.numPlatforms = 6;
  this.platforms = [];
  this.platformWidth = 60;
  this.platformHeight = 10;
  this.numStars = 6;
  this.stars = [];
  this.bone = null;
  this.score = 0;
  this.Loop = null;
  this.doug = new Doug(this);
  this.keys = {
    right: false,
    left: false
  };
};

Game.prototype = {
  clr: function(){
    ctx.fillStyle = "#2F4F4F"
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
    img.src = "./assets/splash.png";
  },

  createBone: function(){
    this.bone = new Bone();
  },

  renderBone: function(){
    ctx.drawImage(this.bone.image, 0, 0, 40, 31, this.bone.X, this.bone.Y, 40, 31);
  },

  updateBone: function(d){
    if (this.bone.Y - 20 > height || this.bone.hit){
      this.bone.hit = false;
      this.bone.X = Math.random() * width;
      this.bone.Y = 0 - 20;
    }else {
      this.bone.Y += d;
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

  createStars: function () {
    for (var i = 0; i < this.numStars; i++){
      this.stars.push(new Star());
    }
  },

  renderStars: function () {
    for (var i = 0; i < this.numStars; i++) {
      ctx.drawImage(this.stars[i].image, 0, 0, 100, 100, this.stars[i].X, this.stars[i].Y, 100, 100);
    }
  },

  updateStars: function(d) {
    for (var i = 0; i < this.numStars; i++) {
      if (this.stars[i].Y - 20 > height) {
        this.stars[i].X = Math.random() * width;
        this.stars[i].Y = 0 - 20;
      } else {
        this.stars[i].Y += d;
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
      this.updateStars(dougContext.jumpSpeed * 0.5);

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
    this.renderStars();

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
      this.Loop = setTimeout(this.gameLoop.bind(this), 25);
    } else{
      setTimeout(this.splash.bind(this), 3500);
      ctx.fillStyle = "Red";
      ctx.font = "30px Courier New";
      ctx.fillText("Doug went Skydiving", 80, 250);
      ctx.fillText("Bones Collected: " + this.score, 100, 290);
    }
  },

  startGame: function(){
    this.doug.reset();
    this.score = 0;
    this.doug.setPos(Math.floor((width - this.doug.width)/2), (height - this.doug.height)/2);
    this.createPlatforms();
    this.createBone();
    this.createStars();
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

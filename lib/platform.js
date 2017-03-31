let Platform = function(game, x, y, type) {
  this.game = game;
  this.X = Math.floor(x);
  this.Y = y;
  this.type = type;
};

Platform.prototype.render = function(){
  let cloudImage = new Image();
  let cloudImage2 = new Image();
  cloudImage.src = './assets/cloud.png';
  cloudImage2.src = './assets/cloud2.png';
  if(this.type === 0){
    ctx.drawImage(cloudImage2, this.X, this.Y, this.game.platformWidth, this.game.platformHeight);
    return this;
  }else{
    ctx.drawImage(cloudImage, this.X, this.Y, this.game.platformWidth, this.game.platformHeight);
    return this;
  }

};


module.exports = Platform;

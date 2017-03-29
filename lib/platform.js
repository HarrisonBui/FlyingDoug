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


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

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

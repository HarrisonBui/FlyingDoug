let Star = function () {

  let newStar = {
    X: Math.random() * width,
    Y: Math.random() * height,
    image: new Image()
  };

  newStar.image.src = ("./assets/star" + Math.floor(Math.random() * 2) + ".png");

  return newStar;

};

module.exports = Star;

var Tile = function() {
  this.__width = 0;
  this.__height = 0;
  this.__color = '';
  this.__tile = {};
};

Tile.prototype.createTile = function() {
  var newTile = document.createElement("DIV");
  newTile.style.height = this.__height;
  newTile.style.width = this.__width;
};

Tile.prototype.setBackground = function(color) {
  if(typeof color != 'undefined') {
    this.updateBackground(color);
  } else {
    var RGBGreen =  Math.random() * 255;
    var RGBRed = Math.random() * 255;
    var RGBBlue = Math.random() * 255;
    var newColor = "rgb(" + RGBRed + ", " + RGBGreen + ", " + RGBBlue + ")";
    this.updateBackground(newColor);
  }
};

Tile.prototype.updateBackground = function(color) {
  this.__color = color;
  this.__tile.style.backgroundColor = color;
};


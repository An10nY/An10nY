var Tile = function() {
  var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  this.__width = windowWidth * 0.15 + "px";
  this.__height = windowWidth * 0.15 + "px";
  this.__margin = windowWidth * 0.006 + "px";
};

Tile.prototype.createTile = function() {
  var newTile = document.createElement("DIV");
  newTile.style.height = this.__height;
  newTile.style.width = this.__width;
  newTile.style.margin = this.__margin;
  newTile.style.display = "inline-block";
  this.addHoverEventListener(newTile);
  this.setBackground(newTile);
  document.getElementById("main-div").appendChild(newTile);
};

Tile.prototype.setBackground = function(tile, color) {
  if(typeof color != 'undefined') {
    this.updateBackground(tile, color);
  } else {
    var RGBGreen =  Math.round(Math.random() * 255);
    var RGBRed = Math.round(Math.random() * 255);
    var RGBBlue = Math.round(Math.random() * 255);
    var newColor = "rgb(" + RGBRed + ", " + RGBGreen + ", " + RGBBlue + ")";
    this.updateBackground(tile, newColor);
  }
};

Tile.prototype.updateBackground = function(tile, color) {
  tile.style.backgroundColor = color;
};

Tile.prototype.addHoverEventListener = function(tile) {
  var curTile = this;
  var oldTileColor;
  this.addEventListener(tile, 'mouseover', function() {
    //curTile.transformSize(tile, 10);
    oldTileColor = tile.style.backgroundColor;
    console.log("old color: " + tile.style.backgroundColor);
    tile.style.backgroundColor = curTile.shadeRGBColor(oldTileColor,0.5);
    console.log("new color: " + tile.style.backgroundColor);
  });
  this.addEventListener(tile, 'mouseout', function() {
    console.log("old color: " + tile.style.backgroundColor);
    tile.style.backgroundColor = oldTileColor;
    console.log("new color: " + tile.style.backgroundColor);
  });
};

Tile.prototype.addEventListener = function(tile, triggeringEvent, executedFunction) {
  if (document.addEventListener) {                
    tile.addEventListener(triggeringEvent, executedFunction);
  } else if (document.attachEvent) {
    tile.attachEvent(triggeringEvent, executedFunction);
  }
};
  
Tile.prototype.transformSize = function(tile, sizeDiff) {
  var difference = (sizeDiff > 0)? 1 : -1;
  var i = sizeDiff;
      var interval = setInterval(function(){
        tile.style.width =  tile.offsetWidth + difference + "px";
        tile.style.height =  tile.offsetHeight + difference + "px";
        i += (i > 0)? -1 : 1;
        if(i == 0 ) {
          clearInterval(interval);
        }
      },10);    
};

Tile.prototype.shadeRGBColor = function(color, percent) {
  var f = color.split(",");
  var t = percent < 0? 0 : 255;
  var p = percent < 0? percent*-1 : percent;
  var R = parseInt(f[0].slice(4));
  var G = parseInt(f[1]);
  var B = parseInt(f[2]);  
  return "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
};
    

Tile.prototype.blendRGBColors = function(c0, c1, p) {
  var f = c0.split(",");
  var t = c1.split(",");
  var R = parseInt(f[0].slice(4));
  var G = parseInt(f[1]);
  var B = parseInt(f[2]);
  return "rgb("+(Math.round((parseInt(t[0].slice(4))-R)*p)+R)+","+(Math.round((parseInt(t[1])-G)*p)+G)+","+(Math.round((parseInt(t[2])-B)*p)+B)+")";
}; 
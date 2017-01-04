var Tile = function(width, height, margin) {
  var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  this.__defaultWidth = windowWidth * 0.14;
  this.__defaultHeight = windowWidth * 0.14;
  this.__defaultMargin = windowWidth * 0.005;
  this.__newTile = document.createElement("DIV");
  this.__minMargin = 20/28;
  margin = Math.max(margin  || this.__defaultMargin,this.__minMargin);
  this.__newTile.style.height = (height || this.__defaultHeight) + "px";
  this.__newTile.style.width = (width || this.__defaultWidth) + "px";
  this.__newTile.style.margin = margin + "px";
  this.__newTile.style.minHeight = "20px";
  this.__newTile.style.minWidth = "20px";
  this.__newTile.style.display = "inline-block";
  this.addHoverEventListener(this.__newTile);
  this.addClickEventListener(this.__newTile);
  this.setBackground(this.__newTile);
};

Tile.prototype.getMainDiv = function() {
    return this.__newTile;
};

Tile.prototype.setDimensions = function(height, width) {
  this.style.height = height + "px";
  this.style.width = width + "px";
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
    oldTileColor = tile.style.backgroundColor;
    tile.style.backgroundColor = curTile.shadeRGBColor(oldTileColor,0.5);
  });
  this.addEventListener(tile, 'mouseout', function() {
    tile.style.backgroundColor = oldTileColor;
  });
};
Tile.prototype.addClickEventListener = function(tile) {
  this.addEventListener(tile,'click',function(){
    tile.style.position = 'absolute';
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

window.onload =function() {
  
  // var tile = new Tile();
  //   for(var i = 0; i < 20;i++) {
  //   tile.createTile();
  // }
  var a = new Canvas();
};




var Canvas = function() {  
  this.__windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  this.__windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;  
  this.__mainDiv = document.getElementById("main-div");
  this.__tileList = [];
  this.__nbTiles = 0;
  this._init();
};

Canvas.prototype.grabTiles = function() { 
  this._updateElementDimensions();
  for(var i = 0; i < this.__nbTiles; i++) {
    this.__mainDiv.appendChild(this.__tileList[i]);
  }
};

Canvas.prototype._init = function() {
  this.__mainDiv.style.maxWidth = this.__windowWidth * 0.9 + "px";
  this.__mainDiv.style.maxHeight = this.__windowHeight * 0.98 + "px";
  this.__mainDiv.style.overflow = "hidden";
  var width =  this.__windowWidth * 0.028;
  var height =  this.__windowWidth * 0.028;
  var margin =  this.__windowWidth * 0.002;
  var nbTiles = this.calculateNbTiles(width,height,margin);
  for(var i = 0; i < nbTiles; i++) {
    var a = new Tile(width, height, margin);
    this.appendChild(a);
  }
  this.createCover();
};

Canvas.prototype.createCover = function(){
  var cover = document.createElement("div");
  cover.style.maxWidth = this.__windowWidth * 0.7 + "px";
  cover.style.height = this.__windowHeight * 0.98 + "px";
  cover.style.backgroundColor = "black";
  cover.style.position = "absolute";
  cover.style.left = "0";
  cover.style.right = "0";
  cover.style.margin = "auto";
  cover.style.top = "8px";
  cover.style.opacity = "0.8";
  cover.style.filter  = 'alpha(opacity=80)';
  this.__mainDiv.appendChild(cover);
};

Canvas.prototype.calculateNbTiles = function(width, height, margin) {
  var nbTilesPerRow = Math.floor(0.9 * this.__windowWidth/ (width + 2 * margin));
  var nbRowsNeeded = Math.ceil(this.__windowHeight * 0.98 / (height + 2 * margin));
  return nbTilesPerRow * nbRowsNeeded * 1.5;
};

Canvas.prototype.appendChild = function(child) {
  if(child instanceof Node)
    this.__mainDiv.appendChild(child);
  else(child instanceof Tile)
    this.__mainDiv.appendChild(child.getMainDiv());
};

Canvas.prototype._updateElementDimensions = function() {
  this.__windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  this.__windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  this.__mainDiv.style.maxWidth = this.__windowWidth * 0.9 + "px";
  this.__width = this.__windowWidth * 0.14 + "px";
  this.__height = this.__windowWidth * 0.14 + "px";
  this.__margin = this.__windowWidth * 0.005 + "px";
  for(var i = 0; i < this.__nbTiles; i++) {
    this.__tileList[i].setDimensions(this.__height, this.__width);
  }
};


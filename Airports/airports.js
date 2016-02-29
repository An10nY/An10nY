(function{

  var inheritsFrom = function (child, parent) {
      child.prototype = Object.create(parent.prototype);
  };

  var Country = function(name) {
    this.__name = "";
    this.__nbAirports = 0;
    this.__airports = [];
    this.__init(name);
  };

  Country.prototype.__init = function(name){
    this.__name = name;
  };

  Country.prototype.printStats = function() {
    console.log("Country name: " + this.__name);
    console.log("Number of Airports: " + this._nbAirports);
  };

  var Airport = function(name){
    this.__name = "";
    thi
    this.__nbDestinations = 0;
    this.__destinations = [];
    this.__init(name);
  };

  Airport.prototype.__init = function(name){
    this.__name = name;
  };

  Airport.addDestination = function(destination) {
    if(destination instanceof Airport) {
      if(this.__destinations.indexOf(destination) === -1) {
        this.__destinations[this.__nbDestinations] = destination;
        this.__nbDestinations++;
      }
    }
  };

  Airport.prototype.getNbDestinations = function() {
    return this.__nbDestinations;
  };

  Airpot.prototype.getDestinations = function() {
    return this.__destinations;
  };


})();
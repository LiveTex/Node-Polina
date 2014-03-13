
/**
 * Global cursor.
 * @constructor
 */

polina.Cursor = function(){
  this.position = 0;
  this.currentValuePosition = 0;
  this.__isParsed = true;
}

polina.Cursor.prototype.getPosition = function(value){
  return this.position;
};

polina.Cursor.prototype.incrPosition = function(value){
  return this.position += value;
};


polina.Cursor.prototype.reset = function(){
  return this.position  = 0;
};


polina.Cursor.prototype.isParsed = function(){
  return this.__isParsed;
};


polina.Cursor.prototype.endParsing = function(){
  this.__isParsed = false;
};




Function.prototype.before = function(beforefun){
    var _self = this;
    return function(){
       beforefun.apply(this,arguments);
       return _self.apply(this,arguments);
    }
};

Function.prototype.after = function(afterfun){
    var _self = this;
    return function(){
       var ret = _self.apply(this,arguments);
       afterfun.apply(this,arguments);
       return ret;
    }
};

var func = function(){
    console.log(2);
};

func = func.before(function(){ 
          console.log(1);
        }).after(function(){
          console.log(3);
        });
func();
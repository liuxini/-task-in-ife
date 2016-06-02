function addEvent(type, element, fun){
    if( element.addEventListener){
        addEvent = function(type, element, fun){
                        element.addEventListener(type,fun,false);};
    }else if( element.attachEvent){
       addEvent = function(type,element,fun){
                        element.attachEvent('on'+type,fun,false);};
    }else{
        addEvent = function(type,element,fun){
                        element['on'+type] =fun;};
    }
  return addEvent(type, element, fun);
};

(function(){
    var single = document.getElementById('day');
    var duration = document.getElementById('time');
    var body = document.body;
    var calendar = new Calendar ( body );
    var calendarlong = new Calendar ( body, true, 3, 60 );

    addEvent('click',single,function(){
        if( calendar.style.display ==='none'){
            calendar.style.display = '';
        }else{
            calendar.style.display = 'none';
        }
    });

    addEvent('click',duration,function(){
        if( calendarlong.style.display ==='none'){
            calendarlong.style.display = '';
        }else{
            calendarlong.style.display = 'none';
        }
    });
});
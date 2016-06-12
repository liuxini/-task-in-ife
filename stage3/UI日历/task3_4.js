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
    var calendarEle = document.querySelectorAll('.calendarEle');

    addEvent('click',single,function(){
    
        if ( calendarEle[0].style.display ==='none' ) {
            calendarEle[0].style.display = '';
            calendarEle[0].style.marginLeft = '112px';
        } else {
            calendarEle[0].style.display = 'none';
        }
    });

    addEvent('click',duration,function(){
        
        if ( calendarEle[1].style.display ==='none' ) {
            calendarEle[1].style.display = '';
            calendarEle[1].style.marginLeft = '477px';
        } else {
            calendarEle[1].style.display = 'none';
        }
    });
})();
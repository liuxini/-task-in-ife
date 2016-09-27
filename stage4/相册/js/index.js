function addEvent( elemenet,type,func){
    if(elemenet.addEventListener) {
        addEvent = function( elemenet,type,func){
            elemenet.addEventListener(type,func,false);
        };
    } else if ( elemenet.attachEvent ) {
        addEvent = function(elemenet,type,func){
            elemenet.attachEvent('on'+type,func,false);} 
    } else {
         addEvent =  function(elemenet,type,func){
            element['on'+type] =func;};
    }

    return addEvent(elemenet,type,func);
}

(function(){
    var btn = document.querySelector("svg");
    var list = document.querySelector("ul");
    var menu = document.querySelector(".sideMenu");
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var tempheight = menu.getBoundingClientRect().top;
    setInterval(function(){
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if ( scrollTop>tempheight) {
             menu.style.position = "fixed";
            // menu.style.top = scrollTop - tempheight+"px";
            // menu.style.top = scrollTop - tempheight+"px";
        } else {
             // menu.style.top = "0";
             menu.style.position = "absolute";
             menu.style.top = "0px";
        }
    },500);
    
    addEvent(btn, "click", function(){
        if( menu.classList.contains("hidden")) {
            menu.classList.remove("hidden");
            menu.classList.add("animation");
            menu.classList.add("showmenu");
        } else {
            menu.classList.remove("showmenu");
            menu.classList.remove("animation");
            menu.classList.add("hidden");
        }   
    } );

   
})();
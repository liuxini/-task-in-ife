function addEvent( elemenet,type,func){
    if(elemenet.addEventListener) {
        addEvent = function( elemenet,type,func){
            elemenet.addEventListener(type,func,false);
        };
    } else if ( elemenet.attachEvent ) {
        addEvent = function(elemenet,type,func){
            elemenet.addEventListener('on'+type,func,false);} 
    } else {
         addEvent =  function(elemenet,type,func){
            element['on'+type] =func;};
    }

    return addEvent(elemenet,type,func);
}


var Application = function(gallary){
    this.gallary = gallary;
    this.show = new Show();
    this.loading = false;
    this.load();

    addEvent( window, 'scroll', this.scroll.bind(this));
    addEvent ( document , 'click', this.click.bind(this) );
}

Application.prototype.scroll = function() {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (scrollTop + window.innerHeight >= document.body.clientHeight && !this.loading) {
        this.load();
    }
}

Application.prototype.click = function(event) {
    var event = event || window.event;
    var target = event.target || event.srcElement ;
    if( target.className ==='row-image') {
        this.show.display(target.src,target.clientWidth,target.clientHeight);
    }
}
 Application.prototype.load = function() {
    this.loading = true;
    var size = ['660x1024', '300x400', '350x500', '200x320', '300x300'];
    var ration = [ 660/1024, 3/4, 7/10, 5/8, 1 ];
    var color = [ 'E97452', '4C6EB4', '449F93', 'D25064', 'E59649' ];
    var i = parseInt(Math.random() * 5);
    var photos = [];
    for( var j=0; j<20; j++ ) {
        photos[j] = {};
        photos[j].src = "http://placehold.it/" + size[i] + '/' + color[i] + '/fff';
        photos[j].aspect_ratio = ration[i];
        photos[j].name = '叫什么名字好呢';
        photos[j].description = '不太好描述呢';
        i = parseInt(Math.random() * 5);
    }
    this.loaded(photos);
}
Application.prototype.loaded = function(photo) {
    this.loading = false;
    this.gallary.addpic(photo);
}
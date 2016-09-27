var waterFall = function () {
    if(document.body.clientWidth>1200){
        this.col = 5;
    } else if( document.body.innerWidth>980 ){
        this.col = 4;
    } else if (document.body.innerWidth > 768) {
        this.col = 3;
    } else {
        this.col = 2;
    }
    this.init();
}

waterFall.prototype.init = function() {
    var element = document.querySelector(".waterfall-wrapper");
    var width = (element.clientWidth-20)/this.col;
    // var width = (element.clientWidth)/this.col;
    var html ='';
    for( var i=0; i<this.col; i++ ) {
        html += '<div class="waterfall-line" style="width: ' + width + 'px"></div>'
    }
    element.innerHTML = html;
    this.line = document.querySelectorAll('.waterfall-line');
};

waterFall.prototype.addpic = function(pics) {
    pics.forEach( (function(pic) {
        var item = document.createElement('div');
        item.className = 'waterfall-item';
        item.innerHTML = '<div class="waterfall-photo">' +
        '<img class="waterfall-image" ' + ' src="' + pic.src + '">' +
      '</div>' +
      '<div class="waterfall-photo-info">' +
        '<div class="waterfall-photo-name">' + pic.name+ '</div>' +
        '<div class="waterfall-photo-description">' + pic.description + '</div>' +
      '</div>';
      this.getminline().appendChild(item);

      item.querySelector('.waterfall-photo').style.height = parseInt(item.clientWidth / pic.aspect_ratio) + 'px';
    }).bind(this));
}

waterFall.prototype.getminline = function(){
    var min = this.line[0];
    for( var i=1; i<this.col; i++ ) {
        if( this.line[i].clientHeight < min.clientHeight ){
            min = this.line[i];
        }
    }
    return min;
}
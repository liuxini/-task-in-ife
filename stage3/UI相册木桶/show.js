var Show = function  () {
    var that = this;
    this.show = document.createElement('div');
    this.show.className = 'show';
    this.show.innerHTML = '<div class="show-container"><img class="show-image"></div>';
    this.show.addEventListener( 'click',function(event){
        var e = event || window.event;
        var target = e.target || e.srcElement ;
        if( target === that.show) {
            that.show.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    },false);
    this.container = this.show.querySelector('.show-container');
    this.img = this.show.querySelector('.show-image');
    document.body.appendChild(this.show);
}

Show.prototype.display = function(url,width,height){
    document.body.style.overflow = 'hidden';
    this.show.classList.add('active');

    if( this.img.src !== url ) {
        var imageAspectRatio = width / height ;
        var windowAspectRatio = innerWidth / innerHeight ;
        if( windowAspectRatio>imageAspectRatio ) {
            this.container.style.width = parseInt((innerHeight - 100) * imageAspectRatio) + 'px';
        } else {
            this.container.style.width = (innerWidth - 100) + 'px';
            this.container.style.marginTop = (innerHeight - (innerWidth - 100) / imageAspectRatio) / 2 + 'px'
        }
    }   this.img.src = url;
}
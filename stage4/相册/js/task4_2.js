  var Application = function(){
      this.ifeAlbum = window.ifeAlbum;
      this.config = {
        layout : 2,
        gutter : '',
        fullscreenState : 'true',
        images: [],
      };
      this.show = this.ifeAlbum.show();
     this.layout = document.querySelector(".option");
     this.addpic = document.querySelector(".addpic");
     this.sub = document.querySelector(".sub");
     this.addGutter = document.querySelector(".addGutter");
     this.gutter = document.querySelector("#gutterInput");
     this.fullscreen = document.querySelector(".fullScreen");

     this.layout.addEventListener( 'click',this.changelayout.bind(this),false);
     this.addpic.addEventListener('click',this.addPic.bind(this),false);
     this.sub.addEventListener('click',this.subGutter.bind(this),false);
     this.addGutter.addEventListener('click',this.adGutter.bind(this),false);
     this.fullscreen.addEventListener( 'change',this.fullscreenchange.bind(this),false);
     this.gutter.addEventListener('input',this.getNewGutter.bind(this),false);
     this.init();

  }

  Application.prototype.getPic = function(num) {
    var size = ['660x1024', '300x400', '350x500', '200x320', '300x300'];
    var ration = [ 660/1024, 3/4, 7/10, 5/8, 1 ];
    var color = [ 'E97452', '4C6EB4', '449F93', 'D25064', 'E59649' ];
    var i = parseInt(Math.random() * 5);
    var photos = [];
    for( var j=0; j<num; j++ ) {
        photos[j] = {};
        photos[j].src = "http://placehold.it/" + size[i] + '/' + color[i] + '/fff';
        photos[j].aspect_ratio = ration[i];
        i = parseInt(Math.random() * 5);
    }
    return photos;
}

  Application.prototype.init = function( ) {
      this.ifeAlbum.setImage( this.getPic(1),this.config.layout);
      this.ifeAlbum.enableFullscreen();
  };

  Application.prototype.changelayout = function(event) {
        var event = event || window.event;
        var target = event.target || event.srcElement ;

       if( target.tagName.toLowerCase() === "li" ) {
            if( this.config.layout === ifeAlbum.LAYOUT[target.id.toUpperCase()] ) {
              return;
            }
            this.config.layout = ifeAlbum.LAYOUT[target.id.toUpperCase()];
            this.ifeAlbum.setLayout(this.config.layout);
        }
  }

  Application.prototype.addPic = function() {
        this.ifeAlbum.addImage( this.getPic(1),this.config.layout);
  }

  Application.prototype.subGutter = function() {
        if( this.gutter.value <=0 ) {
            return;
        }
        this.gutter.value--;
        this.ifeAlbum.setGutter(parseInt(this.gutter.value));
        this.ifeAlbum.setLayout(this.config.layout);
  }

  Application.prototype.adGutter = function() {
        if( this.gutter.value >=20 ) {
            return;
        }
        this.gutter.value++;
        this.ifeAlbum.setGutter(parseInt(this.gutter.value));
        this.ifeAlbum.setLayout(this.config.layout);
  }

  Application.prototype.fullscreenchange = function() {
    this.config.fullscreenState = this.fullscreen.value;
    if( this.config.fullscreenState === this.ifeAlbum.isFullscreenEnabled ) {
      return;
    } else {
      this.ifeAlbum.isFullscreenEnabled = this.config.fullscreenState;
      if( this.fullscreen.value==="true" ) {
        this.ifeAlbum.enableFullscreen();
        return;
      } else {
        this.ifeAlbum.disableFullscreen(); 
        return;
      }
    }
  }

 Application.prototype.getNewGutter = function() {
    var newGutter = this.gutter.value;
    var number = Math.floor(newGutter);
    if( newGutter.match(/\D/g) || number<0 || number>20){
      alert('请输入1到20之间的数字');
      return;
    }
    this.ifeAlbum.setGutter(parseInt(this.gutter.value));
    this.ifeAlbum.setLayout(this.config.layout);
 }
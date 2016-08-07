/**
*/
"use strict";
(function (window) {
    'use strict';

    function IfeAlbum() {

        this.LAYOUT = {
            PUZZLE: 1,
            WATERFALL: 2,
            BARREL: 3,
        };

        this.FULLSCREEN = true;
        this.containerSelector = _options.containerSelector || '.photo-container';
        this._container = document.querySelector(this.containerSelector);

        this.barrelRows = [];
        this.barrelRation = 0;
        this._layout = 1;
        this._fullScreen = 1;
        this._images = [];
        this._row = [];
    }

    var _options = {
        layout : '',
        puzzleHeight:'',
        coulumn : '',
        barrelHeight : '',
        gutter : '',
        fullscreenState : '',
        containerSelector:'',
        images: [],
    }

    IfeAlbum.prototype.show = function  () {
        var that = this;
        this._show = document.createElement('div');
        this._show.className = 'show';
        this._show.innerHTML = '<div class="show-container"><img class="show-image"></div>';
        this._show.addEventListener( 'click',function(event){
            var e = event || window.event;
            var target = e.target || e.srcElement ;
            if( target === that._show) {
                that._show.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        },false);
        document.body.appendChild(this._show);
    }

    var showDisplay = function(url,width,height){
        document.body.style.overflow = 'hidden';
        var show = document.querySelector('.show');
        show.classList.add('active');
        var container = show.querySelector('.show-container');
        var img = show.querySelector('.show-image');
        if( img.src !== url ) {
            var imageAspectRatio = width / height ;
            var windowAspectRatio = window.innerWidth / window.innerHeight ;
            if( windowAspectRatio>imageAspectRatio ) {
                container.style.width = parseInt((window.innerHeight - 100) * imageAspectRatio) + 'px';
                console.log('container.style.width: '+container.style.width);
            } else {
                container.style.width = (window.innerWidth - 100) + 'px';
                container.style.marginTop = (window.innerHeight - (innerWidth - 100) / imageAspectRatio) / 2 + 'px'
            }
        }   
        img.src = url;
    }

    IfeAlbum.prototype.initWaterfallColumn = function(columnNum) {
        if( this.columns && this.columns.length>0) {
            return;
        }
        this.columns = [];
        for (var i = 0; i < columnNum; i++) {
          var columnDiv = document.createElement('div');
          columnDiv.style.width = (100/columnNum) + '%';
          columnDiv.className ='waterfallColumn';
          this.columns.push(columnDiv);
          this._container.appendChild(columnDiv);
        }
    }

    /**
     * 初始化并设置相册
     * 当相册原本包含图片时，该方法会替换原有图片
     * @param {(string|string[])} image  一张图片的 URL 或多张图片 URL 组成的数组
     * @param {object}            option 配置项
     */
    IfeAlbum.prototype.setImage = function(image, opts) {
        // body...
       if (typeof image === 'string') {
            this.setImage([image]);
            return;
        }

         _options.layout = opts.layout || 2;
        _options.puzzleHeight = opts.puzzleHeight || 350;
        _options.fullscreenState = opts.fullscreenState || true;
        _options.column = opts.column || 5;
        _options.barrelHeight = opts.heightMin || 300;
        _options.gutter = opts.gutter || 8;
        this.minAspectRatio = this._container.clientWidth/ _options.barrelHeight;
        var _this = this;
        this.setLayout(_options.layout);
        this.addImage(image, _options.layout);
         window.onload = function() {
            _this.setLayout(_options.layout);
         }

        window.onresize = function() {
            _this.setLayout(_options.layout);
        }
     
    };

    /**
     * 获取相册所有图像对应的 DOM 元素
     * 可以不是 ，而是更外层的元素
     * @return {HTMLElement[]} 相册所有图像对应的 DOM 元素组成的数组
     */
    IfeAlbum.prototype.getImageDomElements = function() {
        var imageitems = document.querySelectorAll('.albumitem');
        var url = [];
        imageitems.forEach(function(ele) {
          ele.ratio = ele.querySelector("img").naturalWidth / ele.querySelector("img").naturalHeight;
          // url.push(ele.querySelector('img').src);
          ele.url = ele.querySelector('img').src;
        }, this);
        // _options.images = url;
        return imageitems;
    };


    IfeAlbum.prototype.createimge = function(image) {
        var item = document.createElement('div');
            item.className = 'albumitem';
            item.innerHTML = '<img class="image"src="'+image[0].src + '">';
            item.ratio = image.aspectRatio;
            item.style.padding = (_options.gutter / 2) +'px';
        return item;
    };

    IfeAlbum.prototype.getminline = function() {
        var min = this.columns[0];
        for( var i=1; i<_options.column; i++ ) {
            if( this.columns[i].clientHeight < min.clientHeight ){
                min = this.columns[i];
            }
        }
        return min;
    };

    IfeAlbum.prototype.barrelgetRows = function() {
        var photos = this.getImageDomElements();
        var aspectRatio = 0;
        var rows = [];
        var _photos = [];

        for (var i = 0,length=photos.length; i < length; i += 1) {
            _photos.push(photos[i]);
            aspectRatio += photos[i].ratio;

            if (aspectRatio > this.minAspectRatio) {
                  rows.push({
                    aspectRatio: aspectRatio,
                    photos: _photos,
                  });
                _photos = [];
                aspectRatio = 0;
            }
        }
        if( _photos.length>0 ) {
          rows.push({
                aspectRatio: this.minAspectRatio,
                photos: _photos,
            });
        }
          
          this._container.innerHTML = "";
          return rows;
    };

    IfeAlbum.prototype.barreladdRow = function(){
      var self = this;
      var totalWidth,item;
      var gutter = this.getGutter();

      this.barrelgetRows().forEach( function (row) {
          totalWidth = self._container.clientWidth - (row.photos.length) * (gutter*2);
          item = document.createElement('div');
          item.className = 'row-list';
          item.style.height = parseInt(totalWidth / row.aspectRatio) + 'px';
          item.innerHTML = row.photos.reduce( function (html, photo) {
            html +=
                '<div class="albumitem">' +
                  '<img class="image row-image"src="' + photo.url + '">' +
                '</div>';
            return html;
          }, '');

          self._container.appendChild(item);
      });
    }

   IfeAlbum.prototype._addbox = function(item,layout,raw) {
        switch (layout) {
            case 1:
                this.puzzleAdd(item,raw);
                break;
            case 2: 
                item.querySelector(".image").classList.add("waterfall-image");
                this.getminline().appendChild(item);
                item.querySelector('.waterfall-image').style.height = parseInt(item.clientWidth / item.ratio) + 'px';
                break;
            case 3:
                if ( raw ) {
                  this.barreladdRow();
                } else {
                  this._container.appendChild(item);
                  this.barreladdRow();
                  this.setGutter(this.getGutter());
                }
                break;
            default:
                break;
        }
   }
    /**
     * 向相册添加图片
     * 在拼图布局下，根据图片数量重新计算布局方式；其他布局下向尾部追加图片
     * @param {(string|string[])} image 一张图片的 URL 或多张图片 URL 组成的数组
     */
    IfeAlbum.prototype.addImage = function (image,option) {
        this._images.push(image);
        var item = this.createimge(image);

        switch (option) {
            case 1:
                 if( this._images.length>6 ) {
                     console.error("the number of PUZZLE can not more than 6");
                     break;
                 }
                this._addbox(item,option,false);
                break;
            case 2:      
                this._addbox(item,option,false);
                break;
            case 3:
                item.querySelector(".image").classList.add("row-image");
                this._addbox(item,option,false);
                break;
            default:
                break;
        }
    };

    IfeAlbum.prototype.puzzleAdd = function(item,raw) {

        var images,number ;       
         var gallary = document.createElement("div");

         images = this.getImageDomElements(); 
        number = images.length;  

         gallary.className = "gallary_entity";
         gallary.style.height = _options.puzzleHeight + 'px';

         this._container.innerHTML = "";
         this._container.appendChild(gallary);

         if( number === 0 ) {
           number = 6;
         }
         
        for(var i=0;i<number;i++) {
          gallary.appendChild(images[i]);
        }
        if( !raw ){
            gallary.appendChild(item);
            gallary.classList.add("gallary-"+(number+1));
        } else {
             gallary.classList.add("gallary-"+(number));
        }
        
        
    }

    /**
     * 移除相册中的图片
     * @param  {(HTMLElement|HTMLElement[])} image 需要移除的图片
     * @return {boolean} 是否全部移除成功
     */
    IfeAlbum.prototype.removeImage = function (image) {
        image.forEach(function(ele) {
            var removeUrl = ele.querySelector('img').src;
            this._images = this._images.filter(function (url) {
                return url != removeUrl;
            });
            ele.remove();
        }, this)

    };

    /**
     * 设置相册的布局
     * @param {number} layout 布局值，IfeAlbum.LAYOUT 中的值
     */
    IfeAlbum.prototype.setLayout = function (layout) {
        this._layout = layout;
        var boxes = this.getImageDomElements();
        this.clearLayout();
        var length = boxes.length;
        var i=0;
        _options.layout = layout;

        switch (layout) {
            case 1:
                 if (boxes.length > 6) {
                     console.error('PUZZLE layout only can contain 6 photos');
                     this.setLayout(2);
                     break;
                   }
                 this._addbox( boxes[0], layout,true);
                break;
            case 2:
                this.initWaterfallColumn(_options.column);
                for( i=0;i<length;i++ ) {
                    this._addbox( boxes[i], layout,true);
                }
                break;
            case 3:
                // for( i=0;i<length;i++ ) {
                //     this.addImage( boxes[i], layout);
                // }
                this._addbox( boxes[0], layout,true);
                break;
        }
        this.setGutter(_options.gutter);
    };

    IfeAlbum.prototype.clearLayout = function() {
        var boxes = this.getImageDomElements();
        this._container.className = this.containerSelector.slice(1);
        this._container.innerHTML = "";
        var _this = this;
        var temp;
        boxes.forEach(function(ele) {
          temp = ele.querySelector('.image');
          temp.style.width="";
          temp.style.height="";
          temp.removeAttribute("class");
          temp.className = "image";
        }, this);

        if (this.columns) {
            this.columns.splice(0,this.columns.length);
        }
        if( boxes.length>0) {
            boxes.forEach(function(ele) {
                _this._container.appendChild(ele);
          }, this);
        }
         
    };

    /**
     * 获取相册的布局
     * @return {number} 布局枚举类型的值
     */
    IfeAlbum.prototype.getLayout = function() {
        return this._layout;
    };

    /**
     * 获取图片间距
     * @returns {{x: number, y: number}} 横向与纵向间距
     */
    IfeAlbum.prototype.getGutter = function() {
        return _options.gutter;
    };


    /**
     * 设置图片之间的间距
     * 注意这个值仅代表图片间的间距，不应直接用于图片的 margin 属性，如左上角图的左边和上边应该紧贴相册的左边和上边
     * 相册本身的 padding 始终是 0，用户想修改相册外框的空白需要自己设置相框元素的 padding
     * @param {number}  x  图片之间的横向间距
     * @param {number} [y] 图片之间的纵向间距，如果是 undefined 则等同于 x
     */
    IfeAlbum.prototype.setGutter = function (x) {
        if(!Number.isInteger(x)) {
            return;
        }
        _options.gutter = x;
        var boxes = this.getImageDomElements();
            boxes.forEach(function(ele) {
                ele.style.padding = (_options.gutter / 2) +'px';
            });
    };

    IfeAlbum.prototype._click = function(event) {
        var event = event || window.event;
        var target = event.target || event.srcElement ;
        if ( target.className === "image") {
          showDisplay(target.src,target.naturalWidth,target.naturalHeight);
        } else if( target.className.indexOf('image')>-1) {
          showDisplay(target.src,target.clientWidth,target.clientHeight);
        }
    }
    
    /**
     * 允许点击图片时全屏浏览图片
     */
    IfeAlbum.prototype.enableFullscreen = function () {
        this._fullScreen = true;
        this._container.addEventListener('click', this._click, false);
    };

     /**
     * 禁止点击图片时全屏浏览图片
     */
    IfeAlbum.prototype.disableFullscreen = function () {
        this._fullScreen = false;
        this._container.removeEventListener('click', this._click, false);
    };

    /**
     * 获取点击图片时全屏浏览图片是否被允许
     * @return {boolean} 是否允许全屏浏览
     */
    IfeAlbum.prototype.isFullscreenEnabled = function () {
        return this._fullScreen;
    };

    /**
     * 设置木桶模式每行高度的上下限，单位像素
     * @param {number} min 最小高度
     */
    IfeAlbum.prototype.setBarrelHeight = function (min) {
        _options.BarrelHeight = min || 500;
    };

    /**
     * 获取木桶模式每行高度的下限
     * @return {number} 最少图片数（含）
     */
    IfeAlbum.prototype.getBarrelHeightMin = function () {
        return _options.BarrelHeight;
    };

     // 实例化
    if (typeof window.ifeAlbum === 'undefined') {
        // 只有当未初始化时才实例化
        window.ifeAlbum = new IfeAlbum();
    }

}(window));
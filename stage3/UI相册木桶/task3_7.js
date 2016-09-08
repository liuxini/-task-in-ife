var Rowgallary = function  () {
    this.element = document.querySelector('.row-wrapper');
    var minHeight = 300;
    this.constant = this.element.clientWidth;
    this.minAspectRatio = this.constant / minHeight;
    this.padding = 8;
    this.photos=[];
}

Rowgallary.prototype.addpic = function(photos) {
    var self = this;

    this.getRows(photos).forEach( function (row) {
        var totalWidth = self.element.clientWidth - (row.photos.length - 1) * self.padding;
        var item = document.createElement('div');
        item.className = 'row-list';
        item.style.height = parseInt(totalWidth / row.aspectRatio) + 'px';
        item.innerHTML = row.photos.reduce( function (html, photo) {
          html +=
              '<div class="row-item">' +
                '<img class="row-image"src="' + photo.src + '">' +
              '</div>';
          return html;
        }, '');

        self.element.appendChild(item);
    });
}

Rowgallary.prototype.getRows = function(photos) {
    var photos = this.photos.concat(photos);

     var aspectRatio = 0;
    var rows = [];
    var _photos = [];

    for (var i = 0,length=photos.length; i < length; i += 1) {
        _photos.push(photos[i]);
        aspectRatio += photos[i].aspect_ratio;

        if (aspectRatio > this.minAspectRatio) {
              rows.push({
                aspectRatio: aspectRatio,
                photos: _photos,
              });
            _photos = [];
            aspectRatio = 0;
        }
    }
      this.photos = _photos;
      return rows;
}
var gallary = (function () {
    function fixWrongStyle(node, width, height) {
        var childCount = node.children.length;
        if (childCount == 3) {
            fix3(node.children);
        }
    
        function fix3(images) {
            var val1 = height / 2, val2 = width - val1;
            images[0].style.width = val2 + "px";
            images[1].style.width = val1 + "px";
            images[1].style.left = val2 + "px";
            images[2].style.width = val1 + "px";
            images[2].style.left = val2 + "px";
        }
       
    }
    return{
        init:function (){
            var gallarylist = document.querySelectorAll('.gallary');
             [].forEach.call(gallarylist, function(node) {
            width = node.clientWidth;
            height = node.clientHeight;

            node.style.width = width + "px";
            node.style.height = height + "px";
            fixWrongStyle(node, width, height);
          });
        }
     }
 })();
gallary.init();
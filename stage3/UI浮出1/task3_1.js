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
  return addEvent(type,element,fun);
};

(function(){
    var btns = document.getElementsByTagName('button');
    var floatLeyer = document.getElementsByClassName('title')[0];

    addEvent( 'click',btns[0],function(){
        layer.show();
    });
    addEvent('click',btns[1],function(){
        layer.hide();
    });
    addEvent('click',btns[2],function(){
        layer.hide();
    });
     addEvent('mousedown',floatLeyer,function(){
        layer.drag();
     });
     expandlayer();
})();

var layer = {
    floatLeyer:document.querySelector('.float-layer'),
}

layer.createMask=function(){
        var mask = document.getElementsByClassName('mask')[0];
        function create(){
            if( !mask){
                mask = document.createElement('div');
                mask.setAttribute('class','mask');
                mask.style.width = document.body.clientWidth+'px';
                mask.style.height = document.body.clientHeight+'px';

                var temp = document.getElementsByTagName('body')[0];
                mask = temp.insertBefore(mask,temp.firstElementChild);
            }
            return mask ;
        };
        return mask||create();
    }
layer.show = function(){        
        var mask = layer.createMask();
        layer.floatLeyer.style.marginLeft = '50%';
        layer.floatLeyer.style.marginTop = '20px';
        layer.floatLeyer.style.width = '350px';
        layer.floatLeyer.style.height = '220px';
        addEvent('click',mask,function(){
            layer.hide();
        });
        layer.floatLeyer.style.display = 'block';
        mask.style.display = 'block';
    }
layer.hide=function(){
         var mask = layer.createMask();

         layer.floatLeyer.style.display = 'none';
         mask.style.display = 'none';
    }

var isDrag = false;
var X=0,Y=0;

layer.drag = function(e){
    var e = e || window.event;
    X = e.pageX-layer.floatLeyer.offsetLeft+layer.floatLeyer.offsetWidth/2;
    Y = e.pageY-layer.floatLeyer.offsetTop;  
    isDrag = true;
 }

    document.onmousemove = function(e){
        var moveEvent = e||window.event;
        mouseX = moveEvent.pageX;
        mouseY = moveEvent.pageY;
        var moveX = moveEvent.pageX - X;
        var moveY = moveEvent.pageY - Y;

       if( isDrag ===true){
            if( (moveX>=0 && moveX<document.documentElement.clientWidth-layer.floatLeyer.offsetWidth)){
                layer.floatLeyer.style.marginLeft = 175+moveX+'px';
            }else if(moveX>=(document.documentElement.clientWidth-layer.floatLeyer.offsetWidth )){
                layer.floatLeyer.style.marginLeft = 175+document.documentElement.clientWidth-layer.floatLeyer.offsetWidth+'px';
            }else{
                layer.floatLeyer.style.marginLeft = 175 +'px';
            }

            if( (moveY>=0 && moveY<document.documentElement.clientHeight-layer.floatLeyer.offsetHeight )){
                layer.floatLeyer.style.marginTop = moveY-70+'px';
            }else if(moveY>=(document.documentElement.clientHeight-layer.floatLeyer.offsetHeight )){
                layer.floatLeyer.style.marginTop= document.documentElement.clientHeight-layer.floatLeyer.offsetHeight-70+'px';
            }else{
                layer.floatLeyer.style.marginTop = -70 +'px';
            }
        }
       
    }
    document.onmouseup = function(){
        isDrag = false;

        clearInterval(moving);
        moving = 0;
    }

    
function expandlayer(){
    var resizablebox = document.getElementsByClassName('float-layer')[0];
    var rightBox = document.createElement("div");
    var bottomBox = document.createElement("div");
    var rightBottomBox = document.createElement("div");
    rightBox.className = "resizable-right";
    bottomBox.className = "resizable-bottom";
    rightBottomBox.className = "resizable-right-bottom";

    resizablebox.appendChild(rightBox);
    resizablebox.appendChild(bottomBox);
    resizablebox.appendChild(rightBottomBox);

    addEvent('mousedown',rightBox,function(e){
        onMouseDown(e,resizablebox,rightBox,'r');
    });

    addEvent('mousedown',bottomBox,function(e){
        onMouseDown(e,resizablebox,bottomBox,'b');
    });

    addEvent('mousedown',rightBottomBox,function(e){
        onMouseDown(e,resizablebox,rightBottomBox,'rb');
    });
}

var mousePanel, mouseCtrl, mouseType;
var moving = 0, mouseStartX = 0, mouseStartY = 0;
function onMouseDown(e,panel, ctrl, type){
    var  e = e || window.event;
    
    mouseStartX = e.pageX - ctrl.offsetLeft;
    mouseStartY = e.pageY - ctrl.offsetTop;

    mousePanel = panel;
    mouseCtrl = ctrl;
    mouseType = type;

    moving = setInterval(onMove, 10);
}

function onMove() {
    if (moving) {
        var toX = mouseX - mouseStartX;
        var toY = mouseY - mouseStartY;
        //限定浮出层最大宽高度
        var maxToX = document.documentElement.clientWidth - mousePanel.offsetLeft - 10;
        var maxToY = document.documentElement.clientHeight - mousePanel.offsetTop - 10;

        toX = Math.min(maxToX,Math.max(toX, 350));
        toY = Math.min(maxToY,Math.max(toY, 220));

        switch (mouseType) {
            case "r":
                mousePanel.style.width = toX + "px";
                break;
            case "b":
                mousePanel.style.height = toY + "px";
                break;
            case "rb":
                mousePanel.style.width = toX + "px";
                mousePanel.style.height = toY + "px";
                break;
        }
    }
}







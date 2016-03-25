var queue=[];
var aniQue = delay(function(){}, 0);
var inAnimation = false;

function addEvent( type, element, fun){
	if(element.addEventListener){
		addEvent = function(type, element, fun){
		element.addEventListener(type,fun,false);}
	}
	else if( element.attachEvent){
		addEvent = function(type,element,fun){
			element.attachEvent('on'+type,fun,false);}
	}else{
		addEvent = function(type,element,fun){
			element['on'+type] =fun;}
		}
	return addEvent(type,element,fun);
}

function delay(fn, t) {
      var queue = [], self, timer;
      function schedule(fn, t) {
        timer = setTimeout(function() {
          timer = null;
          fn();
          if (queue.length) {
            var next = queue.shift();
            schedule(next.fn, next.t);
          }
        }, t);
      }
      self = {
        delay: function(fn, t) {
          if (queue.length || timer) {
            queue.push({fn: fn, t: t});
          } else {
            schedule(fn, t);
          }
          return self;
        }
      }
      return self.delay(fn, t);
    }

function render(){
	var list = document.querySelector("ul");
	list.innerHTML = queue.reduce(function(s,v)
	{
		return s+"<li class='red' style='height:"+v+"px 'title='"+v+" '></li>"; },"");
}

function buildRandom(){
	queue = [];
	for (var i = 0; i < 20; i++) {
		queue.push(Math.ceil(Math.random()*200 )) ;
	};
	render();
}

function getinput(){
	var number = document.querySelector("input");
	if( number.value===""||number.value.match(/[^0-9]/)){
		alert("请输入数字");
		return ;
	}else{
		var value = parseInt(number.value);
		if( value<10||value>100) alert("请输入10-100的数字");
		else return value;
	}
}
function leftin(){
	if( getinput()===undefined ) return;
	if( queue.length==60){
		alert("队列数量已满");
		alert(getinput());
	}else{
		queue.unshift( getinput() );
		render();
	}
}
function rightin(){
	if( getinput()===undefined ) return;
	if( queue.length==60){
		alert("队列数量已满");
		alert(getinput());
	}
	queue.push( getinput() );
	render();
}
function leftout(){
	if( queue.length==0){
		alert("队列为空");
	}else{
		var temp = queue.shift();
		alert(temp);
		render();
	}
}
function rightout(){
	if( queue.length==0){
		alert("队列为空");
	}else{
		var temp = queue.pop();
		alert(temp);
		render();
	}
}

function renderSortRange(start,end,index){
	if( index==0){
		aniQue.delay(function() {
			for(var i=start;i<=end;i++){
				document.querySelectorAll("li")[i].className = "green";
			}
		},0);
	}else{
		aniQue.delay(function() {
			for(var i=start;i<=end;i++){
				document.querySelectorAll("li")[i].className = "yellow";
			}
		},0);
	}	
}

function renderSort(index,value){
	aniQue.delay(function() {
        document.querySelectorAll("li")[index].className='blue';
      }, 0);
      if (value != null) {
        aniQue.delay(function() {
          document.querySelectorAll("li")[index].style.height = value + 'px';
          document.querySelectorAll("li")[index].title = value.toString();
        }, 0);
      }
      aniQue.delay(function() {
        document.querySelectorAll("li")[index].className = 'red';
      }, 100);
	
}

function mergesort(first,last){
	if( first<last){
		var middle=parseInt((first+last)/2);
		mergesort(first,middle);
		mergesort(middle+1,last);
		mergearray( first,middle,last);
	}
}

function mergearray(first,middle,last){
	renderSortRange(first,middle,0);
	renderSortRange(middle+1,last,1);
	var i=first,j=middle+1;
	var m=middle, n=last,k=0;
	var temp=[];

	while( i<=m && j<=n ){
		renderSort(i);
		renderSort(j);
		if(queue[i]<=queue[j]) temp[k++] = queue[i++];
		else temp[k++] = queue[j++];		
	}
	while( i<=m) {
		temp[k++] = queue[i++];
		renderSort(i,queue[i]);
	}
	while( j<=n) {
		renderSort(j,queue[j]);
		temp[k++] = queue[j++];
	}
	for( i=0;i<k;i++){
		queue[first+i] = temp[i];
		renderSort(first+i,queue[first+i]);
	}
}

//mergesort
function Mergesort(){
	var length = queue.length;
	if( length ===0){
		alert("队列为空，无法排序");
	}else{
		aniQue.delay(function(){
        	inAnimation = false;
      		}, 0);
		mergesort(0,length-1);
		// render();
	}

}

function initdata(){
	var btns = document.querySelectorAll("button");
	addEvent("click",btns[0],leftin);
	addEvent("click",btns[1],rightin);
	addEvent("click",btns[2],leftout);
	addEvent("click",btns[3],rightout);
	addEvent("click",btns[4],Mergesort);
}

(function(){
	buildRandom();
	initdata();
})()
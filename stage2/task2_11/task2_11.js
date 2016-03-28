var tree = document.querySelector(".root");
var stack = [];

function delay(fn, args, t) {
	var queue = [], self, timer;
	function schedule(fn, args, t) {
		timer = setTimeout(function() {
			timer = null;
			fn(args);
			if (queue.length) {
				var item = queue.shift();
				schedule(item.fn, item.args, item.t);
			}
		}, t);
	}
	self = {
		delay: function(fn, args, t) {
			if (queue.length || timer) {
				queue.push({fn: fn, args: args, t: t});
			} else {
				schedule(fn, args, t);
			}
			return self;
		}
	};
	return self.delay(fn, args, t);
}
 function setClass(node){ 
 	node.setAttribute("style","background-color:blue");
}

function removeClass(node){
	node.removeAttribute("style");
}


function render(node){
	if(this.delayChian)
		this.delayChian.delay(setClass,node,0).delay(removeClass,node,500);
	else
		this.delayChian=delay(setClass,node,0).delay(removeClass,node,500);
}
function find(node){
	if(this.delayChian)
		this.delayChian.delay(function(){nodenode.setAttribute("style","background-color:red");},node,250);
	else
		this.delayChian=delay(function(){nodenode.setAttribute("style","background-color:red");},node,250);;
}

function preorder(node){
	while( node|| stack.length>0){ 
		while( node){
			if(node.className=='order') return;
			render(node);
			stack.push(node);
			node = node.firstElementChild;
		}
		node = stack.pop();
		node = node.nextSibling;
		while( node!==null&&node.nodeType!==1){
				node = node.nextSibling;
			}	
 }
}

function postorder(node){
	while( node|| stack.length>0){ 
		while( node){
			if(node.className=='order') return;			
			stack.push(node);
			node = node.firstElementChild;
		}
		node = stack.pop();
		render(node);
		node = node.nextSibling;
		while( node!==null&&node.nodeType!==1){
				node = node.nextSibling;
			}	
 }
}

function levelorder(node){
	stack.push(node);
	while(stack.length>0){
		node = stack.shift();
		render(node);
		var children = node.childNodes;

		for( var i=0;i<children.length;i++){
			if( children[i].nodeType===1){
				stack.push(children[i]);
			}
		}
	}
}

function search(node){
	var input = document.querySelector("input");
	if( input.value===""){
		alert("please input");
		return;
	}
	stack.push(node);
	while(stack.length>0){
		node = stack.shift();
		render(node);
		if( node.firstChild.data===input.value){
			find(node);
			return;
		}
		var children = node.childNodes;

		for( var i=0;i<children.length;i++){
			if( children[i].nodeType===1){
				stack.push(children[i]);
				if( children[i].firstChild.data==input.value){
					find(node);
					return;
				}
			}
		}
	}
	this.delayChian.delay(function(){alert('然而并没找到');},null,500);
}
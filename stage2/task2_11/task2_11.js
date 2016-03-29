var tree = document.querySelector(".root");
var stack = [];
var found=false;
var delayChian=delay(function(){},tree,0);
function delay(fn, args, t) {
    // private instance variables
    var queue = [], self, timer, disabled=false;

    function schedule(fn, args, t) {
    	timer = setTimeout(function() {
    		timer = null;
    		fn(args);
    		if (queue.length) {
    			isRun = true;
    			var item = queue.shift();
    			schedule(item.fn, item.args, item.t);
    		}}, t);            
    }
    self = {
    	delay: function(fn, args, t) {
    		if(disabled)
    			return self;
            if (queue.length || timer) {
            	queue.push({fn: fn, args: args, t: t});
            } else {
                schedule(fn, args, t);
            }
            return self;
        },
        cancel: function() {
        	clearTimeout(timer);
        	queue = [];
        	return self;
        },
        disable: function() {
        	disabled = true;
        	return self;
        },
        enable: function() {
        	disabled = false;
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
function findClass(node){
	node.setAttribute("style","background-color:red");
	found=!confirm('继续否,若继续，请接着点击查询');
	isRun = !found;
	founded=true;
}


function render(node){
	if(this.delayChian)
		this.delayChian.delay(setClass,node,0).delay(removeClass,node,300);
	else
		this.delayChian=delay(setClass,node,0).delay(removeClass,node,300);
}
function find(node){
	if(this.delayChian)
		this.delayChian.delay(findClass,node,300).delay(function(){if(found)delayChian.cancel().disable();},node,500);
	else
		this.delayChian=delay(findClass,node,300).delay(function(){if(found)delayChian.cancel().disable();},node,500);
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
	if(!node||found) 
       return; 
   if( stack.length==0 ){
		found=false;
		delayChian.enable();
		stack.push(node);
	}
	var input = document.querySelector("input");
	if( input.value===""){
			alert("please input");
			return;
		}
	while(stack.length>0){
		node = stack.shift();
		render(node);
		var children = node.childNodes;
		for( var i=0;i<children.length;i++){
			if( children[i].nodeType===1){
				stack.push(children[i]);
			}
		}
		if( node.firstChild.data.trim()===input.value.trim()){
			find(node);
			return;
		}
		
	}
}
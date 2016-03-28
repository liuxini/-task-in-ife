
var tree = document.querySelector(".root");
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

function preorder(node){
	if( !node) return;
	render(node);
	preorder(node.firstElementChild);
	preorder(node.lastElementChild);
}

function inorder(node){
	if( !node) return;
	inorder(node.firstElementChild);
	render(node);
	inorder(node.lastElementChild);
}

function postorder(node){
	if( !node) return;
	postorder(node.firstElementChild);	
	postorder(node.lastElementChild);
	render(node);
}
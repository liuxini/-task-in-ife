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
  return addEvent(type, element, fun);
};

(function(){
    var config={
        tdwidth : '100px',
            tdHeight : '40px',
            rowNum : '5',
            colNum : '5',
            thBgc : '#000',
            border :  "1px solid #CCC",
            thContent : ['姓名','语文','数学','英语','总分'],
            trContent : [
                    ['小明',80,90,70,240],
                    ['小红',90,60,90,240],
                    ['小亮',60,100,70,230],
                    ['小强',100,70,80,250],
                     ],
    };
    var table = document.getElementById('tab');
    addTh();
    addTr();

    function addTh(){
        var thead = document.createElement('thead');
        thead = addTd(thead,config.thContent);
        thead.style.background = config.thBgc;
        thead.style.color = '#fff';
        thead.style.fontWeight = 'bold';

        var tdList = thead.childNodes;
        for(var i = 1;i<config.colNum;i++){
            addArrowUp(tdList[i]);
            addArrowDown(tdList[i]);
        }           
        table.appendChild(thead);

        function addArrow(divNode,flag){
            divNode.style.width = "0px";
            divNode.style.height = "0px";
            divNode.style.borderLeft ="6px solid transparent";
            divNode.style.borderRight ="6px solid transparent";
            divNode.style.cursor ="pointer";
            divNode.style.position = "absolute";
            divNode.style.right = "20px";

            addEvent( 'click',divNode,function(e){
                var content = e.target.parentNode.innerHTML.split('<')[0],
                          listNum = config.thContent.indexOf(content),
                          sortList = [],
                          newList = [],
                          trList = table.childNodes; 
                for( var i = 0;i<config.rowNum-1;i++){
                        sortList.push(trList[i+1].childNodes[listNum].innerHTML);
                    }
                newList = sortList.sort(sortNumber);

                if(!flag){
                        newList = newList.reverse();
                    }

                sortList = [];
                    for( i = 0;i<config.rowNum-1;i++){
                        sortList.push(trList[i+1].childNodes[listNum].innerHTML);
                    }
                changeOrder(newList,sortList);

                function sortNumber(a,b){
                    return b - a ;
                }

                //根据排序结果重新排列行序
                function changeOrder(newList,oldList){
                    var len = newList.length,
                              pos_before,
                              pos_now,
                              trList = table.childNodes,
                              tempNode = document.createElement('tr'),
                              temp;
                        for(var k = 0;k<len;k++){
                            //记录当前值在新表中位置，并寻找当前值在原表中的位置
                            pos_now = k;
                            pos_before = oldList.indexOf(newList[k]);
                            //如果当前值在两个表中的位置不一样，则交换两个节点的内容
                            if(pos_now !== pos_before){
                                tempNode.innerHTML = trList[pos_before+1].innerHTML;
                                trList[pos_before+1].innerHTML = trList[pos_now+1].innerHTML;
                                trList[pos_now+1].innerHTML = tempNode.innerHTML;
                                //更新表的内容
                                temp = oldList[pos_before];
                                oldList[pos_before] = oldList[pos_now];
                                oldList[pos_now] = temp;
                            }
                        }
                }
            });

            return divNode;

        }

        function addArrowDown(tdNode){
                var divNode = document.createElement('div');
                divNode = addArrow(divNode,true);
                divNode.style.borderTop ="8px solid #fff";
                divNode.style.top = "25px";
                tdNode.appendChild(divNode);
            }
            function addArrowUp(tdNode){
                var divNode = document.createElement('div');
                divNode = addArrow(divNode,false);
                divNode.style.borderBottom ="8px solid #fff";
                divNode.style.top = "12px";
                tdNode.appendChild(divNode);
            }
    }

    function addTd(tList,content){
        var tdNode;
        var fragmet = document.createDocumentFragment();
        for(var i=0;i<config.colNum;i++){
            tdNode = document.createElement('td');
            tdNode.innerHTML = content[i];
            tdNode.style.width = config.tdwidth;
            tdNode.style.height = config.tdHeight;
            tdNode.style.border = config.border;
            tdNode.style.position = "relative";
            fragmet.appendChild(tdNode);
        }
        tList.appendChild(fragmet);
        return tList;
    }

    function addTr(){
            var trNode;
            var fragmet = document.createDocumentFragment();
            for(var i = 0; i < config.rowNum-1;i++){
                trNode = document.createElement('tr');
                trNode = addTd(trNode,config.trContent[i]);
                // tab.appendChild(trNode);
                fragmet.appendChild(trNode);
            }
            table.appendChild(fragmet);
        }
   window.onscroll = function(){
        var thRow = table.childNodes[0],
                          top = table.offsetTop,
                          height = table.offsetHeight;
        if(window.scrollY > top){
            thRow.style.position = "fixed";
            thRow.style.top = "0px";
            thRow.nextSibling.style.display = "";
        }else{
            thRow.style.position = "static";
            // thRow.nextSibling.style.display = "none";
        }
        //判断是否显示首行
        if(window.scrollY >= (top + height ) ){
            thRow.style.display = "none";
        }else{
            thRow.style.display = "";
        }
   }
})();


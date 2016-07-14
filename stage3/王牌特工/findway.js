var Findway = (function ( ) {
    
    function contain(arr,obj){
        var length = arr.length;
        for( var i=0; i<length; i++ ) {
            if( obj === arr[i] ) {
                return true;
            }
        }
        return false;
    }

    function getneighbors(node,obj) {
        var neighbors = [];
        var neighbor;
        if( obj.col - 1 >= 0 && node[obj.row][obj.col-1].empty ) {  //left
            neighbor = node[obj.row][obj.col-1]; 
            neighbors.push(neighbor);
        }
        //right
        if( obj.col+1 <= node[0].length && node[obj.row][obj.col+1].empty ) {
            neighbor = node[obj.row][obj.col+1];
            neighbors.push(neighbor);
        }
        // top
        if( obj.row-1 >= 0 && node[obj.row-1][obj.col].empty ) {
            neighbor = node[obj.row-1][obj.col];
            neighbors.push(neighbor);
        }
        // bottom
        if( obj.row+1 <= node.length && node[obj.row+1][obj.col].empty ) {
            neighbor = node[obj.row+1][obj.col];
            neighbors.push(neighbor);
        }

        return neighbors;
    }

    return function ( nodes,begin,end) {
        var open = [], closed = [], way=[];
        var neighbors = [];
        var temp, gn, isin = false;
        begin.gn = 0, begin.hn = 0, begin.fn = 0;

        if( end.empty === false ) {
            return ;
        }

        open.push( begin);
        while ( open ) {
            temp = open.shift();
            if ( temp.row === end.row && temp.col === end.col ) {
                way.unshift([temp.col,temp.row]);
                while(temp.parent.row !== begin.row && temp.parent.col !== begin.col ){
                    temp = temp.parent;
                    way.unshift([temp.col,temp.row]);          
                }
                return way;
            }

            if ( temp ) {
                closed.push(temp);
            }

            neighbors = getneighbors(temp);

            for( var i=0;length = neighbors.length,i<length;i++){
                neighbor = neighbors[i];
                if( contain(closed,neighbor) ) {
                    continue;
                }
                gn = temp.gn + 1;
                isin = contain( open,neighbor);
                if( !isin || gn<neighbor.gn ){
                    neighbor.hn = neighbor.hn||Math.abs(neighbor.col-end.col)+Math.abs(neighbor.row-end.row);
                    neighbor.gn = gn;
                    neighbor.fn = neighbor.gn+neighbor.hn;
                    neighbor.parent = temp;

                    if( !isin){
                      open.push(neighbor);             
                      open.sort(function(a,b){ return a.fn-b.fn; });

                    }else{
                      open.sort(function(a,b){ return a.fn-b.fn; });
                    }
                }

            }
        }
        return ;
    }

})();


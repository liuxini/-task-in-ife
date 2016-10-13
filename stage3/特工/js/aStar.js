var aStar = (function () {
    var closelist = [],
        openlist = [];
    var gw=10,
        gh=10,
        gwh=14;
    var p_start = new Array(2),
        p_end = new Array(2);
    var s_path,
        n_path;
    var num;
    var w = 25,
        h = 30;
    var resultPath = null;
    /**
     * 获取四周点
     * @param pos
     * @returns {Array|any[]}
     * @constructor
     */
    function GetRound(pos) {
        var a = new Array();
        a[0] = (pos[0] + 1) + "," + (pos[1] - 1);
        a[1] = (pos[0] + 1)+ "," + pos[1];
        a[2] = (pos[0] + 1) + "," + (pos[1] + 1);
        a[3] = pos[0] + "," + (pos[1] + 1);
        a[4] = (pos[0] - 1) + "," + (pos[1] + 1);
        a[5] = (pos[0] - 1) + "," + pos[1];
        a[6] = (pos[0] - 1) + "," + (pos[1] - 1);
        a[7] = pos[0] + "," + (pos[1] - 1);
        return a;
    }
    /**
     * 获取F、G和H值，并加入开启列表
     * @param arr
     * @constructor
     */
    function GetF(arr) {
        var t,
            G,
            H,
            F;
        for (var i = 0; i < arr.length; i++) {
            t = arr[i].split(",");
            t[0] = parseInt(t[0]);
            t[1]= parseInt(t[1]);
            if (IsOutScreen([t[0],t[1]]) ||
                IsPass(arr[i]) ||
                InClose([t[0],t[1]]) ||
                IsStart([t[0],t[1]]) ||
                !IsInTurn([t[0],t[1]])) {
                continue;
            }
            if((t[0] - s_path[3][0]) * (t[1] - s_path[3][1]) != 0) {
                G = s_path[1] + gwh;
            } else {
                G = s_path[1] + gw;
            }
            if (InOpen([t[0], t[1]])) {
                if (G < openlist[num][1]) {
                    openlist[num][0] = (G + openlist[num][2]);
                    openlist[num][1] = G;
                    openlist[num][4] = s_path[3];
                } else {
                    G = openlist[num][1];
                }
            } else {
                H = (Math.abs(p_end[0] - t[0]) + Math.abs(p_end[1] - t[1])) * gw;
                F = G + H;
                arr[i] = new Array();
                arr[i][0] = F;
                arr[i][1] = G;
                arr[i][2] = H;
                arr[i][3] = [t[0], t[1]];
                arr[i][4]= s_path[3];
                openlist[openlist.length] = arr[i];
            }
        }
    }
    /**
     * 判断是否是起始点
     * @param arr
     * @returns {boolean}
     * @constructor
     */
    function IsStart(arr) {
        if (arr[0] == p_start[0] && arr[1] == p_start[1]) {
            return true;
        }
        return false;
    }
    /**
     * 判断转角点可否通过
     * @param arr
     * @returns {boolean}
     * @constructor
     */
    function IsInTurn(arr) {
        if (arr[0] > s_path[3][0]) {
            if (arr[1] > s_path[3][1]) {
                if (IsPass((arr[0] - 1) + "," + arr[1]) || IsPass(arr[0] + "," + (arr[1]-1))) {
                    return false;
                }
            } else if (arr[1] < s_path[3][1]) {
                if(IsPass((arr[0]-1) + "," + arr[1]) || IsPass(arr[0] + "," + (arr[1] + 1))) {
                    return false;
                }
            }
        } else if (arr[0] < s_path[3][0]){
            if (arr[1] > s_path[3][1]) {
                if (IsPass((arr[0] + 1) + "," + arr[1]) || IsPass(arr[0] + "," + (arr[1] - 1))) {
                    return false;
                }
            } else if (arr[1] < s_path[3][1]) {
                if (IsPass((arr[0] + 1) + "," + arr[1]) || IsPass(arr[0] + "," + (arr[1] + 1))) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * 是否超出地图范围
     * @param arr
     * @returns {boolean}
     * @constructor
     */
    function IsOutScreen(arr) {
        if (arr[0] < 0 ||
            arr[1] < 0 ||
            arr[0] > (w - 1) ||
            arr[1] > (h-1)) {
            return true;
        }
        return false;
    }
    /**
     * 是否在开启列表中
     * @param arr
     * @returns {boolean}
     * @constructor
     */
    function InOpen(arr) {
        var bool = false;
        for (var i = 0; i < openlist.length; i++) {
            if (arr[0] == openlist[i][3][0] && arr[1] == openlist[i][3][1]) {
                bool = true;
                num = i;
                break;
            }
        }
        return bool;
    }
    /**
     * 是否在关闭列表中
     * @param arr
     * @returns {boolean}
     * @constructor
     */
    function InClose(arr) {
        var bool = false;
        for (var i = 0; i < closelist.length; i++) {
            if ((arr[0] == closelist[i][3][0]) && (arr[1] == closelist[i][3][1])) {
                bool = true;
                break;
            }
        }
        return bool;
    }
    /**
     * 是否能通过
     * @param pos
     * @returns {boolean}
     * @constructor
     */
    function IsPass(pos) {
        if((";" + n_path).indexOf(";" + pos + ";") != -1) {
            return true;
        }
        return false;
    }
    /**
     * 对F值进行排序
     * @param arr
     * @constructor
     */
    function Sort(arr) {
        var temp;
        for (var i = 0;i < arr.length; i++) {
            if (arr.length == 1) {
                break;
            }
            if (arr[i][0] <= arr[i + 1][0]) {
                temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
            if((i + 1) == (arr.length - 1)) {
                break;
            }
        }
    }
    function main() {
        GetF(GetRound(s_path[3]));
        Sort(openlist);
        s_path = openlist[openlist.length - 1];
        closelist[closelist.length] = s_path;
        openlist[openlist.length - 1] = null;
        if (openlist.length == 0) {
            resultPath = [];
            return;
        }
        openlist.length = openlist.length - 1;
        if ((s_path[3][0] == p_end[0]) && (s_path[3][1] == p_end[1])) {
            getPath();
        } else {
            main();
        }
    }
    function getPath() {
        var path = [],
            t = closelist[closelist.length-1][4];
        while (1) {
            path.unshift(t);
            for (var i = 0;i < closelist.length; i++) {
                if (closelist[i][3][0] == t[0] && closelist[i][3][1] == t[1]) {
                    t = closelist[i][4];
                }
            }
            if (t[0] == p_start[0] && t[1] == p_start[1]) {
                break;
            }
        }
        path.push(p_end);
        resultPath = path;
    }
    function setPos(){
        var h = (Math.abs(p_end[0] - p_start[0]) + Math.abs(p_end[1] - p_start[1])) * gw;
        s_path = [h, 0, h, p_start, p_start];
    }
    /**
     * 重置
     */
    function reset() {
        resultPath = null;
        closelist = [];
        openlist = [];
    }
    /**
     * 返回接口
     */
    return function (start, end, block) {
        reset();
        p_start = start;
        p_end = end;
        n_path = block;
        setPos();
        main();
        return resultPath;
    };
})();
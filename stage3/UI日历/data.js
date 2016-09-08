var Calendar = function(container,multi,min,max){    
    this.multi = multi;
    this.container = container;
    this.min = min || 0;
    this.max = max || 0;

    this.date = new Date();
    this.selectedEle = null;
    this.selectCall = null;
    this.mainDiv = null;

    this.selectedDates = [];
    this.init();
}

Calendar.prototype =  {
    week:['Su','Mo','Tu','We','Th','Fr','Sa'],

    init:function () {
        var that = this;
        var mainDiv = document.createElement('div');
        mainDiv.setAttribute('class','mainDiv');
        mainDiv.style.position = 'relative';
        this.container.appendChild(mainDiv);

        this.mainDiv = mainDiv;

        var calendarEle = document.createElement('div');
        calendarEle.setAttribute('class','calendarEle');
        calendarEle.style.width='255px';
        calendarEle.style.height = '300px';
        calendarEle.style.border = '1px solid #ccc';
        calendarEle.style.position = 'absolute';
        calendarEle.style.fontFamily = 'Microsoft YaHei';
        calendarEle.style.display='none';
        mainDiv.appendChild(calendarEle);

        var title = document.createElement('div');
        var years = document.createElement('span');
        var month = document.createElement('span');

        years.setAttribute('class','year');
        month.setAttribute('class','month');
        title.setAttribute('class','title');
        title.appendChild(years);
        title.appendChild(month);

        title.style.width = '245px';
        title.style.height = '25px';
        title.style.textAlign = 'center';
        title.style.backgroundColor = '#00868B';
        title.style.color='#ffffff';
        title.style.padding = '5px';
        calendarEle.appendChild(title);

        var premonth = document.createElement('div');
        premonth.innerHTML = '<';
        premonth.style.float = 'left';
        premonth.style.cursor = 'pointer';
        title.appendChild(premonth);

        addEvent('click',premonth,function(){
            that.preMonth();
        });

        var nextmonth = document.createElement('div');
        nextmonth.innerHTML = '>';
        nextmonth.style.float = 'right';
        nextmonth.style.cursor = 'pointer';
        title.appendChild(nextmonth); 

        addEvent('click',nextmonth,function(){
            that.nextMonth();
        });

        function createEle(){
            var ele = document.createElement('span');
            ele.setAttribute('class','day');
            ele.style.textAlign = 'center';
            ele.style.display = 'inline-block';
            ele.style.width = '36px';
            ele.style.height = '30px';
            ele.style.lineHeight = '30px';

            return ele;
        }

        for( var i = 0; i < 7; i++ ){
            var el = createEle();
            el.innerHTML = this.week[i];
            calendarEle.appendChild(el);
            if( i === 0 || i === 6 ){
                el.style.color = '#00868B';
            }
        }
        for (var i = 0; i < 42; i++) {
            var elemet = createEle();
            elemet.style.cursor = 'pointer';
            calendarEle.appendChild(elemet);
        }

        var btnYes = document.createElement('button');
        var single = document.getElementById('day');
        var duration = document.getElementById('time');

        btnYes.innerHTML = '确定';
        calendarEle.appendChild(btnYes);
        addEvent('click',btnYes,function(){
            if ( that.multi ) {
                duration.value = that.getSelectedDate();
            } else {                
                single.value = that.getSelectedDate();
            }
            calendarEle.style.display = 'none';
            that.selectCall();
        });

        var btnNo = document.createElement('button');
        btnNo.innerHTML = '取消';
        calendarEle.appendChild(btnNo);
        addEvent('click',btnNo,function(){
            calendarEle.style.display = 'none';
        });

        this.renderByDate(this.date);

        var that = this;
        calendarClick = function(e){
            if( calendarEle.style.display==='none'){
                return ;
            }
            var e = e || window.event;
            var target = e.target || e.srcElement;
            var index;
            if( target.nodeName.toLowerCase() ==='span') {
                var allSpan = document.getElementsByClassName('day');
                if( that.multi ){
                    for( let i=56; i<98; i++ ) {
                        if( allSpan[i] === target ){
                            index = i ;
                            break;
                        }
                    }
                    index -= 56;
                } else {
                    for( let i=7; i<49; i++ ) {
                        if( allSpan[i] === target ){
                            index = i ;
                            break;
                        }
                    }
                    index -= 7;
                }
                
                var datetemp = new Date(that.date);
                var daytemp = datetemp.getDate();
                datetemp.setDate(1);
                var selectIndex = daytemp + datetemp.getDay()-1;
                // var selectIndex = allSpan.indexOf(that.selectedEle);
        
                var dat = new Date(that.date);              
                dat.setDate(dat.getDate()+index - selectIndex );

                if( that.multi ){
                    if( that.selectedDates.length<1){
                        that.selectedDates.push(dat);
                    }else{
                        var preDate = that.selectedDates[that.selectedDates.length - 1];
                        var dayNum = Math.abs(dat - preDate) / 1000 / 60 / 60 / 24;
                        if (dayNum < self.min || dayNum > self.max) {
                            alert('时间跨度不在范围内');
                        } else {
                            that.selectedDates.push(dat);
                        }
                    }

                    if (that.selectedDates.length > 2) {
                        that.selectedDates.shift();
                    }
                }else{
                    that.selectedDates[0] = dat;
                }
                that.selectDate(dat);
            }
        }
        addEvent('click',calendarEle,calendarClick);

    },
    
    select: function(fn) {
        this.selectCall = fn;
        return this;
    },

    selectDate: function(dat) { 
        this.renderByDate(dat);  
        this.date = dat; 
    }, 


    nextMonth: function() {
        var dat = new Date(this.date);
        dat.setMonth(dat.getMonth() + 1);
        this.selectDate(dat);
    },

    preMonth: function() {
        var dat = new Date(this.date);
        dat.setMonth(dat.getMonth() - 1);
        this.selectDate(dat);
    },

    getSelectedDate:function(){
        function getString(date) {
            var y = date.getFullYear(),
                m = date.getMonth() + 1,
                d = date.getDate();
            return y + '年' + (m < 10 ? '0' + m : m) + '月' + (d < 10 ? '0' + d : d) + '日';
        }

        if( this.multi){
            if(this.selectedDates.length === 2 ){
                var dat1 = this.selectedDates[0],
                    dat2 = this.selectedDates[1];
                if (dat1 > dat2) {
                    return getString(dat2) + '-' + getString(dat1);
                } else {
                    return getString(dat1) + '-' + getString(dat2);
                }
            } else{
                alert('请选择时间');
                return '请选择时间段';
            }
            
        }else{
            return getString(this.date);
        }
    },
    
    renderByDate:function(date){
        var years = document.querySelectorAll('.year');
        var month = document.querySelectorAll('.month');
        if ( this.multi) {
            years[1].innerHTML = date.getFullYear()+'年';
            month[1].innerHTML = (date.getMonth()+1) + '月' ;
        } else {
            years[0].innerHTML = date.getFullYear()+'年';
            month[0].innerHTML = (date.getMonth()+1) + '月' ;
        }
    
        var dat = new Date(date);
        dat.setDate(dat.getDate() - date.getDate() + 1);
        dat.setDate(dat.getDate() - dat.getDay());

        var allSpan = document.querySelectorAll('.day');
        
        for( var i=0;i<42;i++){
            var ele ; 
            if ( this.multi ) {
                allSpan[i+7+49].innerHTML = dat.getDate();
                ele = allSpan[i+7+49];

            } else {
                allSpan[i+7].innerHTML = dat.getDate();
                ele = allSpan[i+7];
            }
            
            if ( date.getTime() === dat.getTime()) {
                this.selectedEle = ele;
            }

            if( (this.selectedDates[0] && dat.getTime() === this.selectedDates[0].getTime()) ||
                (this.selectedDates[1] && dat.getTime() === this.selectedDates[1].getTime()) ) {
                ele.style.backgroundColor = 'rgb(200,27,1)';
                ele.style.color = 'white';
            } else {
                if( (this.selectedDates.length === 2 && this.selectedDates[0] > dat && this.selectedDates[1] < dat) ||
                    (this.selectedDates.length === 2 && this.selectedDates[1] > dat && this.selectedDates[0] < dat) ) {
                    ele.style.backgroundColor = 'rgb(235,244,249)';
                } else {
                    ele.style.backgroundColor = '';
                    ele.style.color = '';
                }

                if(dat.getMonth() !== date.getMonth() ) {
                    ele.style.color = 'lightgray';
                } else {
                    if( dat.getDay() === 0 || dat.getDay() ===6 ) {
                        ele.style.color = 'rgb(200,27,1)';
                    } 
                }
            }

            dat.setDate( dat.getDate()+1 );
        }        
    },

};
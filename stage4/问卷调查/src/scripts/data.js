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
}

var Calendar = function(container){    
    this.container = document.body;

    this.date = new Date();
    this.mainDiv = null;
    this.week = ['Su','Mo','Tu','We','Th','Fr','Sa'];
    this.init();
};

Calendar.prototype.selectDate = function(dat) { 
        this.renderByDate(dat);  
        this.date = dat; 
};

Calendar.prototype.nextMonth = function() {
        var dat = new Date(this.date);
        dat.setMonth(dat.getMonth() + 1);
        this.selectDate(dat);
    };

Calendar.prototype.preMonth = function() {
        var dat = new Date(this.date);
        dat.setMonth(dat.getMonth() - 1);
        this.selectDate(dat);
    };

Calendar.prototype.renderByDate = function(date){
        var dat = new Date(date);
        var nowdate = new Date();

        var years = document.querySelector('.year');
        var month = document.querySelector('.month');
      
        years.innerHTML = date.getFullYear()+'年';
        month.innerHTML = (date.getMonth()+1) + '月' ;
        if( date.getFullYear()=== nowdate.getFullYear() && date.getMonth()===nowdate.getMonth()) {
            this.premonth.style.display = "none";
         } else{
             this.premonth.style.display = "";
         }
        
        dat.setDate(dat.getDate() - date.getDate() + 1);
        dat.setDate(dat.getDate() - dat.getDay());

        var allSpan = document.querySelectorAll('.day');
        var ele ;      
        
        for( var i=0;i<42;i++){
            if( nowdate.getTime() < dat.getTime() ) {
                allSpan[i].innerHTML = dat.getDate();
                ele = allSpan[i];              
                if ( date.getTime() === dat.getTime()) {
                   ele.style.backgroundColor = '#e67114';
                    ele.style.color = 'white';
                } 
              
                ele.style.backgroundColor = "";
                ele.style.color = "";        
                ele.classList.remove('unactive');
       
                if(dat.getMonth() !== date.getMonth()  ) {
                    ele.style.color = 'lightgray';
                    ele.classList.add('unactive');
                } 
                 
            } else {
                allSpan[i].innerHTML= "";
                allSpan[i].style.backgroundColor = "";
            }
                dat.setDate( dat.getDate()+1 );
        }        
    };

 Calendar.prototype.getSelectedDate = function(){
        function getString(date) {
            var y = date.getFullYear(),
                m = date.getMonth() + 1,
                d = date.getDate();
            return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) ;
        }
         return getString(this.date);     
    };

Calendar.prototype.init =  function () {
        var that = this;
        var mainDiv = document.createElement('div');
        mainDiv.setAttribute('class','mainDiv');
        mainDiv.style.position = 'relative';
        this.container.appendChild(mainDiv);

        this.mainDiv = mainDiv;

        var calendarEle = document.createElement('div');
        calendarEle.setAttribute('class','calendarEle');
        calendarEle.style.width='255px';
        calendarEle.style.height = '265sspx';
        calendarEle.style.border = '1px solid #e67114';
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
        title.style.backgroundColor = '#e67114';
        title.style.color='#ffffff';
        title.style.padding = '5px';
        calendarEle.appendChild(title);

        this.premonth = document.createElement('div');
        this.premonth.innerHTML = '<';
        this.premonth.style.float = 'left';
        this.premonth.style.cursor = 'pointer';
        title.appendChild(this.premonth);

        addEvent('click',this.premonth,function(){
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
            
            ele.style.textAlign = 'center';
            ele.style.display = 'inline-block';
            ele.style.width = '36.4px';
            ele.style.height = '30px';
            ele.style.lineHeight = '30px';

            return ele;
        }
        var i, ele, elemet, e, target;
        for( i = 0; i < 7; i++ ){
            el = createEle();
            el.setAttribute('class','weeks');
            el.style.backgroundColor = "#e67114";
            el.style.color = "white";
            el.innerHTML = this.week[i];
            calendarEle.appendChild(el);
        }
        for ( i = 0; i < 42; i++) {
            elemet = createEle();
            elemet.setAttribute('class','day');
            elemet.style.cursor = 'pointer';
            calendarEle.appendChild(elemet);
        }
        addEvent("mouseover", calendarEle , function(e) {
            e = e || window.event;
            target = e.target || e.srcElement;
            if( target.className.toLowerCase().indexOf('day') >-1) {
                if( target.innerHTML ) {
                    target.style.backgroundColor = '#e67114';
                }
            }
        });

        addEvent("mouseout", calendarEle , function(e) {
            e = e || window.event;
            target = e.target || e.srcElement;
            if( target.className.toLowerCase().indexOf('day') >-1) {
                 if( target.innerHTML  ) {
                    target.style.backgroundColor = '';
                }
            }
        });

        this.renderByDate(this.date);

        var that = this;
        calendarClick = function(e){
            if( calendarEle.style.display==='none'){
                return ;
            }
            var e = e || window.event;
            var target = e.target || e.srcElement;
             var i, index, allSpan ;
            if( target.className.toLowerCase().indexOf('day') >-1 ) {
                allSpan = document.querySelectorAll('.day');
             
                for( i=0; i<42; i++ ) {
                    if( allSpan[i] === target ){
                        index = i ;
                        break;
                    }
                }
                                                  
                var datetemp = new Date(that.date);
                var dat = new Date(that.date); 
                var input = document.querySelector(".showD");             
                datetemp.setDate(1);       
                dat.setDate( index - datetemp.getDay()+1 );
                that.date = dat;
                if ( target.className.toLowerCase() ==="day" ) {
                    input.value =   that.getSelectedDate();
                } else{
                    that.selectDate(dat);
                }
            }
        }
        addEvent('click',calendarEle,calendarClick);
};

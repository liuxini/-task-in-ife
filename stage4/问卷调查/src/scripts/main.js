(function() {
  var store = { qtlist: [] };

  var calendar = new Calendar();
  var calendarEle = $('.calendarEle');


  var homePage = Vue.extend ({
    template: "#index",

    data: function() {
      return {
        rmindex: 0,
        isdelete: false,
        qtlist: store.qtlist,
      };
    },

    methods: {
      setrm: function(index) {
        this.rmindex = index;
        this.isdelete = true;
      },

      removeitem: function() {
        store.qtlist.splice(this.rmindex,1);
        this.rmindex = 0;
        this.isdelete = false;
      },  

      operateqn: function(event) {
        var $target = $(event.target); 
        var $list = $("tbody tr");
        var parent = $target.parents("tr")[0];
        var trindex = 0;

        if( $target.is("button")) {
          $list.each(function(index, el) {
            if( el === parent ) {
             trindex = index;
             return ;
           }
         });
        }
        this.$dispatch('child-msg', trindex);       
      }
    }
     });

    Vue.component('modal', {
      template: '#prompt',
      props: {
        show: {
          twoWay: true ,
        }
      }
    });


    var editqt = Vue.extend ({
      template: "#edit",

      data: function() {
        var date = new Date();
        var deadline = date.getFullYear() + "-"+(date.getMonth()+1) + "-"+(date.getDate()+1); 

        return {
          choose_type: false, 
          storeqn: false,
          releaseqn: false,
          releaseStatus: false,
          raw: true,

          qn: {
           status: "未发布",
           title: "这里是标题",
           qtlist: [ ],
           deadline: deadline,
         },
         qt: [ { type: "radio", title: "单选题", options: ["选项1","选项2"] },
            { type: "checkbox", title: "多选题", options: ["选项1","选项2","选项3","选项4",]},
            { type: "textarea", title: "文本题", options:[false]}]
          };
        },

        events: {
          'parent_msg': function(index) {
            this.qn = store.qtlist[index] ;
            this.raw = false;
          },
        },

       methods: {
        replace: function( $div, $inputElement) {
          $div.replaceWith($inputElement);
          $inputElement[0].focus();
        },

        setTitle: function(val) {
          var $div = $(".qn_head");
          var $inputElement = $("<input type='text' class='input_head'>");  
          $inputElement.val($div.text() || "这里是标题");
          this.replace( $div, $inputElement ) ;

          var that = this;
          $inputElement.blur( function() {
            $div.html($inputElement.val()) ;              
            $inputElement.replaceWith($div);
            that.qn.title= $inputElement.val();
          });        
        },

        setQtTitle: function(index) {
          var $div = $(".qt_caption_content");
          $div = $($div[index]);
          var $inputElement = $("<input type='text' style='width: 50%''>");  
          $inputElement.val($div.text());
          this.replace( $div, $inputElement ) ; 

          var that = this;
          $inputElement.blur( function() {
              $div.html($inputElement.val()) ;
              $inputElement.replaceWith($div);
              that.qn.qtlist[index].title =  $inputElement.val();
          });      
        },

        setContent: function(event, index, qt){
          var $div = $(event.target);
          $div = $($div);
          var $inputElement = $("<input type='text' style='width: 50%''>");  
          $inputElement.val($div.text());

          this.replace( $div, $inputElement ) ; 

          $inputElement.blur( function() {
            $div.html($inputElement.val()) ;
            $inputElement.replaceWith($div);
            qt.options[index] =  $inputElement.val();
          });      
        },

         addOption: function(options) {
          options.push("选项"+(options.length+1));
        },

        removeOp: function(que,index) {
          if( index>0) {
            que.options.splice(index,1);            
          } else {
            que.options.shift(); 
          }
        },

        addQt: function( type ) {
          var qtwait = $.extend(true, {}, this.qt[type]);
          this.qn.qtlist.push( qtwait );
        },

        upQt: function (index) {
         var qt = this.qn.qtlist[index];
         this.qn.qtlist.splice(index,1);
         this.qn.qtlist.splice(index-1,0,qt);
       },

        downQt: function(index) {
          var qt = this.qn.qtlist[index];
           this.qn.qtlist.splice(index,1);
           this.qn.qtlist.splice(index+1,0,qt);
        },

        reuseQt: function(index) {
          var qt = $.extend(true, {}, this.qn.qtlist[index]);
          this.qn.qtlist.splice(index,0,qt);
        },

        removeQt: function(index) {
          if( index>0) {
            this.qn.qtlist.splice(index,1);            
          } else {
             this.qn.qtlist.shift(); 
          }
        },

        setDeadline: function() {
            if ( calendarEle.css("display") ==='none' ) {
                calendarEle.css( "display", "block") ;
                calendarEle.css("left", "18.4em") ;
                calendarEle.css("top", "-6.6em") ;
            } else {
                calendarEle.css( "display", "none") ;
            }
        },

        store: function() {
          this.storeqn = true;
          if( this.raw ) {
            var qn = $.extend(true, {}, this.qn);          
            store.qtlist.push(qn);              
            this.qn.title =  "这里是标题";
            this.qn.qtlist =  [ ];
            this.qn.status = "未发布";
          } else {
            this.raw = true;
          }             
        },

        check: function() {               
          if( !this.qn.qtlist.length ) {
             this.releaseStatus = true;
          }else{
            this.releaseqn = true;
          }
        },

         release: function() {
            this.releaseqn = false;
            this.qn.status = "发布中";
            if( this.raw ) {
              var qn = $.extend(true, {}, this.qn);              
              store.qtlist.push(qn);
              this.qn.title =  "这里是标题";
              this.qn.qtlist =  [ ];
              this.qn.status = "未发布";    
            } else {
              this.raw = true;
            }            
        },
      }
    });
  
    var stastic = Vue.extend ( {
      template: "#qnstastic",

      data: function(){
        return { qn: {} };
      },

      computed: {
        chart: function() {
        
        }
     },
        events: {
        'parent_msg': function(index) {
          this.qn = store.qtlist[index] ;
          var mychart,  $container, option;
          var  $main = $('.stastic_item');

          this.qn.qtlist.forEach( function( el, i ) {           
            $container = $("<div class='stastic_qt' style='width: 70%; height: 300px;'></div>");
            $main.append( $container );
            mychart = echarts.init($container[0]);
            option = {
              title: {},
              legend: {},
              tooltip: {},
              series:[],
            };
            option.title = { text: el.title, x: 'center' };
            option.legend = {
                orient: 'vertical',
                 left: 'left',
                 data: el.options
            };
            option.tooltip = {
                  trigger: 'item',
                  formatter: '{a} <br/>{b} : {c} ({d}%)',
              };
            switch( el.type ) {
              case "radio":
                option.series = [
                  {
                    name: '人数',
                    type: 'pie',
                    data:[],
                    itemStyle: {
                      emphasis: {
                        shadowBlur: 10,
                        shadowOffset: 0,
                        shadowColor: 'rbga(0, 0, 0, 0.5)'
                      }
                    }
                  }
                ];
                el.options.forEach( function(str){
                  option.series[0].data.push({value: parseInt(Math.random()*20),name:str});
                });
                break;
              case "checkbox":
                option.xAxis = { data: [] };
                option.yAxis = {};
                option.tooltip = {};
                option.series = [
                  {
                    name: '人数',
                    type: 'bar',
                    data:[],
                  }
                ];
                 el.options.forEach( function(str){
                  option.xAxis.data.push(str);
                  option.series[0].data.push(  parseInt(Math.random()*20) );
                });
                break;
              case "textarea":
                option.legend.data = ["有效回答","无效回答"];
                option.series = [
                  {
                    name: '人数',
                    type: 'pie',
                    data:[ 
                      { value:  parseInt(Math.random()*20), name: "有效回答"},
                      { value:  parseInt(Math.random()*20), name: "无效回答"}
                      ],
                  }
                ];
                break;
              default: break;
            }
            mychart.setOption(option);
          });
        },
      },
      
    });
     
     var app = Vue.extend({
      data: function(){
        return {
          qn: {},
        };      
      },
     
      events: {
        'child-msg': function(index) {
          var that = this;
           setTimeout(function(){
                that.$broadcast('parent_msg', index);           
            },0);
        },
      },

     });
     var router = new VueRouter();

  router.map({
     '/edit': { component: editqt,},
     '/index': { component: homePage, },
     '/stastic': { component: stastic,},
  });

   router.redirect({ '/': '/index' });

router.start( app, 'body');

})();
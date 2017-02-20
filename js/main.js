requirejs.config({
    paths: {
        jquery: "jquery",
        table:"table",
        daterangepicker:"daterangepicker",
        moment:"moment",
        select2:"select2"
    },
    shim:{
        'table':{
            deps:['jquery']
        },
        'data':{
            deps:['jquery']
        },
        'moment':{
            deps:['jquery']
        },
        'select2':{
            deps:['jquery']
        }
    },
    //waitSeconds: 15/*请求时延*/
});
require(['jquery','table','daterangepicker','moment','select2'], function ($) {
    $(function(){
       /*页面加载前请求数据*/
       $.ajax({
          url: 'example.txt',
          type: 'post',
          dataType: 'html',
          success:function(data){
          	$("#myTable tbody").append(data);
          	mytable();
          }
        })
        .done(function() {
          console.log("success");
        })
        .fail(function() {
          console.log("error");
        })
        .always(function() {
          console.log("complete");
        });

        /*页面关闭时发送数据*/
        $(window).bind('unload',function(event) {
        	/* Act on the event */
        	$.ajax({
	          url: 'example.txt',
	          type: 'post',
	          dataType: 'html',
	          success:function(data){
	          	console.log("daihaiaing");
	          }
	        })
	        .done(function() {
	          console.log("success");
	        })
	        .fail(function() {
	          console.log("error");
	        })
	        .always(function() {
	          console.log("complete");
	        });
        });
       

        $("#start").focus(function(event) {
            /* Act on the event */
            data($(this).attr("id"));
        });
        $("#end").focus(function(event) {
            /* Act on the event */
            data($(this).attr("id"));
        });
        function data(a){
            $("#"+a).daterangepicker({
                "singleDatePicker": true,
                "linkedCalendars": false,
                "autoUpdateInput": false,
                "startDate": "04/21/2016",
                "opens": "right"
            }, function(start) {
              $("#"+a).val(start.format('YYYY-MM-DD'));
            });
        };
        function mytable(){
           var colour=240;
           for(var i=0 , j=$("#myTable tbody tr").length ;i<=j; i++){
               var n=i%4;
               switch (n){
                   case 0:$("#myTable tbody>tr:eq("+i+")").css({backgroundColor:"rgb(228,237,241)"});break;
                   case 1:$("#myTable tbody>tr:eq("+i+")").css({backgroundColor:"rgb(210,213,230)"});break;
                   case 2:$("#myTable tbody>tr:eq("+i+")").css({backgroundColor:"rgb(190,206,215)"});break;
                   case 3:$("#myTable tbody>tr:eq("+i+")").css({backgroundColor:"rgb(173,190,198)"});break;
               }
            }
             $("#myTable").tablePaging({ pageSize: 10, sorting: true, sortSelector: ".js-Order", sortType: "number" });
         }
      mytable();
      /*下拉框*/
      function formatState (state) {
        if (!state.id) { return state.text; }
        var $state = $(
        '<span>' + state.text + '</span>'
        );
        return $state;
      };

      $('#sel_recommender').select2({
        placeholder: "请选择",
        templateResult: formatState,
        width:"144px"
      });
      /*添加按钮*/
      $(".tablehead input:eq(0)").click(function(event) {
        /* Act on the event */
        $(".shsadow").css({
          display: 'block',
          property2: 'value2'
        });
        $("#change").css({
          display: 'none',
          property2: 'value2'
        });
        $("#submit").css({
          display: 'inline',
          property2: 'value2'
        });
      });
      $(".shsadow p span").click(function(event) {
        /* Act on the event */
        $(".shsadow").css({
          display: 'none',
          property2: 'value2'
        });
      });
      $("#submit").click(function(event) {
        /* Act on the event */
        $(".shsadow").css({
          display: 'none',
          property2: 'value2'
        });
        var data=new Date();
        var mydata=data.getFullYear()+"-"+data.getMonth()+"-"+data.getDate();
        var text="<tr><td><input type='checkbox' name='select' /></td><td>"+$("#number").val()+"</td><td>"+$("#name").val()+"</td><td>"+$("#state").val()+"</td><td>"+mydata+"</td><td>"+"最后登录时间"+"</td><td>"+$(".combox").val()+"</td><td>"+$("#remark").val()+"</td></tr>";
         $("#myTable tbody").append(text);
         mytable();
      });
      /*删除*/
      var number;
      $(".tablehead input:eq(1)").click(function(event) {
        /* Act on the event */
        var abc=0;
        var classname;
        $("tbody input[type=checkbox]").each(function(){
           if($(this).is(':checked')){
            abc++;
            number=$(this).parent().parent("tr").index();
            classname+=$(this).parent().parent("tr").attr("class");
            }
        })
        if (abc == 1) {
          var sear=new RegExp('canNotChange');
          if (sear.test(classname)) {
            alert("封存选项不允许编辑");
          }else{
            $("tbody input[type=checkbox]").each(function(){
               if($(this).is(':checked')) {
                 $(this).parent().parent("tr").remove();
                }
            });
          };
        }else{
          var sear=new RegExp('canNotChange');
          if (sear.test(classname)){
            alert("封存选项不允许编辑");
          }else{
            alert("你必须选择一项进行编辑");
          }
        };
      });
       /*修改*/
      $(".tablehead input:eq(2)").click(function(event) {
        /* Act on the event */
        var abc=0;
        var classname;
        $("tbody input[type=checkbox]").each(function(){
           if($(this).is(':checked')){
            abc++;
            number=$(this).parent().parent("tr").index();
            classname+=$(this).parent().parent("tr").attr("class");
            }
        })
        if (abc == 1) {
          var sear=new RegExp('canNotChange');
          if (sear.test(classname)) {
            alert("封存选项不允许编辑");
          }else{
            $(".shsadow").css({
              display: 'block',
              property2: 'value2'
            });
            $("#submit").css({
              display: 'none',
              property2: 'value2'
            });
            $("#change").css({
              display: 'inline',
              property2: 'value2'
            });
          };
        }else{
          var sear=new RegExp('canNotChange');
          if (sear.test(classname)){
            alert("封存选项不允许编辑");
          }else{
            alert("你必须选择一项进行编辑");
          }
        };
        
      });
      $("#change").click(function(event) {
        /* Act on the event */
        $(".shsadow").css({
          display: 'none',
          property2: 'value2'
        });
        var data=new Date();
        var mydata=data.getFullYear()+"-"+data.getMonth()+"-"+data.getDate();
        var text="<td><input type='checkbox' name='select' /></td><td>"+$("#number").val()+"</td><td>"+$("#name").val()+"</td><td>"+$("#state").val()+"</td><td>"+mydata+"</td><td>"+"最后登录时间"+"</td><td>"+$(".combox").val()+"</td><td>"+$("#remark").val()+"</td>";
        $("tbody tr:eq("+number+")").html(text);
        mytable();
      });
      /*封存*/
      $(".tablehead input:eq(3)").click(function(event) {
        /* Act on the event */
         $("tbody input[type=checkbox]").each(function(){
             if($(this).is(':checked')) {
                $(this).parent().parent("tr").css({
                  color: 'grey',
                  property2: 'value2'
                });
                $(this).parent().parent("tr").attr('class', 'canNotChange');
              }
          })
      });
      /*全选*/
      $("thead input[type=checkbox]").click(function(event) {
        /* Act on the event */
        if($("thead input[type=checkbox]").is(':checked')){
          $("tbody input[type=checkbox]").each(function(){
               $(this).prop('checked', true);
          })
        }else{
          $("tbody input[type=checkbox]").each(function(){
               $(this).attr('checked', false);
          })
        }
          
      });
      /*启封*/
      $(".tablehead input:eq(4)").click(function(event) {
        /* Act on the event */
         $("tbody input[type=checkbox]").each(function(){
             if($(this).is(':checked')) {
                $(this).parent().parent("tr").css({
                  color: 'black',
                  property2: 'value2'
                });
                $(this).parent().parent("tr").removeAttr('class', 'canNotChange');
              }
          })
      });
      /*查询*/
      $(".tablehead input:eq(5)").click(function(event) {
        /* Act on the event */
        var value1=$("#start").val();
        var value2=$('#end').val();
        var value3=$("#selectname").val;
         $.ajax({
         	url: 'example.txt',
         	type: 'post',
         	dataType: 'json',
         	data: {begin: value1,end:value2,name:value3},
         	success:function(){
         		$("#myTable tbody").append(data);
         	}
         })
         .done(function() {
         	console.log("success");
         })
         .fail(function() {
         	console.log("error");
         })
         .always(function() {
         	console.log("complete");
         });
         var dai="dai";
      });   
  })
})
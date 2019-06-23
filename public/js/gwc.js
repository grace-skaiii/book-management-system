$(function(){
	/*删除商品*/
	$("#listbox").on("click",".rubbish",function(){
		$(this).parents("li").remove();//parent是取父元素；parents取祖先元素
		tm_total();
	});
	/*商品框的选中与不选*/
	$("#listbox").on("click",".checkbox",function(){
		$(this).find(".c_xz").toggle();/*记得类名前面有个.!!!! toggle()从隐藏和显示状态切换 */
		tm_total();
	});
	/*商品数量增加和减少*/
	$("#listbox").on("click",".add",function(){
		var $input=$(this).prev();/*￥input是一个jquery对象 而不是html元素；prev是该元素的前一个元素*/
		var value=$input.val();
		var max=$input.data("max");
		value++;
		if(value>max) value=max;
		$input.val(value);
		tm_total();
	})/*此处不打分号 接着写*/
	.on("click",".remove",function(){
		var $input=$(this).next();//这里是next 不是prev！！
		var value=$input.val();
		value--;
		if(value<=0) value=1;
		$input.val(value);
		tm_total();
	});
});
//求总和
function tm_total(){
	var total=0;
	$("#listbox").find("li").each(function(){//each 对每一个找到的li都这样做
		var flag=$(this).find(".c_xz").is(":visible");	
		if(flag){
			var money=$(this).find(".money").text();//这里的标签是p 要用
			var num=$(this).find(".num").val();//这里的标签是input所以用val
			total+=money*num;
		}
	});
	var length=$("#listbox").find(".c_xz:visible").length;//length返回数目！
	$("#count").text(length);//通过text(value)来修改 说明了为什么那里要设标签
	$("#sum").text(total);
};
function add(ob){
	var author=$(ob).prev().val();
	var title=$(ob).prev().prev().val();
	$.ajax({
		type : "POST",
		url : "/addBookWanted",
		data : JSON.stringify({author:author,title:title}),
		contentType: 'application/json',
	});
}
// var http ;
// function verify(ob){
// 	var pwd=$(ob).prev().find('#pwd').val();
// 	var id=$(ob).prev().prev().find('#id').val();
// 	$.ajax({
// 		type : "POST",
// 		url : "/auth",
// 		data : JSON.stringify({pwd:pwd,id:id}),
// 		contentType: 'application/json',
// 		success:function(str){
// 			var json =$.parseJSON( str );
// 			if(json.ok) {
// 				alert('登录成功!');
// 			} else {
// 				alert('登录失败:' + json.msg);
// 			}
// 		},
// 			// var resultstr = http.responseText;
// 			// var data = $.parseJSON(data);
// 			// if(r=='1')
// 			// 	{
// 			// 		$('#id-input-error').show();
// 			// 		$('#password-input-error').hide();
// 			// 	}
// 			// else if(r=='3')
// 			// {
// 			// 	$('#password-input-error').show();
// 			// 	$('#id-input-error').hide();
// 			// }	
// 			// else
// 			// window.location.href='/customerPage';
// 		});
// }
		
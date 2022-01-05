function sendReqData(req_seq) {
	var getText;
	var mark_count;

	if(req_seq==1){
		//var word = document.getElementById('mark_one').value;
		getText = type($("#mark_one").text()); //type안에 쓰면 영어로 번역한다.
	}
	else if(req_seq==2){
		//var word = document.getElementById('mark_two').value;
		getText = type($("#mark_two").text());
	}
	else if(req_seq==3){
		//var word = document.getElementById('mark_three').value;
		getText = type($("#mark_three").text());
	}
	else if(req_seq==4){
		//var word = document.getElementById('mark_four').value;
		getText = type($("#mark_four").text());
	}
	else{
		//var word = document.getElementById('mark_five').value;
		getText = type($("#mark_five").text());
	}
	$.post(
		"./req.php", {seq:getText}, function(data) { 
			console.log(data); 

			var afterStr = data.split('★');
			console.log(afterStr);

			var a = afterStr.length;
			console.log(a);

			var afterStr1 = afterStr[a-1];
			var afterStr2 = afterStr1.split('/');
			console.log(afterStr2);

			a=a-1;


			var title=1;
			for(var i=0; i<10; i++){
				// $("aid").text(afterStr[2]
				console.log(i);
				console.log(a/3);
				// document.getElementById("aid" + i).text = afterStr[title];
				// $('.linkButton').prop('href', 변경할 값)
				if(i<parseInt(a/3)){
					document.getElementById("aid" + i).text = afterStr[title];
					document.getElementById("aid" + i).href = afterStr[title+1];
					console.log(afterStr[title]);
					console.log(afterStr[title+1]);
					title=title+3;
				}
				else{
					document.getElementById("aid" + i).text = afterStr[title];
					document.getElementById("aid" + i).style.visibility ='hidden';
				}
				
			}

			var getText = $("#mark_one").text(afterStr2[1]);
		    var getText = $("#mark_two").text(afterStr2[4]); ///////
		    var getText = $("#mark_three").text(afterStr2[7]);
		    var getText = $("#mark_four").text(afterStr2[10]);
		    var getText = $("#mark_five").text(afterStr2[13]);

		    var getText = $("#small_one").text(afterStr2[2]);
		    var getText = $("#small_two").text(afterStr2[5]);
		    var getText = $("#small_three").text(afterStr2[8]);
		    var getText = $("#small_four").text(afterStr2[11]);
		    var getText = $("#small_five").text(afterStr2[14]);

// seq : 1
}); 
}

function type(str){
	if(str=="해변")
		return "beach";
	else if(str=="섬")
		return "island";
	else if(str=="산")
		return "mount";
	else if(str=="계곡")
		return "valley";
	else if(str=="호수")
		return "lake";
	else if(str=="도심")
		return "city";
	else if(str=="들판")
		return "field";
	else
		return "forest";
}

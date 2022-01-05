// var hw = document.getElementById('hw');
// hw.addEventListener('click', function(){
//     alert('Hello world');
// })

//document.getElementById("아이디").innerHTML = 출력내용;

//alert('Hello world1'); 얼럿박스

// document.write(5 + 6);
// function printName()  {

// 	document.getElementById("li.a").text ="안녕하세요";
// 	console.log("안녕");

// }

//o
// var elements = document.getElementsByTagName("li");
// document.write("0번째 : " + elements[0].innerText);
// console.log("안녕");

// const element = document.getElementById('a');
// element.innerHTML  = 'InnerHTML';
// console.log("안녕");
// console.log("<?echo output();?>");


getRequest(
    './LoadDBRank.php', // URL for the PHP file
    drawOutput,  // handle successful request
    drawError,    // handle error
    "get"
    );


// handles drawing an error message
function drawError() {
	var container = document.getElementById('rank');
	container.innerHTML = 'Bummer: there was an error! 안되면 서버키고 실행';
}
// handles the response, adds the html
function drawOutput(data) {


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

}
// helper function for cross-browser request object
function getRequest(url, success, error) {
	var req = false;
	try{
        // most browsers
        req = new XMLHttpRequest();
    } catch (e){
        // IE
        try{
        	req = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e) {
            // try an older version
            try{
            	req = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e) {
            	return false;
            }
        }
    }
    if (!req) return false;
    if (typeof success != 'function') success = function () {};
    if (typeof error!= 'function') error = function () {};
    req.onreadystatechange = function(){
    	if(req.readyState == 4) {
    		return req.status === 200 ? 
    		success(req.responseText) : error(req.status);
    	}
    }
    req.open("GET", url, true);
    req.send(null);
    return req;
}
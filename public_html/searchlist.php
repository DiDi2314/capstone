<?php

function check_0($seq, $conn){ // topclicked테이블에 값이 있는지(1) 없는지(0)

	$sql="select max(id) from topclicked";
	$result=mysqli_query($conn, $sql);
	$row= mysqli_fetch_row($result);
	$su = (int)$row[0];
   	$su = $su+1;

	$sql="insert into topclicked values($su, '$seq', 1, 'no')";
	mysqli_query($conn, $sql);

	$sql="select * from searchlist where camp like '%$seq%'";

	$result=mysqli_query($conn, $sql);

	$rowCount= mysqli_num_rows($result);

	for($i=0;$i<$rowCount;$i++){
    	$row= mysqli_fetch_array($result, MYSQLI_ASSOC);
    //연관 배열로 한줄 데이터 얻어오기.
 		echo "$row[id]★$row[camp]★$row[url]★";
	}
	$sql2="select * from topclicked ORDER BY click DESC";

	$result2=mysqli_query($conn, $sql2);

	$rowCount2= mysqli_num_rows($result2);
 
	for($i=0;$i<$rowCount2;$i++){
    	$row= mysqli_fetch_array($result2, MYSQLI_ASSOC); //php는 배열이 두 종류가 있다.
 		echo "$row[id]/$row[word]/$row[click]/";
	}

	mysqli_close($conn);
}
function check_1($seq, $conn, $wordtype){

	// 검색어에 관련된 결과리스트 출력
	if($wordtype=='no'){

		$sql="select * from searchlist where camp like '%$seq%'";

		$result=mysqli_query($conn, $sql);

		$rowCount= mysqli_num_rows($result);

		for($i=0;$i<$rowCount;$i++){
    		$row= mysqli_fetch_array($result, MYSQLI_ASSOC);
    		//연관 배열로 한줄 데이터 얻어오기.
 			echo "$row[id]★$row[camp]★$row[url]★";
		}
		//인기검색어의 count를 +1해준다.
		$sql1="select click from topclicked where word = '$seq'";

		$result1=mysqli_query($conn, $sql1);
		$row= mysqli_fetch_row($result1);
		$su = (int)$row[0];
   		$su = $su+1;
	
		$sql2="update topclicked set click = $su where word = '$seq'";
	 	mysqli_query($conn, $sql2);
	//인기검색어의 순위를 세팅한다.
		$sql2="select * from topclicked ORDER BY click DESC";

		$result2=mysqli_query($conn, $sql2);

		$rowCount2= mysqli_num_rows($result2);
	 
		for($i=0;$i<$rowCount2;$i++){
	    	$row= mysqli_fetch_array($result2, MYSQLI_ASSOC); //php는 배열이 두 종류가 있다.
	 		echo "$row[id]/$row[word]/$row[click]/";
		}

		mysqli_close($conn);
	}
	else{
		$sql="select * from searchlist where type = '$seq'";


		//결과리스트를 세팅한다.
	
		$result=mysqli_query($conn, $sql);

		$rowCount= mysqli_num_rows($result);

		for($i=0;$i<$rowCount;$i++){
    		$row= mysqli_fetch_array($result, MYSQLI_ASSOC);
    		//연관 배열로 한줄 데이터 얻어오기.
 			echo "$row[id]★$row[camp]★$row[url]★";
		}
	//인기검색어의 count를 +1해준다.
		$sql1="select * from topclicked where type = '$seq'";

		$result1=mysqli_query($conn, $sql1);

		$rowCount1= mysqli_num_rows($result1);

		$su = array();
	
		for($i=0;$i<$rowCount1;$i++){
    		$row= mysqli_fetch_array($result1, MYSQLI_ASSOC); 
	    	$su = (int)$row['click'];
	   		$su1 = $su+1;
	 		$sql2="update topclicked set click = $su1 where type = '$seq'";
	 		mysqli_query($conn, $sql2);
		}

	//인기검색어의 순위를 세팅한다.
		$sql2="select * from topclicked ORDER BY click DESC";

		$result2=mysqli_query($conn, $sql2);

		$rowCount2= mysqli_num_rows($result2);
	 
		for($i=0;$i<$rowCount2;$i++){
	    	$row= mysqli_fetch_array($result2, MYSQLI_ASSOC); //php는 배열이 두 종류가 있다.
	 		echo "$row[id]/$row[word]/$row[click]/";
		}


		mysqli_close($conn);
	}
	
}

$seq = $_POST['seq'];

//1. topclick에서 type 내용들 가져오기.
$sql="select * from topclicked";

$conn=mysqli_connect("localhost","root","autoset","keywordsearch", "3306");

$result=mysqli_query($conn, $sql);

$rowCount= mysqli_num_rows($result);

for($i=0;$i<$rowCount;$i++){
    $row= mysqli_fetch_array($result, MYSQLI_ASSOC); //php는 배열이 두 종류가 있다. 
    //연관 배열로 한줄 데이터 얻어오기.

    $str = (string)$row["word"];
    if($seq == $row["word"]){	
    	$check=1;
    }
    else{
    	$wordtype='no';
    	$check=0;
    }
}

if($check==0)
	check_0($seq, $conn);
else
	check_1($seq, $conn, $wordtype);

?>

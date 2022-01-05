<?php
 
header("Content-Type: text/html; charset=UTF-8");
 
//MySQL DB에 접속하기
$conn=mysqli_connect("localhost","root","autoset","keywordsearch", "3306");
 
//한긓깨짐 방지
mysqli_query($conn,"set names utf8");
 
//DB에서 데이터를 읽어오는 쿼리문	
$sql="select * from searchlist order by rand() limit 10";
$result=mysqli_query($conn, $sql);
$rowCount= mysqli_num_rows($result);

for($i=0;$i<$rowCount;$i++){
    $row= mysqli_fetch_array($result, MYSQLI_ASSOC); //php는 배열이 두 종류가 있다. 
    //연관 배열로 한줄 데이터 얻어오기.
 	echo "$row[id]★$row[camp]★$row[url]★";


 	// array_push($tempId, $row["id"]);
 	// array_push($tempWord, $row["word"]);
 	// array_push($tempClick, $row["click"]);
}


//$sql="select * from topclicked";
//$sql="select * from topclicked ORDER BY click";
$sql="select * from topclicked ORDER BY click DESC";
//SELECT * FROM 테이블 ORDER BY 컬럼1;(오름차순)

$result=mysqli_query($conn, $sql);
 
//$result는 결과 데이터들을 가지고 있는 테이블(표)
 
//총 레코드 수(행의 개수, 줄수)
$rowCount= mysqli_num_rows($result);

// $tempId = array();
// $tempWord = array();
// $tempClick = array();
//배열에 요소 추가
//array_push($flowers, $row[id], "", $row[word], "", $row[click], "");

//변수타입
//gettype(mixed $value)
 
for($i=0;$i<$rowCount;$i++){
    $row= mysqli_fetch_array($result, MYSQLI_ASSOC); //php는 배열이 두 종류가 있다. 
    //연관 배열로 한줄 데이터 얻어오기.
 	echo "$row[id]/$row[word]/$row[click]/";
 	// array_push($tempId, $row["id"]);
 	// array_push($tempWord, $row["word"]);
 	// array_push($tempClick, $row["click"]);
}


mysqli_close($conn);


?>



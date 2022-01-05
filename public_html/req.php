<?php
/** * req.php */ 
$seq = $_POST['seq'];

// header("Content-Type: text/html; charset=UTF-8");
 
// //MySQL DB에 접속하기
// $conn=mysqli_connect("localhost","root","autoset","keywordsearch", "3306");
 
// //한긓깨짐 방지
// mysqli_query($conn,"set names utf8");
 
// //DB에서 데이터를 읽어오는 쿼리문	
// //$sql="select * from topclicked";
// //$sql="select * from topclicked ORDER BY click";
// $sql="select * from topclicked ORDER BY click DESC";
// //SELECT * FROM 테이블 ORDER BY 컬럼1;(오름차순)

// $result=mysqli_query($conn, $sql);
 
// //$result는 결과 데이터들을 가지고 있는 테이블(표)
 
// //총 레코드 수(행의 개수, 줄수)
// $rowCount= mysqli_num_rows($result);

header("Content-Type: text/html; charset=UTF-8");
 
//MySQL DB에 접속하기
$conn=mysqli_connect("localhost","root","autoset","keywordsearch", "3306");
 
//한긓깨짐 방지
mysqli_query($conn,"set names utf8");
 
//DB에서 데이터를 읽어오는 쿼리문	
//$sql="select * from topclicked";
//$sql="select * from topclicked ORDER BY click";

//SELECT * FROM 테이블 ORDER BY 컬럼1;(오름차순)


$sql="select * from searchlist where type = '$seq'";

//$result는 결과 데이터들을 가지고 있는 테이블(표)

$result=mysqli_query($conn, $sql);
 
//총 레코드 수(행의 개수, 줄수)
$rowCount= mysqli_num_rows($result);

for($i=0;$i<$rowCount;$i++){
    $row= mysqli_fetch_array($result, MYSQLI_ASSOC); //php는 배열이 두 종류가 있다. 
    //연관 배열로 한줄 데이터 얻어오기.
 	echo "$row[id]★$row[camp]★$row[url]★";


 	// array_push($tempId, $row["id"]);
 	// array_push($tempWord, $row["word"]);
 	// array_push($tempClick, $row["click"]);
}

$sql1="select * from topclicked where type = '$seq'";

$result1=mysqli_query($conn, $sql1);

$rowCount1= mysqli_num_rows($result1);

$su = array();

for($i=0;$i<$rowCount1;$i++){
    $row= mysqli_fetch_array($result1, MYSQLI_ASSOC); //php는 배열이 두 종류가 있다. 
    //연관 배열로 한줄 데이터 얻어오기.
    $su = (int)$row['click'];
    $su1 = $su+1;
 	$sql2="update topclicked set click = $su1 where type = '$seq'";
 	mysqli_query($conn, $sql2);
}


$sql2="select * from topclicked ORDER BY click DESC";

$result2=mysqli_query($conn, $sql2);

$rowCount2= mysqli_num_rows($result2);
 
for($i=0;$i<$rowCount2;$i++){
    $row= mysqli_fetch_array($result2, MYSQLI_ASSOC); //php는 배열이 두 종류가 있다. 
 	echo "$row[id]/$row[word]/$row[click]/";
}


mysqli_close($conn);

?>

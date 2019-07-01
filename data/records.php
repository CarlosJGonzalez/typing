<?php
error_reporting(0);
date_default_timezone_set('America/New_York');
	try{
		include('db.conn.php');
		if($link = new mysqli($host, $user, $pwd, $db))
		{
			if($link->connect_errno > 0)
			{
				echo '{"key":"db error" , "value": "'.$link->connect_error.'"}';
				die();
			}	
			/*******************************************************/
			/*******************************************************/
			$id = 0;
			if($_GET['id']){
				$id = $_GET['id'];
				if(!filter_var($id, FILTER_VALIDATE_INT) == true)
				{
					die();
				}
			}


			//$strSql = sprintf("select `id`, `username`, `good`, `wrong`, `time`, `accuracy` from `tbl_test` where `id`> %d order by `accuracy` DESC;", $id);
			$strSql = "select `id`, `username`, `good`, `wrong`, `time`, `accuracy` from `tbl_test` order by `accuracy` DESC;";
			if($rs = $link->query($strSql))
			{				
				if(mysqli_num_rows($rs)>0){
					while($row = $rs->fetch_assoc())
					{
						if(is_array($row) && count($row)>0)
						{
							$id 	= $row['id'];
							$u 		= $row['username'];
							$g		= $row['good'];
							$w		= $row['wrong'];
							$t 		= $row['time'];
							$a 		= $row['accuracy'];
							$arr[] = ["id" => $id, "username" => $u, "good" => $g, "wrong" => $w, "time" => $t, "accuracy" => $a];
						}
					}
					echo json_encode($arr);
					unset($rs);
				}
			}else{
				echo '{"key":"error" , "value":"'.$link->errno.'"}';
			}
			unset($link);
		}else{
			echo '{"key":"database connection error", "value":"Could not connect with database"}';
		}
	}
	catch(Exception $e){
		echo '{"key":"Database error", "value":"'.$e->getMessage().'"}';
	}
?>			
<?php
error_reporting(0);
date_default_timezone_set('America/New_York');
error_reporting(0);
	if($_POST){

		$username = "anonymous";
		if(isset($_POST['username']) && $_POST['username'] != ''){
			$username = htmlspecialchars($_POST['username'], ENT_QUOTES);	
		}
		$good 	= htmlspecialchars($_POST['good'], ENT_QUOTES);
		$wrong 	= htmlspecialchars($_POST['wrong'], ENT_QUOTES);
		$time 	= htmlspecialchars($_POST['time'], ENT_QUOTES);	
		$accuracy = htmlspecialchars($_POST['accuracy'], ENT_QUOTES);	
	}
	


	try{
		include('db.conn.php');
		if($link = new mysqli($host, $user, $pwd, $db))
		{
			if($link->connect_errno > 0)
			{
				echo '{"key":"db error" , "value": "'.$link->connect_error.'"}';
				die();
			}	
			
			$username = addslashes(mysqli_real_escape_string($link, $username));
			$good 	  = addslashes(mysqli_real_escape_string($link, $good));
			$wrong 	  = addslashes(mysqli_real_escape_string($link, $wrong));
			$time 	  = addslashes(mysqli_real_escape_string($link, $time));
			$accuracy = addslashes(mysqli_real_escape_string($link, $accuracy));
			
			/*******************************************************/
			/*******************************************************/
			$strSql = sprintf("insert into `tbl_test` (`username`, `good`, `wrong`, `time`, `accuracy`) values('%s', %d, %d, '%s', '%s');", $username, $good, $wrong, $time, $accuracy);
			if($link->query($strSql))
			{
				echo '{"key": 200, "value":"successfull!"}';
			}else{
				echo '{"key":"error" , "value":"'.$link->errno.'"}';
				error_log($link->error);
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
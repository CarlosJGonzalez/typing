	var idrecord=0;

	function postdata(u,g,w,t,a)
	{
		var data = "username="+u+"&good="+g+"&wrong="+w+"&time="+t+"&accuracy="+a;
		$.ajax({
			method: "POST",
			url: "data/post.php",
			data: data,
			success: function(results)
			{
				var json=JSON.parse(results);
				if(json.key == 200){
					console.log('record saved');
					getrecords();
				}else{
					alert(json.value);
				}
			},
			async: true
		});	
	}	
	
	
	function getrecords()
	{
		
		$.ajax({
			url: "data/records.php?id="+idrecord,
			cache: false,
			success: function(data)
			{
				var data = JSON.parse(data);
				var recordsDiv = document.getElementById('records');
				recordsDiv.innerHTML = '';

				for(i=0;i<data.length;i++){
					var id 		= data[i].id;
					var username= data[i].username;
					var good 	= data[i].good;
					var wrong 	= data[i].wrong;
					var time 	= data[i].time;
					var acc    	= data[i].accuracy;

					var rowDiv = document.createElement('DIV');
						rowDiv.setAttribute('class', 'col-12');
						
						var divRow = document.createElement('DIV');
						divRow.setAttribute('class', 'row');
						
							var userDiv = document.createElement('DIV');
								userDiv.setAttribute('class', 'flex-item');
								var userDivText = document.createTextNode(username);
								userDiv.appendChild(userDivText);

							var goodDiv = document.createElement('DIV');
								goodDiv.setAttribute('class', 'flex-item');						
								var goodDivText = document.createTextNode(good);
								goodDiv.appendChild(goodDivText);

							var wrongDiv = document.createElement('DIV');
								wrongDiv.setAttribute('class', 'flex-item');						
								var wrongDivText = document.createTextNode(wrong);
								wrongDiv.appendChild(wrongDivText);

							var timeDiv = document.createElement('DIV');
								timeDiv.setAttribute('class', 'flex-item');						
								var timeDivText = document.createTextNode(time);
								timeDiv.appendChild(timeDivText);

							var accDiv = document.createElement('DIV');
								accDiv.setAttribute('class', 'flex-item');						
							var accDivText = document.createTextNode(acc);
							accDiv.appendChild(accDivText);
						divRow.appendChild(userDiv);
						divRow.appendChild(goodDiv);						
						divRow.appendChild(wrongDiv);						
						divRow.appendChild(timeDiv);						
						divRow.appendChild(accDiv);						

						rowDiv.appendChild(divRow);

					recordsDiv.appendChild(rowDiv);
					idrecord = id;
				}				
			}
		});	
	}	
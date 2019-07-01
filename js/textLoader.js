    var selarr;
	var keyStrokes = 0;
	var n = 0;
	var curPosition =0;
	var good=0;
	var wrong=0;
	var flag=false;
	var timer;// = 'stopped';
	var timerFlag = false;
	var t = 0;
	var min = 0;


	window.addEventListener('load', function(){
		initialize();
		
	
		if(document.getElementById('typingBox'))
		{
			var txtEntryBox = document.getElementById('typingBox');			
			txtEntryBox.addEventListener('keydown', pressedKey, false);
			txtEntryBox.focus();
		}		
		
		if(document.getElementById('records'))
		{
			var rec = document.getElementById('records');
			getrecords();
		}
	});	
	

	function initialize()
    {

		var array = [];
		array[0] = "With a peeler slice cucumber into 1/8 inch thick slices lengthwise Cut each slice into 3 pieces crosswise.Place about 1 teaspoon shredded carrot onto the bottom edge of a cucumber slice place about 1 teaspoon cream cheese onto the carrot, and press 2 or 3 raisins into the cream cheese. Roll the cucumber slice into a little sushi roll starting at the filled end";
		
		array[1] = "Combine the water and rice in a saucepan and bring to a boil Cover reduce heat to low and simmer for 20 minutes or until rice is tender and water has been absorbed Remove from the heat and stir in the vinegar and a pinch of salt Set aside to cool";
		
		array[2] = "Cover a bamboo sushi mat with plastic wrap to keep the rice from sticking Place a sheet of seaweed over the plastic Use your hands to spread the rice evenly onto the sheet leaving about 1/2 inch of seaweed empty at the bottom";
		
		array[3] = "Arrange strips of cucumber and avocado across the center of the rice Lift the mat and roll over the vegetables once and press down Unroll then roll again towards the exposed end of the seaweed sheet to make a long roll";
		
		array[4] = "Preheat the oven to 425 degrees F Bring a large pot of salted water to a boil Meanwhile toss the zucchini and asparagus with 1 1/2 tablespoons olive oil on a rimmed baking sheet season with salt and pepper Roast until tender about 20 minutes Heat the remaining 1 1/2 tablespoons olive oil in a large skillet over medium heat";
		
		array[5] = "Remove from the heat and stir in the cheese Meanwhile add the linguine to the boiling water and cook as the label directs Reserve 1/2 cup cooking water then drain the pasta and add to the skillet with the sauce Add the roasted vegetables and the reserved cooking water toss to combine then stir in the basil Divide among bowls and top with more cheese.";

		var flag=0;
		while(flag!=1)
		{
			//generating a random number between 0 and 5 to choosing and array position
			var x = Math.floor((Math.random() * 10) + 1);
			if(x>=0 && x<=5)
			{
				flag=1;
				break;//breaking the while
			}
		}

		var text_array = array[x];

		var selected_text = "";
		/*converting the selected text into array to comparing each word in each array position, with the text input after pressing bar key*/
		selarr = text_array.split(" ");
		var qtyWords = selarr.length;
		var position = 0;
		//var auxCont = 0;
		
		while(qtyWords >= 0)
		{
			//creating 5 words sentences
			qtyWords -=5;
			for(var i=0 ; i<5; i++)
			{
				if(selarr.length-position > 0){
					selected_text +=  "<span id='"+position+"' class='untyped'>" + selarr[position++] + "</span> ";			
				}
			}
			selected_text +="</br>";
		}      
		
		var element = document.getElementById("textSource");
		element.innerHTML = '<p id ="display" style="text-align:center ; font-size:28 ; line-height:170%; font-family:Times New Roman"> ' + selected_text +' </p>';

		$('#0').addClass('focus');
	}
	
		function pressedKey(e)
		{
			//user press bar key
			if(e.keyCode == 32 && curPosition<selarr.length)
			{
				var typedWord = document.getElementById('typingBox');
				var lengthTypedWord = typedWord.value;
				keyStrokes += lengthTypedWord.length;
				
				var curWord = n+1;
				$('#' + curWord).addClass('focus');
				$('#' + n).removeClass('focus');
				
				//comparing typed word with its equivalent in selarr array, using curPosition like index 
				if(lengthTypedWord.trim().localeCompare(selarr[curPosition])==0)
				{
					$('#'+n).removeClass('untyped').addClass('good');
					good++;
				}else{
					wrong++;
					$('#'+n).removeClass('untyped').addClass('wrong');
				}
				typedWord.value = '';
				n++;

				if((curPosition+1)>5 && (curPosition+1)%5==0)
				{
					var current_pos = $("#textSource").scrollTop();
					$("#textSource").scrollTop(current_pos + 25);
				}			
				curPosition++;
			}else if(curPosition >= selarr.length && flag == false){
				//displaying results
				var results = document.getElementById('results');
				
				//good node			
				var divGood = document.createElement('DIV');
					var qGood = document.createTextNode('Right Words: '+good);
					divGood.appendChild(qGood);
					results.appendChild(divGood);
				
				//wrong node
				var divWrong = document.createElement('DIV');
					var qWrong = document.createTextNode('Wrong words: '+wrong);
					divWrong.appendChild(qWrong);
					results.appendChild(divWrong);
				
				//time node
				var divTime = document.createElement('DIV');
				var strTime = document.getElementById('timer');
					var qGood = document.createTextNode('Time: '+ strTime.innerHTML);
					divTime.appendChild(qGood);
					results.appendChild(divTime);
				$('#typingBox').prop('disabled', true);
				
				
				//accuracy node
				var divAccu = document.createElement('DIV');
					var acc = (good*100/selarr.length).toFixed(2);
					var qAcc = document.createTextNode('Accuracy: '+ acc +'%');
					divAccu.appendChild(qAcc);
					results.appendChild(divAccu);	
					
				flag=true;
				//stopping timer;
				clearInterval(timer);
				
				//showing scrollbar to check out results
				$('#textSource').css('overflow-y', 'scroll');
				$('#textSource').scrollTop(0);
				
				/********************************************/
				/********************************************/
				/***** POSTING DATA *****/
				var username = $('#username').val();  
				//this function is in js/ajax.js file
				postdata(username, good, wrong, strTime.innerHTML, acc);
				//getrecords();
				
			}else if(e.keyCode == 13){
				e.stopPropagation();
				return false;
			}else{
				if(timerFlag == false){
					fTimer();
					timerFlag = true;
				}			
			}
		}
	
	function fTimer()
	{
		timer = setInterval(function() {
			//let now = 0;//new Date().getTime();
			t = t + 1;
			
			if (t >= 0) {	
				if(t>59){
					min++;
					if(min>60){
						clearInterval(timer);
						
					}
					t=0;
				}
				document.getElementById("timer").innerHTML = min+" MIN(S) " + t +" SEC(S)";	
			}
		},1000);
	}

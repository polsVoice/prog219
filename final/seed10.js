var seed = {
	taskNum: 0,	// index of last item in localStorage
	ctr: 0,		// counter for task numbers
	array: [],	// array to store tasks retrieved from localStorage
	store: "",
	forward: true,
	taskObj: {
		taskNum: "",
		task: "",
		createdDate: "",
		duration: "",
		dueDate: ""
	},
	init: function()
	{
		if( typeof( Storage ) !== "undefined" )
		{
			console.log( "Storage supported!" );
			seed.store = $.localStorage;
		}
		else
		{
			console.log( "Storage not supported!" );
		}
		
		$( "#submit" ).click( seed.input );
		$( "#input" ).keypress( function( e )
		{
			if( e.which === 13 )
			{
				seed.input();
			}
		} );
		$( "#retrieve" ).click( seed.output );
		$( "#clear" ).click( seed.clear );
		$( "#back, #forward" ).click( seed.navigate );
		
		// keyboard navigation WIP
		$( document ).on( "keydown", function( event )
		{
			var keyCode = ( event.keyCode ? event.keyCode : event.which );
			$( "body" ).data( "source", keyCode );
			if( keyCode === 37 || keyCode === 39 )
			{
				seed.navigate();
			}
		} );
		
		$( "#input" ).focus();
		seed.readStorage();
		seed.taskDiv();
	},
	input: function()
	{
		if( $( "#input").val() )
		{
			var newTask = Object.create( seed.taskObj );
			newTask.taskNum = seed.taskNum;
			newTask.task = $( "#input" ).val();
			newTask.createdDate = seed.getISODate();
			newTask.duration = "00:00:00";
			newTask.dueDate = "0000-00-00";
			
			console.log( "inserting task number " + seed.taskNum + " into localStorage" );
			// localStorage.setItem( seed.taskNum, JSON.stringify( newTask ) );
			seed.store.set( seed.taskNum, newTask );
			$( "#input" ).val( "" );
			console.log( seed.taskNum );
			seed.array.push( newTask );
			
			seed.taskNum++;
			$( "#input" ).focus();
			seed.ctr = seed.array.length-1;
			console.log( "seed.ctr is " + seed.ctr );
			seed.taskDiv();
		}
	},
	navigate: function()
	{
		seed.stopTimer();
		
		var btnId = this.id;
		
		if( $( "#datepicker" ).val() )
		{
			var index = seed.array[ seed.ctr ].taskNum;
			seed.array[ seed.ctr ].dueDate = $( "#datepicker" ).val();
			seed.store.set( index + ".dueDate", $( "#datepicker" ).val() );
			console.log( "datepicker val is " + $( "#datepicker" ).val() );
		}
		
		if( $( "#delete" ).is( ":checked" ) )
		{
			console.log( "Removing item " + seed.array[ seed.ctr ].taskNum + " from localStorage" );
			seed.store.remove( seed.array[ seed.ctr ].taskNum );
			
			// array moves down
			seed.array.splice( seed.ctr, 1 );
			
			// back button or left arrow key
			if( btnId === "back" || $( "body" ).data( "source" ) === 37 )
			{
				seed.forward = false;
				seed.ctr--;
			}
			// console.log( "after deletion, seed.ctr is " + seed.ctr );
		}
		else
		{
			// forward button or right arrow key
			if( btnId === "forward" || $( "body" ).data( "source" ) === 39 )
			{
				seed.forward = true;
				seed.ctr++;
			}
			else
			{
				seed.forward = false;
				seed.ctr--;
			}
		}
		
		if( seed.ctr >=	seed.array.length )
		{
			seed.ctr = 0;
		}
		if( seed.ctr < 0 )
		{
			seed.ctr = seed.array.length-1;
		}
		console.log( "now seed.ctr is " + seed.ctr );

		seed.taskDiv();
		$( "body" ).data( "source", 0 );
	},
	taskDiv: function()
	{
		
		if( seed.forward )
		{
			setDirection = "left";
		}
		else
		{
			setDirection = "right";
		}
		
		if( $( "#task" ).length )
		{
			$( "#task" ).hide( "slide", {direction: setDirection}, 400, function()
			{
				$( "#task" ).html( "" );
				seed.taskDisplay();
				setDirection === "left" ? setDirection = "right" : setDirection = "left";
				$( "#task" ).show( "slide", {direction: setDirection}, 400 );
			} );
		}
		else
		{
			$( "form" ).prepend( "<div id='task'></div>" );
			seed.taskDisplay();
		}
	},
	taskDisplay: function()
	{
		if( seed.array.length )
		{
			$( "#task" ).append( "<p><input type='checkbox' name='task' id='delete' value='' />" + seed.array[ seed.ctr ].task 
								+ "</p><img src='img/arrow-right.png' id='timerArrow' alt='arrow' /><span id='runner'>" + seed.array[ seed.ctr ].duration + "</span><p>Due: <input type='text' id='datepicker' /></p><p>Created on: " + seed.array[ seed.ctr ].createdDate );
			
			//console.log( "dueDate is " + seed.array[ seed.ctr ].dueDate );
			$( "#datepicker" ).val( seed.array[ seed.ctr ].dueDate );

			// icon from http://openiconlibrary.sourceforge.net/
			// under CC-by-SA http://creativecommons.org/licenses/by-sa/3.0/
			var duration = seed.array[ seed.ctr ].duration;
			// console.log( "Duration is " + duration );
			var start = seed.stringToMilliseconds( duration );
			// console.log( "start is " + start );
			
			$( "#runner" ).runner({
				milliseconds: false,
				startAt: start,
				// 99:59:59
				stopAt: 356813000,
				format: function millisecondsToString(milliseconds) 
				{
					var oneHour = 3600000;
					var oneMinute = 60000;
					var oneSecond = 1000;
					var seconds = 0;
					var minutes = 0;
					var hours = 0;
					var result;

					if (milliseconds >= oneHour) {
						hours = Math.floor(milliseconds / oneHour);
					}

					milliseconds = hours > 0 ? (milliseconds - hours * oneHour) : milliseconds;

					if (milliseconds >= oneMinute) {
						minutes = Math.floor(milliseconds / oneMinute);
					}

					milliseconds = minutes > 0 ? (milliseconds - minutes * oneMinute) : milliseconds;

					if (milliseconds >= oneSecond) {
						seconds = Math.floor(milliseconds / oneSecond);
					}

					milliseconds = seconds > 0 ? (milliseconds - seconds * oneSecond) : milliseconds;

					if (hours > 0) {
						result = (hours > 9 ? hours : "0" + hours) + ":";
					} else {
						result = "00:";
					}

					if (minutes > 0) {
						result += (minutes > 9 ? minutes : "0" + minutes) + ":";
					} else {
						result += "00:";
					}

					if (seconds > 0) {
						result += (seconds > 9 ? seconds : "0" + seconds);
					} else {
						result += "00";
					}
					
					return result;
				}
                                  
			});
			$( "#timerArrow" ).toggleFunc( seed.startTimer, seed.stopTimer );
			$( "#datepicker" ).datepicker( {
				dateFormat: "yy-mm-dd"
			} );
		}
	},
	startTimer: function()
	{
		$( "#runner" ).runner( "start" );
		$( "#timerArrow" ).attr( "src", "img/pause.png" );
		
		// icon from http://openiconlibrary.sourceforge.net/
		// under CC-by-SA http://creativecommons.org/licenses/by-sa/3.0/
	},
	stopTimer: function()
	{
		var index = "";
		$( "#runner" ).runner( "stop" );
		$( "#timerArrow" ).attr( "src", "img/arrow-right.png" );
		if( seed.array.length )
		{
			seed.array[ seed.ctr ].duration = $( "#runner" ).html();
			index = seed.array[ seed.ctr ].taskNum;
			seed.store.set( index + ".duration", $( "#runner" ).html() );
		}
	},
	readStorage: function()
	{
		var taskObj = 0;
		for( var key in localStorage )
		{
			console.log( key );
		}
		console.log( "localStorage.length is " + localStorage.length );
		for( var i = 0; seed.array.length !== localStorage.length; i++ )
		{
			taskObj = seed.store.get( i );
			if( taskObj !== null )
			{
				taskObj.taskNum = i;
				console.log( "Duration for this task is " + taskObj.duration );
				console.log( taskObj );
				/*
				if( taskObj.dueDate - seed.getISODate() > 3 * 86400 * 1000 )
				{
					console.log( "Stuff is due, yo" );
					//$( "#reminder" ).html( "One or more tasks is due in 3 days or less!" );
				}
				*/
				seed.array.push( taskObj );
				console.log( "Item " + i + " retrieved" );
			}
		}
		if( seed.array.length )
		{
			seed.taskNum = seed.array[ seed.array.length-1 ].taskNum+1;
			console.log( "seed.taskNum is " + seed.taskNum );
		}
	},
	clear: function()
	{
		while( seed.array.length > 0 )
		{
			seed.array.pop();
		}
		localStorage.clear();
		seed.ctr = 0;
		seed.taskNum = 0;
		if( $( "#task" ) )
		{
			$( "#task" ).remove();
		}
	},
	stringToMilliseconds: function( theString )
	{
		var theArray = theString.split( ":" );
		var total = 0, multiplier = 3600000;
		$( theArray ).each( function( i, val )
		{
			if( val > 0 )
			{
				total += val * multiplier;
			}
			multiplier /= 60;
		} );
		console.log( "Number of milliseconds is " + total );
		return total;
	},
	getISODate: function()
	{
		var dateObj = new Date();
		var month = dateObj.getMonth() + 1;
		var day = dateObj.getDate();
		var date = dateObj.getFullYear() + "-" + ( month < 10 ? "0" : "" ) 
					+ month + "-" + ( day < 10 ? "0" : "" ) + day;
		return date;
	}
};
seed.init();

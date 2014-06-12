var seed = {
	taskNum: 0,	// index of last item in localStorage
	ctr: 0,		// counter for task numbers
	array: [],	// array to store tasks retrieved from localStorage
	store: $.localStorage,
	taskObj: {
		taskNum: "",
		task: "",
		date: "",
		duration: 0
	},
	init: function()
	{
		if( typeof( Storage ) !== "undefined" )
		{
			console.log( "Storage supported!" );
		}
		else
		{
			console.log( "Storage not supported!" );
		}
		
		$( "#submit" ).click( seed.input );
		$( "#retrieve" ).click( seed.output );
		$( "#clear" ).click( seed.clear );
		$( "#back, #forward" ).click( seed.navigate );
		
		// keyboard navigation WIP
		$( document ).on( "keydown", function( event )
		{
			var keyCode = ( event.keyCode ? event.keyCode : event.which );
			if( keyCode === 37 )
			{
			}
		} );
		
		$( "#input" ).focus();
		seed.readStorage();
		seed.taskDiv();
	},
	input: function()
	{		
		var newTask = Object.create( seed.taskObj );
		newTask.taskNum = seed.taskNum;
		newTask.task = $( "#input" ).val();
		newTask.date = seed.getISODate();
		
		console.log( "inserting task number " + seed.taskNum + " into localStorage" );
		localStorage.setItem( seed.taskNum, JSON.stringify( newTask ) );
		$( "#input" ).val( "" );
		console.log( seed.taskNum );
		seed.array.push( newTask );
		seed.taskNum++;
		$( "#input" ).focus();
	},
	navigate: function()
	{
		var btnId = this.id;
		
		if( $( "#delete" ).is( ":checked" ) )
		{
			console.log( "Removing item " + seed.array[ seed.ctr ].taskNum + " from localStorage" );
			localStorage.removeItem( seed.array[ seed.ctr ].taskNum );
			seed.array.splice( seed.ctr, 1 );
			if( btnId === "back" )
			{
				seed.ctr--;
			}
			console.log( "after deletion, seed.ctr is " + seed.ctr );
		}
		else
		{
			if( btnId === "forward" )
			{
				seed.ctr++;
			}
			else
			{
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
	},
	taskDiv: function()
	{
		if( $( "#task" ).length )
		{
			$( "#task" ).hide( "slide", {direction: "left"}, 500, function()
			{
				$( "#task" ).html( "" );
				seed.taskDisplay();
				$( "#task" ).show( "slide", {direction: "left"}, 500);
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
								+ " &ndash; " + seed.array[ seed.ctr ].date + " # " + seed.array[seed.ctr ].taskNum 
								+ "</p><img src='img/arrow-right.png' id='timerArrow' alt='arrow' /><span id='runner'>" + seed.array[ seed.ctr ].duration + "</span>" );
			console.log( seed.array[ seed.ctr ].duration );
								
			// icon from http://openiconlibrary.sourceforge.net/
			// under CC-by-SA http://creativecommons.org/licenses/by-sa/3.0/
			
			$( "#runner" ).runner({
				milliseconds: false,
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
		$( "#runner" ).runner( "stop" );
		$( "#timerArrow" ).attr( "src", "img/arrow-right.png" );
		seed.array[ seed.ctr ].duration = $( "#runner" ).html();
	},
	readStorage: function()
	{
		var taskObj = 0;
		for( var key in localStorage )
		{
			console.log( key );
		}
		console.log( "localStorage.length is " + localStorage.length );
		for( var i = 0, ii = localStorage.length; i <= ii; i++ )
		{
			console.log( "i is " + i );
			taskObj = localStorage.getItem( i );
			if( taskObj !== null )
			{
				taskObj = JSON.parse( taskObj );
				taskObj.taskNum = i;
				console.log( taskObj );
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
		localStorage.clear();
		seed.ctr = 0;
		seed.taskNum = 0;
		if( $( "#task" ) )
		{
			$( "#task" ).remove();
		}
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

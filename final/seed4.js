var seed = {
	taskNum: 0,	// index of last item in localStorage
	ctr: 0,		// counter for task numbers
	array: [],	// array to store tasks retrieved from localStorage
	taskObj: {
		taskNum: "",
		task: "",
		date: ""
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
		
		/*
		if( localStorage.taskNum )
		{
			seed.taskNum = localStorage.getItem( "taskNum" );
		}
		*/
		
		$( "#submit" ).click( seed.input );
		$( "#retrieve" ).click( seed.output );
		$( "#clear" ).click( seed.clear );
		$( "#back, #forward" ).click( seed.navigate );
		
		seed.readStorage();
		/*
		$( "body" ).prepend( "<div id='task'></div>" );
		if( seed.array[ 0 ]	 )
		{
			$( "#task" ).append( "<input type='checkbox' name='task' value='' /><p>" + seed.array[ seed.ctr ].task + " &ndash; " + seed.array[ seed.ctr ].date + "</p>" );
		}
		*/
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
		console.log( "seed.ctr is really " + seed.ctr );
		if( $( "#delete" ).is( ":checked" ) )
		{
			console.log( "Removing item " + seed.array[ seed.ctr ].taskNum + " from localStorage" );
			localStorage.removeItem( seed.array[ seed.ctr ].taskNum );
			seed.array.splice( seed.ctr, 1 );
		}
		
		if( !seed.array[ 0 ] )
		{
			seed.readStorage();
		}
		var btnId = this.id;
		
		if( btnId === "forward" )
		{
			seed.ctr++;
		}
		else
		{
			seed.ctr--;
		}
		
		if( seed.ctr >=	seed.array.length )
		{
			seed.ctr = 0;
		}
		if( seed.ctr < 0 )
		{
			seed.ctr = seed.array.length-1;
		}
		console.log( "seed.ctr is " + seed.ctr );
		
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
			$( "body" ).prepend( "<div id='task'></div>" );
			seed.taskDisplay();
		}
	},
	taskDisplay: function()
	{
			$( "#task" ).append( "<img src='img/arrow-right.png' id='timerArrow' alt='arrow' /><p><input type='checkbox' name='task' id='delete' value='' />" + seed.array[ seed.ctr ].task + " &ndash; " + seed.array[ seed.ctr ].date + " # " + seed.array[seed.ctr ].taskNum + "</p>" );
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
		var date = dateObj.getFullYear() + "-" + ( month < 10 ? "0" : "" ) + month + "-" + ( day < 10 ? "0" : "" ) + day;
		return date;
	}
};
seed.init();

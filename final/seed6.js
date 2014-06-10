var seed = {
	taskNum: 0, // index to set next item in storage
	ctr: 0,		// index of current item in array
	array: [],	// holds storage items
	store: $.localStorage,
	taskObj: {
		task: "",
		date: ""
	},
	init: function()
	{
		seed.readStorage();
		localStorage.length > 0 ? seed.taskNum = localStorage.length-1 : seed.taskNum = 0;  //seed.taskNum must be 1 greater
		console.log( "tasknum is " + seed.taskNum );										// than previous tasknum
		if( seed.array.length )
		{
			seed.loadTaskDiv();
			console.log( "The array is not empty!" );
		}
		$( "#submit" ).click( seed.writeStorage );
		$( "#getArray" ).click( seed.readStorage );
		$( "#back, #forward" ).click( seed.navigate );
		$( "#clear" ).click( function()
		{
			localStorage.clear();
			seed.ctr = 0;
			seed.taskNum = 0;
			if( $( "#task" ) )
			{
				$( "#task" ).remove();
			}
		} );
	},
	readStorage: function()
	{
		var taskObj = null;
		while( seed.array.length > 0 )
		{
			seed.array.pop();
		}
		console.log( "Creating the array!" );
		for( var i = 0, ii = localStorage.length; i < ii; i++ )
		{
			taskObj = seed.store.get( i );
			if( taskObj !== null )
			{
				taskObj.taskNum = i;					// save the taskNum for reference
				seed.array.push( seed.store.get( i ) );
			}
		}
		console.log( "localStorage.length is " + localStorage.length );
		console.log( seed.array );
	},
	writeStorage: function()
	{
		var taskObj = Object.create( seed.taskObj );
		taskObj.task = $( "#input" ).val();
		taskObj.date = seed.getISODate();
		seed.store.set( seed.taskNum, taskObj );
		seed.array.push( taskObj );
		console.log( seed.store.get( seed.taskNum ) );
		$( "#input" ).val( "" );
		$( "#input" ).focus();
		seed.taskNum++;
		console.log( "taskNum is " + seed.taskNum );
		if( !$( "#task" ).length )
		{
			seed.loadTaskDiv();
		}
	},
	loadTaskDiv: function()
	{
		if( $( "#task" ).length )
		{
			$( "#task" ).hide( "slide", {direction: "left"}, 500, function()
			{
				$( "#task" ).html( "" );
				seed.loadTask();
				$( "#task" ).show( "slide", {direction: "left"}, 500);
			} );
		}
		else
		{
			$( "body" ).prepend( "<div id='task'></div>" );
			seed.loadTask();
		}
	},
	loadTask: function()
	{
		if( seed.array.length )
		{
			$( "#task" ).append( "<p><input type='checkbox' name='task' id='delete' value='' />" + seed.array[ seed.ctr ].task + " &ndash; " + seed.array[ seed.ctr ].date + "</p>" );
		}
	},
	navigate: function()
	{
		if( $( "#delete" ).is( ":checked" ) )
		{
			seed.array.splice( seed.ctr, 1 );
			seed.store.remove( seed.ctr );
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
		if( seed.ctr >= seed.array.length )
		{
			seed.ctr = 0;
		}
		else if( seed.ctr < 0 )
		{
			seed.ctr = seed.array.length-1;
		}
		console.log( seed.ctr );
		seed.loadTaskDiv();
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

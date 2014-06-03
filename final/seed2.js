var seed = {
	taskNum: 0,	// the total number of tasks in localStorage
	ctr: 0,		// counter for task numbers
	array: [],	// array to store tasks retrieved from localStorage
	taskObj: {
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
		
		if( localStorage.taskNum )
		{
			seed.taskNum = localStorage.getItem( "taskNum" );
		}
		
		$( "#submit" ).click( seed.input );
		$( "#retrieve" ).click( seed.output );
		$( "#clear" ).click( seed.clear );
		$( "#back, #forward" ).click( seed.navigate );
		
		seed.readStorage();
		$( "body" ).prepend( "<div id='task'></div>" );
		$( "#task" ).append( "<p>" + seed.array[ seed.ctr ].task + " &ndash; " + seed.array[ seed.ctr ].date + "</p>" );
	},
	input: function()
	{		
		var newTask = Object.create( seed.taskObj );
		newTask.task = $( "#input" ).val();
		newTask.date = seed.getISODate();
		console.log( "taskNum is " + seed.taskNum );
		console.log( "date is " + newTask.date );

		localStorage.setItem( seed.taskNum, JSON.stringify( newTask ) );
		$( "#input" ).val( "" );
		console.log( seed.taskNum );
		localStorage.setItem( "taskNum", seed.taskNum );
		seed.taskNum++;
		$( "#input" ).focus();
	},
	navigate: function()
	{	
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
		
		if( seed.ctr >	seed.taskNum )
		{
			seed.ctr = 0;
		}
		if( seed.ctr < 0 )
		{
			seed.ctr = seed.taskNum;
		}
		if( $( "#task" ) )
		{
			$( "#task" ).hide( "slide", {direction: "left"}, 1000 );
		}
		$( "body" ).prepend( "<div id='task'></div>" );
		$( "#task" ).append( "<p>" + seed.array[ seed.ctr ].task + " &ndash; " + seed.array[ seed.ctr ].date + "</p>" );
		console.log( "seed.taskNum is " + seed.taskNum );
		console.log( "seed.ctr is " + seed.ctr );
	},
	readStorage: function()
	{
		var taskObj = 0;
		for( var i = 0; i <= seed.taskNum; i++ )
		{
			taskObj = JSON.parse( localStorage.getItem( i ) );
			console.log( taskObj );
			seed.array.push( taskObj );
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

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
	},
	input: function()
	{
		seed.taskNum++;
		
		var newTask = Object.create( seed.taskObj );
		newTask.task = $( "#input" ).val();
		newTask.date = seed.getISODate();
		console.log( "taskNum is " + seed.taskNum );
		console.log( "date is " + newTask.date );

		localStorage.setItem( seed.taskNum, JSON.stringify( newTask ) );
		$( "#input" ).val( "" );
		console.log( seed.taskNum );
		localStorage.setItem( "taskNum", seed.taskNum );
	},
	navigate: function()
	{	
		var taskObj = 0;
		var btnId = this.id;
		
		if( $( "#task" ) )
		{
			$( "#task" ).remove();
		}
		if( localStorage.taskNum )
		{
			seed.taskNum = localStorage.getItem( "taskNum" );
		}
		$( "body" ).prepend( "<div id='task'></div>" );
		console.log( seed.taskNum );
		
		if( btnId === "forward" )
		{
			seed.ctr++;
		}
		else
		{
			seed.ctr--;
		}
		
		if( !localStorage.getItem( seed.ctr ) && btnId === "forward" )
		{
			seed.ctr = 0;
		}
		if( seed.ctr < 0 )
			seed.ctr = seed.taskNum;
		console.log( "seed.ctr is " + seed.ctr );
		
		taskObj = JSON.parse( localStorage.getItem( seed.ctr ) );		
		$( "#task" ).append( "<p>" + taskObj.task + " &ndash; " + taskObj.date + "</p>" );
	
		//$( "#task" ).append( "<p>" + seed.array[ seed.ctr ].task + " &ndash; " + seed.array[ seed.ctr ].date + "</p>" );
	},
	readStorage: function()
	{
		for( var i = 0; i <= seed.taskNum; i++ )
		{
			seed.array.push( JSON.parse( localStorage.getItem( i ) ) );
		}
	},
	clear: function()
	{
		localStorage.clear();
		$( "#output" ).html( "" );
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

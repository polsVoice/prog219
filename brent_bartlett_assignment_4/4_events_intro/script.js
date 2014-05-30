var eventDisplay = {
	btnText: $( "#button" ).val(),
	init: function()
	{
		$( "body" ).dblclick( eventDisplay.alertBox );
		$( "a" ).on( "mouseover", eventDisplay.newLine );
		$( "#button" ).click( eventDisplay.toggleText );
		$( "#textfield" ).focusin( function(){ $( this ).css( "background-color", "blue" );} );
		$( "#textfield" ).focusout( function(){ $( this ).css( "background-color", "#fff" );} );
	},
	alertBox: function( e )
	{
		alert( "Darkness within darkness. The gateway to all understanding." );
	},
	newLine: function()
	{
		var paragraph = "<p>Governing a large country is like frying a small fish. You spoil it with too much poking.</p>";
		$( "body" ).append( paragraph );
	},
	toggleText: function(e)
	{
		//get and save button width
		var btnWidth = $( this ).css( "width" );
		$( this ).css( "width", btnWidth );
		//if counter doesn't exist, initialize var and set it to 1
		//otherwise, copy stored data into var
		var counter = $( this ).data( "counter" ) || 1;
		switch( counter )
		{
			case 1:
				$( this ).val( "" );
				break;
			case 2:
				$( this ).val( eventDisplay.btnText );
				break;
			default:
				$( this ).val( "" );
				break;
		}
		counter++;
		if( counter > 2 )
		{ 
			counter = 1; 
		}
		//set stored data to value in counter variable
		$( this ).data( "counter", counter );
		$( "body" ).dblclick(function(event){ event.stopPropagation();} );
	}
};
eventDisplay.init();

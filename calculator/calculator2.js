var calculator = {
	inputField: $( "td" ).first(),
	init: function()
	{
		$( "td" ).slice( 2 ).on( "click", calculator.input );
		$( "td" ).slice( 1 ).on( "click", calculator.playSound );
		$( "#clear" ).on( "click", calculator.clear );
	},
	input: function()
	{
		// Instead of pushing into a separate array and then parsing, just copy the data() array,
		// and then parse
		
		var inputField = calculator.inputField;
		var inputVal = inputField.data( "inputVal" ) || "";
		var inputChar = $.trim( $( this ).text() );
		var mathExpr = [];
		
		if( $.isNumeric( inputChar ) || inputChar === "." && mathExpr[ mathExpr.length-1 ] !== "." && !$.isNumeric( mathExpr[ mathExpr.length-1 ] ) )
		{
			mathExpr.push( inputChar );
			inputField.html( inputVal );
		}
		// If equals button is pressed, build expression and evaluate it
		else if( inputChar === "=" )
		{
			//calculator.evalExpression( calculator.buildExpression() );
		}
		else
		// If other button is pressed (besides C), add character to data
		{
			inputVal += inputChar;
			inputField.html( inputVal );
			inputField.data( "inputVal", inputVal );
		}
	},
	/*
	buildExpression: function()
	{
		var inputField = calculator.inputField;
		var expression = inputField.data( "inputVal" );
		inputField.data( "inputVal", "" );
		var mathExpr = [];
		var num = "";
		var isDec = false;
		
		if( isNaN( expression[ 0 ] ) && expression[ 0 ] !== "." && expression[ 0 ] !== "-" || isNaN( expression[ expression.length-1 ] ) )
		{
			inputField.html( "Invalid expression!" );
		}
		else
		{
			for( var i = 0, ii = expression.length; i < ii; i++ )
			{
				if( $.isNumeric( expression[ i ] ) || expression[ i ] === "." )
				{
					num += expression[ i ];
				}
				//must be an operator
				else
				{
					mathExpr.push( num );
					num = "";
					//push the operator in after the number
					mathExpr.push( expression[ i ] );
				}
			}
			mathExpr.push( num );
			console.log( mathExpr );
			return mathExpr;
		}
	},
	*/
	evalExpression: function( expression )
	{
		var total = 0;
		
		if( !expression )
			console.log( "Invalid expression! Terminating..." );
		else
		{
			// Process multiplication and division first
			for( var i = 0, ii = expression.length; i < ii; i++ )
			{
				if( expression[ i ] === "*" )
				{
					total = calculator.multiply( expression[ i-1 ], expression[ i+1 ] );
					// Remove operator and left-hand operand; put result into right element
					expression[ i+1 ] = total;
					expression.splice( i-1, 2 );
					i--;
					console.log( expression );
				}
				if( expression[ i ] === "/" )
				{
					total = calculator.divide( expression[ i-1 ], expression[ i+1 ] );
					expression[ i+1 ] = total;
					expression.splice( i-1, 2 );
					i--;
					console.log( expression );
				}
			}
			for( var j = 0, jj = expression.length; j < jj; j++ )
			{
				if( expression[ j ] === "+" )
				{
					total = calculator.add( expression[ j-1 ], expression[ j+1 ] );
					expression[ j+1 ] = total;
					expression.splice( j-1, 2 );
					j--;
					console.log( expression );
				}
				if( expression[ j ] === "-" )
				{
					total = calculator.subtract( expression[ j-1 ], expression[ j+1 ] );
					expression[ j+1 ] = total;
					expression.splice( j-1, 2 );
					j--;
					console.log( expression );
				}
			}
			total = expression[ 0 ];	
			console.log( "Total is " + total );
			calculator.inputField.html( total );
		}
	},
	clear: function()
	{
		calculator.inputField.html( "" );
		calculator.inputField.data( "inputVal", "" );
	},
	findPrecision: function( a, b )
	{
		var precis = 0, precisA = 0, precisB = 0;
		
		// Make sure that they're strings so that indexOf can be used
		a = String( a );
		b = String( b );
		
		// Find precision of both operands
		a.indexOf( "." ) !== -1 ? precisA = ( a.length - 1 ) - a.indexOf( "." ) : precisA = 0;
		b.indexOf( "." ) !== -1 ? precisB = ( b.length - 1 ) - b.indexOf( "." ) : precisB = 0;
		
		// Find longer precision and return it
		console.log( "PrecisA is " + precisA );
		console.log( "PrecisB is " + precisB );
		precisA > precisB ? precis = precisA : precis = precisB;
		console.log( "Precision is " + precis );
		return precis;
	},
	add: function( a, b )
	{
		var precision = calculator.findPrecision( a, b );
		return Math.round( ( +a + +b ) * Math.pow( 10, precision ) ) / Math.pow( 10, precision );
	},
	subtract: function( a, b )
	{
		var precision = calculator.findPrecision( a, b );
		return Math.round( ( +a - +b ) * Math.pow( 10, precision ) ) / Math.pow( 10, precision );
	},
	multiply: function( a, b )
	{
		return Math.round( ( +a * +b ) * Math.pow( 10, 7 ) ) / Math.pow( 10, 7 );
	},
	divide: function( a, b )
	{
		return Math.round( ( +a / +b ) * Math.pow( 10, 7 ) ) / Math.pow( 10, 7 );
	},
	playSound: function()
	{
		$( this ).append( "<audio src='click2.wav' preload='auto' autoplay></audio>" );
	}
};
calculator.init();

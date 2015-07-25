var calculator = {
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
		precisA > precisB ? precis = precisA : precis = precisB;
        console.log( precis );
		return precis;
	},
	add: function( a, b )
	{
		var precision = calculator.findPrecision( a, b );
		return Math.round( ( +a + +b ) * Math.pow( 10, precision ) ) / Math.pow( 10, precision );
	}
};

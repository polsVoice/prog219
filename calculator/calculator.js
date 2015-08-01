var calculator = {
    findPrecision: function( a, b )
	{
        "use strict";
		var precis = 0, precisA = 0, precisB = 0;
		
		// Make sure that they're strings so that indexOf can be used
		a = String( a );
		b = String( b );
		
		// Find precision of both operands
		precisA = a.indexOf( "." ) !== -1 ? ( a.length - 1 ) - a.indexOf( "." ) : 0;
		precisB = b.indexOf( "." ) !== -1 ? ( b.length - 1 ) - b.indexOf( "." ) : 0;
		
		// Find longer precision and return it
		precis = precisA > precisB ? precisA : precisB;
		return precis;
	},
    add: function( a, b )
	{
        "use strict";
		var precision = calculator.findPrecision( a, b );
		return Math.round( ( +a + +b ) * Math.pow( 10, precision ) ) / Math.pow( 10, precision );
	},
	subtract: function( a, b )
	{
        "use strict";
		var precision = calculator.findPrecision( a, b );
		return Math.round( ( +a - +b ) * Math.pow( 10, precision ) ) / Math.pow( 10, precision );
	},
	multiply: function( a, b )
	{
        "use strict";
		return Math.round( ( +a * +b ) * Math.pow( 10, 7 ) ) / Math.pow( 10, 7 );
	},
	divide: function( a, b )
	{
        "use strict";
        var precision = calculator.findPrecision( a, b );
		var value = Math.round( ( +a / +b ) * Math.pow( 10, precision ) ) / Math.pow( 10, precision );
        console.log( value );
        return value;
	}
};

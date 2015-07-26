var calculator = {
    findPrecision: function()
	{
        var precision = 0, highestPrecision = 0;
        
        // copy arguments into an array
        var nums = Array.prototype.slice.call( arguments );
        nums.forEach( function( num ){
            num = String( num );
            if( num.indexOf( "." ) !== -1 ){
                precision = num.split( "." )[ 1 ].length;
                if ( precision > highestPrecision )
                    highestPrecision = precision;
            }
        } );
		return highestPrecision;
	},
	add: function( a, b )
	{
		var precision = calculator.findPrecision( a, b );
		return Math.round( ( +a + +b ) * Math.pow( 10, precision ) ) / Math.pow( 10, precision );
	}
};

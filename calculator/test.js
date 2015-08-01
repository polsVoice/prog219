var test = {
    results: document.getElementById( "results" ),
    assert: function assert( value, desc ){
        "use strict";
        var li = document.createElement( "li" );
        li.className = value ? "pass" : "fail";
        li.appendChild( document.createTextNode( desc ) );
        test.results.appendChild( li );
        if ( !value ){
			li.parentNode.parentNode.className = "fail";
		}
        return li;
    },
    testGroup: function testGroup( name, fn ){
        "use strict";
        test.results = document.getElementById( "results" );
        test.results = test.assert( true, name ).appendChild( document.createElement( "ul" ) );
		fn();
    },
    init: function(){
        "use strict";
        test.testGroup( "Testing findPrecision", function(){
            test.assert( calculator.findPrecision( 1, 3 ) === 0, "1, 3, greater precision is 0" );
            test.assert( calculator.findPrecision( 1, 1.1 ) === 1, "1, 1.1, greater precision is 1" );
            test.assert( calculator.findPrecision( 2.6, 5.4 ) === 1, "greater precision is 1" );
            test.assert( calculator.findPrecision( .56, 3 ) === 2, "greater precision is 2" );
            test.assert( calculator.findPrecision( 0.521455523385445, 3.232323 ) === 15, "greater precision is 15" );
        } );
        test.testGroup( "Testing multiply()", function(){
            test.assert( calculator.multiply( 7, 3 ) === 21, "7 * 3 = 21" );
        } );
        test.testGroup( "Testing divide()", function(){
            test.assert( calculator.divide( 2, 2 ) === 1, "2 / 2 = 1" );
            test.assert( calculator.divide( 10, 2 ) === 5, "10 / 2 = 5" );
            test.assert( calculator.divide( 88.88751, 2.5376 ) === 35.02818, "88.88751 / 2.5376 = 35.02818" );
        } );
        test.testGroup( "Testing add()", function(){
            test.assert( calculator.add( 1, 1 ) === 2, "1 + 1 = 2" );
            test.assert( calculator.add( 7.3, 9.11 ) === 16.41, "7.3 + 9.11 = 16.41" );
        } );
        test.testGroup( "Testing subtract()", function(){
            test.assert( calculator.subtract( 1, 1 ) === 0, "1 - 1 = 0" );
            test.assert( calculator.subtract( 2.6, 1 ) === 1.6, "2.6 - 1 = 1.6" );
            test.assert( calculator.subtract( 7.55, 6.3 ) === 1.25, "7.55 - 6.3 = 1.25" );
            test.assert( calculator.subtract( .5, .2 ) === .3, ".5 - .2 = .3" );
        } );
    }
}
test.init();

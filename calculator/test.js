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
        test.testGroup( function(){
            test.assert( calculator.findPrecision( 1, 3 ) === 0, "1, 3, greater precision is 0" );
            test.assert( calculator.findPrecision( 1, 1.1 ) === 1, "1, 1.1, greater precision is 1" );
            test.assert( calculator.findPrecision( 2.6, 5.4 ) === 1, "greater precision is 1" );
            test.assert( calculator.findPrecision( .56, 3 ) === 2, "greater precision is 2" );
            test.assert( calculator.findPrecision( 0.521455523385445, 3.232323 ) === 15, "greater precision is 15" );
        } );
    }
}
test.init();

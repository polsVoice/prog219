var test = {
    results: document.getElementById( "results" ),
    assert: function assert( value, desc ){
        var li = document.createElement( "li" );
        li.className = value ? "pass" : "fail";
        li.appendChild( document.createTextNode( desc ) );
        test.results.appendChild( li );
        return li;
    },
    init: function(){
        test.assert( calculator.findPrecision( 1, 3 ) === 0, "1, 3, greatest precision is 0" );
        test.assert( calculator.findPrecision( 1, 1.1 ) === 1, "1, 1.1, greatest precision is 1" );
        test.assert( calculator.findPrecision( 2.6, 5.4 ) === 1, "greatest precision is 1" );
        test.assert( calculator.findPrecision( .56, 3 ) === 2, "greatest precision is 2" );
        test.assert( calculator.findPrecision( 0.521455523385445, 3.232323 ) === 15, "greatest precision is 15" );
        test.assert( calculator.findPrecision( 0.52145, 3, 6.55, .77, 0.0, 2.6, -1.555555 ) === 6, "greatest precision is 6" );
        
    }
}
test.init();

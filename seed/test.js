( function(){
	var queue = [], paused = false, results;
	this.test = function( name, fn ){
		queue.push( function(){
			results = document.getElementById( "results" );
			results = assert( true, name ).appendChild( document.createElement( "ul" ) );
			fn();
		} );
		runTest();
	};
	this.pause = function(){
		paused = true;
	};
	this.resume = function(){
		paused = false;
		setTimeout( runTest, 1 );
	};
	function runTest(){
		if ( !paused && queue.length ){
			queue.shift()();
			if ( !paused ){
				resume();
			}
		}
	}
	
	this.assert = function assert( value, desc ){
		var li = document.createElement( "li" );
		li.className = value ? "pass" : "fail";
		li.appendChild( document.createTextNode( desc ) );
		results.appendChild( li );
		if ( !value ){
			li.parentNode.parentNode.className = "fail";
		}
		return li;
	};
} )();

window.onload = function(){
	var result = null;
	test( "Async Test #1", function(){
		pause();
		var date = null;
		setTimeout( function(){
			date = seed.getISODate();
			result = date === "2014-08-09" ? true : false;
			assert( result, "First test completed" );
			console.log( date );
			resume();
		}, 1000 );
		test( "Async Test #2", function(){
			pause();
			var testString = "06:33:21", result = null;
			setTimeout( function(){
				testString = seed.stringToMilliseconds( testString );
				result = testString == "23601000" ? true : false;
				assert( result, "Second test completed" );
				resume();
			}, 1000 );
		} );
	} );
};

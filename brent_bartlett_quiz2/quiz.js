var quiz = {
	ctr: 0,
	score: 0,
	questionArray: [ 'Who created jQuery?'
					, 'What does "CDN" stand for?'
					, 'Which jQuery method is used to take elements off the end of an array?'
					, 'Which jQuery method is used to take elements off the front of an array?'
					, 'Which method is used to print to the console?'
					, 'Which of these is equivalent to jQuery()?'
					, 'Which tag is used to attach JavaScript to an HTML document?'
					, 'What term is used for a function that triggers when an event happens?'
					, 'Which keyword is used to refer to the element that a function is attached to?'
					, 'What\'s the correct syntax for a method?' ],
	answerArray: [ [ "John Resig", "Brendan Eich", "Douglas Crockford" ]
					, [ "Common Data Network", "Content Delivery Network", "Cyber Digital Netz" ]
					, [ ".pop()", ".end()", ".last()" ]
					, [ ".shift()", ".front()", ".first()" ]
					, [ "console.log()", "console.print()", "console.write()" ]
					, [ "!()", "$()", "@()" ]
					, [ "&lt;javascript&gt;", "&lt;attach&gt;", "&lt;script&gt;" ]
					, [ "event follower", "event groupie", "event listener" ]
					, [ "this", "that", "thing" ]
					, [ "function foo()", "foo: function()", "foo/function()" ] ],
	answerKey: [ 1, 1, 0, 0, 0, 1, 2, 2, 0, 1 ],
	images: [ "jquery_logo.png"
				, "gentleman01.png"
				, "sewing_machine_lady.png"
				, "super_bike.png"
				, "plains_woman02.png"
				, "trunk_man.png"
				, "garden_lady.png"
				, "plains_woman.png"
				, "victorian_gentleman.png"
				, "sea_man.png" ],
	init: function()
	{
		$( "#submit" ).click( quiz.next );
		$( "<fieldset></fieldset>" ).appendTo( "form" );
		$( "fieldset" ).append( "<legend>" + ( quiz.ctr + 1 ) + ". " + quiz.questionArray[ quiz.ctr ] + "</legend>" );
		$( "legend" ).after( "<img src='img/" + quiz.images[ quiz.ctr ] + "' alt='' />" );
		$( "img" ).after( "<div id='radioContainer'></div>" );
		$( "#radioContainer" ).append( function()
		{
			var radios = "";
			for( var i = 0; i < 3; i++ )
			{
				radios += "<input type='radio' name='q' value='" + i 
								+ "' /><label for=''>" + quiz.answerArray[ quiz.ctr ][ i ] + "</label>";
			}
			return radios;
		} );

	},
	next: function()
	{
		if( !$( "input[name=q]:checked" ).val() )
		{
			$( "#error" ).html( "You must make a selection to continue" );
			$( "#error" ).css( "display", "block" );
		}
		else
		{
			// Does the value of the checked button equal the value in the answer key?
			if( $( "input[name=q]:checked" ).val() == quiz.answerKey[ quiz.ctr ] )
			{
				quiz.score++;
				console.log( quiz.score );
			}
			quiz.ctr++;
			if( quiz.ctr >= quiz.questionArray.length )
			{
				console.log( "Quiz ended!" );
				quiz.end();
			}
			else
			{
				$( ":radio" ).prop( "checked", false );
				$( "img" ).attr( "src", "img/" + quiz.images[ quiz.ctr ] );
				$( "legend" ).html( ( quiz.ctr+1 ) + ". " + quiz.questionArray[ quiz.ctr ] );
				$( "label" ).each( function( index )
				{
					$( this ).html( quiz.answerArray[ quiz.ctr ][ index ] );
				} );
			}
			$( "#error" ).css( "display", "none" );
		}
	},
	end: function()
	{
		$( "legend" ).remove();
		$( ":radio" ).remove();
		$( "label" ).remove();
		$( "img" ).remove();
		$( "button" ).remove();
		$( "<h1>The quiz is completed! Your score is " + quiz.score + "</h1>" ).appendTo( "form" );
	}
};
quiz.init();

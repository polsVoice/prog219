var quiz = {
	ctr: 0,
	correct: 0,
	incorrect: 0,
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
		$( "<fieldset></fieldset>" ).appendTo( "form" );
		$( "fieldset" ).append( "<legend>" + ( quiz.ctr + 1 ) + ". " + quiz.questionArray[ quiz.ctr ] + "</legend>" );
		$( "legend" ).after( "<img src='img/" + quiz.images[ quiz.ctr ] + "' alt='' />" );
		$( "img" ).after( "<div id='radioContainer'></div>" );
		$( "#radioContainer" ).append( function()
		{
			var radios = "";
			for( var i = 0; i < 3; i++ )
			{
				radios += "<input type='radio' id='rad" + i + "' name='q' value='" + i 
								+ "' /><label for='rad" + i + "'>" 
								+ quiz.answerArray[ quiz.ctr ][ i ] + "</label>";
			}
			return radios;
		} );
		$( "<button type='button' id='submit'>Submit</button>" ).appendTo( "form" );
		$( "#submit" ).click( quiz.next );
	},
	next: function()
	{
		if( !$( "input[name=q]:checked" ).val() )
		{
			$( "#submit" ).before( "<p id='error'></p>" );
			$( "#error" ).html( "You must make a selection to continue" );
			$( "#error" ).css( "display", "block" );
		}
		else
		{
			// Does the value of the checked button equal the value in the answer key?
			if( $( "input[name=q]:checked" ).val() == quiz.answerKey[ quiz.ctr ] )
			{
				quiz.correct++;
			}
			else
			{
				quiz.incorrect++;
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
				$( "img" ).animate( {
						opacity: 0
					}, 1000, function()
					{
						$( this ).attr( "src", "img/" + quiz.images[ quiz.ctr ] );
						$( this ).animate( {
							opacity: 1
						}, 1000 );

						$( "legend" ).html( ( quiz.ctr+1 ) + ". " + quiz.questionArray[ quiz.ctr ] );
						$( "label" ).each( function( index )
						{
							$( this ).html( quiz.answerArray[ quiz.ctr ][ index ] );
						} );
					});
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
		$( "fieldset" ).remove();
		$( "<h1>The quiz is completed! You got " + quiz.correct + " correct, and " 
			+ quiz.incorrect + " incorrect.</h1>" ).appendTo( "form" );
		
	}
};
quiz.init();

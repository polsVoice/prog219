var quiz = {
	ctr: 0,
	numCorrect: 0,
	numIncorrect: 0,
	array: [
		{
			question:'Who created jQuery?',
			answers:[ "John Resig", "Brendan Eich", "Douglas Crockford" ],
			correct: 1,
			img: "jquery_logo.png"
		},
		{
			question:'What does "CDN" stand for?',
			answers:[ "Common Data Network", "Content Delivery Network", "Cyber Digital Netz" ],
			correct: 1,
			img: "gentleman01.png"
		},
		{
			question:'Which jQuery method is used to take elements off the end of an array?',
			answers:[ ".pop()", ".end()", ".last()" ],
			correct: 0,
			img: "sewing_machine_lady.png"
		},
		{
			question:'Which jQuery method is used to take elements off the front of an array?',
			answers:[ ".shift()", ".front()", ".first()" ],
			correct: 0,
			img: "super_bike.png"
		},
		{
			question:'Which method is used to print to the console?',
			answers:[ "console.log()", "console.print()", "console.write()" ],
			correct: 0,
			img: "plains_woman02.png"
		},
		{
			question:'Which of these is equivalent to jQuery()?',
			answers:[ "!()", "$()", "@()" ],
			correct: 1,
			img: "trunk_man.png"
		},
		{
			question:'Which tag is used to attach JavaScript to an HTML document?',
			answers:[ "&lt;javascript&gt;", "&lt;attach&gt;", "&lt;script&gt;" ],
			correct: 2,
			img: "garden_lady.png"
		},
		{
			question:'What term is used for a function that triggers when an event happens?',
			answers:[ "event follower", "event groupie", "event listener" ],
			correct: 2,
			img: "plains_woman.png"
		},
		{
			question:'Which keyword is used to refer to the element that a function is attached to?',
			answers:[ "this", "that", "thing" ],
			correct: 0,
			img: "victorian_gentleman.png"
		},
		{
			question:'What\'s the correct syntax for a method?',
			answers:[ "function foo()", "foo: function()", "foo/function()" ],
			correct: 1,
			img: "sea_man.png"
		}
	],				
	init: function()
	{
		$( "<fieldset></fieldset>" ).appendTo( "form" );
		$( "fieldset" ).append( "<legend>" + ( quiz.ctr + 1 ) + ". " + quiz.array[ quiz.ctr ].question + "</legend>" );
		$( "legend" ).after( "<img src='img/" + quiz.array[ quiz.ctr ].img + "' alt='' />" );
		$( "img" ).after( "<div id='radioContainer'></div>" );
		$( "#radioContainer" ).append( function()
		{
			var radios = "";
			for( var i = 0; i < 3; i++ )
			{
				radios += "<input type='radio' id='rad" + i + "' name='q' value='" + i 
								+ "' /><label for='rad" + i + "'>" 
								+ quiz.array[ quiz.ctr ].answers[ i ] + "</label>";
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
			if( $( "input[name=q]:checked" ).val() == quiz.array[ quiz.ctr ].correct )
			{
				quiz.numCorrect++;
			}
			else
			{
				quiz.numIncorrect++;
			}
			quiz.ctr++;
			if( quiz.ctr >= quiz.array.length )
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
						$( this ).attr( "src", "img/" + quiz.array[ quiz.ctr ].img );
						$( this ).animate( {
							opacity: 1
						}, 1000 );

						$( "legend" ).html( ( quiz.ctr+1 ) + ". " + quiz.array[ quiz.ctr ].question );
						$( "label" ).each( function( index )
						{
							$( this ).html( quiz.array[ quiz.ctr ].answers[ index ] );
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
		$( "<h1>The quiz is completed! You got " + quiz.numCorrect + " correct, and " 
			+ quiz.numIncorrect + " incorrect.</h1>" ).appendTo( "form" );
		
	}
};
quiz.init();

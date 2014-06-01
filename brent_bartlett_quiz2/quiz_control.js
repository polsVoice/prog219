var quiz = {
	ctr: 0,
	questionArray: [ 'Who created jQuery?', 'What does "CDN" stand for?' ],
	answerArray: [ [ "John Resig", "Brendan Eich", "Douglas Crockford" ], [ "Common Data Network", "Content Delivery Network", "Cyber Digital Netz" ] ],
	answerKey: [],
	images: [ "img/jquery_logo.png" ],
	init: function()
	{
		$( "#submit" ).click( quiz.next );
		$( "<fieldset></fieldset>" ).appendTo( "form" );
		quiz.multChoice();

	},
	next: function()
	{
		quiz.ctr++;
	},
	multChoice: function()
	{
		$( "<img src='" + quiz.images[ quiz.ctr ] + "' alt='' />" ).appendTo( "fieldset" );
		$( "<legend>" + quiz.ctr+1 + ". " + quiz.questionArray[ quiz.ctr ] + "</legend>" ).appendTo( "fieldset" );
		for( var i = 0; i < 3; i++ )
		{
			$( "<input type='radio' name='q1' /><label for=''>" + quiz.answerArray[ quiz.ctr ][ i ] +"</label>" ).appendTo( "fieldset" );
		}
	}
};
quiz.init();

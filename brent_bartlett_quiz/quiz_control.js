/* Brent Bartlett
 * Quiz Controller
 * May 9, 2014
 */

var quizControl = {
	ctr: 1,
	current: $( "fieldset:first-of-type" ),
	init: function()
	{
		$( "#submit" ).click( quizControl.advance );
	},
	advance: function()
	{
		var numQuestions = $( "fieldset" ).length;
		if ( quizControl.ctr === numQuestions )
		{
			// fade out current fieldset, then Submit button
			quizControl.current.fadeOut( "slow" ).next().fadeOut( "slow" )
				.next().fadeIn( "slow" ); // then fade in the congratulations message
		}
		else
		{
			console.log( "Fieldset number " + quizControl.ctr++ );
			quizControl.current.fadeOut( "fast" ).next().fadeIn( "fast" );
			quizControl.current = quizControl.current.next();
		}
	}
};
quizControl.init();

$(document).ready(function() {
	var stanzas = $( ".poem-stanza" );
	stanzas.each( function()
	{
		$( this ).attr( "class", "highlight" );
	} );
});

//
// Objective: 
// 1) Retrieve all span tags marked as pullquotes
// 2) Create a copy of each tag 
// 3) Assign the pullquote class to the tag copy
// 4) Place the tag copy in front of the original span tag (the pullquote
//    class already handles the appearance and positioning 
//    of the new pullquote tag)

$(document).ready( function() {
	var spanPq = $( "span[class='pq']" );
	var pullquote = null;
	spanPq.each( function()
	{
		pullquote = $( this ).clone();
		pullquote.attr( "class", "pullquote" );
		$( this ).before( pullquote );
	} );
});	 // end ready

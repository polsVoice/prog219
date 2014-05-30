//
// Objective: 
// 1) Retrieve all links that point outside this website (i.e, "http://...")
// 2) Get the HREF attribute each link (the URL)
// 3) Add that URL to the bibliography box at the bottom

$(document).ready( function() {
	var links = $( "a[href^='http://']" );
	var list = $( "#bibList" );
	var listItem = null;
	links.each( function()
	{
		listItem = "<li>" + $( this ).attr( "href" ) + "</li>";
		list.append( listItem );
		console.log( $(this).attr("href") );
	} );
});	 // end ready

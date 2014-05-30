$(document).ready( function() {

// Tip for Google Chrome users: Look at View Page Source to see original page.
// Open web developers toos and click on Elements to see page after 
// it is updated by JavaScript. 

// html() 
//-----------------------------------------------------  
// 1) Reads the current HTML inside an element and replaces
//    the current contents with some other HTML
// console.log ( $('#errors').html() )

// 2) Replace the current contents inside the selection.
//$('#errors').html('<p>There are four errors in this form</p>')

// text()
//-----------------------------------------------------  
// 3) Works like html() but doesn't accept HTML tags. Useful
//    for just replacing text inside a tag. 
// $('#errors h2').text('No error found here');
// $('p').text("Stop doing that!");

// append()
//-----------------------------------------------------
// 4) Adds HTML as the last child element of the selected element. 

//$('#errors').append('<p>There are four errors in this form</p>');

// prepend()
//-----------------------------------------------------
// 5) Just like append(), but Adds HTML directly after the opening tag
//    for the selection (that is, before the first child).

//$('#errors').prepend ('<p>There are four card-carrying errors in this form</p>');

// before() & after()
//-----------------------------------------------------
// 6) To add HTML just *outside* of a selection (either before the opening tag
//    or after the closing tag). 
//
//    This examples shows the jQuery to add an error message after validating 
//    a text field. 
//
// $('#userName').after('<span class="error">User name required</span>');
//
// 
});	 // end ready
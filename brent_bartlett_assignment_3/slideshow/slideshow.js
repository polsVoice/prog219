var slideshow = {
	imgArray: [ , ],
	counter: 0,
	theImage: document.getElementById( "image" ),
	init: function()
	{
		var prev = document.getElementById( "prev" );
		var next = document.getElementById( "next" );
		slideshow.imgArray = slideshow.buildArray();
		slideshow.addEventHandler( prev, "click", slideshow.switchImg );
		slideshow.addEventHandler( next, "click", slideshow.switchImg );
	},
	switchImg: function()
	{
		var headline = document.getElementById( "caption" );
		switch( this.id )
		{
			case "prev":
				if( slideshow.counter === 0 )
				{
					slideshow.counter = slideshow.imgArray.length - 1;
				}
				else
				{
					slideshow.counter--;
				}
				break;
			case "next":
				if( slideshow.counter === slideshow.imgArray.length - 1 )
				{
					slideshow.counter = 0;
				}
				else
				{
					slideshow.counter++;
				}
				break;
			default:
				break;
		}
		//get image src and title from array
		slideshow.theImage.src = slideshow.imgArray[ slideshow.counter ][ 0 ];
		headline.innerHTML = slideshow.imgArray[ slideshow.counter ][ 1 ];
	},
	buildArray: function()
	{
		var array = [,];
		var list = document.getElementById( "imageList" );
		var links = list.getElementsByTagName( "a" );
		var href = null, link = null;
		//build two-dimensional array
		for( var i = 0, ii = links.length; i < ii; i++ )
		{
			href = links[ i ].getAttribute( "href" );
			link = links[ i ].getAttribute( "title" );
			array[ i ] = [ href, link ];
		}
		return array;
	},
	addEventHandler: function( elem, event, handler )
	{
		//attach events on different browsers
		if( elem.addEventListener )		//Firefox, etc.
		{
			elem.addEventListener( event, handler, false );
		}
		else if( elem.attachEvent )		//MSIE
		{
			elem.attachEvent( "on" + event, handler );
		}
	}
};
slideshow.init();

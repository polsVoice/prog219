var imageSwap = {
	origSrc: null,
	init: function()
	{
		var list = document.getElementById( "imageList" );
		var links = list.getElementsByTagName( "a" );
		var theLink = null;
		for( var i = 0, ii = links.length; i < ii; i++ )
		{
			theLink = links[ i ];
			imageSwap.addEventHandler( theLink, "click", imageSwap.prevDefault );
			imageSwap.addEventHandler( theLink, "mouseover", imageSwap.switchPic );
			imageSwap.addEventHandler( theLink, "mouseout", imageSwap.switchPicBack );
		}
	},
	switchPic: function( e )
	{
		imageSwap.origSrc = this.firstChild.src;
		this.firstChild.src = this.getAttribute( "href" );
	},
	switchPicBack: function( e )
	{
		this.firstChild.src = imageSwap.origSrc;
	},
	prevDefault: function( e )
	{
		//prevent default behavior on different browsers
		if( !e )
		{
			e = window.event;
		}
		if( e.preventDefault )
		{
			e.preventDefault();
		}
		else
		{
			e.returnValue = false;
		}
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
imageSwap.init();

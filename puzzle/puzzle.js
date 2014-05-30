var puzzle = {
	init: function()
	{
		$( "img" ).draggable( {
			cursor: "move"
		});
		
		$( "td" ).droppable( {
			drop: function( event, ui )
			{
				// Get img src
				var src = $( ui.draggable ).attr( "src" );
				
				// Get column and row number of cell
				var col = $( this ).parent().children().index( $( this ) );
				var row = $( this ).parent().parent().children().index( $( this ).parent() );
				switch( row )
				{
					case 0:
						switch( col )
						{
							case 0:
								if( src.match( "1\-(.*)\.jpg" ) )
								{
									$( "<audio src='blop.mp3' autoplay type='audio/mpeg'></audio>" ).appendTo( this );
								}
								break;
							case 1:
								if( src.match( "2\-(.*)\.jpg" ) )
								{
									$( "<audio src='blop.mp3' autoplay type='audio/mpeg'></audio>" ).appendTo( this );
								}
								break;
							case 2:
								if( src.match( "3\-(.*)\.jpg" ) )
								{
									$( "<audio src='blop.mp3' autoplay type='audio/mpeg'></audio>" ).appendTo( this );
								}
								break;
							default:
								break;
						}
						break;
					case 1:
						switch( col )
						{
							case 0:
								if( src.match( "4\-(.*)\.jpg" ) )
								{
									$( "<audio src='blop.mp3' autoplay type='audio/mpeg'></audio>" ).appendTo( this );
								}
								break;
							case 1:
								if( src.match( "5\-(.*)\.jpg" ) )
								{
									$( "<audio src='blop.mp3' autoplay type='audio/mpeg'></audio>" ).appendTo( this );
								}
								break;
							case 2:
								if( src.match( "6\-(.*)\.jpg" ) )
								{
									$( "<audio src='blop.mp3' autoplay type='audio/mpeg'></audio>" ).appendTo( this );
								}
								break;
							default:
								break;
						}
						break;
					case 2:
						switch( col )
						{
							case 0:
								if( src.match( "7\-(.*)\.jpg" ) )
								{
									$( "<audio src='blop.mp3' autoplay type='audio/mpeg'></audio>" ).appendTo( this );
								}
								break;
							case 1:
								if( src.match( "8\-(.*)\.jpg" ) )
								{
									$( "<audio src='blop.mp3' autoplay type='audio/mpeg'></audio>" ).appendTo( this );
								}
								break;
							case 2:
								if( src.match( "9\-(.*)\.jpg" ) )
								{
									$( "<audio src='blop.mp3' autoplay type='audio/mpeg'></audio>" ).appendTo( this );
								}
								break;
							default:
								break;
						}
						break;
					default:
						break;
				}
			}
		} );
	}
};
puzzle.init();

/* Blop sound effect created by Mark DiAngelo and licensed under Creative Commons Attribution 3.0 license.
 * See http://creativecommons.org/licenses/by/3.0/us/
 * Sound downloaded from http://soundbible.com/2067-Blop.html
 */

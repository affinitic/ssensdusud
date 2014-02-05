jQuery(function($){
    $.supersized({
	    // Functionality
		slide_interval : 4000,		// Length between transitions
		transition : 1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
		random : 1,
		transition_speed : 2000,		// Speed of transition
															   
		// Components							
		slide_links : 'blank',	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
		slides:[ 
		        {image : 'bg_body_01.jpg'},
		        {image : 'bg_body_02.jpg'},
		        {image : 'bg_body_03.jpg'},
		        {image : 'bg_body_04.jpg'},
		        {image : 'bg_body_05.jpg'},
		        {image : 'bg_body_06.jpg'},
		        {image : 'bg_body_07.jpg'},
		        {image : 'bg_body_08.jpg'}
		        ]
		});
	});
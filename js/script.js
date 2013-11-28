/**
 * Parallax Scrolling Tutorial
 * For Smashing Magazine
 * July 2011
 *   
 * Author: Richard Shepherd
 * 		   www.richardshepherd.com
 * 		   @richardshepherd   
 */

// On your marks, get set...
$(document).ready(function(){
						
	// Cache the Window object
	$window = $(window);
	
	// Cache the Y offset and the speed of each sprite
	$('[data-type]').each(function() {	
		$(this).data('offsetY', parseInt($(this).attr('data-offsetY')));
		$(this).data('Xposition', $(this).attr('data-Xposition'));
		$(this).data('speed', $(this).attr('data-speed'));
	});
	
	// For each element that has a data-type attribute
	$('section[data-type="background"]').each(function(zindex){
	
	
		// Store some variables based on where we are
		var $self = $(this),
			offsetCoords = $self.offset(),
			topOffset = offsetCoords.top;
		
		// When the window is scrolled...
	    $(window).scroll(function() {
	
			// If this section is in view
			if ( ($window.scrollTop() + $window.height()) > (topOffset) &&
				 ( (topOffset + $self.height()) > $window.scrollTop() ) ) {
				
				if(zindex==0){
					var rot_s=$window.scrollTop()/82;
					var rot=30-30*rot_s;
					var rot_top=169+69*rot_s;
					var rot_right=-159+159*rot_s;
					var rot_op=rot_s;
					if(rot<0)
						rot=0;
					if(rot_top>238)
						rot_top=238;
					if(rot_right>0)
						rot_right=0;
					if(rot_op>1)
						rot_op=1;
					$(".shou").css({ transform:"rotate("+rot+"deg)","top":rot_top+"px","right":rot_right+"px","opacity":rot_op});
				}
				if(zindex==1){
					var pos_num=0;
					var pos_speed=0;	
					var pos_s=$window.scrollTop()/3600;				
					pos_speed=parseInt($window.scrollTop()/10,10);
					pos_num=-77*(pos_speed%8);
					
					var pos=pos_num+"px 0px";
					var eagleL=-300+1300*pos_s;
					
					$(".Eagle").css({"backgroundPosition":pos,"left":eagleL+"px"});
				}
				
				// Scroll the background at var speed
				// the yPos is a negative value because we're scrolling it UP!								
				var yPos = -($window.scrollTop() / $self.data('speed')); 
				
				// If this element has a Y offset then add it on
				if ($self.data('offsetY')) {
					yPos += $self.data('offsetY');
				}
				
				// Put together our final background position
				var coords = '50% '+ yPos + 'px';

				// Move the background
				$self.css({ backgroundPosition: coords });
				
				// Check for other sprites in this section	
				$('[data-type="sprite"]', $self).each(function() {
					
					// Cache the sprite
					var $sprite = $(this);
					
					// Use the same calculation to work out how far to scroll the sprite
					var yPos = -($window.scrollTop() / $(this).data('speed'));					
					var coords = $(this).data('Xposition') + ' ' + (yPos + $(this).data('offsetY')) + 'px';
					
					$(this).css({ backgroundPosition: coords });													
					
				}); // sprites
			
				// Check for any Videos that need scrolling
				$('[data-type="video"]', $self).each(function() {
					
					// Cache the video
					var $video = $(this);
					
					// There's some repetition going on here, so 
					// feel free to tidy this section up. 
					var yPos = -($window.scrollTop() / $(this).data('speed'));					
					var coords = (yPos + $(this).data('offsetY')) + 'px';
	
					$(this).css({ top: coords });													
					
				}); // video	
			
			}; // in view
	
		}); // window scroll
			
	});	// each data-type

}); // document ready

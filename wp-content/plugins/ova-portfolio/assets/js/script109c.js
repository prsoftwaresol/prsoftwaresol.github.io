(function($){
	"use strict";
	

	$(document).ready(function () {

	    // case study video
		$('.portfolio-video').each( function() {
	    	var that = $(this);

	    	var video_container = that.find('.ova-video-container');
	    	var modal_container = that.find('.portfolio-modal-container');
	    	var modal_close 	= that.find('.ovaicon-cancel');
	    	var modal_video 	= that.find('.modal-video');

	    	// btn video click
	    	video_container.on( 'click', function() {
	    		var btn_video 	= $(this).find('.video-btn')
	    		var url 		= get_url( btn_video.data('src') );
	    		console.log(url);

	    		if ( url != 'error' ) {
	    			modal_video.attr('src', "https://www.youtube.com/embed/" + url + '?autoplay=1&mute=1&loop=1&showinfo=0&controls=1' );
	    			modal_container.css('display', 'flex');
	    		}
	    	});

	    	// close video
	    	modal_close.on('click', function() {
	    		modal_container.hide();
	    		modal_video.removeAttr('src');
	    	});

	    	// window click
	    	$(window).click( function(e) {
	    		if ( e.target.className == 'portfolio-modal-container' ) {
	    			modal_container.hide();
	    			modal_video.removeAttr('src');
	    		}
			});

			function get_url( url ) {
			    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
			    var match = url.match(regExp);

			    if (match && match[2].length == 11) {
			        return match[2];
			    } else {
			        return 'error';
			    }
			}
	    });

	    // isotope
        $(".ova-portfolio .content-por").each(function(){
            var $mcontainer = $(this);
            $mcontainer.imagesLoaded( function() {

                $mcontainer.isotope({
                    itemSelector : '.ovapor-item',
                    animationOptions: {
                         duration: 750,
                         easing: 'linear'
                    },
                });

                if( $mcontainer.hasClass('grid-portfolio') ){
                    $mcontainer.isotope({
                        layoutMode: 'fitRows',
                        fitRows: {
                            gutter: 30
                        }, 
                    })
                } else if( $mcontainer.hasClass('masonry-portfolio') || $mcontainer.hasClass('masonry-portfolio-2') ){
                    $mcontainer.isotope({
                        layoutMode: 'masonry',
                        percentPosition: true,
                        masonry: {
                            columnWidth: '.ovapor-item',
                            gutter: 30
                        }
                    })
                };

             });
        });

        $('.portfolio-filter-button-wrapper .portfolio-filter-button').click(function(){
          
            $(".portfolio-filter-button-wrapper .portfolio-filter-button").removeClass("active-category");

            $(this).addClass("active-category");        

                var selector = $(this).attr('data-slug'); 
                  $(".content-por").isotope({ 
                      filter: selector, 
                      animationOptions: { 
                          duration: 750, 
                          easing: 'linear', 
                          queue: false, 
                    } 
                }); 

                if( $(this).hasClass('grid-portfolio') ){
                    $(".content-por").isotope({
                        layoutMode: 'fitRows',
                        fitRows: {
                          gutter: 30
                        },
                    })
               } else if( $(this).hasClass('masonry-portfolio') || $(this).hasClass('masonry-portfolio-2') ){
                    $(".content-por").isotope({
                        layoutMode: 'masonry',
                        percentPosition: true,
                        masonry: {
                            columnWidth: '.ovapor-item',
                            gutter: 30
                        }
                    })
               };

            return false; 
        }); 


        // ajax load more portfolio list
        $('.ova-portfolio .ova-load-more-por').on('click', function(){

            var paged     = $(this).closest('.ova_more_por').attr('data-paged');
            var perpage   = $(this).closest('.ova_more_por').attr('data-perpage');
            var cat       = $(this).closest('.ova_more_por').attr('data-cat');
            var type      = $(this).closest('.ova_more_por').attr('data-type');
            var new_paged = parseInt(paged) + 1;

            $(this).closest('.ova_more_por').attr('data-paged',new_paged);

            $('.ova-loader').css({'display':'inline-block'});

            $.ajax({
               url: ajax_object.ajax_url,
               type: 'POST',
               data: ({
                   action: 'ova_loadmore_portfolio',
                   paged: paged,
                   perpage: perpage,
                   cat: cat,
                   type: type,
             }),

                success: function(data){
                  if ( data != 0 ){
                    $('.content-por').append(data).isotope('appended', data);

                    $('.content-por').imagesLoaded( function() {
                      $('.content-por').isotope( 'reloadItems' ).isotope();

                    });

                    $('.ova-load-more-por').css({'display':'inline-block'});
                    $('.ova-loader').css({'display':'inline'});

                  } else {
                    $('.ova-load-more-por').css({'display':'none'});
                    $('.ova-nodata').css({'display':'inline-block'});
                  }

                }

            });
        });     
	    

	});

})(jQuery);

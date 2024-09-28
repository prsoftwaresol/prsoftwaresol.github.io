(function($){
	"use strict";
	

	$(window).on('elementor/frontend/init', function () {
		
        elementorFrontend.hooks.addAction('frontend/element_ready/solume_elementor_search_popup.default', function(){
	       
                $( '.ova_wrap_search_popup i' ).on( 'click', function(){
                        $( this ).closest( '.ova_wrap_search_popup' ).toggleClass( 'show' );
                });

                $( '.search-popup__overlay' ).on( 'click', function(){
                        $( this ).closest( '.ova_wrap_search_popup' ).removeClass( 'show' );
                });

        });

   });

})(jQuery);

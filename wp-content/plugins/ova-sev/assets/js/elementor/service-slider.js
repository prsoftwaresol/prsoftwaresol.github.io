(function($) {
    "use strict";

    $(window).on('elementor/frontend/init', function () {

        elementorFrontend.hooks.addAction('frontend/element_ready/ovasev_elementor_service_slider.default', function(){

            $(document).ready(function(){
               
                $(".services-slider").each(function(){
                    var service_slick   = $(this);
                    var data_options    = service_slick.data('options') ? service_slick.data('options') : {};
                    
                    service_slick.slick({
                        infinite: data_options.loop,
                        centerMode: data_options.centerMode,
                        centerPadding: 0,
                        slidesToShow: data_options.items,
                        slidesToScroll: 1,
                        arrows: false,
                        focusOnSelect: true,
                        autoplay: data_options.autoplay,
                        autoplaySpeed: data_options.autoplay_speed,
                        speed: data_options.smartSpeed,
                        asNavFor: '.services-slider-content',
                        vertical: data_options.vertical,
                        responsive: [
                            {
                                breakpoint: 1300,
                                settings: {
                                    arrows: false,
                                    centerMode: true,
                                    slidesToShow: 5
                                }
                            },
                            {
                                breakpoint: 1168,
                                settings: {
                                    arrows: false,
                                    centerMode: true,
                                    slidesToShow: 3
                                }
                            },
                            {
                                breakpoint: 767,
                                settings: {
                                    arrows: false,
                                    slidesToShow: 2,
                                }
                            },
                            {
                                breakpoint: 430,
                                settings: {
                                    arrows: false,
                                    slidesToShow: 1,
                                    vertical: false,
                                    dots: true,
                                    autoplay: false
                                }
                            }
                        ]
                    });

                });


                $(".services-slider-content").each(function(){
                    var services_content = $(this);

                    services_content.slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        fade: true,
                        asNavFor: '.services-slider',
                        // adaptiveHeight: true,
                    });

                });

            }); 

        });

    });

})(jQuery);
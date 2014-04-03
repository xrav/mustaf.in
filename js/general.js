//Foundations 5 Initialization
$(document).foundation();


$(document).ready(function () {

    var currentlyScrolled;

    $(window).scroll(function () {

        var header = $('header');
        currentlyScrolled = $(this).scrollTop();

        //Apply Sticky Header
        if (currentlyScrolled > 0) {
            header.addClass('sticky');
        }
        else {
            header.removeClass();
        }

        if ($(this).scrollTop() > 100) {
            $('.backtotop').stop().animate({'right': '0'});
        }
        else {
            $('.backtotop').stop().animate({'right': '-40px'});
        }

    });

    $('#current-year').html( (new Date()).getFullYear() );
});

$(window).load(function () {

    //Set Portfolio Items Height
    function setWorkHeight() {
        if ($('section.works ul li a figure .imgholder img').length > 0) {

            var imageHolder = $('section.works ul li a figure .imgholder');
            imageHolder.css({'height': imageHolder.find('img').height()});

        }
    }

    setWorkHeight();


    //Services Animation
    $('section.services .title p').appear();

    $('body').on('appear', 'section.services .title p', function () {

        var services = [];

        $('.service').each(function () {
            services.push($(this));
        });

        for (i = 0; i <= services.length; i++) {
            $(services[i]).delay(i * 400).animate({'opacity': 1}, 400);
        }

    });

    //Parallax Animation
    $('section[data-type="background"]').each(function () {
        var $bgobj = $(this); // assigning the object

        $(window).scroll(function () {
            var yPos = -($(window).scrollTop() / $bgobj.data('speed'));

            // Put together our final background position
            var coords = '50% ' + yPos + 'px';

            // Move the background
            $bgobj.css({ backgroundPosition: coords });
        });
    });

    //Portfolio Filtering And Animation
    var works = $('ul#works');

    if ($('ul#works').length > 0) {
        works.isotope();

        $('ul.filters').appear();

        $('body').on('appear', 'ul.filters', function () {

            var works = [];

            $('ul#works').find('figure').each(function () {
                works.push($(this));
            });

            for (i = 0; i <= works.length; i++) {
                $(works[i]).delay(i * 400).animate({'opacity': 1}, 400);
            }

        });
    }

    //Works Portfolio Show
    $('section.works ul li a').click(function () {

        var getCurrentPortTop = $('section.works').offset()
            , showPortf = $(this).attr('href');

        $('html, body').animate({scrollTop: getCurrentPortTop.top}, 500, function () {

            if ($('section.works article.work.slided').length > 0) {
                $('section.works article.work.slided').slideUp().removeClass('slided');
                $(showPortf).slideDown(500, function () {
                    $('section.works .close').css({'display': 'inline-block'});
                    $(this).addClass('slided');
                });
            }
            else {
                $(showPortf).slideDown(500, function () {
                    $('section.works .close').css({'display': 'inline-block'});
                    $(this).addClass('slided');
                });
            }

        });

        return false;

    });

    //Close Event
    $('body').on('click', 'section.works .close', function () {

        var getCurrentPortTop = $('section.works').offset();

        $('section.works .close').css({'display': 'none'});
        $('section.works article.work.slided').slideUp().removeClass('slided');

        $('html, body').animate({scrollTop: getCurrentPortTop.top}, 500);

        return false;
    });


    $('.filters li a').click(function () {

        if ($('section.works article.work.slided').length > 0) {
            $('section.works article.work.slided').slideUp();
        }

        $('.filters li').removeClass();
        $(this).parent().addClass('selected');

        var selector = $(this).attr('data-filter');
        works.isotope({ filter: selector });
        return false;

    });

    //Input Placeholders
    $(".defaultText").focus(function (srcc) {
        if ($(this).val() == $(this)[0].title) {
            $(this).removeClass("defaultTextActive");
            $(this).val("");
        }
    });

    $(".defaultText").blur(function () {
        if ($(this).val() == "") {
            $(this).addClass("defaultTextActive");
            $(this).val($(this)[0].title);
        }
    });

    $(".defaultText").blur();

    function banner() {
        //Banner Initialization
        if ($('section.about .slider img').length > 1) {

            var slider = $('section.about .slider');

            slider.trigger("destroy");

            slider.carouFredSel({
                items: {
                    visible: 1
                },
                direction: "left",

                scroll: {
                    items: 1,
                    fx: "crossfade",
                    easing: "linear",
                    duration: 1000,
                    pauseOnHover: true
                },
                prev: {
                    button: 'section.about .sliderHolder .bannerNav a.prev'
                },
                next: {
                    button: 'section.about .sliderHolder .bannerNav a.next'
                },
                auto: {
                    play: true
                },
                responsive: true
            });

        }
        else {
            $('section.about .sliderHolder .bannerNav a').css({'display': 'none'});
        }
    }

    banner();

    //Services Height
    function setServiceHeight() {

        var serviceHeight = 0;

        if ($('section.services .service').length > 0) {

            $('section.services .service').css({'height': 'auto'});

            $('section.services .service').each(function () {

                if ($(this).height() > serviceHeight) {
                    serviceHeight = $(this).height();
                }
            });

            $('section.services .service').css({'height': serviceHeight + 20});

        }
    }

    setServiceHeight();

    function testimonialsSlider() {

        var testimonialsSlider = $('section.testimonials .holder');

        if (testimonialsSlider.find('article').length > 1) {

            testimonialsSlider.trigger("destroy");

            testimonialsSlider.find('article').css({'width': 'auto', 'height': 'auto'});

            var testimonialSliderWidth = testimonialsSlider.find('article').eq(0).width();
            var testimonialSliderHeight = testimonialsSlider.find('article').eq(0).height();

            testimonialsSlider.find('article').css({'width': testimonialSliderWidth, 'height': testimonialSliderHeight});

            testimonialsSlider.carouFredSel({
                items: {
                    visible: 1,
                    width: testimonialSliderWidth,
                    height: testimonialSliderHeight
                },
                direction: "left",
                scroll: {
                    items: 1,
                    fx: "crossfade",
                    easing: "linear",
                    duration: 800,
                    pauseOnHover: true
                },
                prev: {
                    button: 'section.testimonials .bannerNav a.prev'
                },
                next: {
                    button: 'section.testimonials .bannerNav a.next'
                },
                auto: {
                    play: true
                }
            });
        }
    }

    testimonialsSlider();


    function memberSlider() {
        //Member Slider
        if ($('section.team .slider .sliderholder .member').length > 0) {

            $('section.team .slider .sliderholder').trigger("destroy");
            $('section.team .slider .sliderholder .member').css({'width': 'auto', 'height': 'auto'});

            var memberSliderWidth = $('section.team .slider .sliderholder .member').eq(0).width();
            var memberSliderHeight = $('section.team .slider .sliderholder .member').eq(0).height();

            $('section.team .slider .sliderholder .member').css({'width': memberSliderWidth, 'height': memberSliderHeight});

            $('section.team .slider .sliderholder').carouFredSel({

                items: {
                    visible: 1,
                    width: memberSliderWidth,
                    height: memberSliderHeight
                },

                direction: "left",

                scroll: {
                    items: 1,
                    fx: "crossfade",
                    easing: "linear",
                    duration: 800,
                    pauseOnHover: true
                },
                prev: {
                    button: 'section.team .slider .bannerNav a.prev'
                },
                next: {
                    button: 'section.team .slider .bannerNav a.next'
                },
                auto: {
                    play: false
                },
                responsive: true
            });

        }
    }

    memberSlider();

    //Page Scroll
    $(".scroll").click(function (event) {

        //prevent the default action for the click event
        event.preventDefault();
        //get the full url - like mysitecom/index.htm#home
        var full_url = this.href;
        //split the url by # and get the anchor target name - home in mysitecom/index.htm#home

        var parts = full_url.split("#");
        var trgt = parts[1];
        //get the top offset of the target anchor

        var target_offset = $("#" + trgt).offset();

        var target_top = target_offset.top - 29;

        //goto that anchor by setting the body scroll top to anchor top
        $('html, body').animate({scrollTop: target_top}, 1000);

    });

    //On Window Resize
    $(window).resize(function () {
        setWorkHeight();
        testimonialsSlider();
        setServiceHeight();
        works.isotope();
        memberSlider();
        banner();
    });


});
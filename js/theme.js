(function ($) {
    "use strict";
    var $body = $('body'),
        $window = $(window),
        $siteWrapper = $('#site-wrapper'),
        $document = $(document);
    var APP = {
        init: function () {
            this.narbarDropdownOnHover();
            this.activeSidebarMenu();
            this.reInitWhenTabShow();
            this.enablePopovers();
            this.initToast();
            this.scrollSpyLanding();
            this.scrollSpyProductImage();
            this.scrollSpyBulletOne();
            this.parallaxImag();
            this.slickCustomNav();
            this.imageMarker();
            this.dropdownMenuCanvas();
            this.canvasCart();
            this.activeSearch();
            this.productDropdownOnHover();
            this.activeMenuListing();
            this.openCouponBox();
            this.bgVideo();
            this.layoutMasonry();
            this.ModalSlick();
            this.Payment();
        },
        isMobile: function () {
            return window.matchMedia('(max-width: 1199px)').matches;
        },
        bgVideo: function () {
            var $wrapper = $('.bg-video'),
                unit = 'px';
            if ($wrapper.length < 1) {
                return;
            }
            resizeBgVideo();
            $(window).resize(function () {
                resizeBgVideo();
            });

            function resizeBgVideo() {
                var heightWrap = $wrapper.height(),
                    widthWrap = $wrapper.width(),
                    ratioHeight = widthWrap / (16 / 9),
                    ratioWidth = heightWrap * (16 / 9),
                    height = 0,
                    width = 0;

                height = ratioHeight;
                if (ratioHeight < heightWrap) {
                    height = heightWrap;
                }
                width = ratioWidth;
                if (ratioWidth < widthWrap) {
                    width = widthWrap;
                }
                $wrapper.find('iframe').css({height: height + unit});
                $wrapper.find('iframe').css({width: width + unit});
            }

        },
        layoutMasonry: function () {
            var $wrapper = $('.layout-masonry');
            if ($wrapper.length < 1) {
                return;
            }
            $wrapper.isotope({
                itemSelector: '.layout-masonry-item',
                percentPosition: true,
                transitionDuration: 1500,
                masonry: {
                    columnWidth: '.layout-masonry-item',
                    horizontalOrder: true
                }
            });

        },
        narbarDropdownOnHover: function () {
            var $dropdown = $('.main-header .hover-menu .dropdown');
            if ($dropdown.length < 1) {
                return;
            }

            $dropdown.on('mouseenter', function () {
                if (APP.isMobile()) {
                    return;
                }
                var $this = $(this);
                $this.addClass('show')
                    .find(' > .dropdown-menu').addClass('show');
            });
            $dropdown.on('mouseleave', function () {
                if (APP.isMobile()) {
                    return;
                }
                var $this = $(this);
                $this.removeClass('show')
                    .find(' > .dropdown-menu').removeClass('show');
            });
        },
        productDropdownOnHover: function () {
            var $dropdown = $('.product-dropdown');
            if ($dropdown.length < 1) {
                return;
            }
            var $dropdown_toggle = $('.product-dropdown .dropdown-toggle');
            $dropdown_toggle.on('click', function (e) {
                e.preventDefault();
                location.href = $dropdown_toggle.attr('href');
            });
            $dropdown.on('mouseenter', function () {
                var $this = $(this);
                $this.addClass('show')
                    .find(' > .dropdown-menu').addClass('show');
            });
            $dropdown.on('mouseleave', function () {
                var $this = $(this);
                $this.removeClass('show')
                    .find(' > .dropdown-menu').removeClass('show');
            });
        },
        dropdownMenuCanvas: function () {
            $(".sidenav .dropdown-menu [data-toggle='dropdown']").on("click", function (event) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                var that = this;
                $(that).next().toggleClass("show");
                $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
                    $(that).next().removeClass("show");
                });

            });

        },
        activeSidebarMenu: function () {
            var $sidebar = $('.db-sidebar');
            if ($sidebar.length < 1) {
                return;
            }
            var $current_link = window.location.pathname;
            var $sidebarLink = $sidebar.find('.sidebar-link');
            $sidebarLink.each(function () {
                var href = $(this).attr('href');
                if ($current_link.indexOf(href) > -1) {
                    var $sidebar_item = $(this).parent('.sidebar-item');
                    $sidebar_item.addClass('active');
                }
            });

        },
        reInitWhenTabShow: function () {
            var $tabs = $('a[data-toggle="pill"],a[data-toggle="tab"]');
            $tabs.each(function () {
                var $this = $(this);
                $this.on('shown.bs.tab', function (e) {
                    var href = $(this).attr('href');
                    if (href !== '#') {
                        var $slider = $(href).find('.slick-slider');
                        $slider.slick("setPosition");
                        $('[data-toggle="tooltip"]').tooltip('update');
                        if ($(e.target).attr("href") !== undefined) {
                            var $target = $($(e.target).attr("href"));
                            APP.util.mfpEvent($target);
                        }
                    }
                    APP.mapbox.init();
                });

            });

        },
        enablePopovers: function () {
            $('[data-toggle="popover"]').popover();
        },
        initToast: function () {
            $('.toast').toast();
        },
        scrollSpyLanding: function () {
            var $langding_menu = $('#landingMenu');
            if ($langding_menu.length < 1) {
                return;
            }
            $('body').scrollspy({
                target: '#landingMenu',
                offset: 200
            });
            $langding_menu.find('.nav-link')
                // Remove links that don't actually link to anything
                .not('[href="#"]')
                .not('[href="#0"]')
                .click(function (event) {
                    // On-page links
                    if (
                        location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
                        &&
                        location.hostname === this.hostname
                    ) {
                        // Figure out element to scroll to
                        var target = $(this.hash);
                        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                        // Does a scroll target exist?
                        if (target.length) {
                            // Only prevent default if animation is actually gonna happen
                            event.preventDefault();
                            $('html, body').animate({
                                scrollTop: target.offset().top
                            }, 500, function () {
                                // Callback after animation
                            });
                        }
                    }
                });
        },
        scrollSpyProductImage: function () {
            var $image_dots = $('#list-dots');
            if ($image_dots.length < 1) {
                return;
            }
            $('body').scrollspy({
                target: '#list-dots',
                offset: 200
            });

            var $scroll_images = $('.scrollspy-images');
            $window.on('scroll', function (e) {
                e.preventDefault();
                var is_end = $(this).scrollTop() + $(this).height() > $scroll_images.offset().top + $scroll_images.height() + 250;

                if (is_end) {
                    $image_dots.addClass('hide');
                } else {
                    $image_dots.removeClass('hide');
                }
            })
        },

        scrollSpyBulletOne: function () {
            var $bullet_dots = $('#bullet-one');
            var $nav = $('.bullet-nav');
            var $scroll_bullet = $('.scrollspy-bullet');

            if ($bullet_dots.length < 1) {
                return;
            }
            $('body').scrollspy({
                target: '#bullet-one',
                offset: 200
            });

            $window.on('scroll', function (e) {
                e.preventDefault();
                var is_end = $(this).scrollTop() + $(this).height() > $scroll_bullet.offset().top + $scroll_bullet.height() + 250;

                if (is_end) {
                    $bullet_dots.addClass('hide');
                } else {
                    $bullet_dots.removeClass('hide');
                }
            });

            toggle_skin_class($nav);
            $window.on('activate.bs.scrollspy', function (e, obj) {
                toggle_skin_class($nav);
            });

            $('a[href*=\\#]:not([href=\\#])').click(function () {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 500);
                        return false;
                    }
                }
            });

            function toggle_skin_class($nav) {
                $nav.removeClass('nav-dark');
                $nav.removeClass('nav-light');
                var $active_element = $nav.find('.nav-link.active');
                var $skin = $active_element.data('skin');
                $nav.addClass('nav-' + $skin);
            }
        },

        parallaxImag: function () {
            var image_wrapper = $(".parralax-images");

            image_wrapper.mousemove(function (e) {
                e.preventDefault();

                var wx = $(window).width();
                var wy = $(window).height();

                var x = e.pageX - this.offsetLeft;
                var y = e.pageY - this.offsetTop;

                var newx = x - wx / 2;
                var newy = y - wy / 2;


                $.each(image_wrapper.find('.layer'), function (index) {
                    var speed = 0.01 + index / 100;
                    TweenMax.to($(this), 1, {x: (1 - newx * speed), y: (1 - newy * speed)});

                });
            });
            image_wrapper.on('mouseleave', (function (e) {
                e.preventDefault();
                $.each(image_wrapper.find('.layer'), function () {
                    TweenMax.to($(this), 1, {x: 0, y: 0});

                });

            }));

        },
        ModalSlick: function () {
            var preview = $(".preview");
            preview.on('click', (function (e) {
                e.preventDefault();
            }));

            $('.modal').on('shown.bs.modal', function (e) {
                $('.quick-view .modal-dialog').css("opacity", "1");
                $('.view-slider-for').not('.slick-initialized').slick({
                    slidesToShow: 1,
                    arrows: false,
                    dots: false,
                    fade: true,
                    asNavFor: '.view-slider-nav'
                });
                $('.view-slider-nav').not('.slick-initialized').slick({
                    slidesToShow: 5,
                    asNavFor: '.view-slider-for',
                    dots: false,
                    arrows: false,
                    focusOnSelect: true
                });
            })
        },

        Payment: function () {
            var $btn_payment = $('.btn-payment');
            var $card_box = $('.card-box');
            var $payment_card = $('.payment-card');
            var $paylay_box = $('.paylay-box');
            var $payment_paylay = $('.payment-paylay');

            $payment_card.on('click', function () {
                $card_box.slideDown();
                $paylay_box.slideUp();
            });

            $payment_paylay.on('click', function () {
                $paylay_box.slideDown();
                $card_box.slideUp();
            });

            $btn_payment.on('click', function (e) {
                e.preventDefault();
                $btn_payment.removeClass('active');
                if (!$(this).hasClass('active')) {
                    $(this).addClass('active');
                }
            });

            $('.creditCardText').keyup(function () {
                var foo = $(this).val().split("-").join(""); // remove hyphens
                if (foo.length > 0) {
                    foo = foo.match(new RegExp('.{1,4}', 'g')).join("-");
                }
                $(this).val(foo);
            });
        },

        slickCustomNav: function () {
            var $slickslider = $(".custom-nav");
            if ($slickslider.length < 1) {
                return;
            }
            $(".arrow").on("click", function (e) {
                e.preventDefault();
                if ($(this).hasClass("slick-prev")) {
                    $slickslider.slick("slickPrev");
                }
                if ($(this).hasClass("slick-next")) {
                    $slickslider.slick("slickNext");
                }
                $slickslider.on("afterChange", function (slick, currentSlide) {
                    if (0 === currentSlide.currentSlide) {
                        $("#previous").addClass("disabled");
                    } else {
                        $("#previous").removeClass("disabled");
                    }
                    if (currentSlide.slideCount - currentSlide.options.slidesToShow === currentSlide.currentSlide) {
                        $("#next").addClass("disabled");
                    } else {
                        $("#next").removeClass("disabled");
                    }

                });

            });
        },
        imageMarker: function () {
            $('.image-marker').find('[data-toggle="tooltip"]').each(function () {
                var configs = {
                    container: $(this).parent(),
                    html: true,
                    placement: 'top',
                    offset: 20,
                    delay: {"show": 0, "hide": 100},
                };
                if ($(this).closest('.gtf__tooltip-wrap').length) {
                    configs = $.extend({}, configs, $(this).closest('.gtf__tooltip-wrap').data('tooltip-options'));
                }
                $(this).tooltip(configs);
            });
        },
        canvasCart: function () {
            $('.down').on('click', function (e) {
                e.preventDefault();
                var $parent = $(this).parent('.input-group');
                var $input = $parent.find('input');
                var $value = parseInt($input.val());
                if ($value > 0) {
                    $value -= 1;
                    $input.val($value);
                }


            });
            $('.up').on('click', function (e) {
                e.preventDefault();
                var $parent = $(this).parent('.input-group');
                var $input = $parent.find('input');
                var $value = $input.val();
                if ($value !== '') {
                    $value = parseInt($value);
                    $value += 1;
                    $input.val($value);
                } else {
                    $input.val(1);
                }


            });
        },
        activeSearch: function () {
            var $input = $('.input-search-event');
            var $search_section = $('.section-search-active');
            var $form_search = $('.form-search');
            var $nav_search = $('.nav-search-event');
            var $menu = $('.nav-menu');

            $('body').on('click', function (e) {
                var target = $(e.target);
                if (target.closest(".nav-search-event").length > 0 && target.closest(".input-search").length < 1 && target.closest(".section-search-active a").length < 1) {
                    $form_search.addClass('show');
                    $nav_search.addClass('hide');
                } else if (target.closest(".nav-search-event").length < 1 && target.closest(".input-search").length < 1 && target.closest(".section-search-active a").length < 1) {
                    $form_search.removeClass('show');
                    $nav_search.removeClass('hide');
                }
                APP.headerSticky.sticky();
            });
            $input.on('focus', function (e) {
                e.preventDefault();
                $search_section.slideDown(200);
                $menu.slideUp(200);
                APP.headerSticky.sticky();
            });
            $input.on('focusout', function (e) {
                e.preventDefault();
                $search_section.slideUp(200);
                $menu.slideDown(200);
                APP.headerSticky.sticky();
            });

            $window.resize(function () {
                if (APP.isMobile()) {
                    $search_section.slideUp(200);
                    $menu.slideDown(200);
                    APP.headerSticky.sticky();
                }
            });
        },
        activeMenuListing: function () {
            var $menu = $('.dropdown-menu-listing');
            if ($menu.length < 1) {
                return;
            }
            var $current_link = window.location.pathname;
            var $menuLink = $menu.find('.dropdown-link');
            $menuLink.each(function () {
                var href = $(this).attr('href');
                if ($current_link.indexOf(href) > -1) {
                    var $menu_item = $(this).parent('.dropdown-item');
                    $menu_item.addClass('active');
                }
            });

        },
        openCouponBox: function () {
            var $couponBox = $('.box-coupon');
            var $button = $('.enter-coupon');
            $button.on('click', function (e) {
                e.preventDefault();
                $couponBox.slideToggle("slow", function () {
                });
            });

        }
    };
    /*--------------------------------------------------------------
     /* Slick Slider
     --------------------------------------------------------------*/
    APP.slickSlider = {
        init: function ($wrap) {
            this.slickSetup($wrap);
            this.animateSlider();
        },
        slickSetup: function ($wrap) {
            var $slicks;
            if ($wrap !== undefined) {
                $slicks = $wrap
            } else {
                $slicks = $('.slick-slider');
            }
            var options_default = {
                slidesToScroll: 1,
                slidesToShow: 1,
                adaptiveHeight: true,
                arrows: true,
                dots: true,
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: "50px",
                draggable: true,
                fade: false,
                focusOnSelect: false,
                infinite: false,
                pauseOnHover: false,
                responsive: [],
                rtl: true,
                speed: 300,
                vertical: false,
                prevArrow: '<div class="slick-prev" aria-label="Previous"><i class="far fa-chevron-left"></i></div>',
                nextArrow: '<div class="slick-next" aria-label="Next"><i class="far fa-chevron-right"></i></div>',
                customPaging: function (slider, i) {
                    return $('<span></span>');
                }
            };
            $slicks.each(function () {
                var $this = $(this);
                if (!$this.hasClass('slick-initialized')) {
                    var options = $this.data('slick-options');
                    if ($this.hasClass('custom-arrows-02')) {
                        options.prevArrow = $(".custom-arrows-02-prev");
                        options.nextArrow = $(".custom-arrows-02-next");
                    }
                    if ($this.hasClass('custom-slider-02')) {
                        options.customPaging = function (slider, i) {
                            var $index = '';
                            if (i < 9) {
                                $index = '0' + (i + 1);
                            } else {
                                $index = (i + 1);
                            }
                            var count = '';
                            if (slider.slideCount < 9) {
                                count = '0' + (slider.slideCount);
                            } else {
                                count = slider.slideCount;
                            }

                            return '<span class="dot">' + $index + '.</span>' + '<span class="dot-divider"><span class="divider-value"></span></span><span class="dot">' + count + '.</span>';
                        }
                    }
                    if ($this.hasClass('custom-slider-03')) {
                        options.customPaging = function (slider, i) {
                            var $index = '';
                            if (i < 9) {
                                $index = i + 1;
                            } else {
                                $index = i + 1;
                            }
                            var count = '';
                            if (slider.slideCount < 9) {
                                count = (slider.slideCount);
                            } else {
                                count = slider.slideCount;
                            }

                            return '<span class="dot-text">Show</span><span class="dot">' + $index + '</span>' + '<span class="dot-divider">/</span><span class="dot">' + count + '</span>';
                        }
                    }
                    options = $.extend({}, options_default, options);
                    $this.slick(options);
                    $this.on('setPosition', function (event, slick) {
                        var max_height = 0;
                        slick.$slides.each(function () {
                            var $slide = $(this);
                            if ($slide.hasClass('slick-active')) {
                                if (slick.options.adaptiveHeight && (slick.options.slidesToShow > 1) && (slick.options.vertical === false)) {
                                    if (max_height < $slide.outerHeight()) {
                                        max_height = $slide.outerHeight();
                                    }
                                }
                            }
                        });
                        if (max_height !== 0) {
                            $this.find('> .slick-list').animate({
                                height: max_height
                            }, 500);
                        }
                    });

                }
            });
        },

        animateSlider: function () {
            var Slider = $(".slick-slider.slider");
            Slider.on("beforeChange", function () {
                var sliderItem = $(this).find('.slick-slide:not(.slick-active)'),
                    sliderAnimate = sliderItem.find('.animated'),
                    dataAnimate = '';
                if (sliderAnimate.length <= 0) {
                    return;
                }
                sliderAnimate.each(function () {
                    dataAnimate = $(this).attr('data-animate');
                    if (dataAnimate.length) {
                        $(this).removeClass('animated').removeClass(dataAnimate);
                    }
                });
            });

            Slider.on("afterChange", function () {
                var sliderActive = $(this).find('.slick-active'),
                    sliderAnimate = sliderActive.find('[data-animate]:not(.animated)'),
                    dataAnimate = '';

                if (sliderAnimate.length <= 0) {
                    return;
                }
                sliderAnimate.each(function () {
                    dataAnimate = $(this).attr('data-animate');
                    if (dataAnimate.length) {
                        $(this).addClass('animated').addClass(dataAnimate);
                    }
                });
            });
        },
    };
    APP.counter = {
        init: function () {
            if (typeof Waypoint !== 'undefined') {
                $('.counterup').waypoint(function () {
                    var start = $(this.element).data('start');
                    var end = $(this.element).data('end');
                    var decimals = $(this.element).data('decimals');
                    var duration = $(this.element).data('duration');
                    var separator = $(this.element).data('separator');
                    var usegrouping = false;
                    if (separator !== '') {
                        usegrouping = true
                    }
                    var decimal = $(this.element).data('decimal');
                    var prefix = $(this.element).data('prefix');
                    var suffix = $(this.element).data('suffix');
                    var options = {
                        useEasing: true,
                        useGrouping: usegrouping,
                        separator: separator,
                        decimal: decimal,
                        prefix: prefix,
                        suffix: suffix
                    };
                    var counterup = new CountUp(this.element, start, end, decimals, duration, options);
                    counterup.start();
                    this.destroy();
                }, {
                    triggerOnce: true,
                    offset: 'bottom-in-view'
                });
            }
        }
    };
    APP.util = {
        init: function () {
            this.mfpEvent();
            this.backToTop();
            this.tooltip();
            this.goDown();
        },
        mfpEvent: function ($elWrap) {
            if ($elWrap === undefined) {
                $elWrap = $('body');
            }

            $elWrap.find('[data-gtf-mfp]').each(function () {
                var $this = $(this),
                    defaults = {
                        type: 'image',
                        closeOnBgClick: true,
                        closeBtnInside: false,
                        mainClass: 'mfp-zoom-in',
                        midClick: true,
                        removalDelay: 300,
                        callbacks: {
                            beforeOpen: function () {
                                // just a hack that adds mfp-anim class to markup
                                switch (this.st.type) {
                                    case 'image':
                                        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                                        break;
                                    case 'iframe' :
                                        this.st.iframe.markup = this.st.iframe.markup.replace('mfp-iframe-scaler', 'mfp-iframe-scaler mfp-with-anim');
                                        break;
                                }
                            },
                            beforeClose: function () {
                                this.container.trigger('gtf_mfp_beforeClose');
                            },
                            close: function () {
                                this.container.trigger('gtf_mfp_close');
                            },
                            change: function () {
                                var _this = this;
                                if (this.isOpen) {
                                    this.wrap.removeClass('mfp-ready');
                                    setTimeout(function () {
                                        _this.wrap.addClass('mfp-ready');
                                    }, 10);
                                }
                            }
                        }
                    },
                    mfpConfig = $.extend({}, defaults, $this.data("mfp-options"));

                var galleryId = $this.data('gallery-id');
                if (typeof (galleryId) !== "undefined") {
                    var items = [],
                        items_src = [];
                    var $imageLinks = $('[data-gallery-id="' + galleryId + '"]');
                    $imageLinks.each(function () {
                        var src = $(this).attr('href');
                        if (items_src.indexOf(src) < 0) {
                            items_src.push(src);
                            items.push({
                                src: src
                            });
                        }
                    });
                    mfpConfig.items = items;
                    mfpConfig.gallery = {
                        enabled: true
                    };
                    mfpConfig.callbacks.beforeOpen = function () {
                        var index = $imageLinks.index(this.st.el);
                        switch (this.st.type) {
                            case 'image':
                                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                                break;
                            case 'iframe' :
                                this.st.iframe.markup = this.st.iframe.markup.replace('mfp-iframe-scaler', 'mfp-iframe-scaler mfp-with-anim');
                                break;
                        }
                        if (-1 !== index) {
                            this.goTo(index);
                        }
                    };
                }
                $this.magnificPopup(mfpConfig);
            });
        },
        tooltip: function ($elWrap) {
            if ($elWrap === undefined) {
                $elWrap = $('body');
            }
            $elWrap.find('[data-toggle="tooltip"]').each(function () {
                var configs = {
                    container: $(this).parent()
                };
                if ($(this).closest('.gtf__tooltip-wrap').length) {
                    configs = $.extend({}, configs, $(this).closest('.gtf__tooltip-wrap').data('tooltip-options'));
                }
                $(this).tooltip(configs);
            });
        },
        backToTop: function () {
            var $backToTop = $('.gtf-back-to-top');
            if ($backToTop.length > 0) {
                $backToTop.on('click', function (event) {
                    event.preventDefault();
                    $('html,body').animate({scrollTop: '0px'}, 800);
                });
                $window.on('scroll', function (event) {
                    var scrollPosition = $window.scrollTop(),
                        windowHeight = $window.height() / 2;
                    if (scrollPosition > windowHeight) {
                        $backToTop.addClass('in');
                    } else {
                        $backToTop.removeClass('in');
                    }
                });
            }
        },
        goDown: function () {
            var $goDown = $('.go-down');
            if ($goDown.length > 0) {
                $goDown.on('click', function (event) {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: $('#section-next').offset().top
                    }, 1000, function () {
                        // Callback after animation
                    });
                });
            }
        },
    };
    APP.CollapseTabsAccordion = {
        init: function () {
            this.CollapseSetUp();
        },

        CollapseSetUp: function () {
            var $tabs = $('.collapse-tabs');

            $tabs.find('.tab-pane.active .collapse-parent').attr('data-toggle', 'false');

            $tabs.find('.nav-link').on('show.bs.tab', function (e) {
                if (!$(this).hasClass('nested-nav-link')) {
                    var $this_tab = $(this).parents('.collapse-tabs');
                    var $tabpane = $($(this).attr('href'));
                    $this_tab.find('.collapsible').removeClass('show');
                    $this_tab.find('collapse-parent').addClass('collapsed');
                    $this_tab.find('collapse-parent').attr('data-toggle', 'collapse');
                    $tabpane.find('.collapse-parent').removeClass('collapsed');
                    $tabpane.find('.collapse-parent').attr('data-toggle', 'false');
                    $tabpane.find('.collapsible').addClass('show');
                }

            });

            $tabs.find('.collapsible').on('show.bs.collapse', function () {
                var $this_tab = $(this).parents('.collapse-tabs'),
                    $parent = $(this).parents('.tab-pane.tab-pane-parent'),
                    $id = $parent.attr('id'),
                    $navItem = $this_tab.find('.nav-link'),
                    $navItemClass = 'active';

                $this_tab.find('.collapse-parent').attr('data-toggle', 'collapse');
                $parent.find('.collapse-parent').attr('data-toggle', 'false');
                var $tab_pane = $this_tab.find('.tab-pane');
                if (!$tab_pane.hasClass('nested-tab-pane')) {
                    $this_tab.find('.tab-pane').removeClass('show active');
                }
                $parent.addClass('show active');
                var $nav_link = $parent.parents('.collapse-tabs').find('.nav-link');
                if (!$nav_link.hasClass('nested-nav-link')) {
                    $nav_link.removeClass('active');
                }
                $navItem.each(function () {
                    if (!$(this).hasClass('nested-nav-link')) {
                        $(this).removeClass('active');
                        if ($(this).attr('href') === '#' + $id) {
                            $(this).addClass($navItemClass);
                        }
                    }

                });

            });

        }


    };
    APP.animation = {
        delay: 100,
        itemQueue: [],
        queueTimer: null,
        $wrapper: null,
        init: function () {
            var _self = this;
            _self.$wrapper = $body;
            _self.itemQueue = [];
            _self.queueTimer = null;
            if (typeof delay !== 'undefined') {
                _self.delay = delay;
            }

            _self.itemQueue["animated_0"] = [];

            $body.find('#content').find('>div,>section').each(function (index) {
                $(this).attr('data-animated-id', (index + 1));
                _self.itemQueue["animated_" + (index + 1)] = [];
            });

            setTimeout(function () {
                _self.registerAnimation();
            }, 200);
        },
        registerAnimation: function () {
            var _self = this;
            $('[data-animate]:not(.animated)', _self.$wrapper).waypoint(function () {
                // Fix for different ver of waypoints plugin.
                var _el = this.element ? this.element : this,
                    $this = $(_el);
                if ($this.is(":visible")) {
                    var $animated_wrap = $this.closest("[data-animated-id]"),
                        animated_id = '0';
                    if ($animated_wrap.length) {
                        animated_id = $animated_wrap.data('animated-id');
                    }
                    _self.itemQueue['animated_' + animated_id].push(_el);
                    _self.processItemQueue();
                } else {
                    $this.addClass($this.data('animate')).addClass('animated');
                }
            }, {
                offset: '90%',
                triggerOnce: true
            });
        },
        processItemQueue: function () {
            var _self = this;
            if (_self.queueTimer) return; // We're already processing the queue
            _self.queueTimer = window.setInterval(function () {
                var has_queue = false;
                for (var animated_id in _self.itemQueue) {
                    if (_self.itemQueue[animated_id].length) {
                        has_queue = true;
                        break;
                    }
                }

                if (has_queue) {
                    for (var animated_id in _self.itemQueue) {
                        var $item = $(_self.itemQueue[animated_id].shift());
                        $item.addClass($item.data('animate')).addClass('animated');
                    }
                    _self.processItemQueue();
                } else {
                    window.clearInterval(_self.queueTimer);
                    _self.queueTimer = null
                }


            }, _self.delay);
        }
    };

    APP.headerSticky = {
        scroll_offset_before: 0,
        init: function () {
            this.sticky();
            this.scroll();
            this.resize();
            this.processSticky();
            this.resetHeight();
            this.footerBottom();
        },
        sticky: function () {
            $('.header-sticky .sticky-area').each(function () {
                var $this = $(this);
                if (!$this.is(':visible')) {
                    return;
                }
                if (!$this.parent().hasClass('sticky-area-wrap')) {
                    $this.wrap('<div class="sticky-area-wrap"></div>');
                }
                var $wrap = $this.parent();
                var $nav_dashbard = $('.dashboard-nav');
                $wrap.height($this.outerHeight());
                if (window.matchMedia('(max-width: 1199px)').matches) {
                    $nav_dashbard.addClass('header-sticky-smart');
                } else {
                    $nav_dashbard.removeClass('header-sticky-smart');
                }
            });
        },
        resize: function () {
            $window.resize(function () {
                APP.headerSticky.sticky();
                APP.headerSticky.processSticky();
                APP.headerSticky.footerBottom();
            });
        },

        scroll: function () {
            $window.on('scroll', function () {
                APP.headerSticky.processSticky();
            });
        },
        processSticky: function () {
            var current_scroll_top = $window.scrollTop();

            var $parent = $('.main-header');
            var is_dark = false;
            if ($parent.hasClass('navbar-dark') && !$parent.hasClass('bg-secondary')) {
                is_dark = true;
            }
            $('.header-sticky .sticky-area').each(function () {
                var $this = $(this);
                if (!$this.is(':visible')) {
                    return;
                }

                var $wrap = $this.parent(),
                    sticky_top = 0,
                    sticky_current_top = $wrap.offset().top,
                    borderWidth = $body.css('border-width');
                if (borderWidth !== '') {
                    sticky_top += parseInt(borderWidth);
                }
                if (sticky_current_top - sticky_top < current_scroll_top) {
                    $this.css('position', 'fixed');
                    $this.css('top', sticky_top + 'px');
                    $wrap.addClass('sticky');
                    if (is_dark) {
                        $parent.removeClass('navbar-dark');
                        $parent.addClass('navbar-light');
                        $parent.addClass('navbar-light-sticky');
                    }

                } else {
                    if ($parent.hasClass('navbar-light-sticky')) {
                        $parent.addClass('navbar-dark');
                        $parent.removeClass('navbar-light');
                        $parent.removeClass('navbar-light-sticky');
                    }
                    if ($wrap.hasClass('sticky')) {
                        $this.css('position', '').css('top', '');
                        $wrap.removeClass('sticky');
                    }
                }

            });
            if (APP.headerSticky.scroll_offset_before > current_scroll_top) {
                $('.header-sticky-smart .sticky-area').each(function () {
                    if ($(this).hasClass('header-hidden')) {
                        $(this).removeClass('header-hidden');
                        if ($(this).find("*[class*='sticky-py-']").length) {
                            $(this).parent().height($(this).outerHeight());
                        }
                    }
                });
            } else {
                // down
                $('.header-sticky-smart .sticky-area').each(function () {
                    var $wrapper = $(this).parent();
                    if ($wrapper.length) {
                        if ((APP.headerSticky.scroll_offset_before > ($wrapper.offset().top + $(this).outerHeight())) && !$(this).hasClass('header-hidden')) {
                            $(this).addClass('header-hidden');
                        }
                    }

                });
            }
            APP.headerSticky.scroll_offset_before = current_scroll_top;
        },

        resetHeight: function () {
            APP.headerSticky.scroll_offset_before = 0;
            $('.header-sticky .sticky-area').each(function () {
                var $this = $(this),
                    $wrap = $this.parent();
                if ($wrap.find("*[class*='sticky-py-']").length) {
                    var Height = $this.outerHeight();
                    $window.on('scroll', function () {
                        var current_scroll_top = $window.scrollTop();
                        if (current_scroll_top === 0) {
                            $wrap.height(Height);
                        }
                    });
                    $window.resize(function () {
                        Height = $this.outerHeight();
                        $wrap.height(Height);
                    });
                }
            });
        },

        footerBottom: function () {
            var $main_footer = $('.footer');
            var $wrapper_content = $('#content');
            $main_footer.css('position', '');
            $wrapper_content.css('padding-bottom', '');
            if ($body.outerHeight() < $window.outerHeight()) {
                $main_footer.css('position', 'fixed');
                $main_footer.css('bottom', '0');
                $main_footer.css('left', '0');
                $main_footer.css('right', '0');
                $main_footer.css('z-index', '0');
                $wrapper_content.css('padding-bottom', $main_footer.outerHeight() + 'px');
            } else {
                $main_footer.css('position', '');
                $wrapper_content.css('padding-bottom', '');
            }
        }
    };
    APP.sidebarSticky = {
        init: function () {
            var header_sticky_height = 0;
            if (window.matchMedia('(max-width: 767px)').matches) {
                return;
            }
            if ($('#site-header.header-sticky').length > 0) {
                header_sticky_height = 60;
            }

            $('.primary-sidebar.sidebar-sticky > .primary-sidebar-inner').hcSticky({
                stickTo: '#sidebar',
                top: header_sticky_height + 30
            });
            $('.primary-map.map-sticky > .primary-map-inner').hcSticky({
                stickTo: '#map-sticky',
                top: header_sticky_height
            });
            $('.primary-summary.summary-sticky > .primary-summary-inner').hcSticky({
                stickTo: '#summary-sticky',
                top: header_sticky_height
            });

            $('.primary-gallery.summary-sticky > .primary-summary-inner').hcSticky({
                stickTo: '#summary-sticky',
                top: header_sticky_height
            });

            $('.form-review-sticky.summary-sticky > .form-review-inner').hcSticky({
                stickTo: '#form-review-sticky',
                top: header_sticky_height
            });
        }
    };
    APP.mapbox = {
        init: function () {
            var $map_box = $('.mapbox-gl');
            if ($map_box.length < 1) {
                return;
            }

            var options_default = {
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v10',
                center: [-73.9927227, 40.6734035],
                zoom: 16
            };
            $map_box.each(function () {
                var $this = $(this),
                    options = $this.data('mapbox-options'),
                    markers = $this.data('mapbox-marker');
                options = $.extend({}, options_default, options);
                mapboxgl.accessToken = $this.data('mapbox-access-token');
                var map = new mapboxgl.Map(options);
                var $marker_el = $($this.data('marker-target'));
                var $marker_els = $marker_el.find('.marker-item');
                if ($marker_els.length > 0) {
                    $.each($marker_els, function () {
                        var $marker_style = $(this).data('marker-style');
                        var el = document.createElement('div');
                        el.className = $marker_style.className;
                        el.style.backgroundImage = 'url(' + $(this).data('icon-marker') + ')';
                        el.style.width = $marker_style.style.width;
                        el.style.height = $marker_style.style.height;
                        new mapboxgl.Marker(el)
                            .setLngLat($(this).data('position'))
                            .setPopup(new mapboxgl.Popup({className: $marker_style.popup.className})
                                .setHTML($(this).html())
                                .setMaxWidth($marker_style.popup.maxWidth)
                            )
                            .addTo(map);
                    });
                } else {
                    $.each(markers, function () {
                        var el = document.createElement('div');
                        el.className = this.className;
                        el.style.backgroundImage = 'url(' + this.backgroundImage + ')';
                        el.style.backgroundRepeat = this.backgroundRepeat;
                        el.style.width = this.width;
                        el.style.height = this.height;
                        var marker = new mapboxgl.Marker(el)
                            .setLngLat(this.position)
                            .addTo(map);
                    })
                }

                map.scrollZoom.disable();
                map.addControl(new mapboxgl.NavigationControl());
                map.on('load', function () {
                    map.resize();
                });
            });


        }
    };
    APP.countdown = {
        init: function () {
            var $countDownEl = $('[data-countdown]');
            if ($countDownEl.length < 1) {
                return;
            }
            var $endTime = $countDownEl.data('countdown-end');
            // Set the date we're counting down to
            var countDownDate = new Date($endTime).getTime();

            // Update the count down every 1 second
            var x = setInterval(function () {

                // Get today's date and time
                var now = new Date().getTime();

                // Find the distance between now and the count down date
                var distance = countDownDate - now;

                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Output the result
                $(".day").html(days);
                $(".hour").html(('0' + hours).slice(-2));
                $(".minute").html(('0' + minutes).slice(-2));
                $(".second").html(('0' + seconds).slice(-2));

                // If the count down is over, write some text
                if (distance < 0) {
                    clearInterval(x);
                }
            }, 1000);

        },


    };
    APP.canvas = {
        init: function () {
            var options_default = {
                container: ".canvas-sidebar"
            };
            var $canvas_buttons = $('[data-canvas]');
            $canvas_buttons.each(function () {
                var $this = $(this);
                var options = $this.data('canvas-options');
                options = $.extend({}, options_default, options);
                var $container = $(options.container);
                $this.on('click', function () {
                    $container.addClass('show');

                });
                $container.find('.canvas-close').on('click', function () {
                    $container.removeClass('show');

                });
            });

        },

    };

    APP.shopSingle = {
        init: function () {
            this.shopVariations();
            this.shopFBT();
            this.showFormReview();
            this.shopSwatchColor();
            this.scrollFormReview();
        },
        shopVariations: function () {
            var swatch = $('.shop-swatch'),
                swatchesItem = swatch.find('.swatches-item'),
                swatchesSelect = swatch.find('.swatches-select');

            if (swatch.length < 1 && swatchesItem.length < 1) {
                return;
            }

            swatchesItem.unbind('click').on('click', function (e) {
                e.preventDefault();
                var $this = $(this);
                if ($this.hasClass('selected')) {
                    return false;
                }
                $this.parent().siblings().removeClass('selected');
                $this.parent().addClass('selected');
                swatchesSelect.val($this.attr('data-var'));
            });
        },
        shopFBT: function () {
            var FBT = $('.frequently-bought-togheter'),
                fbtItem = FBT.find('.frequently-bought-togheter-item'),
                addItem = fbtItem.find('.add-to-item');

            const originalTitle = addItem.attr('data-original-title');
            const titleAdded = addItem.attr('data-added');


            if (FBT.length < 1 && fbtItem.length < 1) {
                return;
            }

            addItem.unbind('click').on('click', function (e) {
                e.preventDefault();
                var $this = $(this);

                if ($this.hasClass('checked')) {
                    $this.removeClass('checked');
                    $this.siblings('.form-check-input').prop("checked", false);
                    $this.html('<svg class="icon icon-plus"><use xlink:href="#icon-plus"></use></svg>');
                    switchTooltip($this, originalTitle);

                } else {
                    $this.addClass('checked');
                    $this.siblings('.form-check-input').prop("checked", true);
                    $this.html('<svg class="icon icon-check-bold"><use xlink:href="#icon-check-bold"></use></svg>');
                    switchTooltip($this, titleAdded);
                }

            });

            function switchTooltip(selector, word) {
                var toolTip = selector.siblings('.tooltip');

                if (selector.length < 1 && toolTip.length < 1) {
                    return;
                }

                selector.attr('data-original-title', word);
                toolTip.find('.tooltip-inner').html(word);
            }
        },
        showFormReview: function () {
            $('.write-review').on('click', function (e) {
                var link = $(this).attr('href');
                if (link !== '#customer-review') {
                    e.preventDefault();
                }
                $('.form-review').toggle("slide", {direction: "up"}, 500);
            });

            $('.btn-custom-input-file').on('click', function (e) {
                var id = '#' + $(this).attr('for');
                var filename = $(this).siblings(id);
                if (filename.length > 0) {
                    filename.change(function () {
                        var val = filename.val();
                        if (val.substring(3, 11) === 'fakepath') {
                            val = val.substring(12);
                        }
                        if ($(this).siblings('.name-file').length > 0) {
                            $(this).siblings('.name-file').html(val);
                        }
                    });
                }

            });


        },
        shopSwatchColor: function () {
            var swatch = $('.shop-swatch-color'),
                swatchesItem = swatch.find('.swatches-item'),
                swatchesSelect = swatch.find('.swatches-select');

            if (swatch.length < 1 && swatchesItem.length < 1) {
                return;
            }

            swatchesItem.unbind('click').on('click', function (e) {
                e.preventDefault();
                var $this = $(this);
                if ($this.hasClass('selected')) {
                    return false;
                }
                $this.parent().siblings().removeClass('selected');
                $this.parent().addClass('selected');
                swatchesSelect.val($this.attr('data-var'));
                swatch.find('label .var').html($this.attr('data-var'));
            });
        },
        scrollFormReview: function () {
            var formReviewSticky = $('#form-review-sticky');
            if (formReviewSticky.length < 1) {
                return;
            }
            $('body').scrollspy({
                target: '#form-review-sticky',
                offset: 200
            });
            formReviewSticky.find('.write-review')
                // Remove links that don't actually link to anything
                .not('[href="#"]')
                .not('[href="#0"]')
                .click(function (event) {
                    // On-page links
                    if (
                        location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
                        &&
                        location.hostname === this.hostname
                    ) {
                        // Figure out element to scroll to
                        var target = $(this.hash);
                        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                        // Does a scroll target exist?
                        if (target.length) {
                            // Only prevent default if animation is actually gonna happen
                            event.preventDefault();
                            $('html, body').animate({
                                scrollTop: target.offset().top
                            }, 500, function () {
                                // Callback after animation
                            });
                        }
                    }
                });
        },
    }

    $(document).ready(function () {
        APP.init();
        APP.slickSlider.init();
        APP.counter.init();
        APP.util.init();
        APP.CollapseTabsAccordion.init();
        APP.animation.init();
        APP.headerSticky.init();
        APP.sidebarSticky.init();
        APP.mapbox.init();
        APP.countdown.init();
        APP.canvas.init();
        APP.shopSingle.init();
 
          
    });
})(jQuery);
// new bdinar
$(document).ready(function () {
           $('.drop-up-btn').click(function () {
            // $(this).toggleClass('active');
            $(this).children('.mobile-navigation-dropup').slideToggle();
          });
          
          $('.tabb.tab').click(function () {
            $(this).toggleClass('active');
            $(".tabb.tab").not(this).removeClass('active');
          });
});


  

// Main scripts for the project
! function () {
    var xMouseCoord, yMouseCoord;
    var currentElXCoordArray = [];
    var currentElYCoordArray = [];
    var currentMenuElXCoordArray = [];
    var currentMenuElYCoordArray = [];
    //Menu mobile
    var menuEl = document.querySelector('.m-menu');
    var menuBtnEl = document.querySelector('.m-button');
    var menuBtnCloseEl = document.querySelector('.m-button-close');
    menuBtnEl.addEventListener('click', function () {
        menuEl.classList.add('m-menu_opened');
        document.querySelector('html').classList.add('is-locked');
    });
    menuBtnCloseEl.addEventListener('click', function () {
        menuEl.classList.remove('m-menu_opened');
        document.querySelector('html').classList.remove('is-locked');
    });
    //Carousel
    var carouselEl = document.querySelectorAll('.carousel');
    for (var i = 0; i < carouselEl.length; i++) {
        carouselEl[i].classList.add('carousel-' + i);
        var carouselObj = new Swiper('.carousel-' + i, {
            speed: 600,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            autoplay: {
                delay: 2500
            }
        });
    }
    //Jquery
    var isMobile;
    var isCompleted = false;

    function getDeviceType() {
        if (window.innerWidth < 768) {
            isMobile = true;
        } else if (window.innerWidth > 767) {
            isMobile = false;
        }
    }
    $(window).on('resize', function () {
        getDeviceType();
        if (!isMobile && isCompleted) {
            $('.section__carousel').each(function (index) {
                $(this).append($(this).parent().find('.box__carousel'));
            });
            isCompleted = false;
        } else if (isMobile && !isCompleted) {
            $('.box__text').each(function (index) {
                $(this).after($(this).parent().parent().find('.box__carousel'));
            });
            isCompleted = true;
        }
    });
    $(document).on('mousemove', function (e) {
        xMouseCoord = e.pageX;
        yMouseCoord = e.pageY;
    });

    $(document).ready(function () {
        //Menu
        $('.menu__link').hover(function () {
            var linkDataValue = $(this).data('menu');
            if (linkDataValue) {
                $('.menu__link').addClass('menu__link_no-active');
                $(this).removeClass('menu__link_no-active').addClass('menu__link_active');
                $('.dropdown-menu').each(function () {
                    if ($(this).data('id') === linkDataValue) {
                        $(this).css({"display": "inherit"});
                        $(this).addClass('dropdown-menu_opened');
                    }
                    else
                    {
                       $(this).css({"display": "none"});
                       $(this).removeClass('dropdown-menu_opened');
                    }
                });
                currentElXCoordArray.push($(this).offset().left);
                currentElXCoordArray.push($(this).offset().left + $(this).outerWidth());
                currentElYCoordArray.push($(this).offset().top);
                currentElYCoordArray.push($(this).offset().top + $(this).outerHeight());
                currentMenuElXCoordArray.push($('.dropdown-menu_opened').offset().left);
                currentMenuElXCoordArray.push($('.dropdown-menu_opened').offset().left + $('.dropdown-menu_opened').outerWidth());
                currentMenuElYCoordArray.push($('.dropdown-menu_opened').offset().top - 15);
                currentMenuElYCoordArray.push($('.dropdown-menu_opened').offset().top - 15 + $('.dropdown-menu_opened').outerHeight());
            }
        }, function (e) {
            setTimeout(function () {
                if (((xMouseCoord > currentElXCoordArray[0] && xMouseCoord < currentElXCoordArray[1]) && (yMouseCoord > currentElYCoordArray[0] && yMouseCoord < currentElYCoordArray[1])) || ((xMouseCoord > currentMenuElXCoordArray[0] && xMouseCoord < currentMenuElXCoordArray[1]) && (yMouseCoord > currentMenuElYCoordArray[0] && yMouseCoord < currentMenuElYCoordArray[1]))) {} else {
                   //$('.menu__link').removeClass('menu__link_active menu__link_no-active');
                   //$('.dropdown-menu').removeClass('dropdown-menu_opened');
                }
            }, 0);
        });
        $(document).on('mouseleave', '.dropdown-menu_opened', function () {
            setTimeout(function () {
                if (((xMouseCoord > currentElXCoordArray[0] && xMouseCoord < currentElXCoordArray[1]) && (yMouseCoord > currentElYCoordArray[0] && yMouseCoord < currentElYCoordArray[1])) || ((xMouseCoord > currentMenuElXCoordArray[0] && xMouseCoord < currentMenuElXCoordArray[1]) && (yMouseCoord > currentMenuElYCoordArray[0] && yMouseCoord < currentMenuElYCoordArray[1]))) {} else {
                    $('.menu__link').removeClass('menu__link_active menu__link_no-active');
                    $('.dropdown-menu').removeClass('dropdown-menu_opened');
                    $('.dropdown-menu').css({"display": "none"});
                }
            }, 100);
        });
        getDeviceType();
        if (isMobile && !isCompleted) {
            $('.box__text').each(function (index) {
                $(this).after($(this).parent().parent().find('.box__carousel'));
            });
            isCompleted = true;
        }
        $('.has-children > .m-menu__link').on('click', function (e) {
            e.preventDefault();
            $(this).toggleClass('m-menu__link_active');
            $(this).next().toggleClass('m-menu__dropdown_opened');
        });
    });
}();
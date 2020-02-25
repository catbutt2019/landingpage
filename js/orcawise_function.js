// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the header
var header = document.getElementById("myHeader");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

var modal = document.querySelector(".modal");
var triggers = document.getElementsByName("services-menu-no-link");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

triggers.forEach(element => {
    element.addEventListener("click", toggleModal);
});
// trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

$(document).ready(function () {
    $(".dropdown-menu").css({"transition": "inherit"});
    $(".dropdown-menu").css({"display": "none"});
    $(".error-label").css({"visibility": "hidden"});
    // consultation
    function validateEmail(sEmail, element) {
        var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (filter.test(sEmail) || sEmail == '') {
            element.css({"visibility": "hidden"});
            return true;
        }
        else {
            //$('.error-label').css({"visibility": "inherit"});
            element.css({"visibility": "inherit"});
            return false;
        }
}
        $("[name*=email]").on('keyup',
        function()
        {
            event.preventDefault();
            value = $(this).val();
            element = $(this).next();
            
            validateEmail(value, element)
        })
 
        $("form").submit(
            function( event ) {
                event.preventDefault();
                $.ajax({
                    url: '/onlineApi/ConsultationDashboard',
                    type: 'get',
                    dataType: 'json',
                    data: $(this).serialize(),
                    success: function(data) {
                        location.href = "/done.html";
                    }
                });
              }
        );

        document.getElementById("gotohome").onclick = function () {
            location.href = "/";
        };

        document.getElementById("solutions-menu").onclick = function () {
            location.href = "/find_buyer.html";
        };
        document.getElementById("services-menu").onclick = function () {
            location.href = "/professional_services.html";
        };
        document.getElementById("industries-menu").onclick = function () {
            location.href = "/industries.html";
        };
        
        
});

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
        $('[name*=invert-form]').each(function (index) {
            $(this).before($(this).parent().parent().find('.box__carousel'));
        });
        isCompleted = true;
    }
});
$(document).ready(function () {
    getDeviceType();
    if (isMobile && !isCompleted) {
        $('[name*=invert-form]').each(function (index) {
            $(this).before($(this).parent().parent().find('.box__carousel'));
        });
        isCompleted = true;
    }
   
});

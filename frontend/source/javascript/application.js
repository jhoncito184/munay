var urlPage = { 
    "path"              : '/freelo/munay',
    "home"              : "/", 
    "beneficios"        : "/beneficios.html", 
    "medio_ambiente"    : "/medio_ambiente.html",
    "tecnologia"        : "/tecnologia.html",
    "clientes"          : "/clientes.html",
    "contacto"          : "/contacto.html"
}

var viewJs = function () {
    var pathname = window.location.pathname
    
    switch(pathname) {
        case urlPage.home:
            bind()
            break;
        case urlPage.beneficios:
            bind()
            accordion()
            changeImage()
            modalBeneficios('.modal', '.trigger', '.close-button')
            break;
        case urlPage.medio_ambiente:
            bind()
            break;
        case urlPage.tecnologia:
            accordionTecnologia()
            swiperTecnologia()
            break;
        case urlPage.clientes:
            swiperClientes()
            break;
        case urlPage.contacto:
            break;
    }
}

var urlPathname = function () {
    return window.location.pathname
}

var bind = function () {
    window.addEventListener('scroll', scrollBottomArea(300, 150))  
};

var hamburger = function () {
    // HEADER HAMBURGUER
    var toggleIcon = document.querySelector('.icon_hamburguer'),
        responsiveNavButton = document.querySelector('.icon_hamburguer'),
        responsiveNavMenu = document.querySelector('nav#responsive'),
        headBar = document.querySelector('header .head-bar')

    function toggleNav(){
        responsiveNavMenu.style.left === '0%' ? responsiveNavMenu.style.left = '-100%' : responsiveNavMenu.style.left = '0%';
        headBar.style.background = '#000'
        document.querySelector('header .head-bar .logo__mobile img').setAttribute('src', './images/logo_munay_white_mobile.svg')
        document.querySelector('.hamburguer').style.filter = 'none'
    }

    function closeToggleNav(){
        responsiveNavMenu.style.left = '-100%'
        headBar.style.background = 'transparent'
        document.querySelector('header .head-bar .logo__mobile img').setAttribute('src', './images/logo_munay_black_mobile.svg')
        document.querySelector('.hamburguer').style.filter = 'none'
    }

    if (responsiveNavButton) {
        responsiveNavButton.addEventListener('click', function () {
            toggleNav()
            if (toggleIcon.classList.contains('active')) {
                headBar.style.background = 'transparent'
                if (urlPathname() == urlPage.beneficios || urlPathname() == urlPage.tecnologia || urlPathname() == urlPage.clientes) {
                    closeToggleNav()
                }
            }
        })
        toggleIcon.onclick = function() {
            toggleIcon.classList.toggle('active');
            if (toggleIcon.classList.contains('active')) {
                document.body.style.overflow = 'hidden'
            } else {
                document.body.style.overflow = 'inherit'
            }
        }
    }

    // var postBoxes = document.querySelectorAll("nav#responsive #main2 li a")
    // postBoxes.forEach(function(postBox) {
    //     postBox.addEventListener('click', function() {
    //         toggleNav()
    //         toggleIcon.classList.toggle('active')
            
    //     })
    // })
}

var scrollBottomArea = function (amountScrollDesktop, amountScrollMobile) {
    var lastScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0

    window.addEventListener('scroll', function() {
        var currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
            list_a = document.querySelectorAll('nav#big-screen ul li a'),
            isMobileDevice = false

            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                isMobileDevice = true
            }
        
        lastScroll = currentScroll <= 0 ? 0 : currentScroll;
        switch (isMobileDevice) {
            case true:
                if (lastScroll > 0) {
                    // document.querySelector('header .head-bar').style.background = '#ECEFE8'
                    if ( urlPathname() == urlPage.medio_ambiente) {
                        // document.querySelector('header .head-bar').style.background = '#C9D2C0'
                        document.querySelector('header .head-bar .logo__mobile img').setAttribute('src', './images/logo_munay_white_mobile.svg')
                    }
                    // if (urlPathname() != urlPage.beneficios) {
                    //     document.querySelector('header .head-bar .logo__mobile img').setAttribute('src', './images/logo_munay_black_mobile.svg')
                    //     document.querySelector('.hamburguer').style.filter = 'invert(1)'
                    // }
                } else {
                    if ( urlPathname() == urlPage.medio_ambiente) {
                        document.querySelector('.hamburguer').style.filter = 'invert(1)'
                    }
                    if (urlPathname() != urlPage.beneficios) {
                        document.querySelector('header .head-bar').style.background = 'transparent'
                        document.querySelector('header .head-bar .logo__mobile img').setAttribute('src', './images/logo_munay_white_mobile.svg')
                        document.querySelector('.hamburguer').style.filter = 'none'
                    }
                }

            case false:
                if (lastScroll > 1000) {
                    document.querySelector('header .head-bar .logo__desktop img').setAttribute('src', './images/logo_munay_black.svg')
                    document.querySelector('header .head-bar .contact a').style.color = '#233029'
                    for (var i = 0; i < list_a.length; i++) {
                        list_a[i].style.color = '#233029'
                    }
                } else {
                    if (urlPathname() != urlPage.beneficios && urlPathname() != urlPage.medio_ambiente) {
                        document.querySelector('header .head-bar .logo__desktop img').setAttribute('src', './images/logo_munay_white.svg')
                    }
                    document.querySelector('header .head-bar .contact a').style.color = '#FFF'
                    for (var i = 0; i < list_a.length; i++) {
                        list_a[i].style.color = '#FFF'
                    }
                }
                break;
        }
        
    });
};

var accordion = function() {
    var acc = document.getElementsByClassName("accordion"),
        boxImage = document.querySelectorAll('.beneficios__section-01_box .image img')
    var i;
    
    for (var i = 0; i < boxImage.length; i++) {
        boxImage[i].style.display = 'none';
    }
    boxImage[0].style.display = 'block';

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            
            var panel = this.nextElementSibling;
            var panel_this = this,
                panel_all = document.querySelectorAll('.beneficios__section-01_box .panel'),
                accordion_all = document.querySelectorAll('.beneficios__section-01_box .accordion'),
                tabName = panel_this.getAttribute("tab-name"),
                boxImage = document.querySelectorAll('.beneficios__section-01_box .image'),
                boxImg = document.querySelectorAll('.beneficios__section-01_box .image img'),
                image = document.querySelector('#' + tabName + '-img')
            
            function clearAccordion() {
                for (y = 0; y < panel_all.length; y++) {
                    panel_all[y].style.maxHeight = null
                    panel_all[y].style.margin = null
                    panel_all[y].style.marginTop = null
                    panel_all[y].style.padding = null
                    for (i = 0; i < accordion_all.length; i++) {
                        accordion_all[i].style.opacity = '0.5'
                    }
                }
                for (x = 0; x < acc.length; x++) {
                    acc[x].classList.remove("active");
                }
            }
            if (this.classList.contains('active')) {
                clearAccordion()
                return
            }
            for (var i = 0; i < boxImg.length; i++) {
                boxImg[i].style.display = 'none'
            }
            image.style.display = 'block'

            
            clearAccordion()
                        
            this.classList.toggle("active");
            
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null
                panel.style.margin = null
                panel.style.marginTop = null
                panel.style.padding = null
                panel_this.style.opacity = '0.5'
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                panel.style.margin = "0";
                if (window.innerWidth >= 1366) {
                    panel.style.marginTop = "-5px";
                    panel.style.padding = '0 80px 20px'
                } else if (window.innerWidth > 768) {
                    panel.style.marginTop = "0";
                    panel.style.padding = '0 50px 20px'
                } else if (window.innerWidth <= 768) {
                    boxImage.style.display = 'block'
                    panel.style.marginTop = "0";
                    panel.style.padding = '0 30px 20px'
                }
                panel_this.style.opacity = 'inherit'
            } 
        });
    }
}

var changeImage = function () {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img = document.querySelector('#logo_image'),
                image_name = this.files[0].name

            img.onload = function () {
                URL.revokeObjectURL(img.src);
            }
            img.src = URL.createObjectURL(this.files[0]);
            document.querySelector('.beneficios__section-02_box .content__upload .file-upload span').innerText = image_name
        }
    });
}

var modalBeneficios = function () {
    const modal = document.querySelector(".modal");
    const trigger = document.querySelectorAll(".trigger");
    const closeButton = document.querySelectorAll(".close-button");
    
    function toggleModal() {
        modal.classList.toggle("show-modal");
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        document.querySelector('.beneficios').scrollTo(0, 0);
        document.querySelector('body').style.overflow = 'hidden'
        document.querySelector('header .head-bar .logo__mobile img').setAttribute('src', './images/logo_munay_white_mobile.svg')
        document.querySelector('.hamburguer').style.filter = 'invert(1)'
    }
    
    function windowOnClick(event) {
        if (event.target === modal) {
            toggleModal();
        }
    }
    
    for (var i = 0; i < trigger.length; i++) {
        const tab_name = trigger[i].getAttribute('data-tab');
        trigger[i].addEventListener("click", function() {
            showImagesModal(tab_name)
            toggleModal()
        })
    }
    for (var i = 0; i < closeButton.length; i++) {
        closeButton[i].addEventListener("click", function() {
            toggleModal()
            document.querySelector('body').style.overflow = 'inherit'
            document.querySelector('header .head-bar .logo__mobile img').setAttribute('src', './images/logo_munay_black_mobile.svg')
            document.querySelector('.hamburguer').style.filter = 'none'
        });
    }

    window.addEventListener("click", windowOnClick);
}

var showImagesModal = function (tab_name) {
    const image = document.querySelectorAll('.beneficios .modalBeneficios__image img')
    const title = document.querySelectorAll('.beneficios .modal .modal-content .modalBeneficios__text_title .content')
    const text = document.querySelectorAll('.beneficios .modal .modal-content .modalBeneficios__text_subtitle .content')
    
    for (var i = 0; i < image.length; i++) {
        var data_tab = image[i].getAttribute('data-tab')
        image[i].classList.remove('show')
        if (data_tab == tab_name) {
            image[i].classList.add('show')
        }
    }

    for (var i = 0; i < title.length; i++) {
        var data_tab = title[i].getAttribute('data-tab')
        title[i].classList.remove('show')
        if (data_tab == tab_name) {
            title[i].classList.add('show')
        }
    }

    for (var i = 0; i < text.length; i++) {
        var data_tab = text[i].getAttribute('data-tab')
        text[i].classList.remove('show')
        if (data_tab == tab_name) {
            text[i].classList.add('show')
        }
    }
}

var accordionTecnologia = function() {
    var acc = document.getElementsByClassName("accordion"),
        panel_all = document.querySelectorAll('.tecnologia__section-01_content .box__list .panel')
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            
            var panel = this.nextElementSibling,
                accordion_all = document.querySelectorAll('.beneficios__section-01_box .accordion')

            function clearAccordion() {
                for (y = 0; y < panel_all.length; y++) {
                    panel_all[y].style.maxHeight = null
                    panel_all[y].style.margin = null
                    panel_all[y].style.marginTop = null
                    panel_all[y].style.padding = null
                    for (i = 0; i < accordion_all.length; i++) {
                        accordion_all[i].style.opacity = '0.5'
                    }
                }
                for (x = 0; x < acc.length; x++) {
                    acc[x].classList.remove("active");
                }
            }
            console.log(this.classList.contains('active'))
            if (this.classList.contains('active')) {
                clearAccordion()
                return
            }

            clearAccordion()

            this.classList.toggle("active");

            if (panel.style.maxHeight) {
                panel.style.maxHeight = null
                panel.style.padding = null
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                panel.style.padding = "20px 80px";
            } 
        });
    }
}

var swiperTecnologia = function () {
    var swiper = new Swiper(".swiperTecnologia", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".arrowTecnologiaNext",
            prevEl: ".arrowTecnologiaPrev",
        },
    });
}

var swiperClientes = function () {
    var swiper = new Swiper(".swiperClientes", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".arrowClientesNext",
            prevEl: ".arrowClientesPrev",
        },
    });
}

var main = function () {
    viewJs()
    hamburger()
};
  
document.addEventListener('DOMContentLoaded', main);
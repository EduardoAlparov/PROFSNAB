import { Modal } from "./modules/Modal.js";

document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.remove('preload');

    // inits modals: ==========================================================
    const modal = new Modal({
        isOpen: (modal) => {
        },
        isClose: (modal) => {
        },
    });
    //// inits modals: =========================================================

    // hide header when scroll: ==============================================
    const header = document.querySelector('.header');

    if(header) {
        const headerScrollHeader = ScrollTrigger.create({
            start: "top top",
            end: "max",
            onUpdate: self => {
                if(self.progress.toFixed(3) > 0.02 && self.direction > 0) {
                    header.classList.add('header--hide');
                    header.classList.add('header--black-bottom');
                } else if(self.direction < 0 && self.progress.toFixed(3) < 0.04) {
                    header.classList.remove('header--black-bottom');
                } else {
                    header.classList.remove('header--hide');
                }

            }
        });
    }

    const introSecs = document.querySelectorAll('.intro-trigger');
    const containerMain = document.querySelector('._with-scroll-animation');
    const triggers = document.querySelectorAll('.animation-trigger');

    if(introSecs.length) {
        introSecs.forEach(i => {
          i.classList.remove('_animate-on-delete');
        })
      }

    if(containerMain) {
        const bodyScrollTrigger = ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: self => {
                triggers.forEach(item => {
                    if(ScrollTrigger.isInViewport(item)) {
                        setTimeout(() => {
                            item.classList.remove('_animate-on-delete');
                        }, 300);
                    }
                })
            }
        });
      }

    //// hide header when scroll end  =========================================

    // header searchbar control:  =========================================
    const searchbarsContaniers = document.querySelectorAll('.js-searchbar-control');

    searchbarsContaniers.forEach( searchbar => {
        searchbar.addEventListener('click', (e) => {
            if(e.target.closest('.js-searchbar-open')) {
                let searchbarBody = e.target.closest('.searchbar');
                searchbarBody.querySelector('.searchbar__popup').classList.add('searchbar__popup--opened');
            }

            if(e.target.closest('.js-searchbar-close')) {
                let searchbarBody = e.target.closest('.searchbar');
                searchbarBody.querySelector('.searchbar__popup').classList.remove('searchbar__popup--opened');
            }
        })
    });

    //// header searchbar control  =========================================

    // swiper sliders ========================================================
    const introSwiper = new Swiper('.js-intro-swiper', {
        // Optional parameters
        loop: true,
        speed: 500,

        effect: 'creative',
        creativeEffect: {
            prev: {
                // will set `translateZ(-400px)` on previous slides
                translate: [0, 0, -400],
                opacity: 0
            },
            next: {
                // will set `translateX(100%)` on next slides
                translate: ['100%', 0, 0],
                opacity: 0
            },
        },

        // Navigation arrows
        navigation: {
            hideOnClick: true,
            nextEl: '.intro__swiper-button-next',
            prevEl: '.intro__swiper-button-prev',
        },

        breakpoints: {
            767: {
                navigation: {
                    hideOnClick: false
                },
            }
        }
    });

    const cardsSwiper = new Swiper('.js-carousel-swiper', {
        // Optional parameters
        slidesPerView: 'auto',
        spaceBetween: 10,
        loop: true,
        speed: 500,

        // Navigation arrows
        navigation: {
          nextEl: '.carousel__swiper-button-next',
          prevEl: '.carousel__swiper-button-prev',
        },

        pagination: {
            el: '.swiper-pagination',
            type: 'progressbar',
        },

        breakpoints: {
            767: {
                spaceBetween: 20,
            }
        }
    });
    //// swiper sliders ========================================================

    // seo text open start====================================================
    const seoTextButtons = document.querySelectorAll('.seo__text-wrapper--closed');
    if (seoTextButtons.length) {
        seoTextButtons.forEach(element => {
            element.addEventListener('click', () => {
                element.classList.remove('seo__text-wrapper--closed');
            })
        });
    }
    //// seo end===============================================================

    // scroll up on press button (in footer): =================================
    const scrollUpButton = document.querySelector('.scroll-up-button');
    if(scrollUpButton) {
        scrollUpButton.addEventListener('click', () => {
            gsap.to(window, {duration: 2, scrollTo: 0});
        })
    }
    ////scroll up on press button (in footer) =================================

    // fancybox: ==============================================================
    const fancyboxContainer = document.querySelectorAll('[data-role="fancybox-container"]');

    if(fancyboxContainer.length) {
        Fancybox.bind("[data-fancybox='certificates']", {
            // Your custom options
          });
    }
    //// fancybox ==============================================================

    // ya maps: ===============================================================
    const mapWrapper = document.getElementById('yamap');

    if(mapWrapper) {
        ymaps.ready(init);

        function init () {
          let myMap = new ymaps.Map('yamap', {
            center: [55.745002, 49.104429],
            zoom: 17,
            controls: ['zoomControl'],
            behaviors: ['drag'],
          }, {});

            myMap.geoObjects.add(
                new ymaps.Placemark( [55.745002, 49.104429], {
                    hintContent: 'г.Казань, ул. ул.Магистральная, зд 35, помещение 2'
                }, {
                    iconLayout: ymaps.templateLayoutFactory.createClass([
                        '<div class="ya-maps-placemark"">',
                        '{% include "default#image" %}',
                        '</div>'
                      ].join('')),
                    iconImageHref: '/images/svg/map-pin.svg',
                    iconImageSize: [59, 90],
                    iconImageOffset: [-29, -90]
                })
            )
        }
    }
    //// ya maps: ==============================================================

    // info-product control ====================================================
    const infoProducts = document.querySelectorAll('.js-info-product');

    if(infoProducts.length) {
        infoProducts.forEach( infoProduct => {
            infoProduct.addEventListener('click', (e) => {
                if(e.target.closest('.info-product__button')) {
                    infoProduct.querySelectorAll('.info-product__button').forEach( btn => {
                        btn.classList.remove('info-product__button--active');
                    });

                    let button = e.target.closest('.info-product__button');
                    button.classList.add('info-product__button--active');

                    let path = e.target.closest('.info-product__button').dataset.button;

                    infoProduct.querySelectorAll('.info-product__window-item').forEach( windowItem => {
                        windowItem.classList.remove('info-product__window-item--visible');
                    });

                    infoProduct.querySelector(`[data-role=${path}]`).classList.add('info-product__window-item--visible');
                }
            })
        });
    }

    //// info-product control ==================================================

    // forms masks: ============================================================
    const forms = document.getElementsByTagName('form');
    const phoneInputs = document.querySelectorAll('.js-input-mask_phone');
    const nameInputs = document.querySelectorAll('.js-input-mask_text');
    const emailInputs = document.querySelectorAll('.js-input-mask_email');

    if(forms.length) {
      phoneInputs.forEach(phoneInput => {
        const phoneMask = IMask(phoneInput, {
          mask: '+{7}(000)000-00-00'
        });
      })

      nameInputs.forEach(nameInput => {
        const nameMask = IMask(nameInput, {
          mask: /^[А-Яа-яЁёA-Za-z ]+$/,
        });
      })

      emailInputs.forEach(emailInput => {
        const emailMask = IMask(emailInput, {
          mask: /^\S*@?\S*$/,
        });
      })
    }
    //// forms masks ==========================================================
})

"use strict";
const JSCCommon = {
	modalCall() {
		const link = '[data-fancybox="modal"], .link-modal-js';

		Fancybox.bind(link, {
			arrows: false,
			// infobar: false,
			touch: false,
			trapFocus: false,
			placeFocusBack: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			groupAll: false,
			groupAttr: false,
			// showClass: "fancybox-throwOutUp",
			// hideClass: "fancybox-throwOutDown",
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
			},
		});
		document.querySelectorAll(".modal-close-js").forEach(el => {
			el.addEventListener("click", () => {
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		document.addEventListener('click', (event) => {
			let element = event.target.closest(link)
			if (!element) return;
			let modal = document.querySelector("#" + element.dataset.src);
			const data = element.dataset;

			function setValue(val, elem) {
				if (elem && val) {
					const el = modal.querySelector(elem)
					el.tagName == "INPUT"
						? el.value = val
						: el.innerHTML = val;
					// console.log(modal.querySelector(elem).tagName)
				}
			}
			setValue(data.title, '.ttu');
			setValue(data.text, '.after-headline');
			setValue(data.btn, '.btn');
			setValue(data.order, '.order');
		})
	},
	// /modalCall
	toggleMenu() {
		document.addEventListener("click", function (event) {
			const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
			const menu = document.querySelector(".menu-mobile--js");
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, { passive: true });
	},
	closeMenu() {
		const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		if (menu.classList.contains("active")) {
			toggle.forEach(element => element.classList.remove("on"));
			menu.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
		}

	},
	mobileMenu() {
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
			if (!container && !toggle) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},

	// tabs  .
	tabscostume(tab) {
		// const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		// tabs.forEach(element => {
		// 	let tabs = element;
		// 	const tabsCaption = tabs.querySelector(".tabs__caption");
		// 	const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
		// 	const tabsWrap = tabs.querySelector(".tabs__wrap");
		// 	const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
		// 	const random = Math.trunc(Math.random() * 1000);
		// 	tabsBtn.forEach((el, index) => {
		// 		const data = `tab-content-${random}-${index}`;
		// 		el.dataset.tabBtn = data;
		// 		const content = tabsContent[index];
		// 		content.dataset.tabContent = data;
		// 		if (!content.dataset.tabContent == data) return;

		// 		const active = content.classList.contains('active') ? 'active' : '';
		// 		// console.log(el.innerHTML);
		// 		content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
		// 	})


		// 	tabs.addEventListener('click', function (element) {
		// 		const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
		// 		if (!btn) return;
		// 		const data = btn.dataset.tabBtn;
		// 		const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
		// 		const content = this.querySelectorAll(`[data-tab-content]`);
		// 		tabsAllBtn.forEach(element => {
		// 			element.dataset.tabBtn == data
		// 				? element.classList.add('active')
		// 				: element.classList.remove('active')
		// 		});
		// 		content.forEach(element => {
		// 			element.dataset.tabContent == data
		// 				? (element.classList.add('active'), element.previousSibling.classList.add('active'))
		// 				: element.classList.remove('active')
		// 		});
		// 	})
		// })

		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask({ "mask": "+9(999)999-99-99", showMaskOnHover: false }).mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				Fancybox.close();
				Fancybox.show([{ src: "#modal-thanks", type: "inline" }]);
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	heightSlide() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		function getSlideH() {
			let slideI = document.querySelectorAll('.sTeam__img-wrap');
			if (slideI.length == 0) return;
			let slideH, index = 0;
			for (const iterator of slideI) {
				if (index < 1) {
					slideH = iterator.offsetHeight;
					index++;
				} else break;
			};
			// console.log(slideH);
			document.documentElement.style.setProperty('--slideH', `${slideH}px`);
		};
		getSlideH();
		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			getSlideH();
		}, { passive: true });
	},
	animateScroll() {
		const h = $(".header ").innerHeight();
		$(document).on('click', "  .scroll-link, .sGlossary__slide a", function (e) {

			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				e.preventDefault();
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - h }, 700);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	toggleShow(toggle, drop) {

		let catalogDrop = drop;
		let catalogToggle = toggle;

		$(document).on('click', catalogToggle, function () {
			$(this).toggleClass('active').next().fadeToggle('fast', function () {
				$(this).toggleClass("active")
			});
		})

		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(catalogDrop + ".active"); // (1)
			let link = event.target.closest(catalogToggle); // (1)
			if (!container || !catalogToggle) {
				$(catalogDrop).removeClass('active').fadeOut();
				$(catalogToggle).removeClass('active');
			};
		}, { passive: true });
	},
	makeDDGroup() {
		let parents = document.querySelectorAll('.dd-group-js');
		for (let parent of parents) {
			if (parent) {
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
				$(ChildHeads).click(function () {
					let clickedHead = this;

					$(ChildHeads).each(function () {
						if (this === clickedHead) {
							//parent element gain toggle class, style head change via parent
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.dd-content-js').slideToggle(function () {
								$(this).toggleClass('active');
							});
						}
						// else {
						// 	$(this.parentElement).removeClass('active');
						// 	$(this.parentElement).find('.dd-content-js').slideUp(function () {
						// 		$(this).removeClass('active');
						// 	});
						// }
					});

				});
			}
		}
	},
	imgToSVG() {
		const convertImages = (query, callback) => {
			const images = document.querySelectorAll(query);

			images.forEach(image => {
				fetch(image.src)
					.then(res => res.text())
					.then(data => {
						const parser = new DOMParser();
						const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');

						if (image.id) svg.id = image.id;
						if (image.className) svg.classList = image.classList;

						image.parentNode.replaceChild(svg, image);
					})
					.then(callback)
					.catch(error => console.error(error))
			});
		};

		convertImages('.img-svg-js');
	},
};
const $ = jQuery;

function eventHandler() {
	// JSCCommon.ifie();
	JSCCommon.modalCall();
	// JSCCommon.tabscostume('tabs');
	JSCCommon.getCurrentYear('.currentYear');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	

	JSCCommon.makeDDGroup();
	// JSCCommon.toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown');
	JSCCommon.animateScroll();

	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}


	function setFixedNav() {
		let header = document.querySelector('.header');
		if (!header) return;
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		// console.log(scrollTop);

		scrollTop > 160 ? header.classList.add('fixed') : header.classList.remove('fixed');
		scrollTop > 250 ? header.classList.add('fixed-animate') : header.classList.remove('fixed-animate');
		scrollTop > 400 ? header.classList.add('fixed-show') : header.classList.remove('fixed-show');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const swiperbreadcrumb = new Swiper('.breadcrumb-slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true
	});

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});
	const portfolioItemSlider = new Swiper('.portfolio-item__slider--js', {
		// slidesPerView: 5,
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		slidesPerView: 'auto',
		// freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.4,
		slideToClickedSlide: true,
		// freeModeMomentum: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},

	});
	const sProjectsSliderThumbs = new Swiper('.sProjects__slider-thumbs--js', {
		// slidesPerView: 5,
		spaceBetween: 10,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		// loop: true,
		slidesPerView: 3,
		// freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.4,
		slideToClickedSlide: true,
		breakpoints: {
			768: {
				slidesPerView: 4,
			},
			993: {
				slidesPerView: 5,
			},
			1200: {
				slidesPerView: 6,
			},
			1400: {
				slidesPerView: 6,
				spaceBetween: 15,
			},
		},
	});
	const sProjectsSlider = new Swiper('.sProjects__slider--js', {
		// slidesPerView: 5,
		spaceBetween: 0,
		// lazy: {
		// 	loadPrevNext: true,
		// },
		watchOverflow: true,
		spaceBetween: 0,
		// loop: true,
		slidesPerView: 'auto',
		// freeMode: true,
		// loopFillGroupWithBlank: true,
		touchRatio: 0.4,
		slideToClickedSlide: true,
		thumbs: {
			swiper: sProjectsSliderThumbs,
		},
		// freeModeMomentum: true,
		navigation: {
			nextEl: '.sProjects__arrow-wrap > .swiper-button-next',
			prevEl: '.sProjects__arrow-wrap > .swiper-button-prev',
		},
	});

	const sProductSliderThumbs = new Swiper('.sProduct__slider-thumbs--js', {
		// slidesPerView: 5,
		spaceBetween: 3,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		slidesPerView: 5,
		// freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.4,
		slideToClickedSlide: true,
		breakpoints: {
			500: {
				spaceBetween: 8
			},
			// 993: {
			// 	slidesPerView: 5,
			// },
			// 1200: {
			// 	slidesPerView: 6,
			// },
			// 1400: {
			// 	slidesPerView: 6,
			// 	spaceBetween: 15,
			// },
		},
	});
	const sProductSlider = new Swiper('.sProduct__slider--js', {
		// slidesPerView: 5,
		spaceBetween: 0,
		// lazy: {
		// 	loadPrevNext: true,
		// },
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		slidesPerView: 'auto',
		// freeMode: true,
		// loopFillGroupWithBlank: true,
		touchRatio: 0.4,
		slideToClickedSlide: true,
		thumbs: {
			swiper: sProductSliderThumbs,
		},
		// freeModeMomentum: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});
	
	if(sProjectsSlider) {
		let allActiveSlides = document.querySelectorAll('.sProjects__active-slide'),
				allSlides = document.querySelectorAll('.sProjects__all-slides');
		for (let allActiveSlide of allActiveSlides) {
			allActiveSlide.innerHTML = sProjectsSlider.activeIndex + 1 + " ";
			sProjectsSlider.on('slideChange', function () {
				allActiveSlide.innerHTML = sProjectsSlider.activeIndex + 1 + " ";
			});
		}
		for (let allSlide of allSlides) {
			let slides = document.querySelectorAll('.sProjects__slider--js .sProjects__slide');
			allSlide.innerHTML = slides.length;
		}
	}



	const sTeamSliderWraps = document.querySelectorAll('.sTeam__slider-wrap');
	for (const sTeamSliderWrap of sTeamSliderWraps) {
		const sTeamSlider = new Swiper(sTeamSliderWrap.querySelector('.sTeam__slider--js'), {
			// slidesPerView: 5,
			lazy: {
				loadPrevNext: true,
			},
			watchOverflow: true,
			spaceBetween: 20,
			loop: true,
			slidesPerView: 1,
			// freeMode: true,
			loopFillGroupWithBlank: true,
			touchRatio: 0.4,
			// slideToClickedSlide: true,
			// freeModeMomentum: true,
			breakpoints: {
				445: {
					slidesPerView: 2,
				},
				993: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 4,
				},
				1400: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			navigation: {
				nextEl: sTeamSliderWrap.querySelector('.swiper-button-next'),
				prevEl: sTeamSliderWrap.querySelector(' .swiper-button-prev'),
			},
			
	
		});
	};

	JSCCommon.heightSlide();

	const sCertificatesSlider = new Swiper('.sCertificates__slider--js', {
		// slidesPerView: 5,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 20,
		loop: true,
		slidesPerView: 1,
		// freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.4,
		// slideToClickedSlide: true,
		// freeModeMomentum: true,
		breakpoints: {
			445: {
				slidesPerView: 1,
			},
			768: {
				slidesPerView: 2,
			},
			993: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 4,
			},
			1400: {
				slidesPerView: 4,
				spaceBetween: 30,
			},
		},
		navigation: {
			nextEl: '.sCertificates__slider-wrap .swiper-button-next',
			prevEl: '.sCertificates__slider-wrap .swiper-button-prev',
		},
		

	});

	// modal window

	var Sticky = new hcSticky('.need-help', {
		mobileFirst: true,
		responsive: {
			992: {
				stickTo: '.need-help-wrap',
				top: 90,
			}
		}
	});
	var StickySoc = new hcSticky('.soc--content', {
		mobileFirst: true,
		responsive: {
			992: {
				stickTo: '.sContent > .container',
				top: 150,
			}
		}
	});
	// var StickyNav = new hcSticky('.top-nav', {
	// 	mobileFirst: true,
	// 	responsive: {
	// 		992: {
	// 			stickTo: 'body',
	// 			top: 0,
	// 		}
	// 	}
	// });

	// var StickyNavMob = new hcSticky('.topLine', {
	// 	// mobileFirst: true,
	// 	responsive: {
	// 		991.98: {
	// 			stickTo: 'body',
	// 			top: 0,
	// 		}
	// 	}
	// });
	// var StickyCalc = new hcSticky('.sCalculator table thead', {
	// 	mobileFirst: true,
	// 	stickTo: '.sCalculator table',
	// 	top: 61,
	// 	responsive: {
	// 		991.98: {
	// 			stickTo: '.sCalculator table',
	// 			top: 51,
	// 		},
	// 		1199.98: {
	// 			disable: true
	// 		}
	// 	}
	// });

	document.querySelector('.footer__scroll-up').addEventListener('click', () => window.scrollTo(0, 0));

	let menuItemHasChildrens = document.querySelectorAll('.menu-item-has-children');
	for (let menuItemHasChildren of menuItemHasChildrens) {
		menuItemHasChildren.firstElementChild.addEventListener('click', function(e) {
			e.preventDefault();
			$(menuItemHasChildren).toggleClass('shown');
			if (window.innerWidth < 992) {
				$(menuItemHasChildren.querySelector('.sub-menu')).slideToggle();
			}
		});
		document.addEventListener('click', function(event) {
			let container = event.target.closest('.sub-menu');
			let btn = event.target.closest('.menu-item-has-children.shown');
			if(!container && !btn) {
				menuItemHasChildren.classList.remove('shown');
			}
		});
	};

	$('.topLine__tel--js').on('click', function() {
		$('.topLine__tel-wrap').toggleClass('active');
	});
	document.addEventListener('click', function(event) {
		let container = event.target.closest('.topLine__tel-wrap.active');
		// let btn = event.target.closest('.topLine__tel--js');
		if(!container) {
			$('.topLine__tel-wrap').removeClass('active');
		}
	});

	AOS.init();

	let cookies = document.querySelector('.cookies');
	if(cookies) {
		document.querySelector('.cookies__btn').addEventListener('click', function() {
			cookies.classList.add('hidden');
		});
	};

	const sGlossarySwiper = new Swiper('.sGlossary__slider--js', {
		spaceBetween: 15,
		slidesPerView: 'auto',
	});


};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }

if (document.querySelector("#map")) {


	ymaps.ready(function () {
		var myMap = new ymaps.Map('map', {
			center: [55.751300430341765, 37.624486136718716],
			zoom: 9,
			controls: ['zoomControl']
		}, {
			//searchControlProvider: 'yandex#search'
		}),
			// Создаём макет содержимого.
			// MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
			// 		'<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
			// ),

			myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
				// hintContent: 'Поволжская Металлоломная Компания',
				// balloonContent: 'г. Самара, ул. Земеца, д. 32'
			}, {
				// Опции.
				// Необходимо указать данный тип макета.
				iconLayout: 'default#image',
				// Своё изображение иконки метки.
				iconImageHref: 'img/svg/map-mark.svg',
				// Размеры метки.
				iconImageSize: [38, 48],
				// Смещение левого верхнего угла иконки относительно
				// её "ножки" (точки привязки).
				iconImageOffset: [-21, -49]
			});
		myMap.behaviors.disable('scrollZoom');
		//на мобильных устройствах... (проверяем по userAgent браузера)
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			//... отключаем перетаскивание карты
			myMap.behaviors.disable('drag');
		}
		myMap.geoObjects
			.add(myPlacemark);
	});

}
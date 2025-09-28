'use strict';

//{DEL DIST BUILDER}
// TODO комментарии
// TODO везде где подключается bootstrap необходим popper
// TODO Возможно нужно поместить каждую библиотеку в отдельную папку (компонент): jQuery, moment, jquery-ui, gloalize и т.д.
// TODO Pended Image Component
// TODO Nprogress?
//{DEL}

// Global components list
let components = window.components = {};

components.mdi = {
	selector: '[class*="mdi-"]',
	styles: './components/mdi/mdi.css'
};

components.pageReveal = {
	selector: '.page',
	init: function( nodes ) {
		window.addEventListener( 'components:ready', function () {
			window.dispatchEvent( new Event( 'resize' ) );
			document.documentElement.classList.add( 'components-ready' );

			//{DEL DIST BUILDER}
			console.log( `%c[components]: ready`, 'color: orange; font-weight: 900;' );
			//{DEL}

			nodes.forEach( function( node ) {
				setTimeout( function() {
					node.classList.add( 'page-revealed' );
				}, 500 );
			});
		}, { once: true } );

		window.addEventListener( 'components:stylesReady', function () {
			//{DEL DIST BUILDER}
			console.log( `%c[components]: stylesReady`, 'color: orange; font-weight: 900;' );
			//{DEL}
		}, { once: true } );
	}
};

components.grid = {
	selector: '.container, .container-fluid, .row, [class*="col-"]',
	styles: './components/grid/grid.css'
};

components.section = {
	selector: 'section',
	styles: './components/section/section.css'
};

components.footer = {
	selector: 'footer',
	styles: './components/footer/footer.css'
};

components.button = {
	selector: '.btn',
	styles: './components/button/button.css'
};

components.link = {
	selector: '.link',
	styles: './components/link/link.css'
};

components.linkImage = {
	selector: '.link-image',
	styles: './components/link-image/link-image.css'
};

components.input = {
	selector: '.form-group, .input-group, .form-check, .custom-control, .form-control',
	styles: './components/input/input.css'
};

components.effect = {
	selector: '.effect',
	styles: './components/effect/effect.css'
};

components.font = {
	selector: 'html',
	styles: 'https://fonts.googleapis.com/css?family=Karla:400,700,700i&display=swap'
};

components.intenseIcons = {
	selector: '[class*="int-"]',
	styles: './components/intense-icons/intense-icons.css'
};

components.currentDevice = {
	selector: 'html',
	script: './components/current-device/current-device.min.js'
};

components.rdNavbar = {
	selector: '.rd-navbar',
	styles: [
		'./components/rd-navbar/rd-navbar.css'
	],
	script: [
		'./components/jquery/jquery-3.4.1.min.js',
		'./components/util/util.min.js',
		'./components/current-device/current-device.min.js',
		'./components/rd-navbar/rd-navbar.min.js'
	],
	dependencies: 'currentDevice',
	init: function ( nodes ) {
		nodes.forEach( function ( node ) {
			let
				backButtons = node.querySelectorAll( '.navbar-navigation-back-btn' ),
				params = parseJSON( node.getAttribute( 'data-rd-navbar' ) ),
				defaults = {
					stickUpClone: false,
					anchorNav: false,
					autoHeight: false,
					stickUpOffset: '1px',
					responsive: {
						0: {
							layout: 'rd-navbar-fixed',
							deviceLayout: 'rd-navbar-fixed',
							focusOnHover: 'ontouchstart' in window,
							stickUp: false
						},
						992: {
							layout: 'rd-navbar-fixed',
							deviceLayout: 'rd-navbar-fixed',
							focusOnHover: 'ontouchstart' in window,
							stickUp: false
						},
						1200: {
							layout: 'rd-navbar-fullwidth',
							deviceLayout: 'rd-navbar-fullwidth',
							stickUp: true,
							stickUpOffset: '1px',
							autoHeight: true
						}
					},
					callbacks: {
						onStuck: function () {
							document.documentElement.classList.add( 'rd-navbar-stuck' );
						},
						onUnstuck: function () {
							document.documentElement.classList.remove( 'rd-navbar-stuck' );
						},
						onDropdownToggle: function () {
							if ( this.classList.contains( 'opened' ) ) {
								this.parentElement.classList.add( 'overlaid' );
							} else {
								this.parentElement.classList.remove( 'overlaid' );
							}
						},
						onDropdownClose: function () {
							this.parentElement.classList.remove( 'overlaid' );
						}
					}
				},
				xMode = {
					stickUpClone: false,
					anchorNav: false,
					responsive: {
						0: {
							stickUp: false,
							stickUpClone: false
						},
						992: {
							stickUp: false,
							stickUpClone: false
						},
						1200: {
							stickUp: false,
							stickUpClone: false
						}
					},
					callbacks: {
						onDropdownOver: function () { return false; }
					}
				},
				navbar = node.RDNavbar = new RDNavbar( node, Util.merge( window.xMode ? [ defaults, params, xMode ] : [ defaults, params ] ) );

			if ( backButtons.length ) {
				backButtons.forEach( function ( btn ) {
					btn.addEventListener( 'click', function () {
						let
							submenu = this.closest( '.rd-navbar-submenu' ),
							parentmenu = submenu.parentElement;

						navbar.dropdownToggle.call( submenu, navbar );
					});
				});
			}
		})
	}
};

components.regula = {
	selector: '[data-constraints]',
	styles: './components/regula/regula.css',
	script: [
		'./components/jquery/jquery-3.4.1.min.js',
		'./components/regula/regula.min.js'
	],
	init: function ( nodes ) {
		let elements = $( nodes );

		// Custom validator - phone number
		regula.custom({
			name: 'PhoneNumber',
			defaultMessage: 'Invalid phone number format',
			validator: function() {
				if ( this.value === '' ) return true;
				else return /^(\+\d)?[0-9\-\(\) ]{5,}$/i.test( this.value );
			}
		});

		for (let i = 0; i < elements.length; i++) {
			let o = $(elements[i]), v;
			o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");
			v = o.parent().find(".form-validation");
			if (v.is(":last-child")) o.addClass("form-control-last-child");
		}

		elements.on('input change propertychange blur', function (e) {
			let $this = $(this), results;

			if (e.type !== "blur") if (!$this.parent().hasClass("has-error")) return;
			if ($this.parents('.rd-mailform').hasClass('success')) return;

			if (( results = $this.regula('validate') ).length) {
				for (let i = 0; i < results.length; i++) {
					$this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error");
				}
			} else {
				$this.siblings(".form-validation").text("").parent().removeClass("has-error")
			}
		}).regula('bind');

		let regularConstraintsMessages = [
			{
				type: regula.Constraint.Required,
				newMessage: "The text field is required."
			},
			{
				type: regula.Constraint.Email,
				newMessage: "The email is not a valid email."
			},
			{
				type: regula.Constraint.Numeric,
				newMessage: "Only numbers are required"
			},
			{
				type: regula.Constraint.Selected,
				newMessage: "Please choose an option."
			}
		];


		for (let i = 0; i < regularConstraintsMessages.length; i++) {
			let regularConstraint = regularConstraintsMessages[i];

			regula.override({
				constraintType: regularConstraint.type,
				defaultMessage: regularConstraint.newMessage
			});
		}
	}
};

components.rdMailform = {
	selector: '.rd-mailform',
	styles: [
		'./components/rd-mailform/rd-mailform.css',
		'./components/intense-icons/intense-icons.css',
		'./components/font-awesome/font-awesome.css',
		'./components/mdi/mdi.css'
	],
	script: [
		'./components/jquery/jquery-3.4.1.min.js',
		'./components/rd-mailform/rd-mailform.min.js',
	],
	init: function ( nodes ) {
		let i, j, k,
			$captchas = $( nodes ).find( '.recaptcha' ),
			msg = {
				'MF000': 'Successfully sent!',
				'MF001': 'Recipients are not set!',
				'MF002': 'Form will not work locally!',
				'MF003': 'Please, define email field in your form!',
				'MF004': 'Please, define type of your form!',
				'MF254': 'Something went wrong with PHPMailer!',
				'MF255': 'Aw, snap! Something went wrong.'
			};

		if ( $captchas.length ) {
			$.getScript("//www.google.com/recaptcha/api.js?onload=onloadCaptchaCallback&render=explicit&hl=en");
		}

		/**
		 * @desc Check if all elements pass validation
		 * @param {object} elements - object of items for validation
		 * @param {object} captcha - captcha object for validation
		 * @return {boolean}
		 */
		function isValidated(elements, captcha) {
			let results, errors = 0;

			if (elements.length) {
				for (let j = 0; j < elements.length; j++) {

					let $input = $(elements[j]);
					if ((results = $input.regula('validate')).length) {
						for (k = 0; k < results.length; k++) {
							errors++;
							$input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
						}
					} else {
						$input.siblings(".form-validation").text("").parent().removeClass("has-error")
					}
				}

				if (captcha) {
					if (captcha.length) {
						return validateReCaptcha(captcha) && errors === 0
					}
				}

				return errors === 0;
			}
			return true;
		}

		/**
		 * @desc Validate google reCaptcha
		 * @param {object} captcha - captcha object for validation
		 * @return {boolean}
		 */
		function validateReCaptcha(captcha) {
			let captchaToken = captcha.find('.g-recaptcha-response').val();

			if (captchaToken.length === 0) {
				captcha
				.siblings('.form-validation')
				.html('Please, prove that you are not robot.')
				.addClass('active');
				captcha
				.closest('.form-wrap')
				.addClass('has-error');

				captcha.on('propertychange', function () {
					let $this = $(this),
						captchaToken = $this.find('.g-recaptcha-response').val();

					if (captchaToken.length > 0) {
						$this
						.closest('.form-wrap')
						.removeClass('has-error');
						$this
						.siblings('.form-validation')
						.removeClass('active')
						.html('');
						$this.off('propertychange');
					}
				});

				return false;
			}

			return true;
		}

		/**
		 * @desc Initialize Google reCaptcha
		 */
		window.onloadCaptchaCallback = function () {
			for (let i = 0; i < $captchas.length; i++) {
				let
					$captcha = $($captchas[i]),
					resizeHandler = (function() {
						let
							frame = this.querySelector( 'iframe' ),
							inner = this.firstElementChild,
							inner2 = inner.firstElementChild,
							containerRect = null,
							frameRect = null,
							scale = null;

						inner2.style.transform = '';
						inner.style.height = 'auto';
						inner.style.width = 'auto';

						containerRect = this.getBoundingClientRect();
						frameRect = frame.getBoundingClientRect();
						scale = containerRect.width/frameRect.width;

						if ( scale < 1 ) {
							inner2.style.transform = 'scale('+ scale +')';
							inner.style.height = ( frameRect.height * scale ) + 'px';
							inner.style.width = ( frameRect.width * scale ) + 'px';
						}
					}).bind( $captchas[i] );

				grecaptcha.render(
					$captcha.attr('id'),
					{
						sitekey: $captcha.attr('data-sitekey'),
						size: $captcha.attr('data-size') ? $captcha.attr('data-size') : 'normal',
						theme: $captcha.attr('data-theme') ? $captcha.attr('data-theme') : 'light',
						callback: function () {
							$('.recaptcha').trigger('propertychange');
						}
					}
				);

				$captcha.after("<span class='form-validation'></span>");

				if ( $captchas[i].hasAttribute( 'data-auto-size' ) ) {
					resizeHandler();
					window.addEventListener( 'resize', resizeHandler );
				}
			}
		};

		for ( i = 0; i < nodes.length; i++ ) {
			let
				$form = $(nodes[i]),
				formHasCaptcha = false;

			$form.attr('novalidate', 'novalidate').ajaxForm({
				data: {
					"form-type": $form.attr("data-form-type") || "contact",
					"counter": i
				},
				beforeSubmit: function (arr, $form, options) {
					if ( window.xMode ) return;

					let
						form = $(nodes[this.extraData.counter]),
						inputs = form.find("[data-constraints]"),
						output = $("#" + form.attr("data-form-output")),
						captcha = form.find('.recaptcha'),
						captchaFlag = true;

					output.removeClass("active error success");

					if (isValidated(inputs, captcha)) {

						// veify reCaptcha
						if (captcha.length) {
							let captchaToken = captcha.find('.g-recaptcha-response').val(),
								captchaMsg = {
									'CPT001': 'Please, setup you "site key" and "secret key" of reCaptcha',
									'CPT002': 'Something wrong with google reCaptcha'
								};

							formHasCaptcha = true;

							$.ajax({
								method: "POST",
								url: "components/rd-mailform/reCaptcha.php",
								data: {'g-recaptcha-response': captchaToken},
								async: false
							})
							.done(function (responceCode) {
								if (responceCode !== 'CPT000') {
									if (output.hasClass("snackbar")) {
										output.html(`<div class="snackbar-inner"><div class="snackbar-title"><span class="icon snackbar-icon int-check"></span>${captchaMsg[responceCode]}</div></div>`);
										// output.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' + captchaMsg[responceCode] + '</span></p>');

										setTimeout(function () {
											output.removeClass("active");
										}, 3500);

										captchaFlag = false;
									} else {
										output.html(captchaMsg[responceCode]);
									}

									output.addClass("active");
								}
							});
						}

						if (!captchaFlag) {
							return false;
						}

						form.addClass('form-in-process');

						if (output.hasClass("snackbar")) {
							// output.html('<p><span class="icon text-middle fa fa-circle-o-notch fa-spin icon-xxs"></span><span>Sending</span></p>');
							output.html(`<div class="snackbar-inner"><div class="snackbar-title"><span class="icon snackbar-icon fa-circle-o-notch fa-spin"></span>Sending</div></div>`);
							output.addClass("active");
						}
					} else {
						return false;
					}
				},
				error: function (result) {
					if ( window.xMode ) return;

					let
						output = $("#" + $(nodes[this.extraData.counter]).attr("data-form-output")),
						form = $(nodes[this.extraData.counter]);

					output.text(msg[result]);
					form.removeClass('form-in-process');

					if (formHasCaptcha) {
						grecaptcha.reset();
					}
				},
				success: function (result) {
					if ( window.xMode ) return;

					let
						form = $(nodes[this.extraData.counter]),
						output = $("#" + form.attr("data-form-output")),
						select = form.find('select');

					form
					.addClass('success')
					.removeClass('form-in-process');

					if (formHasCaptcha) {
						grecaptcha.reset();
					}

					result = result.length === 5 ? result : 'MF255';
					output.text(msg[result]);

					if (result === "MF000") {
						if (output.hasClass("snackbar")) {
							// output.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' + msg[result] + '</span></p>');
							output.html(`<div class="snackbar-inner"><div class="snackbar-title"><span class="icon snackbar-icon int-check"></span>${msg[result]}</div></div>`);
						} else {
							output.addClass("active success");
						}
					} else {
						if (output.hasClass("snackbar")) {
							// output.html(' <p class="snackbars-left"><span class="icon icon-xxs mdi mdi-alert-outline text-middle"></span><span>' + msg[result] + '</span></p>');
							output.html(`<div class="snackbar-inner"><div class="snackbar-title"><span class="icon snackbar-icon int-warning"></span>${msg[result]}</div></div>`);
						} else {
							output.addClass("active error");
						}
					}

					form.clearForm();

					if (select.length) {
						select.select2("val", "");
					}

					form.find('input, textarea').trigger('blur');

					setTimeout(function () {
						output.removeClass("active error success");
						form.removeClass('success');
					}, 3500);
				}
			});
		}
	}
};

components.campaignMonitor = {
	selector: '.campaign-mailform',
	styles: './components/rd-mailform/rd-mailform.css',
	script: './components/jquery/jquery-3.4.1.min.js',
	init: function ( nodes ) {
		/**
		 * @desc Check if all elements pass validation
		 * @param {object} elements - object of items for validation
		 * @param {object} captcha - captcha object for validation
		 * @return {boolean}
		 */
		function isValidated(elements, captcha) {
			let results, errors = 0;

			if (elements.length) {
				for (let j = 0; j < elements.length; j++) {

					let $input = $(elements[j]);
					if ((results = $input.regula('validate')).length) {
						for (let k = 0; k < results.length; k++) {
							errors++;
							$input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
						}
					} else {
						$input.siblings(".form-validation").text("").parent().removeClass("has-error")
					}
				}

				if (captcha) {
					if (captcha.length) {
						return validateReCaptcha(captcha) && errors === 0
					}
				}

				return errors === 0;
			}
			return true;
		}

		let $nodes = $(nodes);

		for ( let i = 0; i < $nodes.length; i++ ) {
			let $campaignItem = $($nodes[i]);

			$campaignItem.on('submit', $.proxy(function (e) {
				e.preventDefault();

				let data = {},
					url = this.attr('action'),
					dataArray = this.serializeArray(),
					$output = $("#" + $nodes.attr("data-form-output")),
					$this = $(this);

				for ( let i = 0; i < dataArray.length; i++) {
					data[dataArray[i].name] = dataArray[i].value;
				}

				$.ajax({
					data: data,
					url: url,
					dataType: 'jsonp',
					error: function (resp, text) {
						$output.html('Server error: ' + text);

						setTimeout(function () {
							$output.removeClass("active");
						}, 4000);
					},
					success: function (resp) {
						$output.html(resp.Message).addClass('active');

						setTimeout(function () {
							$output.removeClass("active");
						}, 6000);
					},
					beforeSend: function (data) {
						// Stop request if inputs are invalid
						if ( window.xMode || !isValidated( $this.find( '[data-constraints]' ) ) )
							return false;

						$output.html('Submitting...').addClass('active');
					}
				});

				// Clear inputs after submit
				let inputs = $this[0].getElementsByTagName('input');
				for (let i = 0; i < inputs.length; i++) {
					inputs[i].value = '';
					let label = document.querySelector( '[for="'+ inputs[i].getAttribute( 'id' ) +'"]' );
					if( label ) label.classList.remove( 'focus', 'not-empty' );
				}

				return false;
			}, $campaignItem));
		}
	}
};

components.mailchimp = {
	selector: '.mailchimp-mailform',
	styles: './components/rd-mailform/rd-mailform.css',
	script: './components/jquery/jquery-3.4.1.min.js',
	init: function ( nodes ) {
		let $nodes = $( nodes );

		for ( let i = 0; i < $nodes.length; i++ ) {
			let
				$mailchimpItem = $($nodes[i]),
				$email = $mailchimpItem.find('input[type="email"]');

			// Required by MailChimp
			$mailchimpItem.attr('novalidate', 'true');
			$email.attr('name', 'EMAIL');

			$mailchimpItem.on('submit', $.proxy( function ( $email, event ) {
				event.preventDefault();

				let
					$this = this,
					data = {},
					url = $this.attr('action').replace('/post?', '/post-json?').concat('&c=?'),
					dataArray = $this.serializeArray(),
					$output = $("#" + $this.attr("data-form-output"));

				for ( let i = 0; i < dataArray.length; i++ ) {
					data[dataArray[i].name] = dataArray[i].value;
				}

				$.ajax({
					data: data,
					url: url,
					dataType: 'jsonp',
					error: function (resp, text) {
						$output.html('Server error: ' + text);

						setTimeout(function () {
							$output.removeClass("active");
						}, 4000);
					},
					success: function (resp) {
						$output.html(resp.msg).addClass('active');
						$email[0].value = '';
						var $label = $('[for="'+ $email.attr( 'id' ) +'"]');
						if ( $label.length ) $label.removeClass( 'focus not-empty' );

						setTimeout(function () {
							$output.removeClass("active");
						}, 6000);
					},
					beforeSend: function (data) {
						var isValidated = (function () {
							var results, errors = 0;
							var elements = $this.find('[data-constraints]');
							var captcha = null;
							if (elements.length) {
								for (var j = 0; j < elements.length; j++) {

									var $input = $(elements[j]);
									if ((results = $input.regula('validate')).length) {
										for (var k = 0; k < results.length; k++) {
											errors++;
											$input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
										}
									} else {
										$input.siblings(".form-validation").text("").parent().removeClass("has-error")
									}
								}

								if (captcha) {
									if (captcha.length) {
										return validateReCaptcha(captcha) && errors === 0
									}
								}

								return errors === 0;
							}
							return true;
						})();

						// Stop request if builder or inputs are invalid
						if ( window.xMode || !isValidated ) return false;

						$output.html('Submitting...').addClass('active');
					}
				});

				return false;
			}, $mailchimpItem, $email ));
		}
	}
};

components.multiswitch = {
	selector: '[data-multi-switch]',
	styles: './components/multiswitch/multiswitch.css',
	script: [
		'./components/current-device/current-device.min.js',
		'./components/multiswitch/multiswitch.js'
	],
	dependencies: 'rdNavbar',
	init: function ( nodes ) {
		let click = device.ios() ? 'touchstart' : 'click';

		nodes.forEach( function ( node ) {
			if ( node.tagName === 'A' ) {
				node.addEventListener( click, function ( event ) {
					event.preventDefault();
				});
			}

			MultiSwitch( Object.assign( {
				node: node,
				event: click,
			}, parseJSON( node.getAttribute( 'data-multi-switch' ) ) ) );
		});
	}
};

components.swiper = {
	selector: '.swiper-container',
	styles: './components/swiper/swiper.css',
	script: [
		'./components/jquery/jquery-3.4.1.min.js',
		'./components/swiper/swiper.min.js',
		'./components/util/util.min.js'
	],
	init: function ( nodes ) {
		nodes.forEach( function ( node ) {
			let
				slides = node.querySelectorAll( '.swiper-slide[data-slide-bg]' ),
				params = parseJSON( node.getAttribute( 'data-swiper' ) ),
				defaults = {
					speed: 1000,
					loop: true,
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev'
					},
					autoplay: {
						delay: 5000
					}
				},
				xMode = {
					autoplay: false,
					loop: false,
					simulateTouch: false
				};

			// Set background image for slides with `data-slide-bg` attribute for Novi Builder
			slides.forEach( function ( slide ) {
				slide.style.backgroundImage = `url( ${slide.getAttribute( 'data-slide-bg' )} )`;
			});

			new Swiper( node, Util.merge( window.xMode ? [ defaults, params, xMode ] : [ defaults, params ] ) );
		});
	}
};

components.owl = {
	selector: '.owl-carousel',
	styles: './components/owl-carousel/owl.carousel.css',
	script: [
		'./components/jquery/jquery-3.4.1.min.js',
		'./components/owl-carousel/owl.carousel.min.js',
		'./components/util/util.min.js'
	],
	init: function ( nodes ) {
		nodes.forEach( function ( node ) {
			let
				params = parseJSON( node.getAttribute( 'data-owl' ) ),
				defaults = {
					items: 1,
					margin: 30,
					loop: true,
					mouseDrag: true,
					stagePadding: 0,
					nav: false,
					navText: [],
					dots: false,
					autoplay: true,
					autoplayHoverPause: true
				},
				xMode = {
					autoplay: false,
					loop: false,
					mouseDrag: false
				},
				generated = {
					autoplay: node.getAttribute( 'data-autoplay' ) !== 'false',
					loop: node.getAttribute( 'data-loop' ) !== 'false',
					mouseDrag: node.getAttribute( 'data-mouse-drag' ) !== 'false',
					responsive: {}
				},
				aliaces = [ '-', '-xs-', '-sm-', '-md-', '-lg-', '-xl-', '-xxl-' ],
				values =  [ 0, 480, 576, 768, 992, 1200, 1400 ],
				responsive = generated.responsive;

			for ( let j = 0; j < values.length; j++ ) {
				responsive[ values[ j ] ] = {};

				for ( let k = j; k >= -1; k-- ) {
					if ( !responsive[ values[ j ] ][ 'items' ] && node.getAttribute( 'data' + aliaces[ k ] + 'items' ) ) {
						responsive[ values[ j ] ][ 'items' ] = k < 0 ? 1 : parseInt( node.getAttribute( 'data' + aliaces[ k ] + 'items' ), 10 );
					}
					if ( !responsive[ values[ j ] ][ 'stagePadding' ] && responsive[ values[ j ] ][ 'stagePadding' ] !== 0 && node.getAttribute( 'data' + aliaces[ k ] + 'stage-padding' ) ) {
						responsive[ values[ j ] ][ 'stagePadding' ] = k < 0 ? 0 : parseInt( node.getAttribute( 'data' + aliaces[ k ] + 'stage-padding' ), 10 );
					}
					if ( !responsive[ values[ j ] ][ 'margin' ] && responsive[ values[ j ] ][ 'margin' ] !== 0 && node.getAttribute( 'data' + aliaces[ k ] + 'margin' ) ) {
						responsive[ values[ j ] ][ 'margin' ] = k < 0 ? 30 : parseInt( node.getAttribute( 'data' + aliaces[ k ] + 'margin' ), 10 );
					}
				}
			}

			if ( node.getAttribute('data-nav-custom')) {
				$( node ).on("initialized.owl.carousel", function (event) {
					let carousel = $(event.currentTarget),
							customNav = $(carousel.attr("data-nav-custom"));

					// Custom Navigation Events
					customNav.find(".owl-arrow-next").click(function (e) {
						e.preventDefault();
						carousel.trigger('next.owl.carousel');
					});
					customNav.find(".owl-arrow-prev").click(function (e) {
						e.preventDefault();
						carousel.trigger('prev.owl.carousel');
					});
				});
			}

			node.owl = $( node );
			$( node ).owlCarousel( Util.merge( window.xMode ? [ defaults, params, generated, xMode ] : [ defaults, params, generated ] ) );
		});
	}
};

components.rdSearch = {
	selector: '[data-rd-search]',
	styles: './components/rd-search/rd-search.css',
	script: './components/rd-search/rd-search.js',
	init: function ( nodes ) {
		nodes.forEach( function ( node ) {
			new RDSearch( Object.assign( {
				form: node,
				handler: 'components/rd-search/rd-search.php',
				output: '.rd-search-results'
			}, parseJSON( node.getAttribute( 'data-rd-search' ) ) ) );
		});
	}
};

components.icon = {
	selector: '.icon',
	styles: './components/icon/icon.css'
};

components.logo = {
	selector: '.logo',
	styles: './components/logo/logo.css'
};

components.badge = {
	selector: '.badge',
	styles: './components/badge/badge.css'
};

components.snackbar = {
	selector: '.snackbar',
	styles: './components/snackbar/snackbar.css'
};

components.rights = {
	selector: '.rights',
	styles: './components/rights/rights.css'
};

components.divider = {
	selector: '.divider',
	styles: './components/divider/divider.css'
};

components.list = {
	selector: '.list',
	styles: [
		'./components/list/list.css',
		'./components/intense-icons/intense-icons.css'
	]
};

components.media = {
	selector: '.media',
	styles: './components/media/media.css'
};

components.toTop = {
	selector: 'html',
	styles: './components/to-top/to-top.css',
	script: './components/jquery/jquery-3.4.1.min.js',
	init: function () {
		if ( !window.xMode ) {
			let node = document.createElement( 'div' );
			node.className = 'to-top int-arrow-up';
			document.body.appendChild( node );

			node.addEventListener( 'mousedown', function () {
				this.classList.add( 'active' );

				$( 'html, body' ).stop().animate( { scrollTop:0 }, 500, 'swing', (function () {
					this.classList.remove( 'active' );
				}).bind( this ));
			});

			document.addEventListener( 'scroll', function () {
				if ( window.scrollY > window.innerHeight ) node.classList.add( 'show' );
				else node.classList.remove( 'show' );
			});
		}
	}
};

components.svgIcon = {
	selector: '.svg-icon',
	styles: './components/svg-icon/svg-icon.css'
};

components.post = {
	selector: '.post',
	styles: './components/post/post.css'
};

components.postMeta = {
	selector: '[class*="post-meta"]',
	styles: './components/post-meta/post-meta.css'
};

components.isotope = {
	selector: '.isotope-wrap',
	styles: './components/isotope/isotope.css',
	script: [
		'./components/jquery/jquery-3.4.1.min.js',
		'./components/isotope/isotope.min.js'
	],
	init: function ( nodes ) {
		nodes.forEach( function ( node ) {
			console.log( node );
			let
					wrap = node,
					filterHandler = function (event) {
						event.preventDefault();
						for (var n = 0; n < this.isoGroup.filters.length; n++) this.isoGroup.filters[n].classList.remove('active');
						this.classList.add('active');
						this.isoGroup.isotope.arrange({filter: this.getAttribute("data-isotope-filter") !== '*' ? '[data-filter*="' + this.getAttribute("data-isotope-filter") + '"]' : '*'});
					},
					resizeHandler = function () {
						this.isoGroup.isotope.layout();
					};

			wrap.isoGroup = {};
			wrap.isoGroup.filters = wrap.querySelectorAll('[data-isotope-filter]');
			wrap.isoGroup.node = wrap.querySelector('.isotope');
			wrap.isoGroup.layout = wrap.isoGroup.node.getAttribute('data-isotope-layout') ? wrap.isoGroup.node.getAttribute('data-isotope-layout') : 'masonry';
			wrap.isoGroup.isotope = new Isotope(wrap.isoGroup.node, {
				itemSelector: '.isotope-item',
				layoutMode:   wrap.isoGroup.layout,
				filter:       '*',
				columnWidth:  (function () {
					if (wrap.isoGroup.node.hasAttribute('data-column-class')) return wrap.isoGroup.node.getAttribute('data-column-class');
					if (wrap.isoGroup.node.hasAttribute('data-column-width')) return parseFloat(wrap.isoGroup.node.getAttribute('data-column-width'));
				}())
			});

			for (var n = 0; n < wrap.isoGroup.filters.length; n++) {
				var filter = wrap.isoGroup.filters[n];
				filter.isoGroup = wrap.isoGroup;
				filter.addEventListener('click', filterHandler);
			}

			window.addEventListener('resize', resizeHandler.bind(wrap));
		});
	}
};

components.pagination = {
	selector: '.pagination, .pag',
	styles: [
		'./components/pagination/pagination.css',
		'./components/pag/pag.css',
		'./components/intense-icons/intense-icons.css'
	]
};

components.quote = {
	selector: '[class*="quote"]',
	styles: './components/quote/quote.css'
};

components.comment = {
	selector: '.comment',
	styles: './components/comment/comment.css'
};

components.position = {
	selector: '[class*="position-"], [class*="fixed-"], [class*="sticky-"]',
	styles: './components/position/position.css'
};

components.copyrightYear = {
	selector: '.copyright-year',
	init: function ( nodes ) {
		nodes.forEach( function ( node ) {
			node.innerHTML = new Date().getFullYear()
		} )
	}
};


/**
 * Wrapper to eliminate json errors
 * @param {string} str - JSON string
 * @returns {object} - parsed or empty object
 */
function parseJSON ( str ) {
	try {
		if ( str )  return JSON.parse( str );
		else return {};
	} catch ( error ) {
		//{DEL DIST BUILDER}
		console.warn( error );
		//{DEL}
		return {};
	}
}

/**
 * Returns version of IE or false, if browser is not Internet Explorer
 * @see {@link https://gist.github.com/gaboratorium/25f08b76eb82b1e7b91b01a0448f8b1d}
 * @returns {number|boolean}
 */
function detectIE () {
	let
		ua = window.navigator.userAgent,
		msie = ua.indexOf( 'MSIE ' ),
		trident = ua.indexOf( 'Trident/' ),
		edge = ua.indexOf( 'Edge/' );

	if ( msie > 0 ) {
		return parseInt( ua.substring( msie + 5, ua.indexOf( '.', msie ) ), 10 );
	}

	if ( trident > 0 ) {
		let rv = ua.indexOf( 'rv:' );
		return parseInt( ua.substring( rv + 3, ua.indexOf( '.', rv ) ), 10 );
	}

	if ( edge > 0 ) {
		return parseInt( ua.substring( edge + 5, ua.indexOf( '.', edge ) ), 10 );
	}

	return false;
}

// Main
window.addEventListener( 'load', function () {
	new ZemezCore({
		components,
		onError: function ( error ) {
			if ( detectIE() < 12 ) {
				let
					script = document.createElement( 'script' );
					script.src = './components/base/support.js';

				document.querySelector( 'head' ).appendChild( script );
			}

			throw new Error( error );
		}
	});
});

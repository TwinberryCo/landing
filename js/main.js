/* ===================================================================
 * Infinity 2.0.0 - Main JS
 *
 *
 * ------------------------------------------------------------------- */

(function (html) {
  "use strict";

  const cfg = {
    // MailChimp URL
    // Use the site's Mailchimp form action URL (not the placeholder)
    mailChimpURL:
      "https://twinberry.us9.list-manage.com/subscribe/post?u=0e9ede1f0c950c0a4e11e96f0&id=5b1362dbeb&f_id=00f4c2e1f0",
  };

  /* animations
   * -------------------------------------------------- */
  const tl = anime
    .timeline({
      easing: "easeInOutCubic",
      duration: 800,
      autoplay: false,
    })
    .add({
      targets: "#loader",
      opacity: 0,
      duration: 1000,
      begin: function (anim) {
        window.scrollTo(0, 0);
      },
    })
    .add({
      targets: "#preloader",
      opacity: 0,
      complete: function (anim) {
        document.querySelector("#preloader").style.visibility = "hidden";
        document.querySelector("#preloader").style.display = "none";
      },
    })
    .add(
      {
        targets: [".s-header__logo", ".s-header__menu-toggle"],
        opacity: [0, 1],
      },
      "-=200"
    )
    .add(
      {
        targets: [".s-intro__pretitle", ".s-intro__title", ".s-intro__more"],
        translateY: [100, 0],
        opacity: [0, 1],
        delay: anime.stagger(200),
      },
      "-=400"
    )
    .add(
      {
        targets: [".s-intro__social", ".s-intro__scroll"],
        opacity: [0, 1],
        delay: anime.stagger(200),
      },
      "-=200"
    );

  /* preloader
   * -------------------------------------------------- */
  const ssPreloader = function () {
    const preloader = document.querySelector("#preloader");
    if (!preloader) return;

    html.classList.add("ss-preload");

    window.addEventListener("load", function () {
      html.classList.remove("ss-preload");
      html.classList.add("ss-loaded");
      tl.play();
    });
  }; // end ssPreloader

  /* parallax
   * -------------------------------------------------- */
  const ssParallax = function () {
    const rellax = new Rellax(".rellax");
  }; // end ssParallax

  /* menu on scrolldown
   * ------------------------------------------------------ */
  const ssMenuOnScrolldown = function () {
    const menuToggle = document.querySelector(".s-header__menu-toggle");
    const triggerHeight = 150;

    window.addEventListener("scroll", function () {
      let loc = window.scrollY;

      if (loc > triggerHeight) {
        menuToggle.classList.add("opaque");
      } else {
        menuToggle.classList.remove("opaque");
      }
    });
  }; // menu on scrolldown

  /* offcanvas menu
   * ------------------------------------------------------ */
  const ssOffCanvas = function () {
    const menuToggle = document.querySelector(".s-header__menu-toggle");
    const nav = document.querySelector(".s-header__nav");
    const closeButton = document.querySelector(".s-header__nav-close-btn");
    const siteBody = document.querySelector("body");

    if (!(menuToggle && nav)) return;

    menuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      siteBody.classList.add("menu-is-open");
    });

    closeButton.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (siteBody.classList.contains("menu-is-open")) {
        siteBody.classList.remove("menu-is-open");
      }
    });

    siteBody.addEventListener("click", function (e) {
      if (!e.target.matches(".s-header__nav, .smoothscroll")) {
        closeButton.dispatchEvent(new Event("click"));
      }
    });
  }; // end ssOffcanvas

  /* masonry
   * ------------------------------------------------------ */
  const ssMasonry = function () {
    const containerBricks = document.querySelector(".bricks");
    if (!containerBricks) return;

    imagesLoaded(containerBricks, function () {
      const msnry = new Masonry(containerBricks, {
        itemSelector: ".brick",
        columnWidth: ".brick",
        percentPosition: true,
        resize: true,
      });
    });
  }; // end ssMasonry

  /* animate elements if in viewport
   * ------------------------------------------------------ */
  const ssAnimateOnScroll = function () {
    const blocks = document.querySelectorAll("[data-animate-block]");
    if (!blocks) return;

    window.addEventListener("scroll", animateOnScroll);

    function animateOnScroll() {
      let scrollY = window.pageYOffset;

      blocks.forEach(function (current) {
        const viewportHeight = window.innerHeight;
        const triggerTop =
          current.getBoundingClientRect().top +
          window.scrollY +
          viewportHeight * 0.2 -
          viewportHeight;
        const blockHeight = current.offsetHeight;
        const blockSpace = triggerTop + blockHeight;
        const inView = scrollY > triggerTop && scrollY <= blockSpace;
        const isAnimated = current.classList.contains("ss-animated");

        if (inView && !isAnimated) {
          anime({
            targets: current.querySelectorAll("[data-animate-el]"),
            opacity: [0, 1],
            translateY: [100, 0],
            delay: anime.stagger(200, { start: 200 }),
            duration: 800,
            easing: "easeInOutCubic",
            begin: function (anim) {
              current.classList.add("ss-animated");
            },
          });
        }
      });
    }
  }; // end ssAnimateOnScroll

  /* swiper
   * ------------------------------------------------------ */
  const ssSwiper = function () {
    const clientsSwiper = new Swiper(".clients", {
      slidesPerView: 3,
      spaceBetween: 6,
      slideClass: "clients__slide",
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        // when window width is > 500px
        501: {
          slidesPerView: 4,
          spaceBetween: 16,
        },
        // when window width is > 900px
        901: {
          slidesPerView: 5,
          spaceBetween: 32,
        },
        // when window width is > 1200px
        1201: {
          slidesPerView: 6,
          spaceBetween: 40,
        },
      },
    });

    const testimonialsSwiper = new Swiper(".testimonial-slider", {
      slidesPerView: 1,
      effect: "slide",
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }; // end ssSwiper

  /* photoswipe
   * ----------------------------------------------------- */
  const ssPhotoswipe = function () {
    const items = [];
    const pswp = document.querySelectorAll(".pswp")[0];
    const folioItems = document.querySelectorAll(".folio-item");

    if (!(pswp && folioItems)) return;

    folioItems.forEach(function (folioItem) {
      let folio = folioItem;
      let thumbLink = folio.querySelector(".folio-item__thumb-link");
      let title = folio.querySelector(".folio-item__title");
      let caption = folio.querySelector(".folio-item__caption");
      let titleText = "<h4>" + title.innerHTML + "</h4>";
      let captionText = caption.innerHTML;
      let href = thumbLink.getAttribute("href");
      let size = thumbLink.dataset.size.split("x");
      let width = size[0];
      let height = size[1];

      let item = {
        src: href,
        w: width,
        h: height,
      };

      if (caption) {
        item.title = titleText.trim() + captionText.trim();
      }

      items.push(item);
    });

    // bind click event
    folioItems.forEach(function (folioItem, i) {
      let thumbLink = folioItem.querySelector(".folio-item__thumb-link");

      thumbLink.addEventListener("click", function (event) {
        event.preventDefault();

        let options = {
          index: i,
          showHideOpacity: true,
        };

        // initialize PhotoSwipe
        let lightBox = new PhotoSwipe(
          pswp,
          PhotoSwipeUI_Default,
          items,
          options
        );
        lightBox.init();
      });
    });
  }; // end ssPhotoSwipe

  /* mailchimp form
   * ---------------------------------------------------- */
  const ssMailChimpForm = function () {
    const mcForm = document.querySelector("#mc-form");

    if (!mcForm) return;

    // Add novalidate attribute
    mcForm.setAttribute("novalidate", true);

    // Field validation
    function hasError(field) {
      // Don't validate submits, buttons, file and reset inputs, and disabled fields
      if (
        field.disabled ||
        field.type === "file" ||
        field.type === "reset" ||
        field.type === "submit" ||
        field.type === "button"
      )
        return;

      // Get validity
      let validity = field.validity;

      // If valid, return null
      if (validity.valid) return;

      // If field is required and empty
      if (validity.valueMissing) return "Please enter an email address.";

      // If not the right type
      if (validity.typeMismatch) {
        if (field.type === "email")
          return "Please enter a valid email address.";
      }

      // If pattern doesn't match
      if (validity.patternMismatch) {
        // If pattern info is included, return custom error
        if (field.hasAttribute("title")) return field.getAttribute("title");

        // Otherwise, generic error
        return "Please match the requested format.";
      }

      // If all else fails, return a generic catchall error
      return "The value you entered for this field is invalid.";
    }

    // Show error message
    function showError(field, error) {
      // Get field id or name
      let id = field.id || field.name;
      if (!id) return;

      let errorMessage = field.form.querySelector(".mc-status");

      // Update error message
      errorMessage.classList.remove("success-message");
      errorMessage.classList.add("error-message");
      errorMessage.innerHTML = error;
    }

    // Display form status (callback function for JSONP)
    window.displayMailChimpStatus = function (data) {
      // Mark that the JSONP callback was invoked
      window._mcCallbackFired = true;

      // Make sure the data is in the right format and that there's a status container
      if (!data || !data.result || !data.msg || !window.mcStatus) return;

      // Update our status message
      window.mcStatus.innerHTML = data.msg;

      // If error, add error class
      if (data.result === "error") {
        window.mcStatus.classList.remove("success-message");
        window.mcStatus.classList.add("error-message");
        return;
      }

      // Otherwise, add success class
      window.mcStatus.classList.remove("error-message");
      window.mcStatus.classList.add("success-message");
    };

    // Submit the form
    function submitMailChimpForm(form) {
      let url = cfg.mailChimpURL;
      let emailField = form.querySelector("#mce-EMAIL");
      let serialize =
        "&" +
        encodeURIComponent(emailField.name) +
        "=" +
        encodeURIComponent(emailField.value);

      if (url == "") return;

      url = url.replace("/post?u=", "/post-json?u=");
      url += serialize + "&c=displayMailChimpStatus";

      // Create script with url and callback (if specified)
      var ref = window.document.getElementsByTagName("script")[0];
      var script = window.document.createElement("script");
      script.src = url;

      // Create global variable for the status container
      window.mcStatus = form.querySelector(".mc-status");
      window.mcStatus.classList.remove("error-message", "success-message");
      window.mcStatus.innerText = "Invio...";

      // Reset callback flag and set a timeout fallback
      window._mcCallbackFired = false;

      // Insert script tag into the DOM
      ref.parentNode.insertBefore(script, ref);

      // Handle network/script load errors
      script.onerror = function () {
        // Prevent double-handling if callback already fired
        if (window._mcCallbackFired) return;
        window._mcCallbackFired = true;
        if (window.mcStatus) {
          window.mcStatus.classList.remove("success-message");
          window.mcStatus.classList.add("error-message");
          window.mcStatus.innerText = "Errore di rete. Riprova più tardi.";
        }
        this.remove();
      };

      // After the script is loaded (and executed), remove it
      script.onload = function () {
        // Delay removal briefly to allow the JSONP callback to run
        var self = this;
        setTimeout(function () {
          try {
            self.remove();
          } catch (e) {
            /* ignore */
          }
        }, 500);
      };

      // Fallback: if no JSONP callback after X ms, show friendly error
      setTimeout(function () {
        if (!window._mcCallbackFired) {
          window._mcCallbackFired = true;
          if (window.mcStatus) {
            window.mcStatus.classList.remove("success-message");
            window.mcStatus.classList.add("error-message");
            window.mcStatus.innerText = "Nessuna risposta dal server. Riprova.";
          }
        }
      }, 10000); // 10s timeout
    }

    // Check email field on submit
    mcForm.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();

        let emailField = event.target.querySelector("#mce-EMAIL");
        let error = hasError(emailField);

        if (error) {
          showError(emailField, error);
          emailField.focus();
          return;
        }

        submitMailChimpForm(this);
      },
      false
    );
  }; // end ssMailChimpForm

  /* alert boxes
   * ------------------------------------------------------ */
  const ssAlertBoxes = function () {
    const boxes = document.querySelectorAll(".alert-box");

    boxes.forEach(function (box) {
      box.addEventListener("click", function (event) {
        if (event.target.matches(".alert-box__close")) {
          event.stopPropagation();
          event.target.parentElement.classList.add("hideit");

          setTimeout(function () {
            box.style.display = "none";
          }, 500);
        }
      });
    });
  }; // end ssAlertBoxes

  /* Back to Top
   * ------------------------------------------------------ */
  const ssBackToTop = function () {
    const pxShow = 900;
    const goTopButton = document.querySelector(".ss-go-top");

    if (!goTopButton) return;

    // Show or hide the button
    if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");

    window.addEventListener("scroll", function () {
      if (window.scrollY >= pxShow) {
        if (!goTopButton.classList.contains("link-is-visible"))
          goTopButton.classList.add("link-is-visible");
      } else {
        goTopButton.classList.remove("link-is-visible");
      }
    });
  }; // end ssBackToTop

  /* smoothscroll
   * ------------------------------------------------------ */
  const ssMoveTo = function () {
    const siteBody = document.querySelector("body");

    const easeFunctions = {
      easeInQuad: function (t, b, c, d) {
        t /= d;
        return c * t * t + b;
      },
      easeOutQuad: function (t, b, c, d) {
        t /= d;
        return -c * t * (t - 2) + b;
      },
      easeInOutQuad: function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      },
      easeInOutCubic: function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t * t + b;
        t -= 2;
        return (c / 2) * (t * t * t + 2) + b;
      },
    };

    const triggers = document.querySelectorAll(".smoothscroll");

    const moveTo = new MoveTo(
      {
        tolerance: 0,
        duration: 1200,
        easing: "easeInOutCubic",
        container: window,
        callback: function (target) {
          if (siteBody.classList.contains("menu-is-open")) {
            siteBody.classList.remove("menu-is-open");
          }
        },
      },
      easeFunctions
    );

    triggers.forEach(function (trigger) {
      moveTo.registerTrigger(trigger);
    });
  }; // end ssMoveTo

  /* custom cursor
   * ------------------------------------------------------ */
  const ssCustomCursor = function () {
    // Check if device has touch capability (mobile/tablet)
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0;

    // Only activate custom cursor on non-touch devices (PC)
    if (isTouchDevice) {
      return;
    }

    // Create cursor elements
    const cursor = document.createElement("div");
    const cursorFollower = document.createElement("div");
    cursor.className = "custom-cursor";
    cursorFollower.className = "custom-cursor-follower";
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);

    let mouseX = 0,
      mouseY = 0;
    let cursorX = 0,
      cursorY = 0;
    let followerX = 0,
      followerY = 0;

    // Update mouse position
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Animate cursor
    function animate() {
      // Smooth following for main cursor
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;

      // Slower following for follower
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;

      // Calculate distance between cursor and follower
      const distance = Math.sqrt(
        Math.pow(cursorX - followerX, 2) + Math.pow(cursorY - followerY, 2)
      );

      // Hide follower when too close to cursor (within 20px)
      if (distance < 20) {
        cursorFollower.style.opacity = "0";
      } else {
        // Fade in based on distance
        const opacity = Math.min((distance - 20) / 30, 1);
        cursorFollower.style.opacity = opacity;
      }

      cursor.style.left = cursorX + "px";
      cursor.style.top = cursorY + "px";
      cursorFollower.style.left = followerX + "px";
      cursorFollower.style.top = followerY + "px";

      requestAnimationFrame(animate);
    }
    animate();

    // Add hover effect on clickable elements
    const hoverElements = document.querySelectorAll(
      'a, button, .btn, input[type="submit"]'
    );
    hoverElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursor.classList.add("hover");
      });
      element.addEventListener("mouseleave", () => {
        cursor.classList.remove("hover");
      });
    });
  }; // end ssCustomCursor

  /* Initialize
   * ------------------------------------------------------ */
  (function ssInit() {
    ssPreloader();
    ssParallax();
    ssMenuOnScrolldown();
    ssAnimateOnScroll();
    ssOffCanvas();
    ssMasonry();
    ssSwiper();
    ssPhotoswipe();
    ssMailChimpForm();
    ssAlertBoxes();
    ssBackToTop();
    ssMoveTo();
    ssCustomCursor();
  })();
})(document.documentElement);

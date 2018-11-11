 
//owl-carousel start
$('.main-slider').owlCarousel({
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  stagePadding: 0,
  smartSpeed: 450,
  center: false,
  lazyLoad: false,
  loop: false,
  rewind: false,
  margin: 0,
  merge: false,
  autoWidth: false,
  autoplay: false,
  autoplayTimeout: 5000,
  autoplayHoverPause: false,
  nav: true,
  dots: true,
  responsive: {
    // breakpoint from 480 up
    0: {
      items: 1,
      nav: false,
      dots: false,
    },
    // breakpoint from 768 up
    768: {
      items: 1,
    }
  }

});
//owl-carousel end

$('.testimonial-carousel').owlCarousel({
  loop: false,
  rewind: true,
  margin: 0,
  autoWidth: false,
  autoplay: true,
  autoplayTimeout: 5000,
  autoplayHoverPause: false,
  nav: false,
  dots: false,
  responsive: {
    0: {
      items: 1,
      margin: 0,
    },
    750: {
      items: 3,
      margin: 20,
    }
  }
});
//owl-carousel start
$('.carousel').owlCarousel({
  center: false,
  lazyLoad: false,
  loop: false,
  rewind: true,
  margin: 25,
  merge: false,
  autoWidth: false,
  autoplay: false,
  autoplayTimeout: 5000,
  autoplayHoverPause: false,
  nav: true,
  dots: true,
  responsive: {
    // breakpoint from 480 up
    0: {
      items: 1,
      nav: false,
      dots: false,
    },
    // breakpoint from 768 up
    768: {
      items: 7,
    }
  }

});
//owl-carousel end

//fancy box 3 start
$('[data-fancybox="gallery"]').fancybox({
  hash: false,
  // Open/close animation type
  // Possible values:
  //   false            - disable
  //   "zoom"           - zoom images from/to thumbnail
  //   "fade"
  //   "zoom-in-out"
  //
  animationEffect: "zoom-in-out",
  // Transition effect between slides
  //
  // Possible values:
  //   false            - disable
  //   "fade'
  //   "slide'
  //   "circular'
  //   "tube'
  //   "zoom-in-out'
  //   "rotate'
  //
  fullScreen: {
    autoStart: false
  },
  transitionEffect: "zoom-in-out",
  // Enable infinite gallery navigation
  loop: false,

  // Horizontal space between slides
  gutter: 50,

  // Enable keyboard navigation
  keyboard: true,

  // Should display navigation arrows at the screen edges
  arrows: true,

  // Should display counter at the top left corner
  infobar: true,

  // Should display close button (using `btnTpl.smallBtn` template) over the content
  // Can be true, false, "auto"
  // If "auto" - will be automatically enabled for "html", "inline" or "ajax" items
  smallBtn: "auto",

  // Should display toolbar (buttons at the top)
  // Can be true, false, "auto"
  // If "auto" - will be automatically hidden if "smallBtn" is enabled
  toolbar: "auto",

  // What buttons should appear in the top right corner.
  // Buttons will be created using templates from `btnTpl` option
  // and they will be placed into toolbar (class="fancybox-toolbar"` element)
  buttons: [
    "zoom",
    "share",
    "slideShow",
    "fullScreen",
    "download",
    "thumbs",
    "close"
  ],

  // Detect "idle" time in seconds
  idleTime: 3,

  // Disable right-click and use simple image protection for images
  protect: false,

  // Shortcut to make content "modal" - disable keyboard navigtion, hide buttons, etc
  modal: false,

  image: {
    // Wait for images to load before displaying
    //   true  - wait for image to load and then display;
    //   false - display thumbnail and load the full-sized image over top,
    //           requires predefined image dimensions (`data-width` and `data-height` attributes)
    preload: true,
  },

});
//fancy box 3 end
//-----------INSTAFEED & OWL CAROUSEL JS START --------------

var feed = new Instafeed({
  get: 'user',
  userId: '5762973187',
  clientId: '3f05d4faafaf4628afc6be8874984c21',
  accessToken: '5762973187.1677ed0.82879dd4dae4492682e82cee44ebdbf5',
  template: '<div class="item" id="{{id}}">\
      <a href="{{image}}" data-fancybox="instagram" id="{{id}}" class="instafeed-image" alt="{{model.user.username}}" data-caption="{{model.user.username}} - {{likes}} Likes - {{comments}} Comment - {{model.created_time}} - {{caption}}" >\
        <img class="w-100 rounded" src="{{image}}" alt="{{link}}" >\
      </a>\
</div>',
  resolution: 'standard_resolution',
  sortBy: 'most-recent',
  limit: 99999,
  links: false,
  filter: function (image) {
    var date = new Date(image.created_time * 1000);
    m = date.getMonth();
    d = date.getDate();
    y = date.getFullYear();
    var month_names = new Array();
    month_names[month_names.length] = "Jan";
    month_names[month_names.length] = "Feb";
    month_names[month_names.length] = "Mar";
    month_names[month_names.length] = "Apr";
    month_names[month_names.length] = "May";
    month_names[month_names.length] = "Jun";
    month_names[month_names.length] = "Jul";
    month_names[month_names.length] = "Aug";
    month_names[month_names.length] = "Sep";
    month_names[month_names.length] = "Oct";
    month_names[month_names.length] = "Nov";
    month_names[month_names.length] = "Dec";
    var thetime = month_names[m] + ' ' + d + ' ' + y;
    image.created_time = thetime;
    return true;
  },
  after: function () {
    $('#instafeed').owlCarousel({
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      stagePadding: 0,
      smartSpeed: 450,
      center: false,
      lazyLoad: false,
      loop: false,
      rewind: false,
      margin: 20,
      merge: false,
      autoWidth: false,
      autoplay: false,
      autoplayTimeout: 5000,
      autoplayHoverPause: false,
      nav: false,
      dots: true,
      responsive: {
        // breakpoint from 480 up
        0: {
          items: 3,
          nav: false,
          dots: false,
        },
        // breakpoint from 768 up
        768: {
          items: 4,
        }
      }

    });
    $('[data-fancybox="instagram"]').fancybox({
      hash: false,
      animationEffect: "zoom-in-out",
      fullScreen: {
        autoStart: false
      },
      transitionEffect: "zoom-in-out",
      // Enable infinite gallery navigation
      loop: false,

      // Horizontal space between slides
      gutter: 50,

      // Enable keyboard navigation
      keyboard: true,

      // Should display navigation arrows at the screen edges
      arrows: true,

      // Should display counter at the top left corner
      infobar: true,

      // Should display close button (using `btnTpl.smallBtn` template) over the content
      // Can be true, false, "auto"
      // If "auto" - will be automatically enabled for "html", "inline" or "ajax" items
      smallBtn: "auto",

      // Should display toolbar (buttons at the top)
      // Can be true, false, "auto"
      // If "auto" - will be automatically hidden if "smallBtn" is enabled
      toolbar: "auto",

      // What buttons should appear in the top right corner.
      // Buttons will be created using templates from `btnTpl` option
      // and they will be placed into toolbar (class="fancybox-toolbar"` element)
      buttons: [
        "zoom",
        "share",
        "slideShow",
        "fullScreen",
        "download",
        "thumbs",
        "close"
      ],

      // Detect "idle" time in seconds
      idleTime: 3,

      // Disable right-click and use simple image protection for images
      protect: false,

      // Shortcut to make content "modal" - disable keyboard navigtion, hide buttons, etc
      modal: false,

      image: {
        preload: true,
      },

    });
  }
});
feed.run();

//-----------INSTAFEED & OWL CAROUSEL JS END --------------
Macy({
  container: '#masongry',
  trueOrder: false,
  waitForImages: false,
  margin: 20,
  columns: 10,
  breakAt: {
    1200: 5,
    940: 3,
    520: 2,
    400: 1
  }
});

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict';
  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();
// SlothArchiver info site — small progressive-enhancement touches only.
// Nothing here is required for the page to work; every link/section is
// plain HTML and functions with JS disabled.

(function () {
  var toggle = document.getElementById('nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Relabel the primary download CTA with the visitor's likely platform,
  // purely cosmetic -- the link itself always points at the same releases
  // page regardless, so this can never send anyone somewhere wrong.
  var platformLabel = (function () {
    var ua = navigator.userAgent || '';
    if (/Mac/i.test(ua)) return 'Download for macOS';
    if (/Win/i.test(ua)) return 'Download for Windows';
    if (/Linux/i.test(ua)) return 'Download for Linux';
    return null;
  })();

  if (platformLabel) {
    var heroCta = document.querySelector('.hero-ctas .btn-primary');
    if (heroCta) heroCta.textContent = platformLabel;
  }

  // The demo clips play like GIFs (autoplay/loop/muted, no controls) via
  // plain HTML attributes -- that's the baseline and works with JS off.
  // This just pauses whichever ones scroll out of view so seven looping
  // videos aren't all decoding at once on a long scroll.
  var demoVideos = document.querySelectorAll('.demo-media video');
  if (demoVideos.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(function () {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.25 });

    demoVideos.forEach(function (video) {
      observer.observe(video);
    });
  }
})();

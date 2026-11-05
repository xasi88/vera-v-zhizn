(function () {
  var root = document.documentElement;

  // Первый экран: одно появление после загрузки
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { root.classList.add('loaded'); });
  });

  // Линия под шапкой после прокрутки
  var top = document.getElementById('top');
  var onScroll = function () { top.classList.toggle('scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Разделы проявляются при прокрутке, один раз
  var items = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  items.forEach(function (el) { io.observe(el); });
})();

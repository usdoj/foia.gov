import $ from 'jquery';

/**
 * Override USWDS skip nav on quarterly and annual report pages
 * @param e
 */
function skipOnClick(e) {
  const id = this.getAttribute('href');
  const target = document.getElementById((id === '#'));
  if (target) {
    target.style.outline = '0';
    target.setAttribute('tabindex', 0);
    target.focus();
  }

  // manually smooth scroll down
  e.preventDefault();
  $([document.documentElement, document.body]).animate({
    scrollTop: $(id).offset().top,
  }, 500);
}

function smoothScroll() {
  $('.usa-skipnav').click(skipOnClick);
}

export default {
  smoothScroll,
};

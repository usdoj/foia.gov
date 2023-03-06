let topButton = document.getElementById("return-top");
let skipnav = document.getElementById("skipnav");

// Show the Return to Top button if scroll position is higher than the user's screen height
window.onscroll = () => {
  if (document.documentElement.scrollTop >= globalThis.screen.availHeight) {
    topButton.style.opacity = 1;
  } else {
    topButton.style.opacity = 0;
  }
};

topButton.onclick = () => {
  document.body.scrollIntoView({
    behavior: "smooth",
  });
  skipnav.focus();
  skipnav.blur();
};

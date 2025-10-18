// js/footerYear.js

document.addEventListener("DOMContentLoaded", () => {
  const anoSpan = document.querySelectorAll("footer span[id^='ano']");
  anoSpan.forEach(span => {
    span.textContent = new Date().getFullYear();
  });
});

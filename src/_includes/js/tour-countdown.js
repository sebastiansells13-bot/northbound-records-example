/**
 * Live countdown timers for tour dates. Reads the target date from each
 * element's data-countdown attribute (a plain "yyyy-MM-dd" string,
 * interpreted as local midnight) and updates every second — genuine
 * client-side date math, no library.
 */
(function () {
  "use strict";

  function formatRemaining(ms) {
    if (ms <= 0) return "Tonight";

    var totalSeconds = Math.floor(ms / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);

    if (days > 0) {
      return "in <strong>" + days + "</strong>d " + hours + "h";
    }
    if (hours > 0) {
      return "in <strong>" + hours + "</strong>h " + minutes + "m";
    }
    return "in <strong>" + minutes + "</strong>m";
  }

  function tick() {
    var elements = document.querySelectorAll("[data-countdown]");
    if (elements.length === 0) return;

    var now = new Date();
    elements.forEach(function (el) {
      var target = new Date(el.getAttribute("data-countdown") + "T19:00:00");
      var diff = target.getTime() - now.getTime();
      el.innerHTML = diff <= 0 ? "Tonight" : formatRemaining(diff);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    tick();
    setInterval(tick, 60000); // re-render every minute — no need for per-second churn
  });
})();

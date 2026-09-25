/**
 * Live countdown timers for tour dates. Reads the show date from each
 * row's data-countdown attribute (a plain "yyyy-MM-dd" string; doors are
 * assumed at 7 PM local time) and re-renders every minute — genuine
 * client-side date math, no library.
 *
 * The site only rebuilds on push, so past shows are hidden here rather
 * than at build time: a row disappears the day after its show. A list
 * with data-upcoming-limit="N" (the homepage's "Next Show") shows only the
 * first N upcoming rows; each list's [data-tour-empty] message appears once
 * nothing upcoming is left.
 */
(function () {
  "use strict";

  var SHOW_HOUR = 19;

  function showStart(dateStr) {
    return new Date(dateStr + "T" + SHOW_HOUR + ":00:00");
  }

  function isPast(dateStr, now) {
    // Past once the show's calendar day is over (local midnight after it).
    var dayAfter = new Date(dateStr + "T00:00:00");
    dayAfter.setDate(dayAfter.getDate() + 1);
    return now >= dayAfter;
  }

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
    var lists = document.querySelectorAll(".tour-list");
    if (lists.length === 0) return;

    var now = new Date();
    lists.forEach(function (list) {
      var limit = Number(list.getAttribute("data-upcoming-limit")) || Infinity;
      var shown = 0;

      list.querySelectorAll(".tour-row").forEach(function (row) {
        var el = row.querySelector("[data-countdown]");
        var dateStr = el ? el.getAttribute("data-countdown") : "";
        var upcoming = dateStr && !isPast(dateStr, now);

        if (upcoming && shown < limit) {
          shown += 1;
          row.hidden = false;
          el.innerHTML = formatRemaining(showStart(dateStr).getTime() - now.getTime());
        } else {
          row.hidden = true;
        }
      });

      var emptyEl = list.parentNode.querySelector("[data-tour-empty]");
      if (emptyEl) emptyEl.hidden = shown > 0;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    tick();
    setInterval(tick, 60000); // re-render every minute — no need for per-second churn
  });
})();

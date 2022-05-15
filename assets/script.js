$(document).ready(function () {
  //Global Varibles - to select today date - store calander events - track calander current time
  const currentDateEl = $("header #currentDay");
  let calEvents = {};
  let renderHour = moment();

  //on pageload - get current time to place on header  - create time blocks  - track hour to change blocks every hour
  loadcalendar();
  initCalendar();
  trackBlock();

  // render the calendar on the page  - only to start buliding from 9 o clock till 5 - ( appended class and save button to each block) - it statement to check teh current hour and ammend acordingly
  function renderTimeblock(today, calEvents) {
    let currentHour = moment(today).hour(9);
    const calendar = $("div.container");
    calendar.empty();

    for (let i = 1; i < 10; i++) {
      const row = $("<div>").addClass("row");

      let hourClass = "";
      if (today.isBefore(currentHour, "hour")) {
        hourClass = "future";
      } else if (today.isAfter(currentHour, "hour")) {
        hourClass = "past";
      } else {
        hourClass = "present";
      }

      calendar.append(row);

      row.append(
        $("<div>").addClass("col-2 hour").text(currentHour.format("h A"))
      );

      let timeBlock = currentHour.format("hA");
      row.append(
        $("<textarea>")
          .addClass(`col-8 ${hourClass}`)
          .text(calEvents[timeBlock])
      );
      row.append(
        $("<button>")
          .addClass("col-2 saveBtn")
          .html("<i class='fas fa-save'></i>")
          .attr("aria-label", "Save")
          .attr("id", currentHour.format("hA"))
      );
      currentHour.add(1, "hour");
      renderHour = moment();
    }
  }

  // start funtion ammend heder to read current time and date and using date to render timeBLock
  function initCalendar() {
    const today = moment();
    currentDateEl.text(today.format("LLLL"));
    renderTimeblock(today, calEvents);
  }

  /// on page load funtion to see if ther is any items on local stoarge then display the events
  function loadcalendar() {
    const storedCal = JSON.parse(localStorage.getItem("calEvents"));
    if (storedCal) {
      calEvents = storedCal;
    }
  }

  function trackBlock() {
    const checkHourInterval = setInterval(function () {
      if (moment().isAfter(renderHour, "minute")) {
        initCalendar();
      }
    }, 60000);
  }

  // storeing evenst item to loacalstorage as JSON items
  function storeCal() {
    localStorage.setItem("calEvents", JSON.stringify(calEvents));
  }

});

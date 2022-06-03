$(document).ready(function () {
  //Global Varibles - to select today date - store calander events - track calander current time
  const currentDateEl = $("header #currentDay");
  let calEvents = {};
  let hourRendered = moment();

  // render the calendar on the page from 9 0 clocnbk
  function renderCalendar(today, calEvents) {
    let rowHr = moment(today).hour(9);
    const calendar = $("div.container");
    calendar.empty();

    // for loop to make rows for hours 9 to 5
    for (let i = 1; i < 10; i++) {
      const row = $("<div>").addClass("row");

      // set colors for time blocks for past, present and future
      let classOfHour = "";
      if (today.isBefore(rowHr, "hour")) {
        classOfHour = "future";
      } else if (today.isAfter(rowHr, "hour")) {
        classOfHour = "past";
      } else {
        classOfHour = "present";
      }

      calendar.append(row);

      row.append($("<div>").addClass("col-2 hour").text(rowHr.format("h A")));

      let timeBlock = rowHr.format("hA");
      row.append(
        $("<textarea>")
          .addClass(`col-8 ${classOfHour}`)
          .text(calEvents[timeBlock])
      );
      //adding  save button column to row// add save button column to row
      row.append(
        $("<button>")
          .addClass("col-2 saveBtn")
          .html("<i class='fas fa-save'></i>")
          .attr("aria-label", "Save")
          .attr("id", rowHr.format("hA"))
      );

      rowHr.add(1, "hour");

      hourRendered = moment();
    }
  }

  // start funtion ammend heder to read current time and date and using date to render timeBLock
  function initCalendar() {
    const today = moment(); // set today's date
    currentDateEl.text(today.format("LL"));
    renderCalendar(today, calEvents);
  }

  /// on page load funtion to see if ther is any items on local stoarge then display the events
  function loadCal() {
    const storedCal = JSON.parse(localStorage.getItem("calEvents"));
    if (storedCal) {
      calEvents = storedCal;
    }
  }

  loadCal();
  initCalendar();
  hourTracker();

  function hourTracker() {
    const checkHourInterval = setInterval(function () {
      if (moment().isAfter(hourRendered, "minute")) {
        initCalendar();
      }
    }, 60000);
  }

  function storeCal() {
    localStorage.setItem("calEvents", JSON.stringify(calEvents));
  }

  /// Adding  to celander
  function clearCalendar() {
    calEvents = {};
    storeCal();
    initCalendar();
  }
  $("button#clear-cal").on("click", clearCalendar);

  // storeing evenst item to loacalstorage
  $(document).on("click", "button.saveBtn", function (event) {
    let calDesc = event.currentTarget.parentElement.children[1].value;
    calEvents[event.currentTarget.id] = calDesc;
    storeCal();
  });
});

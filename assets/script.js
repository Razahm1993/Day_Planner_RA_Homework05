const currentDateEl = $("header #currentDay");
let renderHour = moment();

function initCalendar() {
  const today = moment();
  currentDateEl.text(today.format("LLLL"));
}


//on pageload - get current time to place on header  - create time blocks  - track hour to change blocks every hour 
 
loadtimedate(); 
renderTimeblock();
trackBlock(); 

function loadtimedate() {
    const today = moment();
    currentDateEl.text(today.format("LLLL"));
};


function renderTimeblock() {
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
  
      row.append($("<div>").addClass("col-2 hour").text (currentHour.format("h A")));
  
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
};
};


function trackBlock() {
    setInterval(function () {
        if (moment().isAfter(renderHour, "minute")) {
            initCalendar();
        }
    }, 60000);
};

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

const events = {
  [new Date(2020, 1, 28)]: "Technical Test", 
  [new Date(2020, 1, 29)]: "Technical Test Result"
}

function next() {
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}

function previous() {
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

function jump() {
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

  let firstDay = (new Date(year, month)).getDay();
  let daysInMonth = 32 - new Date(year, month, 32).getDate();

  // body of the calendar
  let tbl = document.getElementById("calendar-body"); 

  // clearing all previous cells
  tbl.innerHTML = "";

  // filing data about month and in the page via DOM.
  monthAndYear.innerHTML = months[month] + " " + year;
  selectYear.value = year;
  selectMonth.value = month;

  // creating all cells
  let date = 1;
  for (let i = 0; i < 6; i++) {
    // creates a table row
    let row = document.createElement("tr");
        
    //creating individual cells, filing them up with data.
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let cell = document.createElement("td");
        let cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth) {
          break;
      } else {
          let cell = document.createElement("td");
          let cellText = document.createTextNode(date);
    
        // color today's date
        if (date === 28) {
          cell.classList.add("event")
          cell.setAttribute("id", "eDay1");
        } 

        if (date === 29) {
          cell.classList.add("event")
          cell.setAttribute("id", "eDay2");
        } 

        // color events dates
        if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
          cell.classList.add("day");
        } 
        cell.appendChild(cellText);
        row.appendChild(cell);
        date++;
            // function onClick to display data in display area block
        cell.onclick = function() { 
          let dArea = document.getElementById("sub-main2");
          if (event.target.id === "eDay1"){
            var eventDetails = events[new Date(2020, 1, 28)]
          } 
          else {
            eventDetails = events[new Date(2020, 1, 29)]
          }
          dArea.innerHTML = eventDetails;
          }
        } 
      }
      // appending each row into calendar body.
      tbl.appendChild(row); 
    }
}
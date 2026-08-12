// =========================================
// DIGITAL CLOCK
// =========================================

// Get HTML elements
const dayElement = document.getElementById("day");
const dateElement = document.getElementById("date");
const timeElement = document.getElementById("time");


// Function to update clock
function updateClock() {

    // Get current date and time
    const now = new Date();


    // =========================================
    // GET DAY
    // =========================================

    const day = now.toLocaleDateString("en-US", {
        weekday: "long"
    });


    // =========================================
    // GET DATE
    // =========================================

    const date = now.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });


    // =========================================
    // GET TIME
    // =========================================

    const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });


    // =========================================
    // DISPLAY DATA
    // =========================================

    dayElement.textContent = day;

    dateElement.textContent = date;

    timeElement.textContent = time;
}


// =========================================
// INITIAL CALL
// =========================================

updateClock();


// =========================================
// UPDATE EVERY SECOND
// =========================================

setInterval(updateClock, 1000);

// =========================================
// DYNAMIC CALENDAR
// =========================================

// Get calendar elements
const monthYearElement = document.getElementById("month-year");
const calendarDaysElement = document.getElementById("calendar-days");

const previousMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");
const todayButton = document.getElementById("today-btn");

const selectedDateElement = document.getElementById("selected-date");


// =========================================
// CURRENT CALENDAR DATE
// =========================================

// This variable stores the month/year currently
// being displayed in the calendar.

let calendarDate = new Date();


// =========================================
// TODAY'S DATE
// =========================================

// Store today's actual date separately.
// This will help us highlight today's date.

const today = new Date();


// =========================================
// MONTH NAMES
// =========================================

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];


// =========================================
// GENERATE CALENDAR
// =========================================

function generateCalendar() {

    // Get current month and year
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();


    // =========================================
    // UPDATE MONTH & YEAR
    // =========================================

    monthYearElement.textContent =
        `${monthNames[month]} ${year}`;


    // =========================================
    // CLEAR PREVIOUS DATES
    // =========================================

    calendarDaysElement.innerHTML = "";


    // =========================================
    // FIRST DAY OF MONTH
    // =========================================

    const firstDay = new Date(year, month, 1);

    const firstDayIndex = firstDay.getDay();


    // =========================================
    // NUMBER OF DAYS IN MONTH
    // =========================================

    const lastDay = new Date(year, month + 1, 0);

    const totalDays = lastDay.getDate();


    // =========================================
    // EMPTY SPACES BEFORE FIRST DATE
    // =========================================

    for (let i = 0; i < firstDayIndex; i++) {

        const emptyDay = document.createElement("div");

        calendarDaysElement.appendChild(emptyDay);
    }


    // =========================================
    // CREATE DATE ELEMENTS
    // =========================================

    for (let day = 1; day <= totalDays; day++) {

        const dayElement = document.createElement("div");

        dayElement.textContent = day;


        // =========================================
        // CHECK TODAY
        // =========================================

        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {

            dayElement.classList.add("today");
        }


        // =========================================
        // DATE CLICK
        // =========================================

        dayElement.addEventListener("click", function () {

            // Remove previous selected date
            document
                .querySelectorAll(".calendar-days .selected")
                .forEach(function (element) {

                    element.classList.remove("selected");
                });


            // Add selected class
            dayElement.classList.add("selected");


            // Create selected date
            const selectedDate = new Date(
                year,
                month,
                day
            );


            // Format selected date
            const formattedDate =
                selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                });


            // Display selected date
            selectedDateElement.textContent =
                `Selected Date: ${formattedDate}`;
        });


        // Add date to calendar
        calendarDaysElement.appendChild(dayElement);
    }
}


// =========================================
// PREVIOUS MONTH
// =========================================

previousMonthButton.addEventListener("click", function () {

    calendarDate.setMonth(
        calendarDate.getMonth() - 1
    );

    generateCalendar();
});


// =========================================
// NEXT MONTH
// =========================================

nextMonthButton.addEventListener("click", function () {

    calendarDate.setMonth(
        calendarDate.getMonth() + 1
    );

    generateCalendar();
});


// =========================================
// TODAY BUTTON
// =========================================

todayButton.addEventListener("click", function () {

    // Reset calendar to today's date
    calendarDate = new Date();

    generateCalendar();
});


// =========================================
// INITIAL CALENDAR LOAD
// =========================================

generateCalendar();
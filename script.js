// =========================================
// DIGITAL CLOCK
// =========================================

// Get HTML elements
const dayElement = document.getElementById("day");
const dateElement = document.getElementById("date");
const timeElement = document.getElementById("time");


// =========================================
// TIME FORMAT
// =========================================

// false = 12-hour format
// true  = 24-hour format

let is24Hour = false;


// =========================================
// UPDATE DIGITAL CLOCK
// =========================================

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
        hour12: !is24Hour
    });


    // =========================================
    // DISPLAY DATA
    // =========================================

    dayElement.textContent = day;

    dateElement.textContent = date;

    timeElement.textContent = time;
}


// =========================================
// INITIAL CLOCK LOAD
// =========================================

updateClock();


// =========================================
// UPDATE CLOCK EVERY SECOND
// =========================================

setInterval(updateClock, 1000);


// =========================================
// DYNAMIC CALENDAR
// =========================================

// Get calendar elements
const monthYearElement =
    document.getElementById("month-year");

const calendarDaysElement =
    document.getElementById("calendar-days");

const previousMonthButton =
    document.getElementById("prev-month");

const nextMonthButton =
    document.getElementById("next-month");

const todayButton =
    document.getElementById("today-btn");

const selectedDateElement =
    document.getElementById("selected-date");


// =========================================
// CURRENT CALENDAR DATE
// =========================================

let calendarDate = new Date();


// =========================================
// TODAY'S DATE
// =========================================

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

    const lastDay =
        new Date(year, month + 1, 0);

    const totalDays = lastDay.getDate();


    // =========================================
    // EMPTY SPACES BEFORE FIRST DATE
    // =========================================

    for (let i = 0; i < firstDayIndex; i++) {

        const emptyDay =
            document.createElement("div");

        calendarDaysElement.appendChild(emptyDay);
    }


    // =========================================
    // CREATE DATE ELEMENTS
    // =========================================

    for (let day = 1; day <= totalDays; day++) {

        const dayElement =
            document.createElement("div");

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

        dayElement.addEventListener(
            "click",
            function () {

                // Remove previous selection
                document
                    .querySelectorAll(
                        ".calendar-days .selected"
                    )
                    .forEach(function (element) {

                        element.classList.remove(
                            "selected"
                        );
                    });


                // Add selected class
                dayElement.classList.add("selected");


                // Create selected date
                const selectedDate =
                    new Date(year, month, day);


                // Format selected date
                const formattedDate =
                    selectedDate.toLocaleDateString(
                        "en-US",
                        {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        }
                    );


                // Display selected date
                selectedDateElement.textContent =
                    `Selected Date: ${formattedDate}`;
            }
        );


        // Add date to calendar
        calendarDaysElement.appendChild(
            dayElement
        );
    }
}


// =========================================
// PREVIOUS MONTH
// =========================================

previousMonthButton.addEventListener(
    "click",
    function () {

        calendarDate.setMonth(
            calendarDate.getMonth() - 1
        );

        generateCalendar();
    }
);


// =========================================
// NEXT MONTH
// =========================================

nextMonthButton.addEventListener(
    "click",
    function () {

        calendarDate.setMonth(
            calendarDate.getMonth() + 1
        );

        generateCalendar();
    }
);


// =========================================
// TODAY BUTTON
// =========================================

todayButton.addEventListener(
    "click",
    function () {

        calendarDate = new Date();

        generateCalendar();
    }
);


// =========================================
// INITIAL CALENDAR LOAD
// =========================================

generateCalendar();


// =========================================
// DARK / LIGHT MODE
// =========================================

// Get theme button
const themeToggle =
    document.getElementById("theme-toggle");


// =========================================
// CHANGE THEME
// =========================================

themeToggle.addEventListener(
    "click",
    function () {

        // Toggle dark mode class
        document.body.classList.toggle(
            "dark-mode"
        );


        // Check current theme
        const isDarkMode =
            document.body.classList.contains(
                "dark-mode"
            );


        // =========================================
        // UPDATE BUTTON TEXT
        // =========================================

        if (isDarkMode) {

            themeToggle.textContent =
                "☀️ Light Mode";

        } else {

            themeToggle.textContent =
                "🌙 Dark Mode";
        }


        // =========================================
        // SAVE THEME
        // =========================================

        localStorage.setItem(
            "theme",
            isDarkMode ? "dark" : "light"
        );
    }
);


// =========================================
// LOAD SAVED THEME
// =========================================

const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "dark") {

    document.body.classList.add(
        "dark-mode"
    );

    themeToggle.textContent =
        "☀️ Light Mode";
}


// =========================================
// 12H / 24H FORMAT TOGGLE
// =========================================

// Get format button
const formatToggle =
    document.getElementById("format-toggle");


// =========================================
// CHANGE TIME FORMAT
// =========================================

formatToggle.addEventListener(
    "click",
    function () {

        // Switch format
        is24Hour = !is24Hour;


        // =========================================
        // UPDATE BUTTON TEXT
        // =========================================

        if (is24Hour) {

            formatToggle.textContent =
                "🕐 12H Format";

        } else {

            formatToggle.textContent =
                "🕐 24H Format";
        }


        // Immediately update clock
        updateClock();


        // Immediately update world clocks
        updateWorldClocks();
    }
);


// =========================================
// WORLD CLOCKS
// =========================================

function updateWorldClocks() {

    const now = new Date();


    // =========================================
    // KOLKATA
    // =========================================

    const kolkataTime =
        now.toLocaleTimeString("en-US", {

            timeZone: "Asia/Kolkata",

            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",

            hour12: !is24Hour
        });


    // =========================================
    // LONDON
    // =========================================

    const londonTime =
        now.toLocaleTimeString("en-US", {

            timeZone: "Europe/London",

            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",

            hour12: !is24Hour
        });


    // =========================================
    // NEW YORK
    // =========================================

    const newYorkTime =
        now.toLocaleTimeString("en-US", {

            timeZone: "America/New_York",

            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",

            hour12: !is24Hour
        });


    // =========================================
    // TOKYO
    // =========================================

    const tokyoTime =
        now.toLocaleTimeString("en-US", {

            timeZone: "Asia/Tokyo",

            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",

            hour12: !is24Hour
        });


    // =========================================
    // DISPLAY WORLD CLOCKS
    // =========================================

    document.getElementById(
        "kolkata-time"
    ).textContent = kolkataTime;


    document.getElementById(
        "london-time"
    ).textContent = londonTime;


    document.getElementById(
        "newyork-time"
    ).textContent = newYorkTime;


    document.getElementById(
        "tokyo-time"
    ).textContent = tokyoTime;
}


// =========================================
// INITIAL WORLD CLOCK LOAD
// =========================================

updateWorldClocks();


// =========================================
// UPDATE WORLD CLOCKS EVERY SECOND
// =========================================

setInterval(
    updateWorldClocks,
    1000
);
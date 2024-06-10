`use strict`;

window.addEventListener("load", (event) => {
  console.log(event.target.title);
  if (event.target.title === "Activities in Piombino") {
    const map = L.map("map").setView([42.99739, 10.59686], 11);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([42.92423696772851, 10.531890377151653])
      .addTo(map)
      .bindPopup("Here we have Aquadro")
      .openPopup();

    L.marker([42.93295, 10.50892]).addTo(map).bindPopup("Salivoli beach");

    L.marker([42.9226, 10.52708]).addTo(map).bindPopup("DaLuca Ristorante");

    L.marker([42.98791, 10.50954]).addTo(map).bindPopup("I Tretruschi Srl");

    L.marker([42.92514, 10.52924]).addTo(map).bindPopup("Pizzeria Da Egidio");

    L.marker([42.93521, 10.49916]).addTo(map).bindPopup("Calamoresca");

    L.marker([42.99424, 10.53478]).addTo(map).bindPopup("Tenuta Poggio Rosso");

    L.marker([43.03284, 10.71007])
      .addTo(map)
      .bindPopup("Società Agricola Petra");
  } else {
    const map = L.map("map").setView(
      [42.92423696772851, 10.531890377151653],
      15
    );

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([42.92423696772851, 10.531890377151653])
      .addTo(map)
      .bindPopup("Here we have Aquadro")
      .openPopup();
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // console.log(entry);
      if (entry.isIntersecting && entry.target.classList.contains("right")) {
        entry.target.classList.add("show");
        entry.target.classList.add("slide-from-right");
      } else if (
        entry.isIntersecting &&
        entry.target.classList.contains("left")
      ) {
        entry.target.classList.add("show");
        entry.target.classList.add("slide-from-left");
      } else if (
        entry.isIntersecting &&
        entry.target.classList.contains("fade-in")
      ) {
        entry.target.classList.add("show");
      }
    });
  },
  { root: null }
); // Observam intregu viewport

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

//de aici incepe codul pentru calendar
document.addEventListener("DOMContentLoaded", function () {
  const calendar = document.querySelector(".calendar");
  const yearSelect = document.getElementById("year");
  const monthSelect = document.getElementById("month");
  const apartmentSelect = document.getElementById("apartment");

  const monthNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  async function getData() {
    try {
      const res = await fetch(
        "https://naymuvktteoymrucjwrp.supabase.co/rest/v1/apartament",
        {
          headers: {
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5heW11dmt0dGVveW1ydWNqd3JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU1MjUwNTEsImV4cCI6MjAzMTEwMTA1MX0.up4qzCKgbFNqDyd9cPwwb2C8DX60m82A0sOALC3XcxA",
            authorisation:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5heW11dmt0dGVveW1ydWNqd3JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU1MjUwNTEsImV4cCI6MjAzMTEwMTA1MX0.up4qzCKgbFNqDyd9cPwwb2C8DX60m82A0sOALC3XcxA",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      console.log("Fetched Data:", data); // Debug: log fetched data
      return data.map((item) => ({
        ...item,
        free: item.free === true,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function renderYearOptions() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const data = await getData();
    const availableYears = new Set(data.map((item) => item.year));

    yearSelect.innerHTML = "<option value='' disabled>Select Year</option>";
    availableYears.forEach((year) => {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      yearSelect.appendChild(option);
    });

    yearSelect.value = currentYear;
    if (yearSelect.value === "") {
      yearSelect.value = "";
    }
  }

  async function renderMonthOptions(year) {
    const data = await getData();
    const availableMonths = new Set(
      data.filter((item) => item.year == year).map((item) => item.month)
    );

    monthSelect.innerHTML = "<option value='' disabled>Select Month</option>";
    availableMonths.forEach((month) => {
      const option = document.createElement("option");
      option.value = monthNames.indexOf(month);
      option.textContent = month.charAt(0).toUpperCase() + month.slice(1);
      monthSelect.appendChild(option);
    });

    monthSelect.selectedIndex = new Date().getMonth();
    if (monthSelect.selectedIndex === -1) {
      monthSelect.selectedIndex = 0;
    }
  }

  async function renderCalendar(year, month, apartment) {
    calendar.innerHTML = "";
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const data = await getData();

    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const startingDay = new Date(year, month, 1).getDay();
    const offset = startingDay === 0 ? 6 : startingDay - 1;

    for (let i = 0; i < offset; i++) {
      const blankDay = document.createElement("div");
      blankDay.classList.add("day", "no-data");
      blankDay.textContent = "";
      calendar.appendChild(blankDay);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("day");

      if (
        year < currentYear ||
        (year === currentYear && month < currentMonth) ||
        (year === currentYear && month === currentMonth && i < currentDay)
      ) {
        dayElement.classList.add("no-data");
        dayElement.innerHTML = `<div class="row day-of-week">${
          daysOfWeek[(offset + i - 1) % 7]
        }</div>
                                <div class="row">${
                                  monthNames[month].charAt(0).toUpperCase() +
                                  monthNames[month].slice(1)
                                } ${i}</div>
                                <div class="row">No Data</div>`;
      } else {
        const dayOfWeekIndex = new Date(year, month, i).getDay();
        const dayOfWeek =
          daysOfWeek[dayOfWeekIndex === 0 ? 6 : dayOfWeekIndex - 1];
        const monthName = monthNames[month];
        const entry = data.find(
          (item) =>
            item.year == year &&
            item.month.toLowerCase() === monthName.toLowerCase() &&
            item.date == i &&
            item.apartment == apartment
        );

        if (entry) {
          const availability = entry.free ? "Available" : "Not Available";
          const price = entry.free ? `Price: € ${entry.price}` : "";
          dayElement.innerHTML = `<div class="row day-of-week">${dayOfWeek}</div>
                                   <div class="row">${
                                     monthName.charAt(0).toUpperCase() +
                                     monthName.slice(1)
                                   } ${i}</div>
                                   <div class="row">${availability}</div>
                                   <div class="row">${price}</div>`;
          dayElement.classList.add(entry.free ? "free" : "not-free");
        } else {
          dayElement.innerHTML = `<div class="row day-of-week">${dayOfWeek}</div>
                                   <div class="row">${
                                     monthName.charAt(0).toUpperCase() +
                                     monthName.slice(1)
                                   } ${i}</div>
                                   <div class="row">No Data</div>`;
          dayElement.classList.add("no-data");
        }
      }

      calendar.appendChild(dayElement);
    }
  }

  async function initializeCalendar() {
    await renderYearOptions();
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    yearSelect.value = currentYear.toString();
    await renderMonthOptions(currentYear);
    monthSelect.value = currentMonth.toString();
    renderCalendar(currentYear, currentMonth, apartmentSelect.value);
  }

  initializeCalendar();

  yearSelect.addEventListener("change", async function () {
    const selectedYear = parseInt(this.value);
    await renderMonthOptions(selectedYear);
    const selectedMonth = parseInt(monthSelect.value);
    renderCalendar(selectedYear, selectedMonth, apartmentSelect.value);
  });

  monthSelect.addEventListener("change", function () {
    const selectedYear = parseInt(yearSelect.value);
    const selectedMonth = parseInt(this.value);
    renderCalendar(selectedYear, selectedMonth, apartmentSelect.value);
  });

  apartmentSelect.addEventListener("change", function () {
    const selectedYear = parseInt(yearSelect.value);
    const selectedMonth = parseInt(monthSelect.value);
    renderCalendar(selectedYear, selectedMonth, apartmentSelect.value);
  });
});

//pana aici e codul pentru calendar

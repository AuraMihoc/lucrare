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

"use strict"; // Acest lucru asigură că codul este interpretat în mod strict și aplică reguli suplimentare pentru a evita erorile comune

document.addEventListener("DOMContentLoaded", function () {
  // Selectăm formularul de rezervare din HTML
  const reservationForm = document.getElementById("reservationForm");

  // Adăugăm un event listener pentru evenimentul de submit al formularului
  reservationForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Oprim comportamentul implicit de trimitere a formularului

    // Colectăm datele din formular
    const formData = {
      lastname: document.getElementById("lastname").value,
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      people: document.getElementById("people").value,
      apartment: document.getElementById("apartment").value,
      checkin: document.getElementById("checkin").value,
      checkout: document.getElementById("checkout").value,
      message: document.getElementById("message").value,
    };

    // Trimitem datele din formular către server folosind metoda POST
    // fetch("https://lucrare.onrender.com/sendEmail", {
    fetch("https://server-lucrare.onrender.com/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specificăm că trimitem date JSON
      },
      body: JSON.stringify(formData), // Convertim obiectul formData într-o formă JSON
    })
      .then((response) => {
        // Verificăm dacă răspunsul de la server este OK
        if (response.ok) {
          alert("Reservation submitted successfully!"); // Afișăm un mesaj de succes
          window.close(); // Închidem fereastra curentă
        } else {
          throw new Error("Failed to submit reservation."); // Aruncăm o eroare dacă nu am primit un răspuns OK
        }
      })
      .catch((error) => {
        console.log(error); // Afișăm eroarea în consolă
        console.error("Error:", error); // Afișăm eroarea în consolă
        alert("Failed to submit reservation. Please try again later."); // Afișăm un mesaj de eroare pentru utilizator
      });
  });
});

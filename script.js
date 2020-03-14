const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

//Populating UI with any localstorage if available
populateUI();

//the plus turns it into a num instead of string
let ticketPrice = +movieSelect.value;

//Save selected movie and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  //Putting Nodelist of selected seats into array
  const seatIndex = [...selectedSeats].map(seat => {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//Get data from Local Storage and populate the UI
function populateUI() {
  //from string back to array using json.parse
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats != null && selectedSeats.length > 0) {
    //loop through seats
    seats.forEach((seat, index) => {
      //checking to see if index is there
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex != null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener("change", e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", e => {
  //make sure its a seat thats being clicked on inside container
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCountAndTotal();
  }
});

//Initial count and total set
updateSelectedCount();

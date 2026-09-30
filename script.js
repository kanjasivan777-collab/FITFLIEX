// ===============================
// FITFLIX - MAIN JAVASCRIPT
// ===============================

const modal = document.getElementById("calculatorModal");
const modalTitle = document.getElementById("modalTitle");
const calculatorForm = document.getElementById("calculatorForm");
const result = document.getElementById("result");


// ===============================
// OPEN CALCULATOR
// ===============================

function openCalculator(type) {

  modal.classList.add("show");

  result.style.display = "none";
  result.innerHTML = "";

  if (type === "bmi") {
    modalTitle.innerText = "⚖️ BMI Calculator";

    calculatorForm.innerHTML = `
      <div class="form-group">
        <label>Weight (kg)</label>
        <input type="number" id="weight" placeholder="Example: 65">
      </div>

      <div class="form-group">
        <label>Height (cm)</label>
        <input type="number" id="height" placeholder="Example: 170">
      </div>

      <button class="calculate-button" onclick="calculateBMI()">
        Calculate BMI
      </button>
    `;
  }


  else if (type === "calories") {
    modalTitle.innerText = "🔥 Daily Calories";

    calculatorForm.innerHTML = `
      <div class="form-group">
        <label>Age</label>
        <input type="number" id="age" placeholder="Example: 20">
      </div>

      <div class="form-group">
        <label>Weight (kg)</label>
        <input type="number" id="weight" placeholder="Example: 65">
      </div>

      <div class="form-group">
        <label>Height (cm)</label>
        <input type="number" id="height" placeholder="Example: 170">
      </div>

      <div class="form-group">
        <label>Activity Level</label>

        <select id="activity">

          <option value="1.2">
            Little / No Exercise
          </option>

          <option value="1.375">
            Light Exercise
          </option>

          <option value="1.55">
            Moderate Exercise
          </option>

          <option value="1.725">
            Heavy Exercise
          </option>

          <option value="1.9">
            Very Heavy Exercise
          </option>

        </select>
      </div>

      <button class="calculate-button"
              onclick="calculateCalories()">

        Calculate Calories

      </button>
    `;
  }


  else if (type === "water") {

    modalTitle.innerText = "💧 Water Intake";

    calculatorForm.innerHTML = `

      <div class="form-group">

        <label>Weight (kg)</label>

        <input
          type="number"
          id="weight"
          placeholder="Example: 65"
        >

      </div>

      <button
        class="calculate-button"
        onclick="calculateWater()">

        Calculate Water

      </button>

    `;
  }


  else if (type === "running") {

    modalTitle.innerText = "🏃 Running Calculator";

    calculatorForm.innerHTML = `

      <div class="form-group">

        <label>Weight (kg)</label>

        <input
          type="number"
          id="weight"
          placeholder="Example: 65"
        >

      </div>

      <div class="form-group">

        <label>Running Distance (km)</label>

        <input
          type="number"
          id="distance"
          placeholder="Example: 5"
        >

      </div>

      <button
        class="calculate-button"
        onclick="calculateRunning()">

        Calculate Calories

      </button>

    `;
  }


  else if (type === "jogging") {

    modalTitle.innerText = "🚶 Jogging Calculator";

    calculatorForm.innerHTML = `

      <div class="form-group">

        <label>Weight (kg)</label>

        <input
          type="number"
          id="weight"
          placeholder="Example: 65"
        >

      </div>

      <div class="form-group">

        <label>Jogging Time (minutes)</label>

        <input
          type="number"
          id="time"
          placeholder="Example: 30"
        >

      </div>

      <button
        class="calculate-button"
        onclick="calculateJogging()">

        Calculate Calories

      </button>

    `;
  }


  else if (type === "food") {

    modalTitle.innerText = "🍽️ Food Calories";

    calculatorForm.innerHTML = `

      <div class="form-group">

        <label>Search Food</label>

        <input
          type="text"
          id="foodSearch"
          placeholder="Example: banana"
          oninput="searchFood()"
        >

      </div>

      <div
        class="food-list"
        id="foodList">

      </div>

    `;

    showFood();
  }

}


// ===============================
// CLOSE CALCULATOR
// ===============================

function closeCalculator() {

  modal.classList.remove("show");

}


// Close modal when clicking outside

modal.addEventListener("click", function(event) {

  if (event.target === modal) {

    closeCalculator();

  }

});


// ===============================
// BMI CALCULATOR
// ===============================

function calculateBMI() {

  const weight =
    Number(document.getElementById("weight").value);

  const height =
    Number(document.getElementById("height").value);

  if (!weight || !height || weight <= 0 || height <= 0) {

    showResult("Please enter valid weight and height.");

    return;

  }

  const heightMeter = height / 100;

  const bmi =
    weight / (heightMeter * heightMeter);

  let category = "";

  if (bmi < 18.5) {

    category = "Underweight";

  }

  else if (bmi < 25) {

    category = "Normal Weight";

  }

  else if (bmi < 30) {

    category = "Overweight";

  }

  else {

    category = "Obesity";

  }

  showResult(`
    <span class="result-number">
      ${bmi.toFixed(1)}
    </span>

    BMI Category: <strong>${category}</strong>

    <br><br>

    <small>
      BMI is a general screening measurement and
      does not diagnose health conditions.
    </small>
  `);

}


// ===============================
// CALORIE CALCULATOR
// ===============================

function calculateCalories() {

  const age =
    Number(document.getElementById("age").value);

  const weight =
    Number(document.getElementById("weight").value);

  const height =
    Number(document.getElementById("height").value);

  const activity =
    Number(document.getElementById("activity").value);

  if (
    !age ||
    !weight ||
    !height ||
    age <= 0 ||
    weight <= 0 ||
    height <= 0
  ) {

    showResult("Please enter all details.");

    return;

  }

  // General estimate using Mifflin-St Jeor
  // Male example

  const bmr =
    (10 * weight) +
    (6.25 * height) -
    (5 * age) +
    5;

  const calories =
    bmr * activity;

  showResult(`

    <span class="result-number">
      ${Math.round(calories)}
    </span>

    estimated kcal/day

    <br><br>

    Estimated BMR:
    <strong>
      ${Math.round(bmr)} kcal
    </strong>

    <br><br>

    <small>
      This is a general estimate. Individual calorie
      needs can vary.
    </small>

  `);

}


// ===============================
// WATER CALCULATOR
// ===============================

function calculateWater() {

  const weight =
    Number(document.getElementById("weight").value);

  if (!weight || weight <= 0) {

    showResult("Please enter your weight.");

    return;

  }

  // Approximate 35 ml per kg

  const waterML =
    weight * 35;

  const waterLiters =
    waterML / 1000;

  showResult(`

    <span class="result-number">
      ${waterLiters.toFixed(2)} L
    </span>

    approximately per day

    <br><br>

    That's around
    <strong>
      ${Math.round(waterML)} ml
    </strong>

    <br><br>

    <small>
      Actual fluid needs vary with activity,
      climate and individual circumstances.
    </small>

  `);

}


// ===============================
// RUNNING CALCULATOR
// ===============================

function calculateRunning() {

  const weight =
    Number(document.getElementById("weight").value);

  const distance =
    Number(document.getElementById("distance").value);

  if (
    !weight ||
    !distance ||
    weight <= 0 ||
    distance <= 0
  ) {

    showResult("Please enter valid values.");

    return;

  }

  // Simple running estimate

  const calories =
    weight * distance;

  showResult(`

    <span class="result-number">
      ${Math.round(calories)}
    </span>

    estimated calories burned

    <br><br>

    Distance:
    <strong>
      ${distance} km
    </strong>

  `);

}


// ===============================
// JOGGING CALCULATOR
// ===============================

function calculateJogging() {

  const weight =
    Number(document.getElementById("weight").value);

  const time =
    Number(document.getElementById("time").value);

  if (
    !weight ||
    !time ||
    weight <= 0 ||
    time <= 0
  ) {

    showResult("Please enter valid values.");

    return;

  }

  // General jogging estimate

  const calories =
    weight * time * 0.12;

  showResult(`

    <span class="result-number">
      ${Math.round(calories)}
    </span>

    estimated calories burned

    <br><br>

    Time:
    <strong>
      ${time} minutes
    </strong>

  `);

}


// ===============================
// FOOD DATABASE
// ===============================

const foods = [

  {
    name: "Rice",
    calories: "130 kcal / 100g"
  },

  {
    name: "Chicken Breast",
    calories: "165 kcal / 100g"
  },

  {
    name: "Egg",
    calories: "78 kcal / 1 egg"
  },

  {
    name: "Banana",
    calories: "89 kcal / 100g"
  },

  {
    name: "Apple",
    calories: "52 kcal / 100g"
  },

  {
    name: "Oats",
    calories: "389 kcal / 100g"
  },

  {
    name: "Milk",
    calories: "61 kcal / 100ml"
  },

  {
    name: "Bread",
    calories: "265 kcal / 100g"
  },

  {
    name: "Potato",
    calories: "77 kcal / 100g"
  },

  {
    name: "Peanut Butter",
    calories: "588 kcal / 100g"
  },

  {
    name: "Dates",
    calories: "282 kcal / 100g"
  },

  {
    name: "Almonds",
    calories: "579 kcal / 100g"
  }

];


// ===============================
// SHOW FOOD
// ===============================

function showFood(list = foods) {

  const foodList =
    document.getElementById("foodList");

  if (!foodList) return;

  foodList.innerHTML = "";

  list.forEach(food => {

    const item =
      document.createElement("div");

    item.className = "food-item";

    item.innerHTML = `

      <span>
        ${food.name}
      </span>

      <span>
        ${food.calories}
      </span>

    `;

    foodList.appendChild(item);

  });

}


// ===============================
// SEARCH FOOD
// ===============================

function searchFood() {

  const search =
    document
      .getElementById("foodSearch")
      .value
      .toLowerCase()
      .trim();

  const filtered =
    foods.filter(food =>
      food.name
        .toLowerCase()
        .includes(search)
    );

  showFood(filtered);

}


// ===============================
// RESULT DISPLAY
// ===============================

function showResult(message) {

  result.innerHTML = message;

  result.style.display = "block";

  result.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });

}


// ===============================
// CATEGORY FILTER
// ===============================

const categoryButtons =
  document.querySelectorAll(
    ".categories button"
  );

const cards =
  document.querySelectorAll(
    ".calculator-card"
  );


categoryButtons.forEach(button => {

  button.addEventListener("click", () => {

    categoryButtons.forEach(btn =>
      btn.classList.remove("active")
    );

    button.classList.add("active");

    const category =
      button.dataset.category;

    cards.forEach(card => {

      if (
        category === "all" ||
        card.dataset.category === category
      ) {

        card.style.display = "";

      }

      else {

        card.style.display = "none";

      }

    });

  });

});


// ===============================
// SEARCH CALCULATORS
// ===============================

const searchInput =
  document.getElementById("searchInput");


searchInput.addEventListener(
  "input",
  function () {

    const search =
      this.value.toLowerCase().trim();

    cards.forEach(card => {

      const name =
        card.dataset.name.toLowerCase();

      if (name.includes(search)) {

        card.style.display = "";

      }

      else {

        card.style.display = "none";

      }

    });

  }
);


// ===============================
// BOTTOM NAV
// ===============================

function scrollToTop() {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


function focusSearch() {

  searchInput.focus();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


function showAll() {

  categoryButtons.forEach(btn =>
    btn.classList.remove("active")
  );

  categoryButtons[0].classList.add("active");

  cards.forEach(card => {

    card.style.display = "";

  });

  document
    .querySelector(".container")
    .scrollIntoView({
      behavior: "smooth"
    });

}


// ===============================
// ESC KEY CLOSE
// ===============================

document.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Escape") {

      closeCalculator();

    }

  }
);
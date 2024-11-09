// Array of warrior idioms
const idioms = [
  "Bite the bullet",
  "Fight fire with fire",
  "Burn your boats or burn the ships",
  "Pick your battles",
  "Put your armor on",
  "Go down swinging",
  "Stand your ground",
  "Iron sharpens iron",
  "Forge in the fire",
  "To the victor go the spoils",
  "The die is cast",
  "Throw down the gauntlet",
  "A sword in the sheath does not cut",
  "Hold the line",
  "Fall seven times, stand up eight",
  "Lead with your shield or on it",
  "Die on your feet rather than live on your knees",
  "An army marches on its stomach",
  "Keep your powder dry",
  "Lock, stock, and barrel",
  "March to the beat of your own drum",
  "Run the gauntlet",
  "Trial by fire",
  "Carve out your destiny",
  "Gird your loins"
];

// Function to get a daily idiom based on the date
function getDailyIdiom() {
  const date = new Date();
  const index = date.getDate() % idioms.length;
  return idioms[index];
}

// Display the daily idiom
document.getElementById("dailyIdiom").textContent = getDailyIdiom();

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daily Warrior Idiom</title>
  <style>
    /* Basic styles for a warrior-themed look */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      font-family: Arial, sans-serif;
      background-color: #333;
      color: #fff;
    }
    
    .container {
      text-align: center;
      max-width: 600px;
      padding: 20px;
      background: rgba(0, 0, 0, 0.8);
      border-radius: 10px;
    }
    
    h1 {
      font-size: 2.5em;
      margin-bottom: 0.5em;
    }
    
    .idiom {
      font-size: 1.5em;
      font-weight: bold;
      margin: 1em 0;
      color: #FFD700;
    }
    
    .about {
      font-size: 0.9em;
      color: #ccc;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Warrior Wisdom</h1>
    <p class="idiom" id="dailyIdiom"></p>
    <small class="about">Embrace your warrior spirit with a daily dose of courage and resilience.</small>
  </div>
  <script>
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
  </script>
</body>
</html>
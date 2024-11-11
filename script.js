// Array of warrior idioms with descriptions
const idioms = [
  { 
    text: "Bite the bullet", 
    description: "To endure a painful experience or face a difficult situation head-on." 
  },
  { 
    text: "Fight fire with fire", 
    description: "To use the same tactics or methods as your opponent." 
  },
  { 
    text: "Burn your boats or burn the ships", 
    description: "To commit fully by removing any way of going back." 
  },
  { 
    text: "Pick your battles", 
    description: "To choose which conflicts are worth engaging in." 
  },
  { 
    text: "Put your armor on", 
    description: "Prepare yourself for a challenging situation." 
  },
  { 
    text: "Go down swinging", 
    description: "To keep fighting until the end, even if the outcome looks grim." 
  },
  { 
    text: "Stand your ground", 
    description: "To hold firm to your position or beliefs." 
  },
  { 
    text: "Iron sharpens iron", 
    description: "One person strengthens another through challenge and encouragement." 
  },
  { 
    text: "Forge in the fire", 
    description: "To be shaped and strengthened by adversity." 
  },
  { 
    text: "To the victor go the spoils", 
    description: "The winner claims the rewards." 
  },
  { 
    text: "The die is cast", 
    description: "A decision has been made and cannot be changed." 
  },
  { 
    text: "Throw down the gauntlet", 
    description: "To issue a challenge." 
  },
  { 
    text: "A sword in the sheath does not cut", 
    description: "Unused skills do not bring results." 
  },
  { 
    text: "Hold the line", 
    description: "To maintain your position under pressure." 
  },
  { 
    text: "Fall seven times, stand up eight", 
    description: "Resilience is about continuing to rise after every setback." 
  },
  { 
    text: "Lead with your shield or on it", 
    description: "Enter a situation prepared to face all outcomes, honorably." 
  },
  { 
    text: "Die on your feet rather than live on your knees", 
    description: "It's better to stand up for your beliefs than to live in submission." 
  },
  { 
    text: "An army marches on its stomach", 
    description: "Basic needs must be met for optimal performance." 
  },
  { 
    text: "Keep your powder dry", 
    description: "Stay prepared and ready for action." 
  },
  { 
    text: "Lock, stock, and barrel", 
    description: "The entire thing, including all parts." 
  },
  { 
    text: "March to the beat of your own drum", 
    description: "Follow your own path and principles." 
  },
  { 
    text: "Run the gauntlet", 
    description: "To face a series of challenges." 
  },
  { 
    text: "Trial by fire", 
    description: "A test of resilience and capability in a tough situation." 
  },
  { 
    text: "Carve out your destiny", 
    description: "Take control of your future through your actions." 
  },
  { 
    text: "Gird your loins", 
    description: "Prepare for a difficult challenge." 
  }
];

// Function to get a daily idiom based on the date
function getDailyIdiom() {
  const date = new Date();
  const index = date.getDate() % idioms.length;
  const idiom = idioms[index];
  
  document.getElementById("dailyIdiom").textContent = idiom.text;
  document.getElementById("idiomDescription").textContent = idiom.description;
}

// Display the daily idiom when the page loads
window.onload = getDailyIdiom;

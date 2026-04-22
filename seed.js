require('dotenv').config();
const mongoose = require('mongoose');
const Idea = require('./models/Idea');

const seeds = [
  {
    title: "Candlelit Maggi for One",
    category: "Culinary Delights",
    emoji: "🍜",
    difficulty: "Effortless",
    time_required: "10 mins",
    genz_desc: "Broke but still iconic 💅 Elevated instant noodles for the main character era.",
    required_items: ["maggi", "onion"],
    optional_items: ["chilli", "butter"],
    steps: [
      "Dice the onion into tiny little squares, as one does",
      "Sauté in a pan — feel like a proper chef",
      "Add maggi and the tastemaker",
      "Crown with butter if you have it. You're royalty."
    ],
    source: "community",
    status: "approved",
    submitted_by_name: "Priya D.",
    likes: 12
  },
  {
    title: "Ribbon Bookmark Bouquet",
    category: "Artistic Pursuits",
    emoji: "🎀",
    difficulty: "A gentle endeavour",
    time_required: "20 mins",
    genz_desc: "Ribbon + scissors = cottage-core aesthetic from your hostel bed.",
    required_items: ["ribbon", "scissors"],
    optional_items: ["pen", "beads"],
    steps: [
      "Cut ribbon into strips (15–25cm)",
      "Tie knots at one end",
      "Bundle 5–7 strips together",
      "Write tiny notes for emotional damage control"
    ],
    source: "community",
    status: "approved",
    submitted_by_name: "Ananya K.",
    likes: 8
  }
];

async function seedDB() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not found in .env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✦ Connected to MongoDB");

    // safer delete (only seed-related data if needed)
    await Idea.deleteMany({
      source: "community",
      status: "approved"
    });

    console.log("✦ Old seed data cleared");

    await Idea.insertMany(seeds);

    console.log("✿ Seed data inserted successfully");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

seedDB();
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Event type
interface Event {
  id: string;
  title: string;
  date: string; 
  time: string; 
  notes?: string;
  category: "Work" | "Personal" | "Other";
  archived: boolean;
}

// in-memory event
let events: Event[] = [];


// AI Categorization Keyword লিস্ট
const workKeywords = ["meeting", "project", "client", "deadline", "report"];
const personalKeywords = ["birthday", "family", "party", "holiday", "dinner"];

function categorizeEvent(title: string, notes?: string): "Work" | "Personal" | "Other" {
  const text = (title + " " + (notes ?? "")).toLowerCase();

  if (workKeywords.some(word => text.includes(word))) return "Work";
  if (personalKeywords.some(word => text.includes(word))) return "Personal";

  return "Other";
}


// Validation Helper
function isValidTime(time: string) {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
}

function isValidDate(date: string) {
  return !isNaN(Date.parse(date));
}


// Routes

// GET /events - সব ইভেন্ট দেখাবে (তারিখ ও সময় অনুসারে sort)
app.get("/events", (req, res) => {
  const sortedEvents = [...events].sort((a, b) => {
    const dtA = new Date(`${a.date}T${a.time}:00`).getTime();
    const dtB = new Date(`${b.date}T${b.time}:00`).getTime();
    return dtA - dtB;
  });
  res.json(sortedEvents);
});




app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

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

// GET for all events with data and time
app.get("/events", (req, res) => {
    const sortedEvents = [...events].sort((a, b) => {
        const dtA = new Date(`${a.date}T${a.time}:00`).getTime();
        const dtB = new Date(`${b.date}T${b.time}:00`).getTime();
        return dtA - dtB;
    });
    res.json(sortedEvents);
});


// POST for create new event
app.post("/events", (req, res) => {
    const { title, date, time, notes } = req.body;
    const category = categorizeEvent(title, notes);
    const newEvent: Event = {
        id: uuidv4(),
        title: title.trim(),
        date,
        time,
        notes,
        category,
        archived: false,
    };
    events.push(newEvent);
    res.status(201).json(newEvent);
});

// PUT for update the status
app.put("/events/:id", (req, res) => {
    const id = req.params.id;
    const event = events.find(e => e.id === id);
    if (event) {
        event.archived = true;
        res.json(event);
    } else {
        res.status(404).json({ error: "Event not found." });
    }
});

// for delete the data 
app.delete("/events/:id", (req, res) => {
    const id = req.params.id;
    const index = events.findIndex(e => e.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Event not found." });
    }
    events.splice(index, 1);
    res.json({ message: "Event deleted successfully." });
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

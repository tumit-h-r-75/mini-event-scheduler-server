# 🗓️ Mini Event Scheduler - Server

This is the **backend server** for the **Mini Event Scheduler** app built with **Express** and **TypeScript**. It provides a set of RESTful API endpoints for managing events with automatic AI-powered categorization based on event title and notes.

---

## 🔧 Features

- 📌 Add, update, delete, and list events
- 🤖 AI-based categorization into **Work**, **Personal**, or **Other**
- 🧠 In-memory event storage (no database required)
- 🛡 CORS and JSON middleware included
- 🟢 TypeScript based with runtime validation

---

## 📦 Technologies Used

- **Express.js**
- **TypeScript**
- **UUID**
- **CORS**
- **dotenv**

---

## 🚀 Deployment

This server is ready to be deployed on **Vercel** or other Node.js hosting platforms.

### 📁 Directory Structure

.
├── index.ts # Main server file
├── package.json # Dependencies and scripts
├── tsconfig.json # TypeScript config
├── .vercel.json # Vercel project config (if using Vercel)
├── .env # Environment variables

yaml
Copy
Edit

---

## 🔌 API Endpoints

### `GET /events`
Returns a sorted list of all events by date and time.

### `POST /events`
Creates a new event.

#### Request Body:
```json
{
  "title": "Project meeting",
  "date": "2025-07-21",
  "time": "14:00",
  "notes": "Discuss progress with the client"
}
Response:
json
Copy
Edit
{
  "id": "uuid-generated-id",
  "title": "Project meeting",
  "date": "2025-07-21",
  "time": "14:00",
  "notes": "Discuss progress with the client",
  "category": "Work",
  "archived": false
}
PUT /events/:id
Archives (soft deletes) an event by ID.

DELETE /events/:id
Permanently deletes an event.

🔐 Environment Variables
Create a .env file in the root and define:

env
Copy
Edit
PORT=5000
🧪 Running Locally
bash
Copy
Edit
# Install dependencies
npm install

# Start the server (development)
npm run dev

# Start the server (production build)
npm run build
npm start
📤 Deployment to Vercel
Install Vercel CLI (if not already):

bash
Copy
Edit
npm i -g vercel
Link project and deploy:

bash
Copy
Edit
vercel
On first deploy, follow prompts to configure project root and build settings:

Framework: Other

Output directory: . (current)

Install command: npm install

Build command: npm run build

Start command: npm start

Ensure you have a vercel.json (see below)

📄 vercel.json (for Vercel support)
Create a vercel.json file in the root:

json
Copy
Edit
{
  "version": 2,
  "builds": [
    {
      "src": "index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "index.ts" }
  ]
}
🙋 Author
Tumit Hasan
Mini Event Scheduler Server - Internship Task

yaml
Copy
Edit

---

If you need the `package.json` and `tsconfig.json` sections included too, let me know. I can add those next.








Ask ChatGPT

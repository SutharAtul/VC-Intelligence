# VC Intelligence  
AI-Powered Company Intelligence & Enrichment Platform

---

## 🚀 Overview

VC Intelligence is a full-stack SaaS-style dashboard that simulates a venture capital intelligence platform.

The application allows users to browse companies, analyze signals, track scores, and trigger AI-powered enrichment from real company websites.

While the dashboard UI uses a simulated dataset for product demonstration, the **Enrichment Engine is fully live and integrated with an LLM via OpenRouter.**

This project demonstrates full-stack architecture, scraping, AI integration, and product-oriented system design.

---

## 🏗 System Architecture

```
Frontend (React + Vite Dashboard UI)
        ↓
Backend (Node.js + Express API)
        ↓
Scraping Layer (Axios + Cheerio)
        ↓
LLM Layer (OpenRouter API)
        ↓
Structured JSON Intelligence Response
```

---

## 🧠 Core Feature: Live Enrichment Engine

The enrichment pipeline performs:

1. Website ingestion
2. Multi-page scraping (Homepage, About, Careers, Contact)
3. HTML cleanup & normalization
4. Structured LLM prompt generation
5. Safe JSON parsing
6. Response rendering inside dashboard

### Design Decisions

- LLM provider abstraction for easy swapping
- Structured JSON output format
- Error-safe parsing
- Environment variable management
- Deployment-ready architecture

---

## 📊 Dashboard Features

The frontend replicates a real VC intelligence admin panel and includes:

- Total Companies Counter
- High Score Companies (80+)
- Lists Module (UI-ready)
- Saved Companies
- Top Scored Companies
- Recent Signals Timeline
- Company Detail View
- Notes Section (UI-ready)
- Global Search UI
- Demo Environment Notice Banner

⚠️ Currently:
- Enrichment module → Fully functional
- Other modules → Simulated dataset for UX demonstration

This approach showcases product thinking and SaaS dashboard architecture.

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- TypeScript
- TailwindCSS
- Component-based architecture

### Backend
- Node.js
- Express
- Axios
- Cheerio
- OpenRouter API (LLM Integration)

### Deployment
- Frontend → Vercel
- Backend → Render

---

## 📂 Project Structure

```
vc-intelligence/
│
├── client/          # React Frontend
│   ├── src/
│   └── ...
│
├── backend/
│   ├── server.js
│   ├── .env
│   └── ...
│
└── README.md
```

---

## ⚙️ Local Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/YOUR_USERNAME/vc-intelligence.git
cd vc-intelligence
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
OPENROUTER_API_KEY=your_api_key_here
PORT=5000
```

Start server:

```
node server.js
```

---

### 3️⃣ Frontend Setup

```
cd client
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:8080
```

---

## 🔌 API Endpoint

### POST `/api/enrich`

Request:

```json
{
  "website": "https://company.com"
}
```

Response:

```json
{
  "summary": "...",
  "whatTheyDo": [],
  "keywords": [],
  "signals": [],
  "sources": []
}
```

---

## 🌍 Live Demo

Frontend:  
`live url`

Backend:  
`live url`

---

## 🔮 Future Improvements

- Persistent database (MongoDB / PostgreSQL)
- Redis caching for enrichment results
- Background job queue
- Real-time signal ingestion
- Authentication & role-based access
- API rate limiting
- Production logging & monitoring
- Full data persistence across modules

---

## 🎯 What This Project Demonstrates

- Full-stack SaaS dashboard development
- AI integration with structured output
- Real-world scraping workflow
- Clean system architecture
- Deployment pipeline management
- Product-oriented engineering mindset

This project was designed not as a simple AI wrapper, but as a scalable foundation for a VC intelligence platform.

---

## 👤 Author

Your Name  
Full Stack Developer  

GitHub: https://github.com/YOUR_USERNAME
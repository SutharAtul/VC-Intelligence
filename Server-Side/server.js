import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import * as cheerio from "cheerio";

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: "*", // we will restrict later
}));
app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

/*
  MAIN ENRICHMENT ROUTE
*/
app.post("/api/enrich", async (req, res) => {
  try {
    const { website } = req.body;

    if (!website) {
      return res.status(400).json({ error: "Website is required" });
    }

    console.log("Scraping website:", website);

    // 1️⃣ Fetch website HTML
    const response = await axios.get(website);
    const html = response.data;

    // 2️⃣ Extract text using cheerio
    const $ = cheerio.load(html);
    const text = $("body").text().replace(/\s+/g, " ").trim();

    // Limit text size (important for AI token limits)
    const limitedText = text.slice(0, 5000);

    console.log("Sending content to OpenRouter...");

    // 3️⃣ Send to OpenRouter
    const aiResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        // model: "mistralai/mistral-7b-instruct", // free model
        // model: "meta-llama/llama-3-8b-instruct:free",
        model: "openrouter/auto",
        messages: [
          {
            role: "system",
            content:
              "You extract structured company information in clean JSON format only.",
          },
          {
            role: "user",
            content: `
Extract from this website content:

- 2 sentence summary
- 3-6 bullet points explaining what the company does
- 5-10 keywords
- 2-4 derived signals (like careers page, blog, product updates)

Return ONLY valid JSON.

Website content:
${limitedText}
`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    // const aiResult = aiResponse.data.choices[0].message.content

    let aiResult = aiResponse.data.choices[0].message.content;

    // Remove markdown ```json ```
    if (aiResult.startsWith("```")) {
      aiResult = aiResult.replace(/```json/g, "");
      aiResult = aiResult.replace(/```/g, "");
    }

    // Trim spaces
    aiResult = aiResult.trim();

    // Convert string to real JSON
    const parsedResult = JSON.parse(aiResult);

    res.json({
      success: true,
      data: parsedResult,
      source: website,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Enrichment failed",
      details: error.response?.data || error.message,
    });
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

import express from "express";
import cors from "cors";

const app = express();
app.use(cors({
  origin: "*" // allows any frontend to call it
}));

const SCRAPER = "https://barca-scraper-7tag.onrender.com";

// RSS proxy
app.get("/api/rss/cat/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const response = await fetch(`https://carpetasfcb.com/rss/cat/${category}`);
    const xml = await response.text();
    res.set("Content-Type", "application/xml");
    res.send(xml);
  } catch (err) {
    res.status(500).send("Error fetching RSS");
  }
});

// One route handles ALL scraper endpoints
app.get("/api/scraper/*", async (req, res) => {
  const path = req.params[0]; // everything after /api/scraper/
  try {
    const response = await fetch(`${SCRAPER}/${path}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).send("Error fetching scraper");
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
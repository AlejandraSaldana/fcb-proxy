import express from "express";
import cors from "cors";
import cloudscraper from "cloudscraper";

const app = express();

app.use(cors({
  origin: "*"
}));

const SCRAPER = "https://barca-scraper-7tag.onrender.com";

app.get("/api/rss/cat/:category", async (req, res) => {
  const { category } = req.params;

  try {
    const url = `https://carpetasfcb.com/rss/cat/${category}`;

    const response = await cloudscraper.get(url);

    res.set("Content-Type", "application/xml");
    res.send(response);
  } catch (err) {
    console.error(err);
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
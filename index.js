import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

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

// Next game proxy
app.get("/api/next-game", async (req, res) => {
  try {
    const response = await fetch("https://barca-scraper-7tag.onrender.com/next-game");
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).send("Error fetching next game");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
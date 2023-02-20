import express from "express";
import Url from "../models/url.js";
import { nanoid } from "nanoid";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { url } = req.body;

    const oldUrl = await Url.findOne({url});
    if(oldUrl != null) {
        return res.status(201).json({ createdUrl: oldUrl });
    }

    const createdUrl = await Url.create({
      url,
      shortUrl: nanoid(5),
    });
    return res.status(201).json({ createdUrl });
  } catch (error) {
    return res.json({ message: error.message });
  }
});

router.get("/:shortUrl", async (req, res) => {
  try {
    const shortUrl = await Url.findOne({ shortUrl: req.params.shortUrl });
    if (shortUrl == null) {
      return res.status(400).json({ message: " wrond url" });
    }
    res.redirect(shortUrl.url)
  } catch (error) {
    return res.json({ message: error.message });
  }
});

export default router;

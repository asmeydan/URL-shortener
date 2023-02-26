import express from "express";
import Url from "../models/url.js";
import { nanoid } from "nanoid";


const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { url, expire } = req.body;

    const oldUrl = await Url.findOne({url});
    if(oldUrl != null) {
        return res.status(201).json({ createdUrl: oldUrl });
    }

    const createdUrl = await Url.create({
      url,
      shortUrl: nanoid(5),
      createdAt: new Date(),
      expiresAt: new Date().setDate(new Date().getDate() + expire)
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
      return res.status(400).json({ message: " wrong url" });
    }

    if( new Date(shortUrl.expiresAt).getTime() < new Date().getTime()) {
      return res.status(400).send(`<div style="height: 90vh; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 30px;"><div style="display: block; font-size: 40px; font-weight: bold;">out of date link</div>  <button style="background-color: #405cf5; border-radius: 6px; border-width: 0; box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0; box-sizing: border-box; color: #fff; cursor: pointer; height: 44px; line-height: 1.15; outline: none; overflow: hidden; padding: 0 25px; position: relative; text-align: center;" onclick="location.href='http://localhost:3000/'">
      new link
      </button>
      </div>`);
    }

    res.redirect(shortUrl.url)
  } catch (error) {
    return res.json({ message: error.message });
  }
});

export default router;

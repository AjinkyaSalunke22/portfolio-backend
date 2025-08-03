import { getDB } from '../config/database.js';

export const getAbout = async (req, res) => {
  try {
    const db = getDB();
    const about = await db.collection('about').findOne({});
    res.json(about || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAbout = async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection('about').replaceOne({}, req.body, { upsert: true });
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
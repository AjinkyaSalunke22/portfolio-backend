import { getDB } from '../config/database.js';
import { ObjectId } from 'mongodb';

export const getExperience = async (req, res) => {
  try {
    const db = getDB();
    const experience = await db.collection('experience').find({}).toArray();
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createExperience = async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection('experience').insertOne(req.body);
    res.json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const result = await db.collection('experience').updateOne({ _id: new ObjectId(id) }, { $set: req.body });
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const result = await db.collection('experience').deleteOne({ _id: new ObjectId(id) });
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
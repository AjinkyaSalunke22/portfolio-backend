import { getDB } from '../config/database.js';
import { ObjectId } from 'mongodb';

export const getSkills = async (req, res) => {
  try {
    const db = getDB();
    const skills = await db.collection('skills').find({}).toArray();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createSkill = async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection('skills').insertOne(req.body);
    res.json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const result = await db.collection('skills').updateOne({ _id: new ObjectId(id) }, { $set: req.body });
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const result = await db.collection('skills').deleteOne({ _id: new ObjectId(id) });
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
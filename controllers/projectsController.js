import { getDB } from '../config/database.js';
import { ObjectId } from 'mongodb';

export const getProjects = async (req, res) => {
  try {
    const db = getDB();
    const projects = await db.collection('projects').find({}).toArray();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const db = getDB();
    const { name, createdAt, description, technologies, contributions, liveLink, githubLink } = req.body;
    const result = await db.collection('projects').insertOne({
      name,
      createdAt,
      description,
      technologies: technologies || [],
      contributions: contributions || [],
      liveLink: liveLink || '',
      githubLink: githubLink || ''
    });
    res.json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const { name, createdAt, description, technologies, contributions, liveLink, githubLink } = req.body;
    const result = await db.collection('projects').updateOne(
      { _id: new ObjectId(id) },
      { $set: {
        name,
        createdAt,
        description,
        technologies: technologies || [],
        contributions: contributions || [],
        liveLink: liveLink || '',
        githubLink: githubLink || ''
      }}
    );
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const result = await db.collection('projects').deleteOne({ _id: new ObjectId(id) });
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
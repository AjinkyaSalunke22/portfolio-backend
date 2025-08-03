import { getDB } from '../config/database.js';

export const getKnowledgeBase = async (req, res) => {
  try {
    const db = getDB();
    const knowledge = await db.collection('knowledgebase').findOne({});
    res.json({ content: knowledge?.content || '' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateKnowledge = async (req, res) => {
  try {
    const db = getDB();
    await db.collection('knowledgebase').deleteMany({});
    const result = await db.collection('knowledgebase').insertOne({ content: req.body.content });
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getApiKey = async (req, res) => {
  try {
    const db = getDB();
    const config = await db.collection('config').findOne({});
    res.json({ 
      apiKey: config?.apiKey || '', 
      provider: config?.provider || 'gemini',
      model: config?.model || 'gemini-1.5-flash'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateApiKey = async (req, res) => {
  try {
    const db = getDB();
    const { apiKey, provider = 'gemini', model } = req.body;
    const result = await db.collection('config').replaceOne({}, { 
      apiKey, 
      provider,
      model: model || (provider === 'gemini' ? 'gemini-1.5-flash' : provider === 'claude' ? 'claude-3-sonnet-20240229' : 'deepseek-chat')
    }, { upsert: true });
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


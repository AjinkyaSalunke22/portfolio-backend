import express from 'express';
import { getAbout, updateAbout } from '../controllers/aboutController.js';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../controllers/skillsController.js';
import { getExperience, createExperience, updateExperience, deleteExperience } from '../controllers/experienceController.js';
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/projectsController.js';
import { getKnowledgeBase, updateKnowledge, getApiKey, updateApiKey } from '../controllers/chatbotController.js';

const router = express.Router();

// About routes
router.get('/about', getAbout);
router.put('/about', updateAbout);

// Skills routes
router.get('/skills', getSkills);
router.post('/skills', createSkill);
router.put('/skills/:id', updateSkill);
router.delete('/skills/:id', deleteSkill);

// Experience routes
router.get('/experience', getExperience);
router.post('/experience', createExperience);
router.put('/experience/:id', updateExperience);
router.delete('/experience/:id', deleteExperience);

// Projects routes
router.get('/projects', getProjects);
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

// Chatbot routes
router.get('/knowledge', getKnowledgeBase);
router.put('/knowledge', updateKnowledge);
router.get('/apikey', getApiKey);
router.put('/apikey', updateApiKey);

export default router;
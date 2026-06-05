import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import AnalysisController from './controllers/analysis.controller.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Multer memory storage setup
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limits
  }
});

// Middlewares
app.use(cors({
  origin: ['http://localhost:5173', 'http://cheerful-frangipane-38e573.netlify.app'], // Include local and deployed Netlify client urls
  credentials: true
}));
app.use(express.json());

// Heartbeat route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Resume API Routes
app.post('/api/analyze', upload.single('resume'), AnalysisController.analyze);
app.get('/api/analyses', AnalysisController.list);
app.get('/api/analyses/:id', AnalysisController.getById);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 ResuAI Backend API server running on port ${PORT}`);
  console.log(`📋 Healthcheck live at http://localhost:${PORT}/api/health`);
});

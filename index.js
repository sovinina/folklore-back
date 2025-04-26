import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize, initModels } from './models/index.js';

import worksRouter from './routes/works.js';
import genresRouter from './routes/genres.js';
import epochsRouter from './routes/epochs.js';
import authRouter from './routes/auth.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);

app.use('/api/works', worksRouter);
app.use('/api/genres', genresRouter);
app.use('/api/epochs', epochsRouter);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to the database');
    await initModels();

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('❌ Error starting the server:', error);
  }
};

start();

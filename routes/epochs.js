import express from 'express';
import Epoch from '../models/epoch.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Получить все эпохи
router.get('/', async (req, res) => {
  try {
    const epochs = await Epoch.findAll();
    res.json(epochs);
  } catch (error) {
    console.error('Ошибка при получении эпох:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Добавить эпоху
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });

    const newEpoch = await Epoch.create({ name });
    res.status(201).json(newEpoch);
  } catch (error) {
    console.error('Ошибка при добавлении эпохи:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Удалить эпоху по ID
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const epoch = await Epoch.findByPk(req.params.id);
    if (!epoch) return res.status(404).json({ error: 'Эпоха не найдена' });

    await epoch.destroy();
    res.json({ message: 'Эпоха удалена' });
  } catch (error) {
    console.error('Ошибка при удалении эпохи:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

export default router;

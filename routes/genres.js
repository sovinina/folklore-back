import express from 'express';
import Genre from '../models/genre.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Получить все жанры
router.get('/', async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.json(genres);
  } catch (error) {
    console.error('Ошибка при получении жанров:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Добавить жанр
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Поле имя не может быть пустым' });

    const newGenre = await Genre.create({ name });
    res.status(201).json(newGenre);
  } catch (error) {
    console.error('Ошибка при добавлении жанра:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Удалить жанр по ID
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) return res.status(404).json({ error: 'Жанр не найден' });

    await genre.destroy();
    res.json({ message: 'Жанр удалён' });
  } catch (error) {
    console.error('Ошибка при удалении жанра:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

export default router;

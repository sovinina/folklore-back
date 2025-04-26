import express from 'express';
import FolkloreWork from '../models/work.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// ▶️ Создание произведения
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, content, genre_id, epoch_id } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const newWork = await FolkloreWork.create({
      title,
      content,
      genre_id,
      epoch_id,
    });

    res.status(201).json(newWork);
  } catch (error) {
    console.error('Ошибка при создании произведения:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// 📄 Получение всех произведений
router.get('/', async (req, res) => {
  try {
    const works = await FolkloreWork.findAll();
    res.json(works);
  } catch (error) {
    console.error('Ошибка при получении произведений:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// 📄 Получение одного произведения по ID
router.get('/:id', async (req, res) => {
  try {
    const work = await FolkloreWork.findByPk(req.params.id);
    if (!work) {
      return res.status(404).json({ error: 'Произведение не найдено' });
    }
    res.json(work);
  } catch (error) {
    console.error('Ошибка при получении произведения:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// ✏️ Обновление произведения по ID
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { title, content, genre_id, epoch_id } = req.body;
    const work = await FolkloreWork.findByPk(req.params.id);

    if (!work) {
      return res.status(404).json({ error: 'Произведение не найдено' });
    }

    await work.update({ title, content, genre_id, epoch_id });
    res.json(work);
  } catch (error) {
    console.error('Ошибка при обновлении произведения:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// 🗑️ Удаление произведения по ID
router.delete('/:id', async (req, res) => {
  try {
    const work = await FolkloreWork.findByPk(req.params.id);
    if (!work) {
      return res.status(404).json({ error: 'Произведение не найдено' });
    }

    await work.destroy();
    res.json({ message: 'Произведение удалено' });
  } catch (error) {
    console.error('Ошибка при удалении произведения:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

export default router;

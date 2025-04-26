import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const router = express.Router();

// Регистрация
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    const existing = await User.findOne({ where: { username } });
    if (existing) return res.status(400).json({ error: 'Пользователь уже существует' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'Пользователь зарегистрирован' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка регистрации' });
  }
});

// Вход
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ error: 'Неверный логин или пароль' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Неверный логин или пароль' });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка входа' });
  }
});

export default router;

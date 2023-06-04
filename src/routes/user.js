const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Obtener información del usuario actual
router.get('/', async (req, res) => {
  try {
    const userId = req.userId; // El ID del usuario se obtiene del token JWT
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Actualizar información del usuario
router.put('/', async (req, res) => {
  try {
    const userId = req.userId; // El ID del usuario se obtiene del token JWT
    const { username, password } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    user.username = username;
    user.password = password;
    await user.save();

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
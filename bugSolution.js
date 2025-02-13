const express = require('express');
const app = express();
app.use(express.json());
const db = require('./db'); // Assuming a db module for database operations
const Joi = require('joi'); // Use a validation library like Joi

const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

app.post('/users', async (req, res) => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const user = value; //Validated user data
    await db.createUser(user);
    res.status(201).send();
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});
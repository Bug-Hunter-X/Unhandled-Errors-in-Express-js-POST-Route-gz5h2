const express = require('express');
const app = express();
app.use(express.json());
app.post('/users', (req, res) => {
  const user = req.body;
  // Missing validation or error handling
  db.createUser(user); 
  res.status(201).send();
});
const express = require('express');
const dotenv = require('dotenv');
const { connectRabbitMQ } = require('./controllers/notificationController');

dotenv.config();

const app = express();
app.use(express.json());

// Connect to RabbitMQ
connectRabbitMQ();

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});

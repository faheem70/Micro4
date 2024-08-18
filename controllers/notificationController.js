const amqp = require('amqplib');

let channel, connection;

const connectRabbitMQ = async () => {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URI);
    channel = await connection.createChannel();
    await channel.assertQueue('order.fulfilled');
    await channel.assertQueue('payment.processed');
    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error);
  }
};

const sendNotification = (message) => {
  console.log('Sending notification:', message);
  // Mock notification logic (e.g., sending an email or SMS)
};

const consumeOrderFulfilled = async () => {
  channel.consume('order.fulfilled', (msg) => {
    const order = JSON.parse(msg.content.toString());
    console.log('Notification for Order Fulfillment:', order.orderId);
    sendNotification(`Order ${order.orderId} has been fulfilled.`);
    channel.ack(msg);
  });
};

const consumePaymentProcessed = async () => {
  channel.consume('payment.processed', (msg) => {
    const payment = JSON.parse(msg.content.toString());
    console.log('Notification for Payment Processed:', payment.orderId);
    sendNotification(`Payment for Order ${payment.orderId} has been processed.`);
    channel.ack(msg);
  });
};

module.exports = {
  connectRabbitMQ,
  consumeOrderFulfilled,
  consumePaymentProcessed,
};

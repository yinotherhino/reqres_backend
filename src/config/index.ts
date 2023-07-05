const IS_PROD = process.env.NODE_ENV === 'production';
export default {
  PORT: IS_PROD ? process.env.PORT || 80 : 3000,
  RABBITMQ_URL: process.env.RABBITMQ_URL || 'amqp://127.0.0.1:5672',
  EMAIL_SERVICE: 'EMAIL_SERVICE',
  EMAIL_QUEUE: 'email_queue',
  IS_PROD,
  DB_URI:
    'mongodb+srv://payever_admin:lKeicpeJibA8JTNH@payever.2gf7ufr.mongodb.net/?retryWrites=true&w=majority',
};

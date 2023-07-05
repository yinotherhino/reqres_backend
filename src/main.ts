import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.connectMicroservice({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: [config.RABBITMQ_URL],
  //     queue: 'mail_queue',
  //     queueOptions: { durable: false },
  //     prefetchCount: 1,
  //   },
  // });
  // await app.startAllMicroservices();
  await app.listen(config.PORT);
}
bootstrap();

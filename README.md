
<h1>Nestjs with RabbitMQ Advanced Message Queuing Protocol</h1>
<h2>Functionality</h2>
<ul>
<li>This app serves as the producer of the messages and a consumer will process on the queued messages</li>
<li>POST /users: Saves a user to the mongodb , and emits a rabbit event to the consumer that sends a verification the costumer, consumer is stil in dev.</li>
<li>GET /users/:id: Gets a user from an external api https://reqres.in/api/users/</li>
<li>GET /users/:id/avatar: Gets an avatar for user with the specified id from an external api https://reqres.in/api/users/, On the first request, this avatar is gotten from the third party as an image url and the image url is converted into a base64 encoded string and saved to the filesystem and also to mongoDB. On subsequent requests for the same avatar, it tries to fetch from file system, then mongoDB, and if it is still not found then it checks the third party api.</li>
</ul>
<h2>Design Pattern</h2>
<p>This is a REST API created using the nestjs framework with a user service, config service and a file system service connected to a mongoDB database and bootstrapped with a RabbitMQ AMQP for emailing services.</p>
<h2>App requirements</h2>
<ul>
  <li>Internet connection for remote mongodb instance</li>
  <li>Nodejs 18.X</li>
  <li>yarn</li>
  <li>yarn</li>
</ul>

<h2>Starting the project locally</h2>
<ul>
  <li>cd to the project directory on your terminal</li>
  <li>to install the dependencies, run: <br /> ```yarn```</li>
  <li>to start the dev server, run: <br /> ```yarn start:dev```</li>
</ul>

<p>To view the Message queues locally</p>
<ul>
  <li>Install Rabbit mq on your machine and ensure it runs on port 5672</li>
  <li>Try to make a request to signup, email is required</li>
  <li>navigate to localhost:15672 on your browser to view the user interface of rabbit mq</li>
</ul>

<h1>Local secrets are hardcoded to ensure easy usage for testing purposes</h1>
<p>Run ```yarn test``` for unit tests</p>
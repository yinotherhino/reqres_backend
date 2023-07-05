
POST /api/users
On the request store the user entry in db. After the creation, send an email and rabbit event. Both can be dummy sending (no consumer needed).
GET /api/user/{userId}
Retrieves data from https://reqres.in/api/users/{userId} and returns a user in JSON representation.
GET /api/user/{userId}/avatar
Retrieves image by 'avatar' URL.
On the first request it should save the image as a plain file, stored as a mongodb entry with userId and hash. Return its base64-encoded representation.
On following requests should return the previously saved file in base64-encoded. representation (retrieve from db).
DELETE /api/user/{userId}/avatar
Removes the file from the FileSystem storage.
Removes the stored entry from db.


<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>



## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

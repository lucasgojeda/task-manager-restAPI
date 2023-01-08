# TASK MANAGER API | [Docs - Swagger](https://task-manager-zchz.onrender.com/api/v1/docs/)
## _All you need to create your task manager app_

![Image text](https://res.cloudinary.com/the-kings-company/image/upload/v1673221054/task%20manager%20API/1_k0o5wh.jpg)

This API has all you need to create a robust task management application.

- Authentication system.
    - JWT AUTH
    - endpoints:
        - login
        - register
        - renew JWT
- Task management.
    - endpoints:
        - get tasks
        - create task
        - update task
        - mark task as finished
        - delete task

## Tech

This project was built using the following technologies:

- Node js - Express js
- MongoDb - Mongoose
- JWT
- Docker
- Swagger

## Installation

Install the dependencies and devDependencies and start the server.

```sh
cd task-manager-restAPI
npm i
nodemon app
```

You will need to set the environment variables:

```sh
MONGODB_CNN=Link of the mongo database
SECRETORPRIVATEKEY=key to encrypt the JWTs
```
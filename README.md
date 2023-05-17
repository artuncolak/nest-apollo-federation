# Running the app

Before running the application, you need to configure the .env file. Insert the MongoDB connection string, excluding the database name at the end. Each microservice will generate its own database.

This monorepo utilizes Turborepo, containing three microservices and a gateway. The respective ports and services are as follows:

| Service        | Port |
| -------------- | ---- |
| User Service   | 3001 |
| Movie Service  | 3002 |
| Rating Service | 3003 |
| Gateway        | 3000 |

Each service runs on its designated port, facilitating seamless interaction and communication within the application.

To install all necessary packages, run the following command:
```bash
yarn install
```
Next, initialize the microservices with this command:
```bash
yarn dev:services
```
In another terminal instance, start the gateway using the following command:
```bash
yarn dev:gateway
```
Upon successful execution, the application will be accessible at this URL:
http://localhost:3000/graphql
# crud-api

This is a simple CRUD (Create, Read, Update, Delete) API built with Node.js, Typescript and Webpack, using an in-memory database.

## Install

1. Clone the repository
2. Navigate into the project directory
3. Switch to `develop` branch
4. Run `npm i` to install dependencies

## Set up environment variable

You have to create `.env` file in the root with PORT variable. It configures on which port the API's server will be listening to requests.

For example:

```file=".env"
PORT=300
```

## Usage

### Development Mode

To run the application in development mode, use the following command:

```bash
npm run start:dev
```

This will start the server using ts-node-dev, which will automatically restart the server when changes are detected in the source files.

### Production Mode

To run the application in production mode, use the following command:

```bash
npm run start:prod
```

This command will bundle the application using Webpack and then execute the bundled file.

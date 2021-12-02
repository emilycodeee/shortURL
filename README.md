# URL shortener

A basic web app to transforming any long URL into a shorter, more readable link.

- Built with Node.js / Express / MongoDB
- Allow users to generate short URLs.

## Features

- Fill in the website to generate a short URL.
- Click the copy button to copy the short URL directly.
- If the original URL is produced as a short URL, the original bound short URL will be returned.

## Demo

- Landing pag
  ![index](/public/photos/index.jpg)
- processing successfully
  ![new](/public/photos/success.jpg)

## Prerequisites

```
Node.js 10.15.0
```

## Installation and execution

**1. Save the project to local**

- git clone https://github.com/emilycodeee/shortURL.git

**2. Enter the project folder (shortURL) and use the terminal to install related packages**

```
npm install
```

**3. Load seed data**

```
npm run seed
```

**4. Use nodemon to start the project server**

```
npm run dev
```

**5. If the following string appears on the terminal, the server has been successfully started**

Express is listening on http://localhost:3000

## Environment

- Node.js v14.15.1 -Execution environment
- Express v4.17.1 -Framework
- Express-handlebars v5.2.0 -Template engine
- mongoDB Community Serve v4.2.12 -Database
- mongoose v5.11.14 -ODM
- body-parser v1.19.0

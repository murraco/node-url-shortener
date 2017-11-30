# Node ES6 URL Shortener

![](https://img.shields.io/badge/node-success-brightgreen.svg)
![](https://img.shields.io/badge/test-success-brightgreen.svg)

# Stack

![](https://img.shields.io/badge/node_8-✓-blue.svg)
![](https://img.shields.io/badge/ES6-✓-blue.svg)
![](https://img.shields.io/badge/express-✓-blue.svg)
![](https://img.shields.io/badge/sequelize-✓-blue.svg)

# File structure

```
node-es6-url-shortener/
│
├── api/
│   ├── controllers/
│   │   └── UrlController.js
│   │
│   ├── models/
│   │   └── Url.js
│   │
│   └── helpers/
│      └── base58.js
│
├── config/
│   ├── env/
│   │   ├── development.js
│   │   ├── index.js
│   │   ├── production.js
│   │   └── test.js
│   │
│   ├── routes/
│   │   ├── index.js
│   │   └── url.js
│   │
│   ├── express.js
│   └── sequelize.js
│
├── view/
│   ├── css/
│   │   └── styles.css
│   │
│   ├── javascript/
│   │   └── shorten.js
│   │
│   └── index.html
│
├── test/
│   └── url.test.js
│
├── .eslintrc                     * ESLint configuration file
├── .gitignore                    * Example git ignore file
├── index.mjs                     * Entry point of our Node's app
├── LICENSE                       * MIT License
├── package.json                  * Defines our JavaScript dependencies
├── package-lock.json             * Defines our exact JavaScript dependencies tree
└── README.md                     * This file
```

# Screenshot

<p align="center">
  <img src="https://github.com/murraco/node-es6-url-shortener/blob/master/screenshot.png" width="90%" />
</p>

# Introduction

## What's a URL Shortener?

:TODO

## How does it work?

:TODO

## How to use this code?

1. Make sure you have the latest stable version of Node.js installed

  ```
  $ sudo npm cache clean -f
  $ sudo npm install -g n
  $ sudo n stable
  ```
  
2. Configure your database and jsonwebtoken in `config/env`

  :TODO
  
3. Fork this repository and clone it
  
  ```
  $ git clone https://github.com/<your-user>/node-es6-url-shortener
  ```
  
4. Navigate into the folder  

  ```
  $ cd node-es6-url-shortener
  ```
  
5. Install NPM dependencies

  ```
  $ npm install
  ```
  
6. Run the project

  ```
  $ node index.js
  ```
  
7. Or use `nodemon` for live-reload
  
  ```
  $ npm start
  ```
  
  > `npm start` will run `nodemon index.js`.
  
8. Navigate to `http://localhost:3000` in your browser to test it!

9. If you want to execute the tests

```
$ npm test
```

> `npm test` will run `mocha`.

# Contribution

- Report issues
- Open pull request with improvements
- Spread the word
- Reach out to me directly at <mauriurraco@gmail.com>

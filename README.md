# Node URL Shortener

![](https://img.shields.io/badge/node-success-brightgreen.svg)
![](https://img.shields.io/badge/test-success-brightgreen.svg)

## Stack

![](https://img.shields.io/badge/node_18+-✓-blue.svg)
![](https://img.shields.io/badge/ES6-✓-blue.svg)
![](https://img.shields.io/badge/express-✓-blue.svg)
![](https://img.shields.io/badge/sequelize-✓-blue.svg)

## File structure

```
node-url-shortener/
│
├── api/
│   ├── controllers/
│   │   └── UrlController.js
│   ├── models/
│   │   └── Url.js
│   └── helpers/
│       └── base58.js
│
├── config/
│   ├── env/
│   │   ├── development.js
│   │   ├── index.js
│   │   ├── production.js
│   │   └── test.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── routes/
│   │   ├── index.js
│   │   └── url.js
│   ├── database.js          * Sequelize CLI (migrations)
│   ├── express.js
│   └── sequelize.js
│
├── migrations/              * Sequelize migrations
├── seeders/
├── view/
│   ├── css/
│   ├── javascript/
│   │   └── shorten.js
│   └── index.html
│
├── test/
│   └── url.test.js
│
├── .eslintrc.json
├── .gitignore
├── .sequelizerc
├── index.js                 * Application entry point
├── LICENSE
├── package.json
├── package-lock.json
└── README.md
```

## Screenshot

<p align="center">
  <img src="https://github.com/murraco/node-url-shortener/blob/master/screenshot.png?raw=1" width="90%" alt="App screenshot" />
</p>

## Introduction

### What is a URL shortener?

URL shortening turns a long URL into a shorter one that redirects to the original. The short link is easier to share and remember.

### How does this project implement it?

The database stores each URL with an auto-increment numeric `id`. The short code in the path is that `id` encoded in **Base58** (alphanumeric, excluding ambiguous characters like `0`, `O`, `I`, `l`). When someone opens `/:encodedId`, the server decodes it to `id`, loads the row, and redirects to `longUrl`.

There is a **unique index** on `longUrl` so the same URL is never stored twice; concurrent `POST` requests are handled with `findOrCreate` and a fallback if a uniqueness race occurs.

## Requirements

- **Node.js** 18 or newer (LTS recommended)
- **MySQL** 5.7+ or 8.x

## Environment variables

| Variable | Description | Default (from env files) |
| -------- | ----------- | ------------------------- |
| `NODE_ENV` | `development`, `test`, or `production` | `development` |
| `PORT` | HTTP port | `3000` |
| `DB_HOST` | MySQL host | `localhost` |
| `DB_PORT` | MySQL port | `3306` |
| `DB_NAME` | Database name | `shortener_dev` / `shortener_test` / `shortener` by environment |
| `DB_USER` | MySQL user | `root` |
| `DB_PASSWORD` | MySQL password | `root` (override in production) |
| `PUBLIC_URL` or `BASE_URL` | Public base URL for short links (no trailing slash), e.g. `https://short.example.com` | If unset, derived from the incoming request (`req.protocol` and `Host`) |
| `TRUST_PROXY` | Set to `true` or `1` if the app sits behind a reverse proxy so `X-Forwarded-*` is honored | unset |

Copy values into a `.env` file or your host’s secret manager. The `.env` file is gitignored; do not commit real passwords.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/murraco/node-url-shortener.git
cd node-url-shortener
```

2. Install dependencies:

```bash
npm install
```

3. Configure the database using the variables above (optional `.env` or shell exports). The files under `config/env/` only supply defaults and read from `process.env`.

## Database setup

### With Docker (MySQL 8)

```bash
docker run -d --name mysql-shortener \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=root \
  mysql:8
```

Create the databases (adjust user/password if needed):

```bash
docker exec -it mysql-shortener mysql -uroot -proot -e "
  CREATE DATABASE IF NOT EXISTS shortener_dev;
  CREATE DATABASE IF NOT EXISTS shortener_test;
  CREATE DATABASE IF NOT EXISTS shortener;
"
```

### Migrations (production and clean setups)

After MySQL is running and credentials match `config/env` (or your env vars), apply the schema:

```bash
npm run migrate
```

In **development** only, the app also runs `sequelize.sync()` on startup so tables are created if missing. **Production** does not sync on startup; run migrations before deploying.

## Running the app

- **Production-style:** `npm start` → runs `node index.js` (connects to DB, no `sync` when `NODE_ENV=production`).
- **Development with reload:** `npm run dev` → `nodemon index.js`.

Then open `http://localhost:3000` (or your `PORT`).

## API

### `GET /api-status`

Health check. **Response:** `{ "status": "ok" }`

### `POST /api/shorten`

Creates or returns an existing short link for a URL.

- **Body (JSON):** `{ "url": "https://example.com/path" }`
- **Success:** `201` — `{ "shortUrl": "<public-base>/<base58-id>" }`
- **Errors:** `400` — `{ "error": "..." }` for missing/invalid URL or non-http(s) scheme
- **Server errors:** `500` — `{ "error": "Internal server error" }`

Register new single-segment routes **before** `/:encodedId` in the router so they are not treated as short codes.

### `GET /:encodedId`

Redirects (`302`) to the stored URL, or to the site root if the code is unknown.

## Testing

Tests use `NODE_ENV=test` (see `test/url.test.js`), the `shortener_test` database (unless overridden with `DB_NAME`), and `Url.sync({ force: true })` in a `before` hook to reset the table.

Requirements: MySQL running and the test database created.

```bash
npm test
```

`npm audit` was run after dependency updates; a few advisories may remain in transitive dev dependencies (for example Mocha). Re-run `npm audit` periodically.

## Contributing

- Report issues
- Open pull requests with improvements
- Contact: mauriurraco@gmail.com

## Buy me a coffee

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/murraco)

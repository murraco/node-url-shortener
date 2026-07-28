const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const routes = require('./routes/index');
const errorHandler = require('./middleware/errorHandler');

const app = express();

if (process.env.TRUST_PROXY === 'true' || process.env.TRUST_PROXY === '1') {
  app.set('trust proxy', 1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.NODE_ENV !== 'test') {
  app.use(csrf({ cookie: true }));
  app.use((req, res, next) => { res.locals.csrfToken = req.csrfToken(); next(); });
}
app.use(express.static(path.join(path.resolve(), 'view')));

app.get('/', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'view/index.html'));
});

app.use('/', routes);

app.use(errorHandler);

module.exports = app;

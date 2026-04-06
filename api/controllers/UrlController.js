const Url = require('../models/Url');
const base58 = require('../helpers/base58');
const { Sequelize } = require('../../config/sequelize');

function getPublicBase(req) {
  const fromEnv = process.env.PUBLIC_URL || process.env.BASE_URL;
  if (fromEnv) {
    return fromEnv.replace(/\/$/, '');
  }
  return `${req.protocol}://${req.get('host')}`;
}

function isValidHttpUrl(string) {
  try {
    const u = new URL(string);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

function shorten(req, res, next) {
  const longUrl = req.body && req.body.url;
  if (!longUrl || typeof longUrl !== 'string' || !longUrl.trim()) {
    return res.status(400).json({ error: 'Missing or invalid "url"' });
  }

  const trimmed = longUrl.trim();
  if (!isValidHttpUrl(trimmed)) {
    return res.status(400).json({ error: 'URL must be a valid http or https URL' });
  }

  const respondWith = (url) => {
    const base = getPublicBase(req);
    res.status(201).json({ shortUrl: `${base}/${base58.encode(url.id)}` });
  };

  return Url.findOrCreate({
    where: { longUrl: trimmed },
    defaults: { longUrl: trimmed },
  })
    .then(([url]) => respondWith(url))
    .catch((err) => {
      if (err instanceof Sequelize.UniqueConstraintError) {
        return Url.findOne({ where: { longUrl: trimmed } })
          .then((url) => {
            if (!url) throw err;
            respondWith(url);
          })
          .catch(next);
      }
      return next(err);
    });
}

function decode(req, res, next) {
  const base58ID = req.params.encodedId;
  const id = base58.decode(base58ID);
  return Url.findOne({ where: { id } })
    .then((url) => {
      if (url) {
        res.redirect(url.longUrl);
      } else {
        res.redirect(`${getPublicBase(req)}/`);
      }
    })
    .catch(next);
}

module.exports = {
  shorten,
  decode,
};

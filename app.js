const express = require('express');
const app = express();
const path = require('path');
const helmet = require('helmet');
const PORT = 3000;

const rootRouter = require(path.join(__dirname, 'routes', 'rootRouter.js'));

// const csp = {
//   directives: {
//     defaultSrc: ["'self'"],
//     connectSrc: ["'self'", 'https:', 'www.google.com', 'www.recaptcha.net'],
//     styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com', 'cdn.jsdelivr.net'],
//     scriptSrc: [
//       "'self'",
//       "'unsafe-inline'",
//       'www.google.com',
//       'www.gstatic.com',
//       'www.googletagmanager.com',
//       'pagead2.googlesyndication.com',
//       'ep2.adtrafficquality.google',
//     ],
//     imgSrc: [
//       "'self'",
//       'www.gstatic.com',
//       'www.google.com',
//       'pagead2.googlesyndication.com',
//       'ep1.adtrafficquality.google',
//       'www.w3.org',
//       'data:',
//     ],
//     frameSrc: [
//       "'self'",
//       'www.google.com',
//       'www.recaptcha.net',
//       'googleads.g.doubleclick.net',
//       'ep2.adtrafficquality.google',
//     ],
//     upgradeInsecureRequests: [], // HTTP'yi HTTPS'ye yükselt
//   },
// };

// app.use(helmet());
// app.use(helmet.contentSecurityPolicy(csp)); // Özelleştirilmiş CSP'yi uyguluyoruz

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(rootRouter);

app.use((req, res, next) => {
  res.status(404).render('error/error', { statusCode: '404', message: 'Sayfa Bulunamadı' });
});

app.use((err, req, res, next) => {
  console.error(err.stack); // Hata stack'ini loglara yazdır

  // Eğer geliştirme modundaysak, daha ayrıntılı hata mesajı göster
  if (process.env.NODE_ENV === 'development') {
    res.status(500).send(`Something went wrong! ${err.stack}`);
  } else {
    // Üretim ortamında daha güvenli hata mesajı
    res.status(500).render('error/error', { title: '500', message: 'Sunucu Hatası' });
  }
});

app.listen(PORT, () => {});

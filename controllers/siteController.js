const path = require('path');
exports.getHome = (req, res, next) => {
  const userIp = req.headers['x-forwarded-for'];
  res.render('../views/index', { userIp: userIp });
};

exports.getSoftwaresPage = (req, res, next) => {
  res.render('../views/softwares');
};

exports.downloadEkin2000Winx64 = (req, res, next) => {
  res.download(
    path.join(__dirname, '..', 'public', 'downloads', 'Ekin2000-Installer.exe'),
    'Ekin2000-Installer.exe',
    (err) => {
      if (err) {
        console.log('Dosya indirilemedi: ', err);
      } else {
        console.log('Installer indirildi');
      }
    }
  );
};

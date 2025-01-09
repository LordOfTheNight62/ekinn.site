const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');

router.get('/', siteController.getHome);
router.get('/softwares', siteController.getSoftwaresPage);
router.get('/games', siteController.getGamesPage);
router.get('/download/Ekin2000-winx64', siteController.downloadEkin2000Winx64);

module.exports = router;

var express = require('express');
var router = express.Router();

const ctrlTrip = require('../controllers/trip');

router.get('/packages', ctrlTrip.getPackageList);
router.get('/packages/:packageId', ctrlTrip.getPackage);
router.delete('/packages/:packageId', ctrlTrip.deletePackage);
router.put('/packages/:packageId', ctrlTrip.updatePackage);
router.post('/packages', ctrlTrip.createPackage);

module.exports = router;
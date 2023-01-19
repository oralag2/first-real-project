const Router = require('express');
const router = new Router();
const controller = require('../controllers/vacancy');

router.post('/createVacancy', controller.createVacancy);
router.get('/getVacancies', controller.getVacancies);
router.patch('/updateVacancy', controller.updateVacancy);
router.delete('/deleteVacancy', controller.deleteVacancy);
router.post('/setStatus', controller.setStatus);

module.exports = router;

const Router = require('express');
const router = new Router();
const volunteer = require('../controllers/volunteer');
const company = require('../controllers/company');

const company_permission = require('../middleware/permission_company')
const volunteer_permission = require('../middleware/permission_volunteer')

//volunteer
router.get('/volunteer/whoami', volunteer_permission, volunteer.whoAmI);
router.post('/volunteer/register', volunteer.register);
router.post('/volunteer/login', volunteer.login);
router.get('/volunteer/verify', volunteer.verify);
router.post('/volunteer/sendReset', volunteer.sendReset);
router.post('/volunteer/reset', volunteer.resetPassword);

//company
router.get('/company/whoami', company_permission, company.whoAmI);
router.post('/company/register', company.register);
router.post('/company/login', company.login);
router.get('/company/verify', company.verify);
router.post('/company/sendReset', company.sendReset);
router.post('/company/reset', company.resetPassword);

module.exports = router;

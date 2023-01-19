const Router = require('express');
const router = new Router();
const controller = require('../controllers/article');
const permission_volunteer = require('../middleware/permission_volunteer');
const permission_company = require('../middleware/permission_company');

router.post('/createArticle', permission_volunteer, controller.createArticle);
router.get('/getArticles', permission_company, controller.getArticles);
router.patch('/updateArticle', permission_company, controller.updateArticle);
router.delete('/deleteArticle', permission_company, controller.deleteArticle);
router.patch('/addTags', permission_company, controller.addTags);
router.get('/addLanguages', /*ADMIN_PERMISSION_HERE,*/controller.addLanguages)
// router.delete('/deleteTag', controller.deleteTag);

module.exports = router;

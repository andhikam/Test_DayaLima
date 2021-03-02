const router = require('express').Router();
const CommunityController = require('../controller/CommunityController');
const CompanyController = require('../controller/CompanyController');
const EducationController = require('../controller/EducationController');

router.get('/community', CommunityController.fetchCommunity);

router.get('/community/:id', CommunityController.fetchOneCommunity);

router.post('/community', CommunityController.create);

router.patch('/community/:id', CommunityController.editCommunity);

router.delete('/community/:id', CommunityController.deleteCommunity);

router.get('/company', CompanyController.fetchCompany);

router.get('/company/:id', CompanyController.fetchOneCompany);

router.post('/company', CompanyController.create);

router.patch('/company/:id', CompanyController.editCompany);

router.delete('/company/:id', CompanyController.deleteCompany);

router.get('/education', EducationController.fetchEducation);

router.get('/education/:id', EducationController.fetchOneEducation);

router.post('/education', EducationController.create);

router.patch('/education/:id', EducationController.editEducation);

router.delete('/education/:id', EducationController.deleteEducation);

module.exports = router;

const express = require('express');
const authenticate = require('../middlewares/authenticate');
const userController = require('../controllers/user.controller');
const tokenController = require('../controllers/token.controller');
const router = express.Router();


router.get('/user', authenticate(), userController.getUser);

router.post('/login', userController.login);

router.delete('/signout', userController.signOut);

router.post('/refresh-token', tokenController.refreshToken);

router.get('/ph', );

router.get('/temperatura');

router.get('/agua');


module.exports = router;
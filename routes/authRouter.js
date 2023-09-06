const express = require('express');
const passport = require('passport');
const AuthService = require('./../services/authService');


const service = new AuthService();
const router = express.Router();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const token = service.signToken(user);
      res.json({
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body;
    const resoponse = await service.sendRecoveryPassLink(email);
    res.json(resoponse)
  } catch (error) {
    next(error);
  }
});


router.post('/change-password', async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const resoponse = await service.changePassword(token, newPassword);
    res.json(resoponse)
  } catch (error) {
    next(error);
  }
});
module.exports = router;

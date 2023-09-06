const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const UserService = require('./../../../services/userService');
const { de } = require('@faker-js/faker');

const service = new UserService();

const LocalStategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await service.findOneByEmail(email);
      if (!user) {
        done(boom.unauthorized(), false);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        done(boom.unauthorized(), false);
      } else {
        delete  user.dataValues.password;
        done(null, user);
      }
    } catch (error) {
      done(error, false);
    }
  },
);

module.exports = LocalStategy;

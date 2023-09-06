const UserService = require('./userService');
const { config } = require('../config/config');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const service = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await service.findOneByEmail(email);
    if (!user) {
      throw (boom.unauthorized(), false);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw (boom.unauthorized(), false);
    } else {
      delete user.dataValues.password;
      return user;
    }
  }
  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.secret);
    return token;
  }
  async sendMail(email, mail) {
    const user = await service.findOneByEmail(email);
    if (!user) {
      console.log('User not found');
      throw (boom.unauthorized(), false);
    }
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: config.emailUser,
        pass: config.emailPassword,
      },
    });

    const info = await transporter.sendMail(mail);
    return { message: `Mail sent: %s, ${info.messageId}` };
  }
  async sendRecoveryPassLink(email) {
    const user = await service.findOneByEmail(email);
    if (!user) {
      throw (boom.unauthorized(), false);
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.secret, { expiresIn: '15min' });
    const link = `htpps://appDomain.com./recovery?token=${token}`;
    const mail = {
      from: config.emailUser, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'This is a new test mail', // Subject line
      html: `<b>Follow this link to reset your password => ${link} </b>`, // html body
    };
    const response = await this.sendMail(user.email, mail);
    return response;
  }
  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.secret);
      console.log(payload);
      const user = await service.findOne(payload.sub);
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, { password: hash });
      return { message: 'Password changed' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }
}

module.exports = AuthService;

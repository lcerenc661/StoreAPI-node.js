const passport = require('passport');

const LocalStategy = require('./stategies/localStrategy');
const JwtStrategy = require('./stategies/jwtStrategy');

passport.use(LocalStategy);
passport.use(JwtStrategy);

module.exports = passport;

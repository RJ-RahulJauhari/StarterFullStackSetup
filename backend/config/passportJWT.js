import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import dotenv from 'dotenv';
import { getUserWithEmail } from '../operations/UserOperations.js';

dotenv.config();

// Extracting JWT from Cookie
const cookieExtractor = (req) => {
    return req?.cookies?.token || null;
  };

const opts = {
  jwtFromRequest: cookieExtractor, // How to extract JWT Token from request...
  secretOrKey: process.env.SECRET_OR_KEY, // Verify the token using a secret key....
};

const strategy = new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await getUserById(payload.id);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  });

passport.use(strategy);
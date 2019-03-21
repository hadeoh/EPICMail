import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Helper = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  generateToken(id, email) {
    const token = jwt.sign({
      userId: id,
      mail: email,
    },
    process.env.SECRET, {
      expiresIn: '365d',
    });
    return token;
  },
};

export default Helper;

require('dotenv').config();
const Company = require('mongoose').models.Company;
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

module.exports = async function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.status(403).json({ message: 'User is not logged in' });
    }

    const { id: id } = jwt.verify(token, secret);
    user = await Company.findOne({ _id: id }, '-password -__v')
    if (!user) {
      return res
        .status(403)
        .json({ message: 'User does not have sufficient permissions' });
    }
    req.company = user
    next();
  } catch (e) {
    console.log(e);
    res.status(403).json({ message: 'User is not logged in' });
  }
};


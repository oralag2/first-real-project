require('dotenv').config();
const Volunteer = require('mongoose').models.Volunteer;
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

module.exports = async function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.status(403).json({ message: 'User is not logged in' });
    }
    const { id: id } = jwt.verify(token, secret);
    const volunteer = await Volunteer.findOne({ _id: id }, '-password -__v');
    if (!volunteer) {
      return res
        .status(403)
        .json({ message: 'User does not have sufficient permissions' });
    }
    req.volunteer = volunteer;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'User is not logged in' });
  }
};

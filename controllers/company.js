require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const SECRET = process.env.SECRET;
const PORT = process.env.PORT || 6000;

const Company = require('../models/company');

//access token
const generateUserToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, SECRET, { expiresIn: '30min' });
};

//verification/reset token
const generateVerifToken = (email) => {
  const payload = { email };
  return jwt.sign(payload, SECRET, { expiresIn: '15min' });
};

//generate verification/reset link
const generateLink = (token, option) => {
  return `http://localhost:${PORT}/auth/company/${option}?token=${token}`;
};

//transporter
let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

class authController {
  async whoAmI(req, res) {
    try {
      const company = await Company.findOne({ _id: req.company._id }, '-password -__v')
      if (!company) {
        res.status(400).json({ error: 'Internal error' });
      }
      res.status(200).json({ result: company });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }

  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const candidate = await Company.findOne({ email });
      if (candidate && candidate.verified) {
        res
          .status(400)
          .json({ error: 'Internal error' });
      }
      if (candidate && !candidate.verified) {
        await Company.deleteOne({ _id: candidate._id });
      }

      //hash password
      const salt = await bcrypt.genSalt(10);
      const passwordHashed = await bcrypt.hash(password, salt);
      const token = generateVerifToken(email);

      //create user
      const company = new Company({
        name,
        email,
        password: passwordHashed,
        emailToken: token,
      });
      await company.save();

      //email details
      const verificationLink = generateLink(token, 'verify');
      let details = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: 'Verification',
        html: `<p>Verify your email adress to complete the signup and login into your account.</p><p>This link <b>will expires in 15min</b></p><p>Press <a href=${verificationLink}>here</a> to proceed.</p>`,
      };

      // send email
      mailTransporter.sendMail(details, (err) => {
        if (err) {
          res.status(500).json({ error: 'Internal error' });
        }
      });
      res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }

  async verify(req, res) {
    try {
      const { token } = req.query;
      let user = await Company.findOne({ emailToken: token });
      if (!user) {
        res.status(400).json({ error: "Internal error" });
      }
      user.emailToken = null
      user.verified = true;
      await user.save();
      res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await Company.findOne({ email });
      if (!user) {
        res
          .status(403)
          .json({ error: "Internal error" });
      }
      if (!user.verified) {
        res.status(403).json({ error: "Internal error" })
      }
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        res.status(500).json({ error: "Internal error" });
      }
      const token = generateUserToken(user._id);
      res.status(200).json({ token: token });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }

  async sendReset(req, res) {
    try {
      const { email } = req.body;
      let candidate = await Company.findOne({ email });
      if (!candidate) {
        res.status(400).json({ error: "Internal error" });
      }
      const token = generateVerifToken(email)
      candidate.resetToken = token
      await candidate.save()

      //email details
      const verificationLink = generateLink(token, 'reset');
      let details = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: 'Reset password',
        html: `<p>Follow the link below to complete the password reset and login into your account.</p><p>This link <b>will expires in 15min</b></p><p>Press <a href=${verificationLink}>here</a> to proceed.</p>`,
      };

      // send email
      mailTransporter.sendMail(details, (err) => {
        if (err) {
          res.status(500).json({ error: "Internal error" });
        }
      });
      res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }

  async resetPassword(req, res) {
    try {
      const { token } = req.query;
      let { password } = req.body;

      //check is link valid
      let user = await Company.findOne({ resetToken: token });
      if (!user) {
        res.status(400).json({ error: "Internal error" });
      }

      //hash password
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      user.password = password;
      user.resetToken = null;
      await user.save();
      res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }
}

module.exports = new authController();

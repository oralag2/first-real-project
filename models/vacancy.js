const { model, Schema } = require('mongoose');

const Vacancy = new Schema(
  {
    companyName: { type: String, required: true },
    status: {type: String, default: 'Active'},
    show: Boolean,
    companyLogo: String,
    position: String,
    location: String,
    workHours: String,
    volunteeringType: String,
    description: String,
    willingRelocate: Boolean,
    workRemotely: Boolean,
    incentives: [{ name: String, id: { type: Number, unique: true } }],
    skills: [{ name: String, id: { type: Number, unique: true } }],
    benefits: [{ name: String, id: { type: Number, unique: true } }],
  },
  { timestamps: true }
);

module.exports = model('Vacancy', Vacancy);

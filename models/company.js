const { Schema, model, ObjectId } = require('mongoose');

const Company = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: Boolean,
  resetLink: String,
  companyName: { type: String, unique: true },

  avatar: String,
  title: String,
  location: String,

  phone: String,
  websites: [String],

  description: String,

  //   industry: { industryId: ObjectId, ref: 'Industry' },
  //   companyType: { companyTypeId: ObjectId, ref: 'CompanyType' },
  address: String,
  addressLine2: String,
  city: String,
  state: String,
  zipCode: Number,

  //   vacancies: [
  //     {
  //       id: { type: Number, required: true, unique: true },
  //       companyName: { type: String, required: true, unique: true },
  //       companyLogo: String,
  //       position: String,
  //       location: String,
  //       datePosted: String,
  //       workHours: String,
  //       volunteeringType: String,
  //       description: String,
  //       willingRelocate: Boolean,
  //       workRemotely: Boolean,
  //       incentives: [{ incentiveId: String }],
  //       skills: [{ skillId: ObjectId, ref: 'SkilledId' }],
  //       benefits: [{ benefitId: ObjectId, ref: 'SkilledId' }],
  //     },
  //   ],
  // },

  // subscriptions: [
  //   {
  //     title: { type: String, required: true },
  //     subtitle: { type: String, required: true },
  //     price: { type: Number, required: true },
  //     profits: [{ type: String, required: true }],
  //     trial: { type: Number, required: true },
  //   },
  // ],
});

module.exports = model('Company', Company);

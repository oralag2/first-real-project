const { Schema, model, ObjectId } = require('mongoose');

const Volunteer = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: Boolean,
  resetLink: String,

  avatar: String,
  headline: String,
  location: String,
  willingRelocate: Boolean,
  workRemotely: Boolean,

  isVisible: Boolean,

  phone: { type: String, unique: true },
  websites: [String],

  // skills: [{ skillId: ObjectId, ref: 'Skill' }],
  languages: [
    {
      languageId: { type: ObjectId, ref: 'Language' },
      levelId: { type: ObjectId, ref: 'Language' },
    },
  ],
  hasCar: Boolean,
  hasLicense: Boolean,

  // experienceStatus: { ExpStatusId: ObjectId, ref: 'ExperienceStatus' }, // спросить о вариантах заполнения
  // degreeStatus: { DegStatusId: ObjectId, ref: 'DegStatus' },// спросить о вариантах заполнения
  veteranStatus: Boolean,

  //   lookingTo: [
  //     {
  //       position: String,
  //       location: String,
  //       workHours: String,
  //       volunteeringType: String,
  //       // industry: { industryId: ObjectId, ref: 'Industry' },// спросить о вариантах заполнения
  //   ],

    workExperience: [
      {
        position: String,
        companyName: String,
        description: String,
        start: String,
        end: String,
      },
    ],

    education: [
      {
        position: String,
        degree: String,
        description: String,
        start: String,
        end: String,
      },
    ],

    resume: {
      link: String,
      datePosted: String,
    },
    certificates: [
      {
        title: String,
        subtitle: String,
        description: String,
        date: String,
      },
    ],

    executiveSummary: String,
    objective: String,
    achievements: String,
    asociations: String,
    coverLetter: String,
    personaStatement: String,
});

module.exports = model('Volunteer', Volunteer);

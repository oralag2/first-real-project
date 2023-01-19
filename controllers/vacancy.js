const Vacancy = require('../models/vacancy');

class vacancyController {
  async createVacancy(req, res) {
    try {
      const {
        companyName,
        companyLogo,
        show,
        position,
        location,
        workHours,
        volunteeringType,
        description,
        willingRelocate,
        workRemotely,
        incentives,
        skills,
        benefits,
      } = req.body;
      const vacancy = new Vacancy({
        companyName,
        companyLogo,
        show,
        position,
        location,
        workHours,
        volunteeringType,
        description,
        willingRelocate,
        workRemotely,
        incentives,
        skills,
        benefits,
      });
      await vacancy.save();
      res.status(200).json({ vacancy });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Internal error' });
    }
  }

  async getVacancies(req, res) {
    try {
      const vacancies = await Vacancy.find({show: true});
      res.status(200).json({ vacancies });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Internal error' });
    }
  }

  async getVacanciesWithDraws(req, res) {
    try {
      const vacancies = await Vacancy.find({});
      res.status(200).json({ vacancies });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Internal error' });
    }
  }

  async updateVacancy(req, res) {
    try {
      let candidate = await Vacancy.findById(req.body.vacancy);
      if (!candidate) {
        res.status(500).json({ message: 'Bad vacancy' });
      }
      candidate.set(req.body);
      const result = await candidate.save();
      res.status(200).json({ result });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Internal error' });
    }
  }

  async deleteVacancy(req, res) {
    try {
      const data = await Vacancy.deleteOne({ _id: req.body.id });
      res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Internal error' });
    }
  }

  async setStatus(req, res) {
    try {
      const vacancy = await Vacancy.findOne({ _id: req.body.id });
      if (!vacancy) {
        res.status(500).json({ message: 'Bad vacancy' });
      }
      vacancy.set(req.body);
      const result = await vacancy.save()
      res.status(200).json({ status: result.status });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Internal error' });
    }
  }
}

module.exports = new vacancyController();

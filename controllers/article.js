require('dotenv').config();
const Article = require('../models/article');
const {
  Language,
  arrayOfLanguages,
  Level,
  arrayOfLevels,
} = require('../models/languages');

class articleController {
  async createArticle(req, res) {
    try {
      const { title, text, image, tags } = req.body;
      const candidate = await Article.findOne({ title });
      if (candidate) {
        res.status(400).json({ error: 'Internal error' });
      }
      const article = new Article({
        title,
        text,
        image,
        tags,
      });
      await article.save();
      res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }

  async getArticles(req, res) {
    try {
      const articles = await Article.find();
      res.status(200).json({ result: articles });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }

  async updateArticle(req, res) {
    try {
      let candidate = await Article.findById(req.body.article);
      if (!candidate) {
        res.status(400).json({ error: 'Internal error' });
      }
      candidate.set(req.body);
      await candidate.save();
      res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }

  async deleteArticle(req, res) {
    try {
      await Article.deleteOne({ _id: req.body.id });
      res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }

  // async deleteTags(req, res){
  //   try {
  //     res.status(200).json({ success: true });
  //   } catch (e) {
  //     console.log(e);
  //     res.status(500).json({ message: 'Internal error' });
  //   }
  // }

  async addTags(req, res) {
    try {
      const article = await Article.findById(req.body.id);
      const tagged = article.tags.concat(req.body.tags);
      await tagged.save();
      res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }

  //migrate languages and levels to the db
  async addLanguages(req, res) {
    try {
      const [isNull1, isNull2] = await Promise.all([
        Language.findOne({}),
        Level.findOne({}),
      ]);
      console.log('test1');
      if (isNull1 || isNull2) {
        res.status(400).json({ error: 'Internal error' });
      }
      await Promise.all([
        Language.create(arrayOfLanguages),
        Level.create(arrayOfLevels),
      ]);
      res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ error: e.message });
    }
  }
}

module.exports = new articleController();

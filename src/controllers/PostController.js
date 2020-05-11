const Post = require('../models/Post');
const ReadFile = require('../readFile');
const IncidentChecker = require('./IncidentChecker');

module.exports = {
  async index(req, res) {
    const posts = await Post.find();
    return res.json(posts);
  },
  
  async store(req, res) {
    const { originalname: name, size, filename: key } = req.file;
    const post = await Post.create({
      name,
      size,
      key,
    });
    const data = ReadFile(key);
    await IncidentChecker(data);
    return res.json(post);
  },

  async delete(req, res){
    const post = await Post.findById(req.params.id);
    await post.remove();

    return res.send();
  }
};

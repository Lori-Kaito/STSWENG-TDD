const PostModel = require('../models/post.model');
const PostController = require('../controllers/post.controller');

PostController.create = (req, res) => {
    return PostModel.createPost(req.body, (err, post) => {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json(post);
        }
    })

};

PostController.update = (req, res) => {
    return PostModel.updatePost(req.params.id, req.body, (err, post) => {
    if (err) {
      return res.status(500).end();
    } else {
      return res.json(post);
    }
  });
};

PostController.findPost = (req, res) => {

};

PostController.getAllPosts = (req, res) => {

};

module.exports = PostController;
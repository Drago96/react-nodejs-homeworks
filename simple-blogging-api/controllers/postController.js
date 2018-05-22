const Post = require("../data/models/post");

const createPost = async (req, res) => {
  try {
    let post = new Post(req.body);
    post = await post.save();

    res
      .status(201)
      .header("Location", `/api/posts/${post._id}`)
      .send();
  } catch (e) {
    res.status(400).send(e);
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});

    res.status(200).send(posts);
  } catch (e) {
    res.status(400).send(e);
  }
};

const getPost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).send("Post not found");
    }

    res.status(200).send(post);
  } catch (e) {
    res.status(400).send(e);
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findByIdAndRemove(postId);

    if (!post) {
      return res.status(404).send("Post not found");
    }

    res.status(204).send();
  } catch (e) {
    res.status(400).send(e);
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const { title, content, author, status, imageUrl, tags } = req.body;

    const post = await Post.findByIdAndUpdate(
      postId,
      { $set: { title, content, author, status, imageUrl, tags } },
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).send("Post not found");
    }

    res.status(204).send();
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  deletePost,
  updatePost
};

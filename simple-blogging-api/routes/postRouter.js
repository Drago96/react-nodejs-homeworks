const postRouter = require("express").Router();

const postController = require("../controllers/postController");

postRouter.get("/", postController.getPosts);
postRouter.post("/", postController.createPost);

postRouter.get("/:id", postController.getPost);
postRouter.put("/:id", postController.updatePost);
postRouter.delete("/:id", postController.deletePost);

module.exports = postRouter;

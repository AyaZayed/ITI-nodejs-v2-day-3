const postsController = require("../controllers/postsController");

const router = require("express").Router();

router.get("/", postsController.getAllPosts)

router.get("/:id", postsController.getPostById)

router.post("/", postsController.createPost)

router.patch("/:id", postsController.updatePost)

router.delete("/:id", postsController.deletePost)

module.exports = router
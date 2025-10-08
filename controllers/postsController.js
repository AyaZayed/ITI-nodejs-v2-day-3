const Post = require("../models/posts");
const { isValidObjectId } = require("mongoose");

class PostsController {
        async getAllPosts(req, res) {
                const { page, limit } = req.query;

                const skip = (page - 1) * limit;

                const postsPromise = Post.find({}, { password: 0 })
                        .skip(Number(skip))
                        .limit(Number(limit))
                        .sort({ createdAt: -1 })
                        .populate("author", "name");

                const totalPromise = Post.countDocuments();

                const [posts, total] = await Promise.all([postsPromise, totalPromise]);

                res.status(200).json({
                        status: "success",
                        message: "Posts fetched successfully",
                        data: posts,
                        pagenation: {
                                page: Number(page),
                                total,
                                totalPages: Math.ceil(total / Number(limit)),
                                limit: Number(limit),
                        },
                });
        }

        async getPostById(req, res) {
                const { id } = req.params;
                if (!isValidObjectId(id)) {
                        return res.status(400).json({
                                status: "error",
                                message: "Invalid id"
                        });
                }

                const post = await Post.findOne({ _id: id }, { password: 0 });

                if (!post) {
                        return res.status(404).json({ status: "error", message: "Post not found" });
                }

                res.status(200).json({
                        status: "success",
                        message: "Post fetched successfully",
                        data: post,
                });
        }

        async createPost(req, res) {
                const { title, content, author } = req.body;

                if (!title || !content || !author) {
                        return res.status(400).json({
                                status: "error",
                                message: "Title, content and author are required"
                        });
                }

                try {
                        const newPost = await Post.create({ title, content, author });

                        res.status(201).json({
                                status: "success",
                                message: "Post created successfully",
                                data: newPost,
                        });
                } catch (error) {
                        console.error(error);
                        res.status(500).json({
                                status: "error",
                                message: "Error creating post",
                        });
                }
        }

        async updatePost(req, res) {
                const { id } = req.params;

                if (!isValidObjectId(id)) {
                        return res.status(400).json({
                                status: "error",
                                message: "Invalid id"
                        });
                }

                const { title, content } = req.body;

                try {
                        const updatedPost = await Post.findOneAndUpdate(
                                { _id: id },
                                { title, content },
                                { new: true }
                        );

                        if (!updatedPost) {
                                return res.status(404).json({
                                        status: "error",
                                        message: "Post not found"
                                });
                        }

                        res.status(200).json({
                                status: "success",
                                message: "Post updated successfully",
                                data: updatedPost,
                        });
                } catch (error) {
                        console.error(error);
                        res.status(500).json({
                                status: "error",
                                message: "Error updating post",
                        });
                }
        }

        async deletePost(req, res) {
                const { id } = req.params;

                if (!isValidObjectId(id)) {
                        return res.status(400).json({
                                status: "error",
                                message: "Invalid id"
                        });
                }

                try {
                        const deletedPost = await Post.findOneAndDelete({ _id: id });

                        if (!deletedPost) {
                                return res.status(404).json({
                                        status: "error",
                                        message: "Post not found"
                                });
                        }

                        res.status(204).send();

                } catch (error) {
                        console.error(error);
                        res.status(500).json({
                                status: "error",
                                message: "Error deleting post",
                        });
                }
        }
}

const postsController = new PostsController();
module.exports = postsController;
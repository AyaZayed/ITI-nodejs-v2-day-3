const { default: mongoose } = require("mongoose");

const postSchema = new mongoose.Schema({
        title: {
                type: String,
                required: true,
                minLength: [3, "Title must be at least 3 characters long"],
        },
        content: {
                type: String,
                required: true,
                minLength: [20, "Content must be at least 20 characters long"],
        },
        author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
        },
        isPublished: {
                type: Boolean,
                default: false,
        }
}, {
        timestamps: true
})

const Post = mongoose.model("Post", postSchema)
module.exports = Post
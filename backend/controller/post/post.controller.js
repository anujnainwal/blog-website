const { default: mongoose } = require("mongoose");
const postModel = require("../../model/post.model");
const { createPostvalidation } = require("../../utils/validation/validation");

/*
    @route createPost api/v1/createPost
    @desc user create post
    @access private 
*/
exports.createPost = async (req, res, next) => {
  let loginId = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(loginId)) {
    return res.status(400).json({ error: "Invalid Id" });
  }
  try {
    const { error, value } = createPostvalidation.validate(req.body, postModel);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const post = await postModel.create({
      title: value.title,
      category: value.category,
      description: value.description,
      author: loginId,
    });
    await post.save();
    return res.status(200).json({ message: "Post Created", post });
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
};

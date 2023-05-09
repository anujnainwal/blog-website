const userModel = require("../../model/user.model");
const mongoose = require("mongoose");
const generateToken = require("../../token/generateToken");
const {
  registerValidation,
  loginValidation,
  checkValidId,
  profileUpdate,
  checkPassword,
} = require("../../utils/validation/validation");

/*
    @route register api/v1/user/register
    @desc user registration
    @access private
*/
exports.Register = async (req, res, next) => {
  const { error, value } = registerValidation.validate(req.body, userModel, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const { firstname, lastname, email, password } = value;
    //check if email already exist or not.
    const duplicateEmail = await userModel.findOne({ email: email });
    if (duplicateEmail) {
      return res.status(400).json({
        error: `This ${email} address already register.Please try with new email.`,
      });
    }
    const user = new userModel({
      firstname,
      lastname,
      email,
      password,
    });
    await user.save();

    return res
      .status(200)
      .json({ message: "user registeration.", userInfo: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
/*
    @route login api/v1/user/login
    @desc user login
    @access private
*/
exports.Login = async (req, res, next) => {
  const { error, value } = loginValidation.validate(req.body, userModel, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const { email, password } = value;
    const checkEmail = await userModel
      .findOne({ email: email })
      .select("+password");

    const accessToken = await generateToken.accessToken(checkEmail);
    if (!checkEmail) {
      return res.status(404).json({ error: `This ${email} not found.` });
    }
    const matchPassword = await checkEmail.matchPassword(password);
    if (!matchPassword) {
      return res.status(401).json({ error: "Invalid Credentails." });
    } else {
      return res.status(200).json({
        status: 1,
        message: "Login successfully.",
        userInfo: checkEmail,
        accessToken: accessToken,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
/*
    @route fetch api/v1/user/all-users
    @desc See All users
    @access public
*/
exports.fetchAllUser = async (req, res, next) => {
  const user = await userModel.find().sort({ createAt: 1 });
  try {
    if (user?.length < 0) {
      return res.status(400).json({ status: 0, message: "No user Found." });
    }
    return res
      .status(200)
      .json({ status: 1, message: "Fetch All user", users: user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
/*
    @route delete api/v1/user/:id
    @desc delete users
    @access delete
*/
exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ status: 0, error: "Invalid user id." });
  }
  try {
    const user = await userModel.findByIdAndDelete({ _id: id });
    if (!user) {
      return res.status(400).json({ status: 0, error: "User not found." });
    }
    return res.status(200).json({
      status: 1,
      messae: `The user with this ID="${id}" has been deleted successfully.`,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
/*
    @route Single api/v1/user/:id
    @desc fetch single user
    @access public
*/
exports.singleUser = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ status: 0, error: "Invalid user id." });
  }
  try {
    const user = await userModel.findById({ _id: id });
    if (!user) {
      return res.status(400).json({ status: 0, error: "User not found." });
    }
    return res.status(200).json({
      status: 1,
      messae: `Single user fetch.`,
      userInfo: user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
/*
    @route profile api/v1/user/profile/:id
    @desc userprofile user
    @access public
*/
exports.userProfile = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ status: 0, error: "Invalid user id." });
  }
  try {
    const user = await userModel.findById({ _id: id });
    if (!user) {
      return res.status(400).json({ status: 0, error: "User not found." });
    }
    return res.status(200).json({
      status: 1,
      messae: `Single user fetch.`,
      userInfo: user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
/*
    @route update Profile api/v1/user/update/:id
    @desc user profile user
    @access public
*/
exports.updateProfile = async (req, res, next) => {
  const { _id } = req.user;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ status: 0, error: "Invalid user id." });
  }
  const { error, value } = profileUpdate.validate(req.body, userModel);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const { firstname, lastname, email, bio } = value;
    const user = await userModel.findByIdAndUpdate(
      _id,
      {
        firstname: firstname,
        lastname: lastname,
        email: email,
        bio: bio,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      status: 1,
      message: "Profile Update succesfully. ",
      userInfo: user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
/*
    @route update Profile api/v1/user/changePassword/
    @desc user update password
    @access private
*/
exports.changePassword = async (req, res, next) => {
  const { _id } = req.user;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ status: 0, error: "Invalid user id." });
  }
  const { error, value } = checkPassword.validate(req.body, userModel);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const user = await userModel.findById(_id).select("+password");
  try {
    const { newPassword, currentPassword } = value;

    const currentPasswordValid = await user.matchPassword(currentPassword);
    if (!currentPasswordValid) {
      return res.status(400).json({ status: 0, error: "Invalid Password" });
    }

    const newPasswordvalid = await user.matchPassword(newPassword);
    if (newPasswordvalid) {
      return res.status(400).json({
        status: 0,
        error: "New password cannot be same as current password.",
      });
    }

    user.password = newPassword;
    await user.save();
    return res.status(200).json({
      status: 1,
      message: "Password successfully updated.",
      userInfo: user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
/*
    @route update Profile api/v1/user/changePassword/
    @desc user update password
    @access private
*/
exports.userFollowing = async (req, res, next) => {
  const loginId = req.user._id;
  const { followId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(loginId) ||
    !mongoose.Types.ObjectId.isValid(followId)
  ) {
    return res.status(400).json({ status: 0, error: "Invalid user id." });
  }

  try {
    const targetUser = await userModel.findById(followId);

    const alreadyFollowed = targetUser?.followers.find(
      (user) => user.toString() === loginId.toString()
    );

    if (alreadyFollowed) {
      return res
        .status(400)
        .json({ status: 0, error: `you have already follow this user.` });
    }
    //1. Find the user you want to follow and update it's followers field
    await userModel.findByIdAndUpdate(followId, {
      $push: { followers: loginId },
    });
    // /2. Update the login user following field
    const user = await userModel.findByIdAndUpdate(loginId, {
      $push: {
        following: followId,
      },
    });
    await user.save();
    return res.status(200).json({
      status: 1,
      message: "You successfully followed this person.",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

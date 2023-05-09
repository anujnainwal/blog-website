const userModel = require("../../model/user.model");
const generateToken = require("../../token/generateToken");
const {
  registerValidation,
  loginValidation,
} = require("../../utils/validation/validation");

/*
    @route register api/v1/user/register
    @desc user registration
    @access private
*/
exports.Register = async (req, res, next) => {
  const { error, value } = registerValidation.validate(req.body, userModel);
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
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
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
    @route register api/v1/user/login
    @desc user registration
    @access private
*/
exports.Login = async (req, res, next) => {
  const { error, value } = loginValidation.validate(req.body, userModel);
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
    const matchPassword = checkEmail.matchPassword(checkEmail.password);
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

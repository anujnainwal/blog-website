const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
    },
    email: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    postCount: {
      type: Number,
      default: 0,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Admin", "User", "Blogger"],
    },
    isFollowing: {
      type: Boolean,
      default: false,
    },
    isUnFollowing: {
      type: Boolean,
      default: false,
    },
    isAccountVerifed: {
      type: Boolean,
      default: false,
    },
    accountActivationToken: String,
    accountActivationTokenExpire: Date,
    viwedBy: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
      ],
    },
    followers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
      ],
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpire: Date,
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

//prefiend
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(user.password, salt);
  next();
});

//match password
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Users", userSchema);

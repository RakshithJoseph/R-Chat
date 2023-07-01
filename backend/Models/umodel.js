const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const umodel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default:
        "https://thenounproject.com/api/private/icons/5034901/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0",
    },
  },
  {
    timestamps: true,
  }
);

umodel.methods.matchp = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

umodel.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", umodel);
module.exports = User;

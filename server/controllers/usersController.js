const User = require("../model/userModel.js");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({
        success: false,
        message: "Nome de usuário já está sendo utilizado",
      });
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({
        success: false,
        message: "Email já está sendo utilizado",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordValid) {
      return res.json({
        success: false,
        message: "Usuário ou senha incorretos",
      });
    }

    delete user.password;

    return res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "_id",
    ]);
    return res.json(users);
  } catch (err) {
    next(err);
  }
};

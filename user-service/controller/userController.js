const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UserController {
  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Vui lòng kiểm tra lại thông tin đăng nhập!",
        code: 401,
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(201)
        .json({ message: "Vui lòng kiểm tra lại thông tin đăng nhập!", code: 201 });
    }
    const payload = {
      email,
      name: user.name,
      userId: user._id,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "30m",
    });
    return res
      .status(200)
      .json({ message: "Login successfully!", metaData: payload, token: token, code: 200 });
  }

  async register(req, res) {
    const { email, password, name, address, phoneNumber } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ message: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        name,
        password: hashedPassword,
        address,
        phoneNumber,
      });
      newUser.save();
      return res.json(newUser);
    }
  }
}

module.exports = new UserController();

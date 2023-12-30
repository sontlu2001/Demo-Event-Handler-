const express = require("express");
const app = express();
const PORT = 7001;
const mongoose = require("mongoose");
const User = require("./model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

mongoose.connect(
  "mongodb://127.0.0.1:27017/AuthService",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`Auth-Service DB Connected`);
  }
);

app.use(express.json());

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ message: "User doesn't exist" });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Password Incorrect' });
  }
  const payload = {
    email,
    name: user.name,
  };
  const token = jwt.sign(payload, "secret", { expiresIn: "1h" });
  return res.status(200).json({ token: token });
});

app.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.json({ message: "User already exists" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      name,
      password: hashedPassword,
    });
    newUser.save();
    return res.json(newUser);
  }
});

app.listen(PORT, () => {
  console.log(`Auth-Service at ${PORT}`);
});

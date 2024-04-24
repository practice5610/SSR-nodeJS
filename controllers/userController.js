const { Module } = require("module");
const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");

//
const findUser = asyncHandler(async (req, res) => {
  const findUser = await userModel.findById(req.params.id);
  if (!findUser) {
    res.status(400);
    throw new Error("Cannot find this user");
  }
  res.status(200).json(findUser);
});

//
const findUsers = asyncHandler(async (req, res) => {
  const findUsers = await userModel.find();
  if (!findUsers) {
    res.status(400);
    throw new Error("Cannot find any user");
  }
  res.status(200).json(findUsers);
});

//
const createUser = asyncHandler(async (req, res) => {
  const { username, email, phone, age, gender, country } = req.body;
  if (!username || !email || !phone) {
    res.status(400);
    throw new Error("Please Fill All Fileds");
  }
  const findUser = await userModel.findOne({ email });
  if (findUser) {
    res.status(400);
    throw new Error("This Email Already Exist");
  }
  const createUser = await userModel.create({
    username,
    email,
    phone,
    age,
    gender,
    country,
  });
  if (createUser) {
    res.status(201).json({
      name: createUser.username,
      email: createUser.email,
      phone: createUser.phone,
    });
  } else {
    res.status(400);
    throw new Error("User Data Is Not Valid");
  }
});

//
const updateUser = asyncHandler(async (req, res) => {
  const findUser = await userModel.findById(req.params.id);
  if (!findUser) {
    res.status(400);
    throw new Error("Cannot find this user");
  }
  console.log(req.body)
  const updateUser = await userModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).redirect("/")
});

//
const deleteUser = asyncHandler(async (req, res) => {
  const findUser = await userModel.findById(req.params.id);
  if (!findUser) {
    res.status(400);
    throw new Error("Cannot find this user");
  }
  const deleteUser = await userModel.deleteOne({ _id: req.params.id });
  res.status(200).json(deleteUser);
});

module.exports = { findUser, findUsers, createUser, updateUser, deleteUser };

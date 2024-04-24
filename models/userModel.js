const mongoose = require("mongoose");
const { type } = require("os");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: [true, "Please Enter Username"] },
    email: {
      type: String,
      required: [true, "Please Enter Email"],
      unique: [true, "this email already token"],
    },
    phone: { type: String, required: [true, "Please Enter Phone"] },
    age: { type: Number, required: [true, "Please Enter Age"] },
    gender: { type: String, required: [true, "Please Enter Gender"] },
    country: { type: String, required: [true, "Please Enter Country"] },
  },
  // بنستحدمها عشان تضيف وقت الاضافه ووفت اخر تعديل
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);

const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const moment = require("moment");
const path = require("path");
const methodOverride=require("method-override")
app.use(methodOverride("_method"))

// لأزم تحدد هنا الانجين اللي هيشتغل مع السيرفر
app.set("view engine", "ejs");
//هنا لازم تفهم ان ملف الس هو حاجه ستاتيك بالنسبه للسيرفر فلازم تعرفها
app.use(express.static("public"));

app.use(express.json());
// const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }));

const DB_CONNECTION = require("./config/connection");
const userRoutes = require("./routes/userRoutes");
const userModel = require("./models/userModel");
const errorHandler=require("./middleware/errorsHandle")



// start requests
app.get("/", async (req, res) => {
  // طيب هنا عشان نعرف نعمل سيرفر ريندر لازم نستخدم فيو انجن
  // بنستحدم ريندر مكان سيند
  // ممكن تاخد البارامترز بتاعتنا اللي هنحتاج نستخدمها في الملف ككود جافاسكريبت
  //   هنستخدم مكتبه مومنت عشان نتحكم في شكل التاريخ
  const findUsers = await userModel.find();
  if (!findUsers) {
    res.status(400);
    throw new Error("Cannot find any user");
  }
  res.render("index", { arr: findUsers, moment: moment });
});

// التوضيح موجود في ملف الويب
app.get("/user/add.html", async (req, res) => {
  res.status(200).render("user/add");
});
app.use("/user/add.html", require("./routes/userRoutes"));


// 
app.get("/user/:id", async (req, res) => {
  const findUser = await userModel.findById(req.params.id);
  if (!findUser) {
    res.status(400);
    throw new Error("Cannot find this user");
  }
  console.log(findUser)
  res.status(200).render("user/view",{obj:findUser,moment:moment});
});




// 
app.get("/user/edit.html",()=>{
  res.render("user/edit")
})
app.get("/edit/:id", async (req, res) => {
  const findUser = await userModel.findById(req.params.id);
  if (!findUser) {
    res.status(400);
    throw new Error("Cannot find this user");
  }
  console.log(findUser)
  res.status(200).render("user/edit",{obj:findUser,moment:moment});
});

// app.use("/edit/:id",require("./routes/userRoutes"))
app.put("/edit/:id", async (req,res)=>{
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
})

app.delete("/delete/:id",async (req,res)=>{
  const findUser = await userModel.findById(req.params.id);
  if (!findUser) {
    res.status(400);
    throw new Error("Cannot find this user");
  }
  const deleteUser = await userModel.deleteOne({ _id: req.params.id });
  res.status(200).redirect("/")
})



app.post("/search", async(req,res)=>{
  const regex = new RegExp(`^${req.body.SearchTXT}`, 'i');
const findUser=await userModel.find({username:regex})
res.render("index", { arr: findUser, moment: moment });
})

app.use(errorHandler)
// DB connect
DB_CONNECTION();
// start server
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`app start listining on port ${[port]}`);
});

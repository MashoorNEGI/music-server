var express = require("express");
const router = express.Router();
const User = require("../model/schema");
const bcrypt = require("bcryptjs");
const Feedback = require("../model/contact")
require("../db-connect");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});


// ----------------------------------------------------- Async and await --------------------

router.post("/register", async (req, res, next) => {
  const { Name, Email, Phone, Password } = req.body;

  if (!Name || !Email || !Phone || !Password) {
    return res.status(400).json({
      Error: "please fill data ",
    });
  }
  try {
    const userexist = await User.findOne({ Email: Email });

    if (userexist) {
      return res.status(422).json({ Error: "Email already exist" });
    }
    if (Password.match(/[a-z]/g) && Password.match(/[A-Z]/g) && Password.match(/[0-9]/g)) {

      const user = new User({ Name, Email, Phone, Password })
      await user.save()

      res.json({ message: "user registerd successfully" })
    }

    else {
      res.status(401).json({
        error: "password is not strong"
      })
    }
  } catch (err) {
    console.log(err);
  }
});
// ............................................................................

// login page back-end-----------------------------

router.post("/Signin", async (req, res) => {
  // console.log(req.body)
  // res.json({
  //   messsage: "signin done"
  // })

  try {
    const { Email, Password } = req.body;
    // console.log(Password);

    if (!Email || !Password) {
      return res.status(400).json({
        Error: "Please fill data",
      });
    }
    const userlogin = await User.findOne({ Email: Email });

    if (userlogin) {

      const match = await bcrypt.compare(Password, userlogin.Password);

      if (!match) {
        res.status(400).json({
          Error: "Invalid credentials ",
        });

      } else {

        res.status(200).json({
          message: "User Signin Successfully",
        });
      }
    } else {
      res.status(400).json({
        Error: "Invalid credentials",
      });
    }
  } catch (err) {
    console.log(err);
  }
});



router.get("/Admin", function (req, res) {
  User.find(function (err, found) {
    if (!err) {
      res.status(200).json(found)
    }
  })
})

router.post("/Delete", function (req, res) {
  const Name = req.body.Name
  User.deleteOne({ Name }, function (err) {
    if (!err) {
      res.json({
        message:
          "deleted succesfully"
      })
    } else {
      res.json({
        error: "somthing is wrong"
      })
    }
  })
})

router.post("/contact", function (req, res) {
  const { Name, Email, Subject, Message } = req.body
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (!Name || !Email || !Subject || !Message) {
    res.status(400).json({
      error: "Please Fill Data"
    })
  }
  try {
    if (Email.match(regex)) {
      const Feed = new Feedback({ Name, Email, Subject, Message })
      Feed.save()
      res.json({
        message: "done"
      })
    }
  } catch (error) {
    console.log(error);
  }
})
module.exports = router;

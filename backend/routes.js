const stripe = require("stripe");
const express = require("express");
const session = require("express-session");
const router = express.Router();
const Users = require("./Schema/Users");
const Products = require("./Schema/Products");
const Token = require("./Schema/Token");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const MongoDBStore = require("connect-mongodb-session")(session);
const sendEmail = require("./sendEmail");
const dotenv = require("dotenv");
const multer = require("multer");
const fs = require("fs");
dotenv.config({ path: "../.env" });

const store = new MongoDBStore({
  uri: process.env.DATABASE_ACCESS,
  collection: "sessions",
});

let stripeGateway = stripe(
  "sk_test_51MCkXgDplZI5a2XjhslbZ4ge0UxGgEIAOvgGnpRRwta6scGnPvWFBlvaYhYqAXvnHK58tHwnUw133AZOpIma1H4q005lxIADbl"
);
let DOMAIN = "http://localhost:3000/";

function verifyJWT(req, res, next) {
  const token = req.cookies["access_token"];

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(401).redirect("http://localhost:3000/");
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).redirect("http://localhost:3000/");
  }
}
router.use(
  session({
    secret: "secret",
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("file");

router.post("/upload", async (req, res) => {
  // upload(req, res, async (err) => {
  //   if (err) return res.status(404).send({ message: "File Upload Failed" });
  //   const imageBuffer = fs.readFileSync(`./uploads/${req.file.originalname}`);
  //   Users.findOneAndUpdate(
  //     { username: req.body.user },
  //     { profileImage: imageBuffer, profileImageName: req.file.originalname },
  //     async (error, foundUser) => {
  //       if (error) {
  //       } else {
  //         if (foundUser.profileImage) {
  //           const profileImage = await Buffer.from(
  //             foundUser.profileImage,
  //             "binary"
  //           ).toString("base64");
  //           return res
  //             .status(200)
  //             .send({ filename: req.file.originalname, profileImage });
  //         }
  //         return res.status(200).send({ filename: req.file.originalname });
  //       }
  //     }
  //   );
  // });
  upload(req, res, async (err) => {
    if (err) return res.status(404).send({ message: "File Upload Failed" });
    const imageBuffer = await fs.promises.readFile(
      `./uploads/${req.file.originalname}`
    );
    Users.findOneAndUpdate(
      { username: req.body.user },
      { profileImage: imageBuffer, profileImageName: req.file.originalname },
      async (error, foundUser) => {
        if (error) {
          return res.status(500).send({ message: "Error updating user" });
        } else {
          if (imageBuffer) {
            const profileImage = Buffer.from(imageBuffer, "binary").toString(
              "base64"
            );
            return res
              .status(200)
              .send({ filename: req.file.originalname, profileImage });
          }
          return res.status(200).send({ filename: req.file.originalname });
        }
      }
    );
  });
});

router.post("/user/checkout", verifyJWT, async (req, res) => {
  const session = await stripeGateway.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: DOMAIN,
    cancel_url: `${DOMAIN}basket`,
    line_items: req.body.items.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name.slice(0, -1),
            description: item.size,
          },
          unit_amount: Number(item.price.split("$").join("")) * 100,
        },
        quantity: 1,
      };
    }),
  });
  res.status(200).json(session.url);
});

router.get("/api/products/find", async (req, res) => {
  let foundProduct = await Products.find({
    $expr: { $gt: [{ $strLenCP: "$text" }, 1] },
  });
  foundProduct
    ? res.status(202).json(foundProduct)
    : res.status(204).send({ message: "No Products Available" });
});

router.post("/user/cart/add", verifyJWT, async (req, res) => {
  let foundProduct = await Products.findOne({ name: req.body.product });
  let foundUser = await Users.findOne({
    username: req.body.user,
    "cart.product": foundProduct.name,
  });
  if (foundUser) {
    return res.status(203).json({ message: "Product already exists" });
  } else {
    await Users.findOne({ username: req.body.user }).updateOne({
      $push: {
        cart: {
          _id: foundProduct._id,
          product: foundProduct.name,
          quantity: 1,
        },
      },
    });
    return res.status(202).send(foundProduct);
  }
});

router.post("/user/cart/delete", verifyJWT, async (req, res) => {
  const user = await Users.updateOne(
    { username: req.body.user },
    {
      $pull: { cart: { product: req.body.productName } },
    }
  );
  if (user) {
    const foundUser = await Users.findOne({
      username: req.body.user,
    });
    const values = foundUser.cart.map((prod) => prod.product);
    if (foundUser) {
      const basketProducts = await Products.find({
        name: { $in: values },
      });
      res.status(200).send(basketProducts);
    }
  } else {
    res.status(401);
  }
});

router.post("/user/cart/products", verifyJWT, async (req, res) => {
  const foundUser = await Users.findOne({
    username: req.body.user,
  });
  if (foundUser) {
    const basketProducts = await Products.find({
      _id: { $in: foundUser.cart },
    });
    return res.status(200).send({ basketProducts, foundUser });
  }
});

router.post("/api/products/select", async (req, res) => {
  let foundProduct = await Products.find({
    name: { $regex: `^${req.body.name}` },
  });
  foundProduct
    ? res.status(202).json(foundProduct)
    : res.status(204).send({ message: "No Products Available" });
});

router.get("/api/products", async (req, res) => {
  let allProducts = await Products.find({});
  if (allProducts) {
    res.status(200).json(allProducts);
  } else {
    return res.send(404);
  }
});

router.post("/api/products/find/shape", async (req, res) => {
  let foundProductShapes = await Products.find({ name: req.body.name });
  res.status(202).json(foundProductShapes);
});

router.post("/api/login", async (req, res) => {
  req.session.user = req.body.email;
  const userLoggingIn = req.body;
  const emailOrUsername = req.body.email;

  const email = await Users.findOne({
    email: emailOrUsername,
  });

  const userExists = await Users.findOne({
    username: emailOrUsername,
  });

  let foundUser;

  if (email) foundUser = email;
  else foundUser = userExists;

  if (!foundUser) {
    return res.status(404).send({ message: "Account does not exist" });
  }
  if (!foundUser.verified) {
    let token = await Token.findOne({ userId: foundUser._id });
    if (!token) {
      token = await new Token({
        userId: foundUser._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
      const url = `${process.env.BASE_URL}users/${foundUser._id}/verify/${token.token}`;
      // await sendEmail(
      //   foundUser.email,
      //   "ardonit.1980@gmail.com",
      //   "Gem Store - Verify Account",
      //   url
      // );
    }
  }
  if (foundUser) {
    const basketProducts = await Products.find({
      _id: { $in: foundUser.cart },
    });
    bcrypt.compare(userLoggingIn.password, foundUser.password, (err, user) => {
      if (user) {
        const signUser = { username: emailOrUsername };
        const accessToken = jwt.sign(signUser, process.env.ACCESS_TOKEN, {
          expiresIn: "1d",
        });
        res.cookie("access_token", `${accessToken}`);
        if (foundUser.profileImage && foundUser.profileImage !== "undefined") {
          const profileImage = Buffer.from(
            foundUser.profileImage,
            "binary"
          ).toString("base64");
          return res.status(200).json({
            auth: true,
            accessToken: accessToken,
            user: emailOrUsername,
            profileImage: profileImage,
            success: "Login successful",
            basketProducts: basketProducts,
          });
        } else {
          return res.status(200).json({
            auth: true,
            accessToken: accessToken,
            user: emailOrUsername,
            profileImage: "",
            success: "Login successful",
            basketProducts: basketProducts,
          });
        }
      } else {
        res
          .status(409)
          .send({ message: "Incorrect Username/Email or Password" });
      }
    });
  }
});

router.post("/api/signup", async (req, res) => {
  const user = req.body;
  const takenEmail = await Users.findOne({
    email: req.body.email,
  });
  const takenUsername = await Users.findOne({
    username: user.username,
  });
  if (takenEmail) {
    return res.status(409).json({ error: "Email already exists!" });
  } else if (takenUsername) {
    return res.status(409).json({ error: "Username already exists!" });
  } else {
    if (user.password1 === user.password2) {
      user.password1 = await bcrypt.hash(req.body.password1, 10);
      let dbUser = await new Users({
        username: user.username,
        email: user.email,
        password: user.password1,
      }).save();

      const token = await new Token({
        userId: dbUser._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
      const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
      await sendEmail(
        dbUser.email,
        "ardonit.1980@gmail.com",
        "Gem Store - Verify Account",
        url
      );
      return res.status(201).json({
        success: "An Email has been sent to your account, please verify",
      });
    }
  }
  res.status(403).json({ error: "Passwords must be matching!" });
});

function checkSessionUser(req, res, next) {
  if (req.session.user === req.params.user) {
    next();
  } else {
    res.status(403).send("You do not have permission to access this route");
  }
}

router.post("/:user/profile", verifyJWT, checkSessionUser, async (req, res) => {
  const foundUser = await Users.findOne({
    username: req.body.user,
  });
  if (foundUser.profileImage) {
    const image = Buffer.from(foundUser.profileImage, "binary").toString(
      "base64"
    );
    res.status(200).send({ user: foundUser, image: image });
  } else {
    res.status(200).send({ user: foundUser, image: "" });
  }
});
router.post("/user/update-profile", verifyJWT, async (req, res) => {
  const user = req.body;
  const update = {};
  if (user.profileImage) {
    update.profileImage = user.profileImage;
  }
  if (user.password) {
    update.password = await bcrypt.hash(user.password, 10);
  }
  if (user.email) {
    update.email = user.email;
  }
  if (user.username) {
    update.username = user.username;
  }
  // Find the user in the database
  const existingUser = await Users.findById(user._id);
  // Check if the email or username is already in use
  if (
    (update.email &&
      update.email !== existingUser.email &&
      (await Users.exists({ email: update.email }))) ||
    (update.username &&
      update.username !== existingUser.username &&
      (await Users.exists({ username: update.username })))
  ) {
    res.status(400).send({ message: "Email or username is already in use" });
  } else {
    // Update the user's profile
    Users.findByIdAndUpdate(user._id, update, (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send({
          message: "Profile updated successfully",
          username: user.username,
        });
      }
    });
  }
});

router.get("/api/:id/verify/:token", async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid Link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid Link" });

    await Users.updateOne({ _id: user._id, verified: true });
    await token.remove();
    res.status(200).send({ message: "Email Verified Successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/api/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      throw new Error(err);
    } else {
      res.clearCookie("access_token"); // clean up!
      return res
        .status(200)
        .send({ msg: "logging you out", redirect_path: "/" });
    }
  });
});

module.exports = router;
